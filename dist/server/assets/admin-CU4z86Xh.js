import { jsx, jsxs } from "react/jsx-runtime";
import { useRouterState, useNavigate, Link, Outlet } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
const ADMIN_PASSWORD = "kalitexnon2025";
const KEY = "kp_admin_session";
function isAdminLoggedIn() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY) === "1";
}
function loginAdmin(password) {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(KEY, "1");
    return true;
  }
  return false;
}
function logoutAdmin() {
  localStorage.removeItem(KEY);
}
function AdminLayout() {
  const [authed, setAuthed] = useState(null);
  const path = useRouterState({
    select: (r) => r.location.pathname
  });
  const navigate = useNavigate();
  useEffect(() => {
    setAuthed(isAdminLoggedIn());
  }, []);
  if (authed === null) return /* @__PURE__ */ jsx("div", { className: "p-8", children: "Φόρτωση…" });
  if (!authed) return /* @__PURE__ */ jsx(LoginScreen, { onSuccess: () => setAuthed(true) });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-muted/30", children: [
    /* @__PURE__ */ jsx("header", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-3", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "font-display text-lg", children: [
        "Καλλιτέχνον Ποιώ ",
        /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "/ admin" })
      ] }),
      /* @__PURE__ */ jsxs("nav", { "aria-label": "Διαχείριση", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Link, { to: "/admin", className: `rounded-md px-3 py-1.5 text-sm ${path === "/admin" ? "bg-accent" : ""}`, children: "Εργαστήρια" }),
        /* @__PURE__ */ jsx(Link, { to: "/admin/announcements", className: `rounded-md px-3 py-1.5 text-sm ${path.startsWith("/admin/announcements") ? "bg-accent" : ""}`, children: "Ανακοινώσεις" }),
        /* @__PURE__ */ jsxs("button", { onClick: () => {
          logoutAdmin();
          setAuthed(false);
          navigate({
            to: "/admin"
          });
        }, className: "ml-2 inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent", children: [
          /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4", "aria-hidden": true }),
          " Αποσύνδεση"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
function LoginScreen({
  onSuccess
}) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  return /* @__PURE__ */ jsx("div", { className: "grid min-h-screen place-items-center bg-[var(--lavender)]/30 px-4", children: /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
    e.preventDefault();
    if (loginAdmin(pw)) onSuccess();
    else setErr("Λάθος κωδικός");
  }, className: "w-full max-w-sm rounded-2xl bg-card p-8 shadow-soft", "aria-label": "Σύνδεση διαχειριστή", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl", children: "Διαχείριση" }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Εισάγετε τον κωδικό για να συνεχίσετε." }),
    /* @__PURE__ */ jsx("label", { htmlFor: "pw", className: "mt-6 block text-sm font-medium", children: "Κωδικός" }),
    /* @__PURE__ */ jsx("input", { id: "pw", type: "password", autoComplete: "current-password", value: pw, onChange: (e) => setPw(e.target.value), className: "mt-1 w-full rounded-md border border-input bg-background px-3 py-2", required: true }),
    err && /* @__PURE__ */ jsx("p", { role: "alert", className: "mt-2 text-sm text-destructive", children: err }),
    /* @__PURE__ */ jsx("button", { type: "submit", className: "mt-4 w-full rounded-md bg-primary py-2 font-semibold text-primary-foreground hover:bg-primary/90", children: "Σύνδεση" })
  ] }) });
}
export {
  AdminLayout as component
};
