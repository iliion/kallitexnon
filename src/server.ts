import "./lib/error-capture";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// __dirname is dist/server, so go up one level to dist, then to client
const clientDir = path.join(__dirname, "..", "client");

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

export async function fetch(request: Request): Promise<Response> {
  try {
    const handler = await getServerEntry();
    const response = await handler.fetch(request);
    return await normalizeCatastrophicSsrResponse(response);
  } catch (error) {
    console.error(error);
    return brandedErrorResponse();
  }
}

export default {
  fetch,
};

// Production Node.js server entry point
if (import.meta.env.PROD) {
  const port = process.env.PORT || 3000;

  async function serveStaticFile(pathname: string): Promise<Response | null> {
    try {
      const filePath = path.join(clientDir, pathname);
      
      // Security: prevent directory traversal
      const normalizedPath = path.normalize(filePath);
      const normalizedBase = path.normalize(clientDir);
      if (!normalizedPath.startsWith(normalizedBase)) {
        console.warn(`[SECURITY] Path traversal attempt blocked: ${pathname}`);
        return null;
      }

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        console.warn(`[404] File not found: ${filePath}`);
        return null;
      }

      // Check if it's actually a file (not directory)
      const stat = fs.statSync(filePath);
      if (!stat.isFile()) {
        console.warn(`[SKIP] Not a file: ${filePath}`);
        return null;
      }

      // Read and serve
      const content = fs.readFileSync(filePath);
      const mimeType = getMimeType(filePath);

      console.log(`[200] Serving: ${pathname} (${content.length} bytes)`);

      return new Response(content, {
        status: 200,
        headers: {
          "content-type": mimeType,
          "cache-control": pathname.includes(".") ? "public, max-age=31536000, immutable" : "public, max-age=0, must-revalidate",
        },
      });
    } catch (error) {
      console.error(`[ERROR] Serving ${pathname}:`, error);
      return null;
    }
  }

  function getMimeType(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes: Record<string, string> = {
      ".html": "text/html; charset=utf-8",
      ".js": "application/javascript; charset=utf-8",
      ".mjs": "application/javascript; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml; charset=utf-8",
      ".webp": "image/webp",
      ".woff": "font/woff",
      ".woff2": "font/woff2",
      ".ttf": "font/ttf",
      ".eot": "application/vnd.ms-fontobject",
      ".otf": "font/otf",
    };
    return mimeTypes[ext] || "application/octet-stream";
  }

  const server = http.createServer(async (req, res) => {
    try {
      const url = `http://${req.headers.host}${req.url}`;
      const pathname = new URL(url).pathname;

      // Debug logging for asset requests
      if (pathname.startsWith("/assets/")) {
        const filePath = path.join(clientDir, pathname);
        const exists = fs.existsSync(filePath);
        if (!exists) {
          console.warn(`[404] Asset not found: ${pathname}`);
          console.warn(`      Expected at: ${filePath}`);
        }
      }

      // Try to serve static files first
      const staticResponse = await serveStaticFile(pathname);
      if (staticResponse) {
        const headers = Object.fromEntries(staticResponse.headers);
        res.writeHead(staticResponse.status, headers);
        const buffer = await staticResponse.arrayBuffer();
        res.end(Buffer.from(buffer));
        return;
      }

      // For asset requests that don't exist, return 404 instead of SSR
      if (pathname.startsWith("/assets/")) {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Asset not found");
        return;
      }

      // Read the body for non-GET/HEAD requests
      let body: Buffer | undefined;
      if (req.method !== "GET" && req.method !== "HEAD") {
        body = await new Promise((resolve, reject) => {
          const chunks: Buffer[] = [];
          req.on("data", (chunk) => chunks.push(chunk));
          req.on("end", () => resolve(Buffer.concat(chunks)));
          req.on("error", reject);
        });
      }

      const request = new Request(url, {
        method: req.method,
        headers: req.headers as HeadersInit,
        body: body && body.length > 0 ? body : undefined,
      });

      const response = await fetch(request);
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(await response.text());
    } catch (error) {
      console.error("Server error:", error);
      res.writeHead(500, { "content-type": "text/html; charset=utf-8" });
      res.end(renderErrorPage());
    }
  });

  server.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
    console.log(`📁 Serving static assets from: ${clientDir}`);
    
    // Verify directory exists
    if (fs.existsSync(clientDir)) {
      const assets = fs.readdirSync(clientDir);
      console.log(`📦 Found directories: ${assets.join(", ")}`);
      
      if (fs.existsSync(path.join(clientDir, "assets"))) {
        const files = fs.readdirSync(path.join(clientDir, "assets"));
        console.log(`📄 Assets available: ${files.length} files`);
      }
    } else {
      console.error(`❌ ERROR: Client directory does not exist: ${clientDir}`);
      console.error(`   Make sure you've run: npm run build`);
    }
  });

  // Handle graceful shutdown for Railway/Docker
  process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully...");
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  });

  process.on("SIGINT", () => {
    console.log("SIGINT received, shutting down gracefully...");
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  });
}