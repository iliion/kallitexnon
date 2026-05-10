import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Instagram, Facebook } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Επικοινωνία — Καλλίτεχνον Ποιώ" },
      { name: "description", content: "Επικοινωνήστε με το Καλλίτεχνον Ποιώ. Βέλο Κορινθίας." },
      { property: "og:title", content: "Επικοινωνία — Καλλίτεχνον Ποιώ" },
      { property: "og:description", content: "Στείλτε μας μήνυμα." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Επικοινωνία</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Πείτε μας ένα γεια</h1>
        <p className="mt-4 text-lg text-foreground/80">
          Έχετε ερωτήσεις; Θέλετε προσωποποιημένο εργαστήρι ή πάρτι γενεθλίων; Στείλτε μας μήνυμα.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        {/* Form */}
        <form onSubmit={onSubmit} className="rounded-2xl bg-card p-6 shadow-card md:p-8" aria-label="Φόρμα επικοινωνίας">
          <div className="grid gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Όνομα</label>
              <input id="name" name="name" required autoComplete="name"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 focus-visible:ring-2 focus-visible:ring-ring" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 focus-visible:ring-2 focus-visible:ring-ring" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium">Μήνυμα</label>
              <textarea id="message" name="message" rows={5} required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 focus-visible:ring-2 focus-visible:ring-ring" />
            </div>
            <button type="submit" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90">
              Αποστολή μηνύματος
            </button>
            {sent && (
              <p role="status" className="text-sm text-primary">Ευχαριστούμε! Θα επικοινωνήσουμε σύντομα μαζί σας.</p>
            )}
          </div>
        </form>

        {/* Info + map */}
        <div>
          <ul className="space-y-4 rounded-2xl bg-[var(--mint)]/30 p-6">
            <li className="flex items-start gap-3"><MapPin className="mt-1 h-5 w-5 text-primary" aria-hidden /><div><p className="font-semibold">Διεύθυνση</p><p className="text-sm text-foreground/80">Βέλο, Κορινθία</p></div></li>
            <li className="flex items-start gap-3"><Mail className="mt-1 h-5 w-5 text-primary" aria-hidden /><div><p className="font-semibold">Email</p><a href="mailto:info@example.gr" className="text-sm text-foreground/80 hover:text-primary">info@example.gr</a></div></li>
            <li className="flex items-start gap-3"><Phone className="mt-1 h-5 w-5 text-primary" aria-hidden /><div><p className="font-semibold">Τηλέφωνο</p><a href="tel:+302700000000" className="text-sm text-foreground/80 hover:text-primary">+30 27000 00000</a></div></li>
            <li className="flex items-center gap-4 pt-2">
              <a href="https://instagram.com" aria-label="Instagram" className="text-primary hover:opacity-80"><Instagram className="h-6 w-6" /></a>
              <a href="https://facebook.com" aria-label="Facebook" className="text-primary hover:opacity-80"><Facebook className="h-6 w-6" /></a>
            </li>
          </ul>

          <div className="mt-6 overflow-hidden rounded-2xl border border-border shadow-card">
            <iframe
              title="Χάρτης - Βέλο Κορινθίας"
              aria-label="Χάρτης Google για το Βέλο Κορινθίας"
              src="https://www.google.com/maps?q=Velo+Corinthia+Greece&output=embed"
              className="h-72 w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
