import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Αρχική" },
  { to: "/workshops", label: "Εργαστήρια" },
  { to: "/about", label: "Σχετικά" },
  { to: "/booking", label: "Κράτηση" },
  { to: "/contact", label: "Επικοινωνία" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (r) => r.location.pathname });

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2" aria-label="Αρχική σελίδα">
          <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full bg-[var(--lavender)] text-primary font-display text-lg">Κ</span>
          <span className="font-display text-lg leading-tight">
            Καλλίτεχνον <span className="text-primary">Ποιώ</span>
          </span>
        </Link>

        <nav aria-label="Κύρια πλοήγηση" className="hidden md:flex items-center gap-1">
          {nav.map((n) => {
            const active = path === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${active ? "text-primary font-semibold" : "text-foreground/80"}`}
                aria-current={active ? "page" : undefined}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border"
          aria-label={open ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav aria-label="Πλοήγηση κινητού" className="md:hidden border-t border-border bg-background">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-base hover:bg-accent"
                  aria-current={path === n.to ? "page" : undefined}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
