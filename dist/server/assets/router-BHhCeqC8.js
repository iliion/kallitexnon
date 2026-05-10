import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useRouterState, Link, createRootRouteWithContext, useRouter, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { X, Menu, MapPin, Mail, Instagram, Facebook } from "lucide-react";
const appCss = "/assets/styles-DJMyoKCl.css";
const nav = [
  { to: "/", label: "Αρχική" },
  { to: "/workshops", label: "Εργαστήρια" },
  { to: "/about", label: "Σχετικά" },
  { to: "/booking", label: "Κράτηση" },
  { to: "/contact", label: "Επικοινωνία" }
];
function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (r) => r.location.pathname });
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", "aria-label": "Αρχική σελίδα", children: [
        /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "grid h-9 w-9 place-items-center rounded-full bg-[var(--lavender)] text-primary font-display text-lg", children: "Κ" }),
        /* @__PURE__ */ jsxs("span", { className: "font-display text-lg leading-tight", children: [
          "Καλλιτέχνον ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Ποιώ" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("nav", { "aria-label": "Κύρια πλοήγηση", className: "hidden md:flex items-center gap-1", children: nav.map((n) => {
        const active = path === n.to;
        return /* @__PURE__ */ jsx(
          Link,
          {
            to: n.to,
            className: `rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${active ? "text-primary font-semibold" : "text-foreground/80"}`,
            "aria-current": active ? "page" : void 0,
            children: n.label
          },
          n.to
        );
      }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border",
          "aria-label": open ? "Κλείσιμο μενού" : "Άνοιγμα μενού",
          "aria-expanded": open,
          onClick: () => setOpen((v) => !v),
          children: open ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
        }
      )
    ] }),
    open && /* @__PURE__ */ jsx("nav", { "aria-label": "Πλοήγηση κινητού", className: "md:hidden border-t border-border bg-background", children: /* @__PURE__ */ jsx("ul", { className: "mx-auto max-w-6xl px-4 py-2", children: nav.map((n) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      Link,
      {
        to: n.to,
        onClick: () => setOpen(false),
        className: "block rounded-md px-3 py-3 text-base hover:bg-accent",
        "aria-current": path === n.to ? "page" : void 0,
        children: n.label
      }
    ) }, n.to)) }) })
  ] });
}
function SiteFooter() {
  return /* @__PURE__ */ jsxs("footer", { className: "mt-24 border-t border-border bg-[var(--mint)]/30", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-xl", children: "Καλλιτέχνον Ποιώ" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Δημιουργικό εργαστήρι τέχνης στο Βέλο Κορινθίας." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold uppercase tracking-wide", children: "Πλοήγηση" }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-2 space-y-1 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/workshops", className: "hover:text-primary", children: "Εργαστήρια" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", className: "hover:text-primary", children: "Σχετικά" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/booking", className: "hover:text-primary", children: "Κράτηση" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contact", className: "hover:text-primary", children: "Επικοινωνία" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold uppercase tracking-wide", children: "Επικοινωνία" }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-2 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4", "aria-hidden": true }),
            " Βέλο, Κορινθία"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4", "aria-hidden": true }),
            " info@example.gr"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 pt-2", children: [
            /* @__PURE__ */ jsx("a", { href: "https://instagram.com", "aria-label": "Instagram", className: "hover:text-primary", children: /* @__PURE__ */ jsx(Instagram, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsx("a", { href: "https://facebook.com", "aria-label": "Facebook", className: "hover:text-primary", children: /* @__PURE__ */ jsx(Facebook, { className: "h-5 w-5" }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-border/60 py-4 text-center text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Καλλιτέχνον Ποιώ. Όλα τα δικαιώματα διατηρούνται."
    ] })
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-[60vh] items-center justify-center px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-7xl text-primary", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg", children: "Η σελίδα δεν βρέθηκε." }),
    /* @__PURE__ */ jsx(Link, { to: "/", className: "mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90", children: "Επιστροφή στην αρχική" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-[60vh] items-center justify-center px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl", children: "Κάτι πήγε στραβά" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          router.invalidate();
          reset();
        },
        className: "mt-6 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90",
        children: "Δοκιμάστε ξανά"
      }
    )
  ] }) });
}
const Route$8 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Καλλιτέχνον Ποιώ — Εργαστήρι Τέχνης στο Βέλο Κορινθίας" },
      { name: "description", content: "Δημιουργικό εργαστήρι τέχνης στο Βέλο Κορινθίας. Εικαστικά workshops, παιδικά πάρτι γενεθλίων, βραδιές τέχνης για ενηλίκους." },
      { property: "og:title", content: "Καλλιτέχνον Ποιώ" },
      { property: "og:description", content: "Η τέχνη γίνεται εμπειρία." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "el", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$8.useRouteContext();
  const path = useRouterState({ select: (r) => r.location.pathname });
  const isAdmin = path.startsWith("/admin");
  return /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx("a", { href: "#main", className: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground", children: "Μετάβαση στο περιεχόμενο" }),
    !isAdmin && /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsx("main", { id: "main", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    !isAdmin && /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
const $$splitComponentImporter$7 = () => import("./workshops-BGJapxN9.js");
const Route$7 = createFileRoute("/workshops")({
  head: () => ({
    meta: [{
      title: "Εργαστήρια — Καλλιτέχνον Ποιώ"
    }, {
      name: "description",
      content: "Τρέχοντα και προηγούμενα εικαστικά εργαστήρια: παιδιά, γενέθλια, βραδιές τέχνης για ενηλίκους."
    }, {
      property: "og:title",
      content: "Εργαστήρια — Καλλιτέχνον Ποιώ"
    }, {
      property: "og:description",
      content: "Όλα τα εικαστικά μας workshops."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./contact-CDGHZbxB.js");
const Route$6 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Επικοινωνία — Καλλιτέχνον Ποιώ"
    }, {
      name: "description",
      content: "Επικοινωνήστε με το Καλλιτέχνον Ποιώ. Βέλο Κορινθίας."
    }, {
      property: "og:title",
      content: "Επικοινωνία — Καλλιτέχνον Ποιώ"
    }, {
      property: "og:description",
      content: "Στείλτε μας μήνυμα."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./booking-3W55MrI_.js");
const Route$5 = createFileRoute("/booking")({
  head: () => ({
    meta: [{
      title: "Κράτηση — Καλλιτέχνον Ποιώ"
    }, {
      name: "description",
      content: "Κάντε κράτηση για ένα από τα εργαστήρια του Καλλιτέχνον Ποιώ."
    }, {
      property: "og:title",
      content: "Κράτηση — Καλλιτέχνον Ποιώ"
    }, {
      property: "og:description",
      content: "Επιλέξτε ημερομηνία και ώρα."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin-CU4z86Xh.js");
const Route$4 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Διαχείριση — Καλλιτέχνον Ποιώ"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./about-Bs9FL2R6.js");
const Route$3 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "Σχετικά — Καλλιτέχνον Ποιώ"
    }, {
      name: "description",
      content: "Η ιστορία και η φιλοσοφία του Καλλιτέχνον Ποιώ. Δημιουργικό εργαστήρι τέχνης στο Βέλο Κορινθίας."
    }, {
      property: "og:title",
      content: "Σχετικά — Καλλιτέχνον Ποιώ"
    }, {
      property: "og:description",
      content: "Η ιστορία και η φιλοσοφία του Καλλιτέχνον Ποιώ."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-ClT6znOo.js");
const Route$2 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Καλλιτέχνον Ποιώ — Η τέχνη γίνεται εμπειρία"
    }, {
      name: "description",
      content: "Καλώς ήρθατε στον κόσμο του Καλλιτέχνον Ποιώ. Δημιουργικό εργαστήρι τέχνης στο Βέλο Κορινθίας."
    }, {
      property: "og:title",
      content: "Καλλιτέχνον Ποιώ"
    }, {
      property: "og:description",
      content: "Η τέχνη γίνεται εμπειρία."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.index-ZOaZ8UAN.js");
const Route$1 = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.announcements-B42WtdDT.js");
const Route = createFileRoute("/admin/announcements")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const WorkshopsRoute = Route$7.update({
  id: "/workshops",
  path: "/workshops",
  getParentRoute: () => Route$8
});
const ContactRoute = Route$6.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$8
});
const BookingRoute = Route$5.update({
  id: "/booking",
  path: "/booking",
  getParentRoute: () => Route$8
});
const AdminRoute = Route$4.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$8
});
const AboutRoute = Route$3.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$8
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const AdminIndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const AdminAnnouncementsRoute = Route.update({
  id: "/announcements",
  path: "/announcements",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminAnnouncementsRoute,
  AdminIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AdminRoute: AdminRouteWithChildren,
  BookingRoute,
  ContactRoute,
  WorkshopsRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
