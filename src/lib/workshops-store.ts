import workshop1 from "@/assets/workshop1.png?url";
import workshop2 from "@/assets/workshop2.png?url";
import workshop3 from "@/assets/workshop3.png?url";
import workshop4 from "@/assets/workshop4.png?url";

export type Workshop = {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
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
    id: "w4",
    title: "Κυκλαδίτικο εικαστικό εργαστήρι",
    date: "",
    description:
      "Σε αυτό το εικαστικό εργαστήρι θα ταξιδέψουμε στις Κυκλάδες μέσα από την τέχνη και θα γνωρίσουμε Έλληνες ζωγράφους που εμπνεύστηκαν από το μοναδικό φως, τα χρώματα και την ομορφιά των νησιών μας. Με οδηγό τη φαντασία και τη δημιουργικότητά μας, θα ζωντανέψουμε ένα κυκλαδίτικο τοπίο πάνω σε καμβά, συνδυάζοντας ζωγραφική, υφές και τρισδιάστατα στοιχεία. Η χαρακτηριστική κυκλαδίτικη αρχιτεκτονική, η θάλασσα, οι μπουκαμβίλιες και οι όμορφες λεπτομέρειες των νησιών θα ζωντανέψουν μέσα από τα χέρια μας, χαρίζοντας σε κάθε έργο τη μαγεία του καλοκαιριού, του φωτός και του Αιγαίου. Ένα ταξίδι δημιουργίας και έμπνευσης στο Αιγαίο, εκεί όπου η τέχνη συναντά την ομορφιά των Κυκλάδων.",
    image: workshop1,
    imageAlt: "Κυκλαδίτικο εικαστικό εργαστήρι",
    price: "",
    category: "art-history",
  },
  {
    id: "w5",
    title: "Καλοκαιρινό Καπέλο",
    date: "",
    description:
      "Στο εργαστήρι «Καλοκαιρινό Καπέλο» τα παιδιά θα αφήσουν ελεύθερη τη φαντασία τους και θα ζωγραφίσουν το δικό τους μοναδικό καπέλο χρησιμοποιώντας ειδικούς μαρκαδόρους για ύφασμα. Θάλασσα, ήλιος, κοχύλια, κύματα ή όποιο άλλο καλοκαιρινό θέμα εμπνευστούν θα μεταμορφώσουν ένα απλό καπέλο σε ένα ξεχωριστό αξεσουάρ που θα τα συνοδεύει όλο το καλοκαίρι. Ένα χαρούμενο και δημιουργικό εργαστήρι γεμάτο χρώμα, έμπνευση και καλοκαιρινή διάθεση!",
    image: workshop2,
    imageAlt: "Εργαστήρι - καλοκαιρινό καπέλο",
    price: "",
    category: "kids",
  },
  {
    id: "w6",
    title: "Κατασκευή Βάζου με Καλοκαιρινά Στοιχεία",
    date: "",
    description:
      "Στο εργαστήρι «Κατασκευή Βάζου με Καλοκαιρινά Στοιχεία» κάθε συμμετέχων θα επιλέξει το θέμα και τα χρώματα που του ταιριάζουν, θα χρωματίσει το βάζο του και θα το μεταμορφώσει με την τεχνική του decoupage και τρισδιάστατες λεπτομέρειες. Το αποτέλεσμα θα είναι ένα μοναδικό χειροποίητο διακοσμητικό, φτιαγμένο με φαντασία και προσωπική έκφραση, που θα μπορεί να στολίσει το σπίτι ή να φυλάξει μικρούς θησαυρούς και μυστικά. Ένα καλοκαιρινό εργαστήρι γεμάτο χρώμα, έμπνευση και δημιουργία!",
    image: workshop3,
    imageAlt: "Εργαστήρι κατασκευής Βάζου με Καλοκαιρινά Στοιχεία",
    price: "",
    category: "kids",
  },
  {
    id: "w7",
    title: "Ένα παράθυρο στον βυθό",
    date: "",
    description:
      "Ένα παράθυρο που ανοίγει όχι σε έναν κήπο ή σε μια αυλή, αλλά στα μυστικά του βυθού. Ψάρια, θαλάσσια φυτά, κοχύλια και εικόνες κρυμμένες κάτω από την επιφάνεια της θάλασσας περιμένουν να ζωντανέψουν μέσα από τη φαντασία μας. Στο εικαστικό εργαστήρι «Παράθυρο στο Βυθό» θα δημιουργήσουμε έναν ξεχωριστό πίνακα πάνω σε καμβά, διαμορφώνοντας ένα ξύλινο θαλασσινό φόντο και ένα παράθυρο που μας ταξιδεύει στον μαγικό κόσμο της θάλασσας. Με την τεχνική του decoupage, ζωγραφική και τρισδιάστατα στοιχεία θα συνθέσουμε τη δική μας μοναδική εικόνα του βυθού, προσθέτοντας υφές και λεπτομέρειες που θα κάνουν το έργο μας να μοιάζει σαν να βγήκε από ένα καλοκαιρινό όνειρο. Ένα δημιουργικό ταξίδι εκεί όπου η τέχνη συναντά τη μαγεία της θάλασσας!",
    image: workshop4,
    imageAlt: "Εργαστήρι - Παράθυρο στο Βυθό",
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

let workshopCache: Workshop[] = seed;
let workshopsLoaded = false;
let workshopsLoading: Promise<void> | null = null;

function emitWorkshopChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("kp-store-change"));
  }
}

