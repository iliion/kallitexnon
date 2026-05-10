import { jsxs, jsx } from "react/jsx-runtime";
import { MapPin, Mail, Phone, Instagram, Facebook } from "lucide-react";
import { useState } from "react";
function ContactPage() {
  const [sent, setSent] = useState(false);
  function onSubmit(e) {
    e.preventDefault();
    setSent(true);
  }
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 py-16", children: [
    /* @__PURE__ */ jsxs("header", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-primary", children: "Επικοινωνία" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display text-4xl md:text-5xl", children: "Πείτε μας ένα γεια" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-foreground/80", children: "Έχετε ερωτήσεις; Θέλετε προσωποποιημένο εργαστήρι ή πάρτι γενεθλίων; Στείλτε μας μήνυμα." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 grid gap-10 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsx("form", { onSubmit, className: "rounded-2xl bg-card p-6 shadow-card md:p-8", "aria-label": "Φόρμα επικοινωνίας", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-sm font-medium", children: "Όνομα" }),
          /* @__PURE__ */ jsx("input", { id: "name", name: "name", required: true, autoComplete: "name", className: "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 focus-visible:ring-2 focus-visible:ring-ring" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium", children: "Email" }),
          /* @__PURE__ */ jsx("input", { id: "email", name: "email", type: "email", required: true, autoComplete: "email", className: "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 focus-visible:ring-2 focus-visible:ring-ring" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "message", className: "block text-sm font-medium", children: "Μήνυμα" }),
          /* @__PURE__ */ jsx("textarea", { id: "message", name: "message", rows: 5, required: true, className: "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 focus-visible:ring-2 focus-visible:ring-ring" })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90", children: "Αποστολή μηνύματος" }),
        sent && /* @__PURE__ */ jsx("p", { role: "status", className: "text-sm text-primary", children: "Ευχαριστούμε! Θα επικοινωνήσουμε σύντομα μαζί σας." })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 rounded-2xl bg-[var(--mint)]/30 p-6", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "mt-1 h-5 w-5 text-primary", "aria-hidden": true }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Διεύθυνση" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground/80", children: "Βέλο, Κορινθία" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Mail, { className: "mt-1 h-5 w-5 text-primary", "aria-hidden": true }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Email" }),
              /* @__PURE__ */ jsx("a", { href: "mailto:info@example.gr", className: "text-sm text-foreground/80 hover:text-primary", children: "info@example.gr" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Phone, { className: "mt-1 h-5 w-5 text-primary", "aria-hidden": true }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Τηλέφωνο" }),
              /* @__PURE__ */ jsx("a", { href: "tel:+302700000000", className: "text-sm text-foreground/80 hover:text-primary", children: "+30 27000 00000" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-4 pt-2", children: [
            /* @__PURE__ */ jsx("a", { href: "https://instagram.com", "aria-label": "Instagram", className: "text-primary hover:opacity-80", children: /* @__PURE__ */ jsx(Instagram, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsx("a", { href: "https://facebook.com", "aria-label": "Facebook", className: "text-primary hover:opacity-80", children: /* @__PURE__ */ jsx(Facebook, { className: "h-6 w-6" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 overflow-hidden rounded-2xl border border-border shadow-card", children: /* @__PURE__ */ jsx("iframe", { title: "Χάρτης - Βέλο Κορινθίας", "aria-label": "Χάρτης Google για το Βέλο Κορινθίας", src: "https://www.google.com/maps?q=Velo+Corinthia+Greece&output=embed", className: "h-72 w-full border-0", loading: "lazy" }) })
      ] })
    ] })
  ] });
}
export {
  ContactPage as component
};
