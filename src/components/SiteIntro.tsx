import { useEffect, useRef, useState } from "react";

const INTRO_KEY = "kallitechnon-intro-seen";

export function SiteIntro() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [muted, setMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(INTRO_KEY);

    if (alreadySeen) return;

    setVisible(true);

    // Δοκιμάζουμε να ενεργοποιήσουμε τον ήχο.
    // Αν ο browser δεν το επιτρέψει, το βίντεο συνεχίζει χωρίς ήχο
    // και ο επισκέπτης μπορεί να πατήσει το κουμπί "Ήχος".
    setTimeout(async () => {
      const video = videoRef.current;
      if (!video) return;

      try {
        video.muted = false;
        await video.play();
        setMuted(false);
      } catch {
        video.muted = true;
        setMuted(true);
        await video.play().catch(() => {});
      }
    }, 300);
  }, []);

  function finishIntro() {
    sessionStorage.setItem(INTRO_KEY, "true");
    setFading(true);

    setTimeout(() => {
      setVisible(false);
    }, 700);
  }

  async function enableSound() {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    setMuted(false);

    try {
      await video.play();
    } catch {
      // Αν ο browser μπλοκάρει τον ήχο,
      // θα παραμείνει διαθέσιμο το κουμπί.
    }
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#f7f3ed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fading ? 0 : 1,
        transition: "opacity 700ms ease",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted={muted}
        playsInline
        preload="auto"
        onEnded={finishIntro}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      >
        <source
          src="/kallitechnon-intro-full-audio-clean.mp4"
          type="video/mp4"
        />
      </video>

      {muted && (
        <button
          type="button"
          onClick={enableSound}
          style={{
            position: "absolute",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            border: "1px solid rgba(0,0,0,0.12)",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.88)",
            padding: "10px 18px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          🔊 Πατήστε για ήχο
        </button>
      )}

      <button
        type="button"
        onClick={finishIntro}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          border: "none",
          background: "rgba(255,255,255,0.75)",
          borderRadius: "999px",
          padding: "9px 15px",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        Παράλειψη ›
      </button>
    </div>
  );
}