function localWorkshopList(): Workshop[] | null {
  return read<Workshop[] | null>(WORKSHOPS_KEY, null);
}

export function getWorkshops(): Workshop[] {
  if (typeof window === "undefined") return seed;
  if (!workshopsLoaded) {
    const local = localWorkshopList();
    if (local?.length) workshopCache = local;
  }
  return workshopCache;
}

export async function refreshWorkshops(options?: { migrateLocalIfRemoteEmpty?: boolean }) {
  if (typeof window === "undefined") return;
  if (workshopsLoading) return workshopsLoading;

  workshopsLoading = (async () => {
    try {
      const response = await fetch("/api/workshops", { cache: "no-store" });
      if (!response.ok) throw new Error(await response.text());
      const payload = (await response.json()) as { workshops?: Workshop[] };
      const remote = Array.isArray(payload.workshops) ? payload.workshops : [];
      const local = localWorkshopList();

      if (remote.length > 0) {
        workshopCache = remote;
        workshopsLoaded = true;
        write(WORKSHOPS_KEY, remote);
        return;
      }

      const fallback = local?.length ? local : seed;
      workshopCache = fallback;
      workshopsLoaded = true;
      emitWorkshopChange();

      if (options?.migrateLocalIfRemoteEmpty && fallback.length > 0) {
        try {
          await saveWorkshops(fallback);
        } catch (error) {
          console.error("Could not migrate local workshops to Supabase", error);
        }
      }
    } catch (error) {
      console.error("Could not load workshops from Supabase", error);
      const local = localWorkshopList();
      workshopCache = local?.length ? local : seed;
      workshopsLoaded = true;
      emitWorkshopChange();
    } finally {
      workshopsLoading = null;
    }
  })();

  return workshopsLoading;
}

export async function saveWorkshops(list: Workshop[]) {
  const response = await fetch("/api/workshops", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ workshops: list }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Αποτυχία αποθήκευσης εργαστηρίων");
  }

  const payload = (await response.json()) as { workshops?: Workshop[] };
  workshopCache = Array.isArray(payload.workshops) ? payload.workshops : list;
  workshopsLoaded = true;
  write(WORKSHOPS_KEY, workshopCache);
  emitWorkshopChange();
  return workshopCache;
}

export async function upsertWorkshop(w: Workshop) {
  const list = [...getWorkshops()];
  const idx = list.findIndex((x) => x.id === w.id);
  if (idx >= 0) list[idx] = w;
  else list.push(w);
  return saveWorkshops(list);
}

export async function deleteWorkshop(id: string) {
  return saveWorkshops(getWorkshops().filter((w) => w.id !== id));
}

export async function moveToPast(id: string, past: boolean) {
  const list = getWorkshops().map((w) => (w.id === id ? { ...w, past } : w));
  return saveWorkshops(list);
}

// Announcements intentionally remain as they were. They can be migrated separately later.
export function getAnnouncements(): Announcement[] {
  if (typeof window === "undefined") return [];
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
