import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-[var(--mint)]/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <h2 className="font-display text-xl">Καλλιτέχνον Ποιώ</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Δημιουργικό εργαστήρι τέχνης στο Βέλο Κορινθίας.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Πλοήγηση</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link to="/workshops" className="hover:text-primary">Εργαστήρια</Link></li>
            <li><Link to="/about" className="hover:text-primary">Σχετικά</Link></li>
            <li><Link to="/booking" className="hover:text-primary">Κράτηση</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Επικοινωνία</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Επικοινωνία</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden /> Βέλο, Κορινθία</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" aria-hidden /> info@example.gr</li>
            <li className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-primary"><Instagram className="h-5 w-5" /></a>
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-primary"><Facebook className="h-5 w-5" /></a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Καλλιτέχνον Ποιώ. Όλα τα δικαιώματα διατηρούνται.
      </div>
    </footer>
  );
}
