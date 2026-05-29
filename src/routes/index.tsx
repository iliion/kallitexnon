import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/banner.png";
import { useStore } from "@/lib/use-store";
import { getAnnouncements, getWorkshops } from "@/lib/workshops-store";
import { Sparkles, Palette, BookOpen, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Καλλίτεχνον Ποιώ — Η τέχνη γίνεται εμπειρία" },
      { name: "description", content: "Καλώς ήρθατε στον κόσμο του Καλλίτεχνον Ποιώ. Δημιουργικό εργαστήρι τέχνης στο Βέλο Κορινθίας." },
      { property: "og:title", content: "Καλλίτεχνον Ποιώ" },
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
              Καλώς ήρθατε στον κόσμο του <span className="text-primary">Καλλίτεχνον Ποιώ</span>
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
        <p className="mt-2 max-w-2xl text-foreground/80">
          Στο <strong>Καλλίτεχνον Ποιώ</strong>, κάθε εργαστήριο σχεδιάζεται ως μια μικρή εμπειρία τέχνης.
          Δεν ξεκινάμε μόνο από μια κατασκευή, αλλά από μια ιδέα, έναν καλλιτέχνη, μια ιστορία, έναν πολιτισμό ή ένα συναίσθημα.
          Συνδυάζουμε την <strong>ιστορία της τέχνης</strong>, την <strong>αφήγηση</strong> και τη <strong>δημιουργία</strong>, ώστε οι συμμετέχοντες να γνωρίζουν, να φαντάζονται και να εκφράζονται μέσα από τα υλικά.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: BookOpen, title: "Ιστορία της Τέχνης", text: "Γνωρίζουμε καλλιτέχνες, έργα, ρεύματα και πολιτισμούς με τρόπο απλό, ζωντανό και προσιτό. Η ιστορία της τέχνης δεν παρουσιάζεται ως μάθημα, αλλά ως αφετηρία έμπνευσης. Μέσα από εικόνες, σύμβολα, χρώματα και ιστορίες, οι συμμετέχοντες ανακαλύπτουν πώς η τέχνη συνδέεται με τον άνθρωπο, την εποχή και τον τρόπο που βλέπουμε τον κόσμο.", bg: "var(--lavender)" },
            { icon: Sparkles, title: "Αφήγηση", text: "Κάθε θεματική αποκτά ζωή μέσα από την αφήγηση. Μια ιστορία, ένας μύθος, ένα έργο τέχνης ή η ζωή ενός καλλιτέχνη γίνεται η γέφυρα ανάμεσα στη γνώση και στη φαντασία. Έτσι, οι συμμετέχοντες δεν δημιουργούν μηχανικά, αλλά μπαίνουν στο κλίμα του εργαστηρίου και καταλαβαίνουν το νόημα πίσω από αυτό που φτιάχνουν.", bg: "var(--mint)" },
            { icon: Palette, title: "Δημιουργία", text: "Η δημιουργία είναι το σημείο όπου η ιδέα γίνεται προσωπικό έργο. Με ζωγραφική, πηλό, decoupage, κολλάζ, ύφασμα, ξύλο, πέτρα και μεικτές τεχνικές, οι συμμετέχοντες πειραματίζονται, επιλέγουν, συνθέτουν και εκφράζονται. Η διαδικασία είναι καθοδηγούμενη, αλλά αφήνει χώρο στη φαντασία και στη μοναδικότητα κάθε έργου.", bg: "var(--warm-yellow)" },
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
          {/* Workshop Feature Image */}
          <img
            src={heroImg}
            alt="Εικαστικό εργαστήριο όπου παιδιά και ενήλικες δημιουργούν έργα εμπνευσμένα από διάσημους ζωγράφους"
            width={1600}
            height={1024}
            className="aspect-[4/3] md:aspect-[21/9] w-full rounded-3xl object-cover shadow-soft"
          />
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

      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32 text-center" aria-labelledby="why-choose-us-heading">
        {/* Header Section */}
        <div className="max-w-2xl mx-auto mb-16 space-y-4">
          <h2 id="why-choose-us-heading" className="font-display text-4xl md:text-5xl font-tracking-tight text-foreground">
            Γιατί να επιλέξετε το <span className="text-primary font-serif italic">Καλλίτεχνον Ποιώ</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Εδώ η τέχνη δεν είναι απλώς μάθημα· είναι τρόπος έκφρασης, σύνδεσης και δημιουργίας.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-left">
          
          {/* Point 1 */}
          <div className="group relative flex flex-col justify-between p-6 rounded-2xl bg-card border border-border/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div>
              {/* aria-hidden="true" stops screen readers from reading the decorative number */}
              <span className="font-serif text-3xl font-light text-primary/40 select-none" aria-hidden="true">01</span>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground tracking-tight">Ολιγομελή Τμήματα</h3>
              {/* Removed opacity modifier to guarantee contrast */}
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                Μικρές ομάδες για εξατομικευμένη καθοδήγηση, ουσιαστική σύνδεση και την καλύτερη δυνατή εμπειρία.
              </p>
            </div>
          </div>

          {/* Point 2 */}
          <div className="group relative flex flex-col justify-between p-6 rounded-2xl bg-card border border-border/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div>
              <span className="font-serif text-3xl font-light text-primary/40 select-none" aria-hidden="true">02</span>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground tracking-tight">Τέχνη με Ιστορία</h3>
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                Κάθε εργαστήριο είναι ένα ταξίδι. Συνδέουμε τη δημιουργία με καλλιτέχνες, πολιτισμούς και βαθιές αφηγήσεις.
              </p>
            </div>
          </div>

          {/* Point 3 */}
          <div className="group relative flex flex-col justify-between p-6 rounded-2xl bg-card border border-border/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div>
              <span className="font-serif text-3xl font-light text-primary/40 select-none" aria-hidden="true">03</span>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground tracking-tight">Πολυμορφία Υλικών</h3>
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                Πειραματιζόμαστε με ζωγραφική, πηλό, decoupage, κατασκευές και μεικτές τεχνικές χωρίς περιορισμούς.
              </p>
            </div>
          </div>

          {/* Point 4 */}
          <div className="group relative flex flex-col justify-between p-6 rounded-2xl bg-card border border-border/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div>
              <span className="font-serif text-3xl font-light text-primary/40 select-none" aria-hidden="true">04</span>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground tracking-tight">Βιωματική Εμπειρία</h3>
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                Δεν φεύγετε απλώς με ένα αντικείμενο. Κρατάτε τη χαρά της διαδικασίας, της ανακάλυψης και της δημιουργίας.
              </p>
            </div>
          </div>

        </div>

        {/* Button Section */}
        <div className="mt-16">
          {/* Added explicit focus rings for keyboard navigation users */}
          <Link 
            to="/about" 
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Μάθετε περισσότερα για εμάς
          </Link>
        </div>
      </section>
    </>
  );
}
