import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { useStore } from "@/lib/use-store";
import { getAnnouncements, getWorkshops } from "@/lib/workshops-store";
import { Sparkles, Palette, BookOpen, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Καλλιτέχνον Ποιώ — Η τέχνη γίνεται εμπειρία" },
      { name: "description", content: "Καλώς ήρθατε στον κόσμο του Καλλιτέχνον Ποιώ. Δημιουργικό εργαστήρι τέχνης στο Βέλο Κορινθίας." },
      { property: "og:title", content: "Καλλιτέχνον Ποιώ" },
      { property: "og:description", content: "Η τέχνη γίνεται εμπειρία." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const announcements = useStore(getAnnouncements);
  const workshops = useStore(getWorkshops).filter((w) => !w.past).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Βέλο Κορινθίας</p>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-6xl">
              Καλώς ήρθατε στον κόσμο του <span className="text-primary">Καλλιτέχνον Ποιώ</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-foreground/80">
              Εδώ, η τέχνη γίνεται εμπειρία. Θεματικά εικαστικά workshops για όλες τις ηλικίες — ιστορία, αφήγηση και δημιουργία σε έναν χώρο.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-soft transition hover:scale-[1.02] hover:bg-primary/90">
                Κράτηση Τώρα <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link to="/workshops" className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/60 px-6 py-3 font-semibold text-primary hover:bg-background">
                Δείτε τα εργαστήρια
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Εργαστήρι τέχνης με πινέλα, παλέτες και χρώματα σε παστέλ τόνους"
              width={1600}
              height={1024}
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft"
            />
            <div aria-hidden className="absolute -bottom-4 -left-4 hidden h-24 w-24 rounded-full bg-[var(--warm-yellow)] md:block" />
            <div aria-hidden className="absolute -top-4 -right-4 hidden h-20 w-20 rounded-full bg-[var(--mint)] md:block" />
          </div>
        </div>
      </section>

      {/* Announcements */}
      {announcements.length > 0 && (
        <section aria-label="Ανακοινώσεις" className="border-b border-border/60 bg-[var(--warm-yellow)]/40">
          <div className="mx-auto max-w-6xl px-4 py-4 text-center text-sm">
            <span className="mr-2 font-semibold">📣 Ανακοίνωση:</span>
            {announcements[0].text}
          </div>
        </section>
      )}

      {/* Three pillars */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="font-display text-3xl md:text-4xl">Η προσέγγισή μας</h2>
        <p className="mt-2 max-w-2xl text-foreground/80">Συνδυάζουμε αρμονικά τρεις πυλώνες σε κάθε εργαστήρι.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: BookOpen, title: "Ιστορία της Τέχνης", text: "Γνωρίζουμε καλλιτέχνες, έργα και ρεύματα που άφησαν το αποτύπωμά τους.", bg: "var(--lavender)" },
            { icon: Sparkles, title: "Αφήγηση", text: "Αντλούμε έμπνευση από ιστορίες, σύμβολα και παραμύθια.", bg: "var(--mint)" },
            { icon: Palette, title: "Δημιουργία", text: "Πειραματιζόμαστε με υλικά και τεχνικές, δίνουμε μορφή στις ιδέες μας.", bg: "var(--warm-yellow)" },
          ].map((p) => (
            <article key={p.title} className="rounded-2xl bg-card p-6 shadow-card">
              <div aria-hidden className="grid h-12 w-12 place-items-center rounded-xl" style={{ backgroundColor: p.bg }}>
                <p.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-display text-xl">{p.title}</h3>
              <p className="mt-2 text-sm text-foreground/80">{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Featured workshops */}
      <section className="bg-[var(--mint)]/30">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl md:text-4xl">Τρέχοντα Εργαστήρια</h2>
              <p className="mt-2 text-foreground/80">Επιλέξτε την εμπειρία που σας ταιριάζει.</p>
            </div>
            <Link to="/workshops" className="hidden text-sm font-semibold text-primary hover:underline md:inline">Όλα τα εργαστήρια →</Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {workshops.map((w) => (
              <article key={w.id} className="overflow-hidden rounded-2xl bg-card shadow-card">
                <div className="aspect-[4/3] w-full bg-[var(--lavender)]/40">
                  {w.image ? (
                    <img src={w.image} alt={w.imageAlt} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="grid h-full place-items-center text-primary/60"><Palette className="h-12 w-12" aria-hidden /></div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{w.date}</p>
                  <h3 className="mt-1 font-display text-xl">{w.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-foreground/80">{w.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-semibold text-primary">{w.price}</span>
                    <Link to="/booking" className="text-sm font-semibold text-primary hover:underline">Κράτηση →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy CTA */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="font-display text-3xl md:text-4xl">Η φιλοσοφία μας</h2>
        <p className="mt-6 text-lg text-foreground/80">
          Πιστεύουμε πως μέσα σε κάθε άνθρωπο υπάρχει ένας δημιουργός που περιμένει τον κατάλληλο χώρο και το κατάλληλο ερέθισμα για να εκφραστεί.
        </p>
        <p className="mt-4 text-lg text-foreground/80">
          Στο Καλλιτέχνον Ποιώ, η τέχνη γίνεται αφορμή για γνώση, χαρά, φαντασία και προσωπική έκφραση.
        </p>
        <Link to="/about" className="mt-8 inline-flex rounded-full border border-primary/30 px-6 py-3 font-semibold text-primary hover:bg-accent">
          Μάθετε περισσότερα
        </Link>
      </section>
    </>
  );
}
