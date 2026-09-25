import { useEffect, useState } from "react";

const GA_ID = "G-ZZDHP6WVT4";
const CONSENT_KEY = "kallitexnon-analytics-consent";
const INTRO_KEY = "kallitexnon-intro-seen";
const INTRO_EVENT = "kallitexnon:intro-finished";

type ConsentChoice = "accepted" | "declined" | null;

function loadAnalytics() {
  if (typeof window === "undefined") return;

  const w = window as any;

  w[`ga-disable-${GA_ID}`] = false;

  if (w.__kallitexnonGaLoaded) return;
  w.__kallitexnonGaLoaded = true;

  w.dataLayer = w.dataLayer || [];
  w.gtag = function () {
    w.dataLayer.push(arguments);
  };

  w.gtag("js", new Date());
  w.gtag("config", GA_ID);

  const script = document.createElement("script");
  script.id = "google-analytics-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

  document.head.appendChild(script);
}

function disableAnalytics() {
  if (typeof window === "undefined") return;

  const w = window as any;
  w[`ga-disable-${GA_ID}`] = true;

  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();

    if (name.startsWith("_ga")) {
      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie =
        `${name}=; Max-Age=0; path=/; domain=.` +
        location.hostname.replace(/^www\./, "");
    }
  });
}

export function CookieConsent() {
  const [introFinished, setIntroFinished] = useState(false);
  const [choice, setChoice] = useState<ConsentChoice>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const savedChoice = localStorage.getItem(
      CONSENT_KEY
    ) as ConsentChoice;

    setChoice(savedChoice);

    if (savedChoice === "accepted") {
      loadAnalytics();
    }

    const introAlreadyFinished =
      sessionStorage.getItem(INTRO_KEY) === "true";

    if (introAlreadyFinished) {
      setIntroFinished(true);
    }

    const handleIntroFinished = () => {
      setTimeout(() => {
        setIntroFinished(true);
      }, 800);
    };

    window.addEventListener(INTRO_EVENT, handleIntroFinished);

    return () => {
      window.removeEventListener(
        INTRO_EVENT,
        handleIntroFinished
      );
    };
  }, []);

  function acceptAnalytics() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setChoice("accepted");
    setShowSettings(false);
    loadAnalytics();
  }

  function declineAnalytics() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setChoice("declined");
    setShowSettings(false);
    disableAnalytics();
  }

  if (!introFinished) return null;

  if (choice && !showSettings) {
    return (
      <button
        type="button"
        onClick={() => setShowSettings(true)}
        style={{
          position: "fixed",
          left: 12,
          bottom: 12,
          zIndex: 99998,
          padding: "7px 10px",
          borderRadius: 8,
          border: "1px solid #999",
          background: "#ffffff",
          color: "#222222",
          cursor: "pointer",
          fontSize: 12,
        }}
      >
        Ρυθμίσεις cookies
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 99999,
        maxWidth: 680,
        margin: "0 auto",
        padding: 18,
        borderRadius: 14,
        background: "#ffffff",
        color: "#222222",
        boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
      }}
    >
      <div
        style={{
          fontSize: 17,
          fontWeight: 700,
          marginBottom: 8,
        }}
      >
        Cookies & Στατιστικά
      </div>

      <div
        style={{
          fontSize: 14,
          lineHeight: 1.5,
          marginBottom: 14,
        }}
      >
        Χρησιμοποιούμε προαιρετικά στατιστικά cookies για να
        καταλαβαίνουμε πώς χρησιμοποιείται η ιστοσελίδα και να τη
        βελτιώνουμε. Μπορείτε να επιλέξετε αν θέλετε να επιτρέψετε
        τη χρήση τους.
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={acceptAnalytics}
          style={{
            padding: "10px 15px",
            border: 0,
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Αποδοχή στατιστικών
        </button>

        <button
          type="button"
          onClick={declineAnalytics}
          style={{
            padding: "10px 15px",
            border: "1px solid #777",
            borderRadius: 8,
            cursor: "pointer",
            background: "#ffffff",
          }}
        >
          Μόνο απαραίτητα
        </button>
      </div>
    </div>
  );
}
