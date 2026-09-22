import "./lib/error-capture";

import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request) => Promise<Response> | Response;
};

type Workshop = {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  imageAlt: string;
  price: string;
  category: "kids" | "birthday" | "adults" | "art-history" | "other";
  past?: boolean;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
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

  if (!payload || Array.isArray(payload) || typeof payload !== "object") return false;
  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) return false;
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
  if (!isCatastrophicSsrErrorBody(body, response.status)) return response;
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

export default { fetch };

function json(data: unknown, status = 200, headers?: HeadersInit) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...headers },
  });
}

function supabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !secret) {
    throw new Error(
      "Λείπει το SUPABASE_SECRET_KEY στο Railway. Το VITE_SUPABASE_URL πρέπει επίσης να υπάρχει.",
    );
  }
  return { url: url.replace(/\/$/, ""), secret };
}

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

function expectedSessionToken() {
  const secret = sessionSecret();
  if (!secret) return "";
  return crypto.createHmac("sha256", secret).update("kallitexnon-admin").digest("hex");
}

function parseCookies(header: string | null) {
  const out: Record<string, string> = {};
  for (const part of (header ?? "").split(";")) {
    const i = part.indexOf("=");
    if (i > -1) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function isAdminRequest(request: Request) {
  const token = parseCookies(request.headers.get("cookie")).kp_admin_session ?? "";
  const expected = expectedSessionToken();
  if (!token || !expected || token.length !== expected.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

function adminCookie(token: string, maxAge: number) {
  return `kp_admin_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${maxAge}`;
}

async function supabaseFetch(urlPath: string, init: RequestInit = {}) {
  const { url, secret } = supabaseConfig();
  const headers = new Headers(init.headers);
  headers.set("apikey", secret);
  headers.set("authorization", `Bearer ${secret}`);
  return fetch(`${url}${urlPath}`, { ...init, headers });
}

async function findWorkshopTable(): Promise<"workshops" | "workshop"> {
  const configured = process.env.SUPABASE_WORKSHOPS_TABLE?.trim();
  const candidates = configured ? [configured] : ["workshops", "workshop"];
  let lastError = "";
  for (const name of candidates) {
    const r = await supabaseFetch(`/rest/v1/${encodeURIComponent(name)}?select=id&limit=1`);
    if (r.ok) return name as "workshops" | "workshop";
    lastError = await r.text();
  }
  throw new Error(
    `Δεν βρέθηκε ο πίνακας workshops/workshop στο Supabase. ${lastError}`,
  );
}

async function loadWorkshopSnapshot(): Promise<Workshop[]> {
  const table = await findWorkshopTable();
  const r = await supabaseFetch(
    `/rest/v1/${encodeURIComponent(table)}?select=id,data,created_at&order=created_at.desc&limit=1`,
    { headers: { accept: "application/json" } },
  );
  if (!r.ok) throw new Error(await r.text());
  const rows = (await r.json()) as Array<{ data?: unknown }>;
  if (!rows.length || !Array.isArray(rows[0]?.data)) return [];
  return rows[0].data as Workshop[];
}

function dataUrlToUpload(image: string) {
  const match = /^data:([^;]+);base64,(.+)$/s.exec(image);
  if (!match) return null;
  const mime = match[1];
  const bytes = Buffer.from(match[2], "base64");
  const ext =
    mime === "image/png" ? "png" :
    mime === "image/webp" ? "webp" :
    mime === "image/gif" ? "gif" :
    mime === "image/svg+xml" ? "svg" : "jpg";
  return { mime, bytes, ext };
}

function safeId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 80) || "workshop";
}

async function uploadDataUrl(image: string, workshopId: string): Promise<string> {
  const parsed = dataUrlToUpload(image);
  if (!parsed) return image;
  const { url } = supabaseConfig();
  const bucket = process.env.SUPABASE_WORKSHOP_BUCKET || "workshop-images";
  const objectName = `${safeId(workshopId)}-${Date.now()}.${parsed.ext}`;
  const objectPath = `${encodeURIComponent(bucket)}/${encodeURIComponent(objectName)}`;
  const r = await supabaseFetch(`/storage/v1/object/${objectPath}`, {
    method: "POST",
    headers: {
      "content-type": parsed.mime,
      "x-upsert": "true",
    },
    body: parsed.bytes,
  });
  if (!r.ok) throw new Error(`Αποτυχία ανεβάσματος εικόνας: ${await r.text()}`);
  return `${url}/storage/v1/object/public/${encodeURIComponent(bucket)}/${encodeURIComponent(objectName)}`;
}

async function normalizeWorkshopImages(list: Workshop[]) {
  const normalized: Workshop[] = [];
  for (const item of list) {
    normalized.push({
      ...item,
      image: item.image?.startsWith("data:image/")
        ? await uploadDataUrl(item.image, item.id)
        : item.image,
    });
  }
  return normalized;
}

async function saveWorkshopSnapshot(list: Workshop[]) {
  const table = await findWorkshopTable();
  const normalized = await normalizeWorkshopImages(list);
  const r = await supabaseFetch(`/rest/v1/${encodeURIComponent(table)}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      prefer: "return=minimal",
    },
    body: JSON.stringify({ data: normalized }),
  });
  if (!r.ok) throw new Error(await r.text());
  return normalized;
}

async function handleApi(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/")) return null;

  try {
    if (url.pathname === "/api/admin/login" && request.method === "POST") {
      const configured = process.env.ADMIN_PASSWORD;
      if (!configured) return json({ error: "Λείπει το ADMIN_PASSWORD στο Railway." }, 500);
      const body = (await request.json()) as { password?: string };
      if (body.password !== configured) return json({ error: "Λάθος κωδικός" }, 401);
      const token = expectedSessionToken();
      if (!token) return json({ error: "Λείπει το SUPABASE_SECRET_KEY στο Railway." }, 500);
      return json(
        { ok: true },
        200,
        { "set-cookie": adminCookie(token, 60 * 60 * 12), "cache-control": "no-store" },
      );
    }

    if (url.pathname === "/api/admin/logout" && request.method === "POST") {
      return json({ ok: true }, 200, { "set-cookie": adminCookie("", 0), "cache-control": "no-store" });
    }

    if (url.pathname === "/api/admin/session" && request.method === "GET") {
      return isAdminRequest(request)
        ? json({ ok: true }, 200, { "cache-control": "no-store" })
        : json({ ok: false }, 401, { "cache-control": "no-store" });
    }

    if (url.pathname === "/api/workshops" && request.method === "GET") {
      const workshops = await loadWorkshopSnapshot();
      return json({ workshops }, 200, { "cache-control": "no-store" });
    }

    if (url.pathname === "/api/workshops" && request.method === "POST") {
      if (!isAdminRequest(request)) return json({ error: "Μη εξουσιοδοτημένη πρόσβαση" }, 401);
      const body = (await request.json()) as { workshops?: Workshop[] };
      if (!Array.isArray(body.workshops)) return json({ error: "Μη έγκυρα δεδομένα" }, 400);
      const workshops = await saveWorkshopSnapshot(body.workshops);
      return json({ workshops }, 200, { "cache-control": "no-store" });
    }

    return json({ error: "Not found" }, 404);
  } catch (error) {
    console.error("API error", error);
    return json(
      { error: error instanceof Error ? error.message : "Άγνωστο σφάλμα" },
      500,
      { "cache-control": "no-store" },
    );
  }
}

if (import.meta.env.PROD) {
  const port = process.env.PORT || 3000;

  async function serveStaticFile(pathname: string): Promise<Response | null> {
    try {
      const filePath = path.join(clientDir, pathname);
      const normalizedPath = path.normalize(filePath);
      const normalizedBase = path.normalize(clientDir);
      if (!normalizedPath.startsWith(normalizedBase)) return null;
      if (!fs.existsSync(filePath)) return null;
      const stat = fs.statSync(filePath);
      if (!stat.isFile()) return null;
      const content = fs.readFileSync(filePath);
      const mimeType = getMimeType(filePath);
      return new Response(content, {
        status: 200,
        headers: {
          "content-type": mimeType,
          "cache-control": pathname.includes(".")
            ? "public, max-age=31536000, immutable"
            : "public, max-age=0, must-revalidate",
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

      const apiResponse = await handleApi(request);
      if (apiResponse) {
        res.writeHead(apiResponse.status, Object.fromEntries(apiResponse.headers));
        const buffer = await apiResponse.arrayBuffer();
        res.end(Buffer.from(buffer));
        return;
      }

      const staticResponse = await serveStaticFile(pathname);
      if (staticResponse) {
        const headers = Object.fromEntries(staticResponse.headers);
        res.writeHead(staticResponse.status, headers);
        const buffer = await staticResponse.arrayBuffer();
        res.end(Buffer.from(buffer));
        return;
      }

      if (pathname.startsWith("/assets/")) {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Asset not found");
        return;
      }

      const response = await fetch(request);
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(Buffer.from(await response.arrayBuffer()));
    } catch (error) {
      console.error("Server error:", error);
      res.writeHead(500, { "content-type": "text/html; charset=utf-8" });
      res.end(renderErrorPage());
    }
  });

  server.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
    console.log(`📁 Serving static assets from: ${clientDir}`);
  });

  process.on("SIGTERM", () => {
    server.close(() => process.exit(0));
  });
  process.on("SIGINT", () => {
    server.close(() => process.exit(0));
  });
}
