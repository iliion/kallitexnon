import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { u as useStore, a as getAnnouncements, g as getWorkshops } from "./workshops-store-BN6NBv-r.js";
import { ArrowRight, BookOpen, Sparkles, Palette } from "lucide-react";
import "react";
const heroImg = "/assets/hero-CoMSC2Ty.jpg";
function HomePage() {
  const announcements = useStore(getAnnouncements);
  const workshops = useStore(getWorkshops).filter((w) => !w.past).slice(0, 3);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "hero-gradient", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-primary", children: "Βέλο Κορινθίας" }),
        /* @__PURE__ */ jsxs("h1", { className: "mt-3 font-display text-4xl leading-tight md:text-6xl", children: [
          "Καλώς ήρθατε στον κόσμο του ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Καλλιτέχνον Ποιώ" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-xl text-lg text-foreground/80", children: "Εδώ, η τέχνη γίνεται εμπειρία. Θεματικά εικαστικά workshops για όλες τις ηλικίες — ιστορία, αφήγηση και δημιουργία σε έναν χώρο." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/booking", className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-soft transition hover:scale-[1.02] hover:bg-primary/90", children: [
            "Κράτηση Τώρα ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": true })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/workshops", className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/60 px-6 py-3 font-semibold text-primary hover:bg-background", children: "Δείτε τα εργαστήρια" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("img", { src: heroImg, alt: "Εργαστήρι τέχνης με πινέλα, παλέτες και χρώματα σε παστέλ τόνους", width: 1600, height: 1024, className: "aspect-[4/3] w-full rounded-3xl object-cover shadow-soft" }),
        /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "absolute -bottom-4 -left-4 hidden h-24 w-24 rounded-full bg-[var(--warm-yellow)] md:block" }),
        /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "absolute -top-4 -right-4 hidden h-20 w-20 rounded-full bg-[var(--mint)] md:block" })
      ] })
    ] }) }),
    announcements.length > 0 && /* @__PURE__ */ jsx("section", { "aria-label": "Ανακοινώσεις", className: "border-b border-border/60 bg-[var(--warm-yellow)]/40", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 py-4 text-center text-sm", children: [
      /* @__PURE__ */ jsx("span", { className: "mr-2 font-semibold", children: "📣 Ανακοίνωση:" }),
      announcements[0].text
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-6xl px-4 py-20", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl md:text-4xl", children: "Η προσέγγισή μας" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-2xl text-foreground/80", children: "Συνδυάζουμε αρμονικά τρεις πυλώνες σε κάθε εργαστήρι." }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-6 md:grid-cols-3", children: [{
        icon: BookOpen,
        title: "Ιστορία της Τέχνης",
        text: "Γνωρίζουμε καλλιτέχνες, έργα και ρεύματα που άφησαν το αποτύπωμά τους.",
        bg: "var(--lavender)"
      }, {
        icon: Sparkles,
        title: "Αφήγηση",
        text: "Αντλούμε έμπνευση από ιστορίες, σύμβολα και παραμύθια.",
        bg: "var(--mint)"
      }, {
        icon: Palette,
        title: "Δημιουργία",
        text: "Πειραματιζόμαστε με υλικά και τεχνικές, δίνουμε μορφή στις ιδέες μας.",
        bg: "var(--warm-yellow)"
      }].map((p) => /* @__PURE__ */ jsxs("article", { className: "rounded-2xl bg-card p-6 shadow-card", children: [
        /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "grid h-12 w-12 place-items-center rounded-xl", style: {
          backgroundColor: p.bg
        }, children: /* @__PURE__ */ jsx(p.icon, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-4 font-display text-xl", children: p.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-foreground/80", children: p.text })
      ] }, p.title)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-[var(--mint)]/30", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 py-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl md:text-4xl", children: "Τρέχοντα Εργαστήρια" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-foreground/80", children: "Επιλέξτε την εμπειρία που σας ταιριάζει." })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/workshops", className: "hidden text-sm font-semibold text-primary hover:underline md:inline", children: "Όλα τα εργαστήρια →" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-6 md:grid-cols-3", children: workshops.map((w) => /* @__PURE__ */ jsxs("article", { className: "overflow-hidden rounded-2xl bg-card shadow-card", children: [
        /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] w-full bg-[var(--lavender)]/40", children: w.image ? /* @__PURE__ */ jsx("img", { src: w.image, alt: w.imageAlt, className: "h-full w-full object-cover", loading: "lazy" }) : /* @__PURE__ */ jsx("div", { className: "grid h-full place-items-center text-primary/60", children: /* @__PURE__ */ jsx(Palette, { className: "h-12 w-12", "aria-hidden": true }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: w.date }),
          /* @__PURE__ */ jsx("h3", { className: "mt-1 font-display text-xl", children: w.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-3 text-sm text-foreground/80", children: w.description }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-primary", children: w.price }),
            /* @__PURE__ */ jsx(Link, { to: "/booking", className: "text-sm font-semibold text-primary hover:underline", children: "Κράτηση →" })
          ] })
        ] })
      ] }, w.id)) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-4xl px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl md:text-4xl", children: "Η φιλοσοφία μας" }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg text-foreground/80", children: "Πιστεύουμε πως μέσα σε κάθε άνθρωπο υπάρχει ένας δημιουργός που περιμένει τον κατάλληλο χώρο και το κατάλληλο ερέθισμα για να εκφραστεί." }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-foreground/80", children: "Στο Καλλιτέχνον Ποιώ, η τέχνη γίνεται αφορμή για γνώση, χαρά, φαντασία και προσωπική έκφραση." }),
      /* @__PURE__ */ jsx(Link, { to: "/about", className: "mt-8 inline-flex rounded-full border border-primary/30 px-6 py-3 font-semibold text-primary hover:bg-accent", children: "Μάθετε περισσότερα" })
    ] })
  ] });
}
export {
  HomePage as component
};
