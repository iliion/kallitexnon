import { createFileRoute } from "@tanstack/react-router";
import { SiInstagram, SiFacebook, SiTiktok, SiGmail, SiGooglemaps, SiWhatsapp } from '@icons-pack/react-simple-icons';
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

      <div className="mt-12 grid gap-10 lg:grid-cols-1">
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

        <section className="w-full rounded-2xl bg-[var(--lavender)]/50 p-6 md:p-8">
          {/* FAQ Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 id="faq-heading" className="font-display text-3xl md:text-4xl font-tracking-tight text-foreground">
              Συχνές Ερωτήσεις
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Όλα όσα θέλετε να γνωρίζετε για τη συμμετοχή των παιδιών στα εργαστήριά μας.
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-6 max-w-3xl mx-auto">
            
            {/* Question 1 */}
            <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-foreground flex items-start gap-3">
                {/* aria-hidden hides the standalone Greek question mark from screen readers */}
                <span className="text-primary font-serif select-none" aria-hidden="true">;</span>
                <span>Χρειάζεται το παιδί να έχει προηγούμενη εμπειρία ή να ξέρει να ζωγραφίζει;</span>
              </h3>
              <p className="mt-3 pl-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                <strong className="text-foreground font-semibold">Όχι.</strong> Όλα τα εργαστήριά μας είναι πλήρως καθοδηγούμενα και σχεδιασμένα έτσι ώστε να προσαρμόζονται με αγάπη στο επίπεδο και τον ρυθμό κάθε συμμετέχοντα.
              </p>
            </div>

            {/* Question 2 */}
            <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-foreground flex items-start gap-3">
                <span className="text-primary font-serif select-none" aria-hidden="true">;</span>
                <span>Τα υλικά περιλαμβάνονται στην τιμή;</span>
              </h3>
              <p className="mt-3 pl-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                <strong className="text-foreground font-semibold">Ναι, απόλυτα.</strong> Όλα τα βασικά και εξειδικευμένα υλικά (χρώματα, πηλός, καμβάδες, πινέλα κ.λπ.) παρέχονται εξολοκλήρου από εμάς. Το παιδί έρχεται μόνο με τη δημιουργικότητά του!
              </p>
            </div>

            {/* Question 3 */}
            <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-foreground flex items-start gap-3">
                <span className="text-primary font-serif select-none" aria-hidden="true">;</span>
                <span>Πόση ώρα διαρκεί ένα εργαστήριο;</span>
              </h3>
              <p className="mt-3 pl-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                Η συνήθης διάρκεια είναι <strong className="text-foreground font-semibold">2 ώρες</strong>, εκτός αν αναφέρεται διαφορετικά στην περιγραφή του συγκεκριμένου σεμιναρίου. Είναι ο ιδανικός χρόνος για να ολοκληρωθεί ένα έργο χωρίς να κουραστούν τα παιδιά.
              </p>
            </div>

            {/* Question 4 */}
            <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-foreground flex items-start gap-3">
                <span className="text-primary font-serif select-none" aria-hidden="true">;</span>
                <span>Πώς γίνεται η κράτηση θέσης;</span>
              </h3>
              <p className="mt-3 pl-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                Η κράτηση γίνεται εύκολα με ένα <strong className="text-foreground font-semibold">μήνυμα ή μέσω της φόρμας επικοινωνίας</strong> μας. Λόγω των ολιγομελών τμημάτων, θα ακολουθήσει άμεση επιβεβαίωση διαθεσιμότητας από εμάς.
              </p>
            </div>

            {/* Question 5 */}
            <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-foreground flex items-start gap-3">
                <span className="text-primary font-serif select-none" aria-hidden="true">;</span>
                <span>Χρειάζεται να παραμείνουν οι γονείς στον χώρο κατά τη διάρκεια;</span>
              </h3>
              <p className="mt-3 pl-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                Όχι απαραίτητα. Τα παιδιά απασχολούνται δημιουργικά με πλήρη επίβλεψη, οπότε μπορείτε να αξιοποιήσετε αυτόν τον χρόνο για τον εαυτό σας, εκτός αν πρόκειται για ειδικά εργαστήρια κοινής δημιουργίας (γονέα-παιδιού).
              </p>
            </div>

          </div>
        </section>

        {/* Info + map */}
        <div>
          <ul className="space-y-4 rounded-2xl bg-[var(--mint)]/30 p-6">
            <li className="flex items-start gap-3">
              <a href="https://g.page" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-primary group">
                <SiGooglemaps className="mt-1 h-5 w-5 text-primary group-hover:text-primary" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-foreground">Διεύθυνση</p>
                  <p className="text-sm text-foreground/80 group-hover:text-primary">Βέλο, Κορινθία</p>
                </div>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <SiGmail className="mt-1 h-5 w-5 text-primary" aria-hidden="true" />
              <div>
                <p className="font-semibold">Email</p>
                <a href="mailto:kallitechnon.poio@gmail.com" className="text-sm text-foreground/80 hover:text-primary">kallitechnon.poio@gmail.com</a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <SiWhatsapp className="mt-1 h-5 w-5 text-primary" aria-hidden="true" />
              <div>
                <p className="font-semibold">Τηλέφωνο</p>
                <a href="tel:+302700000000" className="text-sm text-foreground/80 hover:text-primary">+30 6971620173</a>
              </div>
            </li>
            <li className="flex items-center gap-4 pt-2">
              <a href="https://www.instagram.com/kallitechnon_poio" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-primary hover:opacity-80">
                <SiInstagram className="h-6 w-6" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61582011255187" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-primary hover:opacity-80">
                <SiFacebook className="h-6 w-6" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-primary hover:opacity-80">
                <SiTiktok className="h-6 w-6" />
              </a>
            </li>
          </ul>

          <div className="mt-6 overflow-hidden rounded-2xl border border-border shadow-card">
            <iframe
              title="Χάρτης - Βέλο Κορινθίας"
              aria-label="Χάρτης Google για το Βέλο Κορινθίας"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.1106874673665!2d22.7607028!3d37.9745461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a00d30233a6795%3A0x936773d3785fedbb!2zzprOsc67zrvOr8-EzrXPh869zr_OvSDOoM6_zrnPjg!5e0!3m2!1sen!2sgr!4v1780833093085!5m2!1sen!2sgr"
              className="h-72 w-full border-0"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
