// Simple, client-side admin auth. NOT secure — placeholder for a JSON-only setup.
export const ADMIN_PASSWORD = "kalitexnon2025";
const KEY = "kp_admin_session";

export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY) === "1";
}

export function loginAdmin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(KEY, "1");
    return true;
  }
  return false;
}

export function logoutAdmin() {
  localStorage.removeItem(KEY);
}
