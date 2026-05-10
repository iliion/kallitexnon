import { createFileRoute } from "@tanstack/react-router";

const CALENDLY_URL = "https://calendly.com/your-handle/workshop"; // TODO: replace with real link

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Κράτηση — Καλλιτέχνον Ποιώ" },
      { name: "description", content: "Κάντε κράτηση για ένα από τα εργαστήρια του Καλλιτέχνον Ποιώ." },
      { property: "og:title", content: "Κράτηση — Καλλιτέχνον Ποιώ" },
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
          Επιλέξτε ημερομηνία και ώρα από το ημερολόγιο. Θα λάβετε αυτόματη επιβεβαίωση στο email σας.
        </p>
      </header>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <iframe
          src={CALENDLY_URL}
          title="Ημερολόγιο κράτησης Calendly"
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
