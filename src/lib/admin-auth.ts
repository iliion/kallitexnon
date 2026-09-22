export async function isAdminLoggedIn(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const response = await fetch("/api/admin/session", { cache: "no-store" });
    return response.ok;
  } catch {
    return false;
  }
}

export async function loginAdmin(password: string): Promise<boolean> {
  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function logoutAdmin() {
  try {
    await fetch("/api/admin/logout", { method: "POST" });
  } catch {
    // If the request fails, reloading still leaves the server to re-check the cookie.
  }
}
