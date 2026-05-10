import { jsxs, jsx } from "react/jsx-runtime";
const CALENDLY_URL = "https://calendly.com/your-handle/workshop";
function BookingPage() {
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 py-16", children: [
    /* @__PURE__ */ jsxs("header", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-primary", children: "Κράτηση" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display text-4xl md:text-5xl", children: "Κρατήστε τη θέση σας" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-foreground/80", children: "Επιλέξτε ημερομηνία και ώρα από το ημερολόγιο. Θα λάβετε αυτόματη επιβεβαίωση στο email σας." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-card", children: /* @__PURE__ */ jsx("iframe", { src: CALENDLY_URL, title: "Ημερολόγιο κράτησης Calendly", "aria-label": "Ημερολόγιο κράτησης", className: "h-[750px] w-full border-0" }) }),
    /* @__PURE__ */ jsxs("p", { className: "mt-6 text-sm text-muted-foreground", children: [
      "Δεν λειτουργεί το ημερολόγιο; Επικοινωνήστε μαζί μας στη ",
      /* @__PURE__ */ jsx("a", { href: "/contact", className: "text-primary hover:underline", children: "σελίδα επικοινωνίας" }),
      "."
    ] })
  ] });
}
export {
  BookingPage as component
};
