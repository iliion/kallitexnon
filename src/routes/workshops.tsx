import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/use-store";
import { getWorkshops } from "@/lib/workshops-store";
import { Palette } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/workshops")({
  head: () => ({
    meta: [
      { title: "Εργαστήρια — Καλλίτεχνον Ποιώ" },
      { name: "description", content: "Τρέχοντα και προηγούμενα εικαστικά εργαστήρια: παιδιά, γενέθλια, βραδιές τέχνης για ενηλίκους." },
      { property: "og:title", content: "Εργαστήρια — Καλλίτεχνον Ποιώ" },
      { property: "og:description", content: "Όλα τα εικαστικά μας workshops." },
    ],
  }),
  component: WorkshopsPage,
});

const categories = [
  { id: "all", label: "Όλα" },
  { id: "art-history", label: "Εικαστικά & Ιστορικά" },
  { id: "birthday", label: "Γενέθλια" },
  { id: "adults", label: "Βραδιές Ενηλίκων" },
  { id: "kids", label: "Παιδικά" },
] as const;

function WorkshopsPage() {
  const all = useStore(getWorkshops);
  const [filter, setFilter] = useState<string>("all");
  const current = all.filter((w) => !w.past && (filter === "all" || w.category === filter));
  const past = all.filter((w) => w.past);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <header className="max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl">Τα εργαστήριά μας</h1>
        <p className="mt-4 text-lg text-foreground/80">
          Στο Καλλίτεχνον Ποιώ, η τέχνη δεν σταματά στη ζωγραφική. Δημιουργούμε με πηλό, decoupage, κατασκευές και συνδυασμούς υλικών — κάθε εργαστήρι προσαρμόζεται στις ανάγκες και το επίπεδο του καθενός.
        </p>
      </header>

      {/* Filter */}
      <div role="group" aria-label="Φίλτρο κατηγοριών" className="mt-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            aria-pressed={filter === c.id}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === c.id ? "bg-primary text-primary-foreground" : "bg-card text-foreground/80 hover:bg-accent"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Current */}
      <section aria-labelledby="current" className="mt-10">
        <h2 id="current" className="font-display text-2xl">Τρέχοντα</h2>
        {current.length === 0 ? (
          <p className="mt-4 text-muted-foreground">Δεν υπάρχουν εργαστήρια σε αυτή την κατηγορία.</p>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {current.map((w) => (
              <article key={w.id} className="overflow-hidden rounded-2xl bg-card shadow-card transition-transform hover:-translate-y-1">
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
                  <p className="mt-2 text-sm text-foreground/80">{w.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-semibold text-primary">{w.price}</span>
                    <Link to="/booking" className="text-sm font-semibold text-primary hover:underline">Κράτηση →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Past */}
      {past.length > 0 && (
        <section aria-labelledby="past" className="mt-16">
          <h2 id="past" className="font-display text-2xl">Προηγούμενα Εργαστήρια</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {past.map((w) => (
              <figure key={w.id} className="overflow-hidden rounded-xl bg-card shadow-card">
                <div className="aspect-square w-full bg-[var(--mint)]/40">
                  {w.image ? (
                    <img src={w.image} alt={w.imageAlt} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="grid h-full place-items-center text-primary/60"><Palette className="h-10 w-10" aria-hidden /></div>
                  )}
                </div>
                <figcaption className="p-3">
                  <p className="font-display text-base">{w.title}</p>
                  <p className="text-xs text-muted-foreground">{w.date}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
