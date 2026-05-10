import { createFileRoute, Outlet, useNavigate, Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isAdminLoggedIn, loginAdmin, logoutAdmin } from "@/lib/admin-auth";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Διαχείριση — Καλλιτέχνον Ποιώ" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const path = useRouterState({ select: (r) => r.location.pathname });
  const navigate = useNavigate();

  useEffect(() => {
    setAuthed(isAdminLoggedIn());
  }, []);

  if (authed === null) return <div className="p-8">Φόρτωση…</div>;

  if (!authed) return <LoginScreen onSuccess={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="font-display text-lg">Καλλιτέχνον Ποιώ <span className="text-sm text-muted-foreground">/ admin</span></Link>
          <nav aria-label="Διαχείριση" className="flex items-center gap-2">
            <Link to="/admin" className={`rounded-md px-3 py-1.5 text-sm ${path === "/admin" ? "bg-accent" : ""}`}>Εργαστήρια</Link>
            <Link to="/admin/announcements" className={`rounded-md px-3 py-1.5 text-sm ${path.startsWith("/admin/announcements") ? "bg-accent" : ""}`}>Ανακοινώσεις</Link>
            <button
              onClick={() => { logoutAdmin(); setAuthed(false); navigate({ to: "/admin" }); }}
              className="ml-2 inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
            >
              <LogOut className="h-4 w-4" aria-hidden /> Αποσύνδεση
            </button>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  return (
    <div className="grid min-h-screen place-items-center bg-[var(--lavender)]/30 px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (loginAdmin(pw)) onSuccess();
          else setErr("Λάθος κωδικός");
        }}
        className="w-full max-w-sm rounded-2xl bg-card p-8 shadow-soft"
        aria-label="Σύνδεση διαχειριστή"
      >
        <h1 className="font-display text-2xl">Διαχείριση</h1>
        <p className="mt-1 text-sm text-muted-foreground">Εισάγετε τον κωδικό για να συνεχίσετε.</p>
        <label htmlFor="pw" className="mt-6 block text-sm font-medium">Κωδικός</label>
        <input
          id="pw"
          type="password"
          autoComplete="current-password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
          required
        />
        {err && <p role="alert" className="mt-2 text-sm text-destructive">{err}</p>}
        <button type="submit" className="mt-4 w-full rounded-md bg-primary py-2 font-semibold text-primary-foreground hover:bg-primary/90">
          Σύνδεση
        </button>
      </form>
    </div>
  );
}
