import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
  Link,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteIntro } from "@/components/SiteIntro";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-primary">404</h1>
        <p className="mt-4 text-lg">Η σελίδα δεν βρέθηκε.</p>
        <Link to="/" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
          Επιστροφή στην αρχική
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Κάτι πήγε στραβά</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Δοκιμάστε ξανά
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Καλλίτεχνον Ποιώ — Εργαστήρι Τέχνης στο Βέλο Κορινθίας" },
      { name: "description", content: "Δημιουργικό εργαστήρι τέχνης στο Βέλο Κορινθίας. Εικαστικά workshops, παιδικά πάρτι γενεθλίων, βραδιές τέχνης για ενηλίκους." },
      { property: "og:title", content: "Καλλίτεχνον Ποιώ" },
      { property: "og:description", content: "Η τέχνη γίνεται εμπειρία." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el">
      <head>
        <script src="https://cdn.userway.org/widget.js" data-account="Ii9jhLERVY"></script>
      <script
  dangerouslySetInnerHTML={{
    __html: `
      (function () {
        var GA_ID = 'G-ZZDHP6MVT4';
        var CONSENT_KEY = 'kallitexnon-analytics-consent';
        var INTRO_KEY = 'kallitexnon-intro-seen';

        function loadAnalytics() {
          if (window.__kallitexnonGaLoaded) return;
          window.__kallitexnonGaLoaded = true;

          window.dataLayer = window.dataLayer || [];
          window.gtag = function () {
            window.dataLayer.push(arguments);
          };

          window.gtag('js', new Date());
          window.gtag('config', GA_ID);

          var script = document.createElement('script');
          script.async = true;
          script.src =
            'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
          document.head.appendChild(script);
        }

        function showConsent() {
          if (document.getElementById('analytics-consent')) return;

          var box = document.createElement('div');
          box.id = 'analytics-consent';
          box.style.cssText =
            'position:fixed;left:16px;right:16px;bottom:16px;' +
            'max-width:650px;margin:auto;padding:18px;' +
            'background:#fff;color:#111;border-radius:12px;' +
            'box-shadow:0 5px 25px rgba(0,0,0,.25);z-index:999999;';

          box.innerHTML =
            '<strong>Cookies & Στατιστικά</strong>' +
            '<p style="margin:8px 0 14px;">Χρησιμοποιούμε προαιρετικά στατιστικά cookies για να καταλαβαίνουμε πώς χρησιμοποιείται η ιστοσελίδα και να τη βελτιώνουμε.</p>' +
            '<button id="accept-analytics" style="padding:9px 14px;margin-right:8px;cursor:pointer;">Αποδοχή</button>' +
            '<button id="decline-analytics" style="padding:9px 14px;cursor:pointer;">Μόνο απαραίτητα</button>';

          document.body.appendChild(box);

          document.getElementById('accept-analytics').onclick = function () {
            localStorage.setItem(CONSENT_KEY, 'accepted');
            box.remove();
            loadAnalytics();
          };

          document.getElementById('decline-analytics').onclick = function () {
            localStorage.setItem(CONSENT_KEY, 'declined');
            box.remove();
          };
        }

        function startConsent() {
          var choice = localStorage.getItem(CONSENT_KEY);

          if (choice === 'accepted') {
            loadAnalytics();
            return;
          }

          if (choice === 'declined') return;

          var timer = setInterval(function () {
            if (sessionStorage.getItem(INTRO_KEY) === 'true') {
              clearInterval(timer);
              setTimeout(showConsent, 800);
            }
          }, 250);
        }

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', startConsent);
        } else {
          startConsent();
        }
      })();
    `,
  }}
></script>
        <HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const path = useRouterState({ select: (r) => r.location.pathname });
  const isAdmin = path.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        Μετάβαση στο περιεχόμενο
      </a>
      {!isAdmin && <SiteIntro />}
      {!isAdmin && <SiteHeader />}
      <main id="main">
        <Outlet />
      </main>
      {!isAdmin && <SiteFooter />}
    </QueryClientProvider>
  );
}
