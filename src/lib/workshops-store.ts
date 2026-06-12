// Simple JSON-based store using localStorage. Client-only.
export type Workshop = {
  id: string;
  title: string;
  date: string; // ISO or free text
  description: string;
  image: string; // URL or data URL
  imageAlt: string;
  price: string;
  category: "kids" | "birthday" | "adults" | "art-history" | "other";
  past?: boolean;
};

export type Announcement = {
  id: string;
  text: string;
  createdAt: string;
};

const WORKSHOPS_KEY = "kp_workshops_v1";
const ANN_KEY = "kp_announcements_v1";

const seed: Workshop[] = [
  {
    id: "w1",
    title: "Εικαστικά & Ιστορικά Εργαστήρια",
    date: "",
    description:
      "Η τέχνη συναντά την ιστορία της. Εμπνεόμαστε από Βαν Γκογκ, Μοντριάν, Φρίντα Κάλο και δημιουργούμε τα δικά μας έργα.",
    image: "",
    imageAlt: "Παιδιά ζωγραφίζουν στο εργαστήρι",
    price: "",
    category: "art-history",
  },
  {
    id: "w2",
    title: "Γενέθλια μέσα από την Τέχνη",
    date: "",
    description:
      "Ένα μοναδικό πάρτι: το παιδί και οι φίλοι του δημιουργούν μαζί έργα τέχνης μέσα από διαδραστικά τεχνο-ιστορικά παιχνίδια.",
    image: "",
    imageAlt: "Παιδικό πάρτι γενεθλίων με τέχνη",
    price: "",
    category: "birthday",
  },
  {
    id: "w3",
    title: "Βραδιές Τέχνης για Ενηλίκους",
    date: "",
    description:
      "Σε χαλαρή ατμόσφαιρα, με ένα ποτήρι κρασί, δημιουργούμε μαζί. 18+, χωρίς όριο ηλικίας.",
    image: "",
    imageAlt: "Ενήλικες ζωγραφίζουν σε βραδιά τέχνης",
    price: "",
    category: "adults",
  },
];

const seedAnn: Announcement[] = [
  {
    id: "a1",
    text: "Τα εργαστήρια κάθε μήνα ανανεώνονται — δείτε τις τρέχουσες θεματικές και κρατήστε τη θέση σας!",
    createdAt: new Date().toISOString(),
  },
];

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    if (!v) return fallback;
    return JSON.parse(v) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, val: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(val));
  window.dispatchEvent(new CustomEvent("kp-store-change"));
}

export function getWorkshops(): Workshop[] {
  const list = read<Workshop[] | null>(WORKSHOPS_KEY, null);
  if (!list) {
    write(WORKSHOPS_KEY, seed);
    return seed;
  }
  return list;
}

export function saveWorkshops(list: Workshop[]) {
  write(WORKSHOPS_KEY, list);
}

export function upsertWorkshop(w: Workshop) {
  const list = getWorkshops();
  const idx = list.findIndex((x) => x.id === w.id);
  if (idx >= 0) list[idx] = w;
  else list.push(w);
  saveWorkshops(list);
}

export function deleteWorkshop(id: string) {
  saveWorkshops(getWorkshops().filter((w) => w.id !== id));
}

export function moveToPast(id: string, past: boolean) {
  const list = getWorkshops().map((w) => (w.id === id ? { ...w, past } : w));
  saveWorkshops(list);
}

export function getAnnouncements(): Announcement[] {
  const list = read<Announcement[] | null>(ANN_KEY, null);
  if (!list) {
    write(ANN_KEY, seedAnn);
    return seedAnn;
  }
  return list;
}

export function saveAnnouncements(list: Announcement[]) {
  write(ANN_KEY, list);
}

export function newId() {
  return Math.random().toString(36).slice(2, 10);
}
