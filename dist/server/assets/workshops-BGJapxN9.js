import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { u as useStore, g as getWorkshops } from "./workshops-store-BN6NBv-r.js";
import { Palette } from "lucide-react";
import { useState } from "react";
const categories = [{
  id: "all",
  label: "Όλα"
}, {
  id: "art-history",
  label: "Εικαστικά & Ιστορικά"
}, {
  id: "birthday",
  label: "Γενέθλια"
}, {
  id: "adults",
  label: "Βραδιές Ενηλίκων"
}, {
  id: "kids",
  label: "Παιδικά"
}];
function WorkshopsPage() {
  const all = useStore(getWorkshops);
  const [filter, setFilter] = useState("all");
  const current = all.filter((w) => !w.past && (filter === "all" || w.category === filter));
  const past = all.filter((w) => w.past);
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 py-16", children: [
    /* @__PURE__ */ jsxs("header", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl md:text-5xl", children: "Τα εργαστήριά μας" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-foreground/80", children: "Στο Καλλιτέχνον Ποιώ, η τέχνη δεν σταματά στη ζωγραφική. Δημιουργούμε με πηλό, decoupage, κατασκευές και συνδυασμούς υλικών — κάθε εργαστήρι προσαρμόζεται στις ανάγκες και το επίπεδο του καθενός." })
    ] }),
    /* @__PURE__ */ jsx("div", { role: "group", "aria-label": "Φίλτρο κατηγοριών", className: "mt-10 flex flex-wrap gap-2", children: categories.map((c) => /* @__PURE__ */ jsx("button", { onClick: () => setFilter(c.id), "aria-pressed": filter === c.id, className: `rounded-full px-4 py-2 text-sm font-medium transition-colors ${filter === c.id ? "bg-primary text-primary-foreground" : "bg-card text-foreground/80 hover:bg-accent"}`, children: c.label }, c.id)) }),
    /* @__PURE__ */ jsxs("section", { "aria-labelledby": "current", className: "mt-10", children: [
      /* @__PURE__ */ jsx("h2", { id: "current", className: "font-display text-2xl", children: "Τρέχοντα" }),
      current.length === 0 ? /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: "Δεν υπάρχουν εργαστήρια σε αυτή την κατηγορία." }) : /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: current.map((w) => /* @__PURE__ */ jsxs("article", { className: "overflow-hidden rounded-2xl bg-card shadow-card transition-transform hover:-translate-y-1", children: [
        /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] w-full bg-[var(--lavender)]/40", children: w.image ? /* @__PURE__ */ jsx("img", { src: w.image, alt: w.imageAlt, className: "h-full w-full object-cover", loading: "lazy" }) : /* @__PURE__ */ jsx("div", { className: "grid h-full place-items-center text-primary/60", children: /* @__PURE__ */ jsx(Palette, { className: "h-12 w-12", "aria-hidden": true }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: w.date }),
          /* @__PURE__ */ jsx("h3", { className: "mt-1 font-display text-xl", children: w.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-foreground/80", children: w.description }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-primary", children: w.price }),
            /* @__PURE__ */ jsx(Link, { to: "/booking", className: "text-sm font-semibold text-primary hover:underline", children: "Κράτηση →" })
          ] })
        ] })
      ] }, w.id)) })
    ] }),
    past.length > 0 && /* @__PURE__ */ jsxs("section", { "aria-labelledby": "past", className: "mt-16", children: [
      /* @__PURE__ */ jsx("h2", { id: "past", className: "font-display text-2xl", children: "Προηγούμενα Εργαστήρια" }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-4 md:grid-cols-3 lg:grid-cols-4", children: past.map((w) => /* @__PURE__ */ jsxs("figure", { className: "overflow-hidden rounded-xl bg-card shadow-card", children: [
        /* @__PURE__ */ jsx("div", { className: "aspect-square w-full bg-[var(--mint)]/40", children: w.image ? /* @__PURE__ */ jsx("img", { src: w.image, alt: w.imageAlt, className: "h-full w-full object-cover", loading: "lazy" }) : /* @__PURE__ */ jsx("div", { className: "grid h-full place-items-center text-primary/60", children: /* @__PURE__ */ jsx(Palette, { className: "h-10 w-10", "aria-hidden": true }) }) }),
        /* @__PURE__ */ jsxs("figcaption", { className: "p-3", children: [
          /* @__PURE__ */ jsx("p", { className: "font-display text-base", children: w.title }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: w.date })
        ] })
      ] }, w.id)) })
    ] })
  ] });
}
export {
  WorkshopsPage as component
};
