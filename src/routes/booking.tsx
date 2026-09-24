import { createFileRoute } from "@tanstack/react-router";

const CALENDLY_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd_V9NxTCfhu0uBML1BmWQ0oY1ssnU9_pGL0ZLDP0IxpzZ4gQ/viewform?usp=publish-editor?embedded=true"; // TODO: replace with real link

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Κράτηση — Καλλίτεχνον Ποιώ" },
      { name: "description", content: "Κάντε κράτηση για ένα από τα εργαστήρια του Καλλίτεχνον Ποιώ." },
      { property: "og:title", content: "Κράτηση — Καλλίτεχνον Ποιώ" },
      { property: "og:description", content: "Επιλέξτε ημερομηνία και ώρα." },
    ],
  }),
  component: BookingPage,
});

function BookingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Κράτηση</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Κρατήστε τη θέση σας</h1>
        <p className="mt-4 text-lg text-foreground/80">
          Συμπληρώστε τη φόρμα ενδιαφέροντος και θα επικοινωνήσουμε μαζί σας για επιβεβαίωση διαθεσιμότητας και θέσης.
        </p>
      </header>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <iframe
          src={CALENDLY_URL}
         title="Φόρμα κράτησης"
          aria-label="Ημερολόγιο κράτησης"
          className="h-[750px] w-full border-0"
        />
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Δεν λειτουργεί το ημερολόγιο; Επικοινωνήστε μαζί μας στη <a href="/contact" className="text-primary hover:underline">σελίδα επικοινωνίας</a>.
      </p>
    </div>
  );
}
