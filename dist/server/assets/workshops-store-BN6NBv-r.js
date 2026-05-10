import { useState, useEffect } from "react";
function useStore(read2) {
  const [val, setVal] = useState(() => read2());
  useEffect(() => {
    setVal(read2());
    const handler = () => setVal(read2());
    window.addEventListener("kp-store-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("kp-store-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return val;
}
const WORKSHOPS_KEY = "kp_workshops_v1";
const ANN_KEY = "kp_announcements_v1";
const seed = [
  {
    id: "w1",
    title: "Εικαστικά & Ιστορικά Εργαστήρια",
    date: "Κάθε Σάββατο, 11:00",
    description: "Η τέχνη συναντά την ιστορία της. Εμπνεόμαστε από Βαν Γκογκ, Μοντριάν, Φρίντα Κάλο και δημιουργούμε τα δικά μας έργα.",
    image: "",
    imageAlt: "Παιδιά ζωγραφίζουν στο εργαστήρι",
    price: "20€",
    category: "art-history"
  },
  {
    id: "w2",
    title: "Γενέθλια μέσα από την Τέχνη",
    date: "Κατόπιν συνεννόησης",
    description: "Ένα μοναδικό πάρτι: το παιδί και οι φίλοι του δημιουργούν μαζί έργα τέχνης μέσα από διαδραστικά τεχνο-ιστορικά παιχνίδια.",
    image: "",
    imageAlt: "Παιδικό πάρτι γενεθλίων με τέχνη",
    price: "από 180€",
    category: "birthday"
  },
  {
    id: "w3",
    title: "Βραδιές Τέχνης για Ενηλίκους",
    date: "Κάθε Παρασκευή, 20:00",
    description: "Σε χαλαρή ατμόσφαιρα, με ένα ποτήρι κρασί, δημιουργούμε μαζί. 18+, χωρίς όριο ηλικίας.",
    image: "",
    imageAlt: "Ενήλικες ζωγραφίζουν σε βραδιά τέχνης",
    price: "25€",
    category: "adults"
  }
];
const seedAnn = [
  {
    id: "a1",
    text: "Νέος κύκλος εργαστηρίων ξεκινά τον Σεπτέμβρη — κρατήστε τη θέση σας!",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  }
];
function read(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    if (!v) return fallback;
    return JSON.parse(v);
  } catch {
    return fallback;
  }
}
function write(key, val) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(val));
  window.dispatchEvent(new CustomEvent("kp-store-change"));
}
function getWorkshops() {
  const list = read(WORKSHOPS_KEY, null);
  if (!list) {
    write(WORKSHOPS_KEY, seed);
    return seed;
  }
  return list;
}
function saveWorkshops(list) {
  write(WORKSHOPS_KEY, list);
}
function upsertWorkshop(w) {
  const list = getWorkshops();
  const idx = list.findIndex((x) => x.id === w.id);
  if (idx >= 0) list[idx] = w;
  else list.push(w);
  saveWorkshops(list);
}
function deleteWorkshop(id) {
  saveWorkshops(getWorkshops().filter((w) => w.id !== id));
}
function moveToPast(id, past) {
  const list = getWorkshops().map((w) => w.id === id ? { ...w, past } : w);
  saveWorkshops(list);
}
function getAnnouncements() {
  const list = read(ANN_KEY, null);
  if (!list) {
    write(ANN_KEY, seedAnn);
    return seedAnn;
  }
  return list;
}
function saveAnnouncements(list) {
  write(ANN_KEY, list);
}
function newId() {
  return Math.random().toString(36).slice(2, 10);
}
export {
  getAnnouncements as a,
  upsertWorkshop as b,
  deleteWorkshop as d,
  getWorkshops as g,
  moveToPast as m,
  newId as n,
  saveAnnouncements as s,
  useStore as u
};
