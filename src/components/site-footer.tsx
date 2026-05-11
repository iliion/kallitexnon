import { Link } from "@tanstack/react-router";
import imgPartner from "@/assets/footer_logos_el.svg?url";
import { Instagram, Facebook, Mail, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-[var(--mint)]/30">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left: About & Links */}
          <div>
            <h2 className="font-display text-xl">Καλλίτεχνον Ποιώ</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Δημιουργικό εργαστήρι τέχνης στο Βέλο Κορινθίας.
            </p>
          </div>

          {/* Center: Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">Πλοήγηση</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li><Link to="/workshops" className="hover:text-primary">Εργαστήρια</Link></li>
              <li><Link to="/about" className="hover:text-primary">Σχετικά</Link></li>
              <li><Link to="/booking" className="hover:text-primary">Κράτηση</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Επικοινωνία</Link></li>
            </ul>
          </div>

          {/* Right: Contact & Logo Placeholder */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">Επικοινωνία</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden /> Βέλο, Κορινθία</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" aria-hidden /> kallitexnon.poio@gmail.com</li>
              <li className="flex items-center gap-3 pt-2">
                <a href="https://www.instagram.com/kallitechnon_poio/" aria-label="Instagram" className="hover:text-primary"><Instagram className="h-5 w-5" /></a>
                <a href="https://facebook.com" aria-label="Facebook" className="hover:text-primary"><Facebook className="h-5 w-5" /></a>
              </li>
            </ul>
          </div>
        </div>

        {/* Logo Row - Full Width */}
        <div className="mt-8 border-t border-border/60 pt-8">
          <img
            src={imgPartner}
            alt="Partner organization logo"
            className="max-w-xl h-auto mx-auto"
            loading="lazy"
          />
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Καλλίτεχνον Ποιώ. Όλα τα δικαιώματα διατηρούνται.
      </div>
    </footer>
  );
}