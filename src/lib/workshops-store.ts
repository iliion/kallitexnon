import workshop1 from "@/assets/workshop1.png?url";
import workshop2 from "@/assets/workshop2.png?url";
import workshop3 from "@/assets/workshop3.png?url";
import workshop4 from "@/assets/workshop4.png?url";

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
  // {
  //   id: "w1",
  //   title: "Εικαστικά & Ιστορικά Εργαστήρια",
  //   date: "",
  //   description:
  //     "Η τέχνη συναντά την ιστορία της. Εμπνεόμαστε από Βαν Γκογκ, Μοντριάν, Φρίντα Κάλο και δημιουργούμε τα δικά μας έργα.",
  //   image: "",
  //   imageAlt: "Παιδιά ζωγραφίζουν στο εργαστήρι",
  //   price: "",
  //   category: "art-history",
  // },
  // {
  //   id: "w2",
  //   title: "Γενέθλια μέσα από την Τέχνη",
  //   date: "",
  //   description:
  //     "Ένα μοναδικό πάρτι: το παιδί και οι φίλοι του δημιουργούν μαζί έργα τέχνης μέσα από διαδραστικά τεχνο-ιστορικά παιχνίδια.",
  //   image: "",
  //   imageAlt: "Παιδικό πάρτι γενεθλίων με τέχνη",
  //   price: "",
  //   category: "birthday",
  // },
  // {
  //   id: "w3",
  //   title: "Βραδιές Τέχνης για Ενηλίκους",
  //   date: "",
  //   description:
  //     "Σε χαλαρή ατμόσφαιρα, με ένα ποτήρι κρασί, δημιουργούμε μαζί. 18+, χωρίς όριο ηλικίας.",
  //   image: "",
  //   imageAlt: "Ενήλικες ζωγραφίζουν σε βραδιά τέχνης",
  //   price: "",
  //   category: "adults",
  // },
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

// export function getWorkshops(): Workshop[] {
//   const list = read<Workshop[] | null>(WORKSHOPS_KEY, null);
//   if (!list) {
//     write(WORKSHOPS_KEY, seed);
//     return seed;
//   }
//   return list;
// }

export function getWorkshops(): Workshop[] {
  if (typeof window === "undefined") return []; // SSR: never render workshops server-side
  const list = read<Workshop[] | null>(WORKSHOPS_KEY, null);
  if (!list || list.length === 0) {
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
  if (typeof window === "undefined") return []; // SSR: same as above
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
