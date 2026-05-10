import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { u as useStore, g as getWorkshops, m as moveToPast, d as deleteWorkshop, n as newId, b as upsertWorkshop } from "./workshops-store-BN6NBv-r.js";
import { Plus, Pencil, ArchiveRestore, Archive, Trash2, X } from "lucide-react";
const empty = () => ({
  id: newId(),
  title: "",
  date: "",
  description: "",
  image: "",
  imageAlt: "",
  price: "",
  category: "other",
  past: false
});
function AdminWorkshopsPage() {
  const list = useStore(getWorkshops);
  const [editing, setEditing] = useState(null);
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl", children: "Εργαστήρια" }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setEditing(empty()), className: "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4", "aria-hidden": true }),
        " Νέο εργαστήρι"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 overflow-hidden rounded-xl border border-border bg-card", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2", children: "Τίτλος" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2", children: "Ημ/νία" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2", children: "Κατηγορία" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2", children: "Τιμή" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2", children: "Κατάσταση" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-right", children: "Ενέργειες" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        list.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, className: "px-3 py-6 text-center text-muted-foreground", children: "Καμία εγγραφή." }) }),
        list.map((w) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-border", children: [
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2 font-medium", children: w.title }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2", children: w.date }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2", children: w.category }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2", children: w.price }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2", children: w.past ? "Παρελθόν" : "Τρέχον" }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-1", children: [
            /* @__PURE__ */ jsx("button", { "aria-label": `Επεξεργασία ${w.title}`, onClick: () => setEditing(w), className: "rounded-md p-2 hover:bg-accent", children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsx("button", { "aria-label": w.past ? `Επαναφορά ${w.title}` : `Μετακίνηση στο παρελθόν ${w.title}`, onClick: () => moveToPast(w.id, !w.past), className: "rounded-md p-2 hover:bg-accent", children: w.past ? /* @__PURE__ */ jsx(ArchiveRestore, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Archive, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsx("button", { "aria-label": `Διαγραφή ${w.title}`, onClick: () => {
              if (confirm(`Διαγραφή του "${w.title}";`)) deleteWorkshop(w.id);
            }, className: "rounded-md p-2 text-destructive hover:bg-destructive/10", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
          ] }) })
        ] }, w.id))
      ] })
    ] }) }),
    editing && /* @__PURE__ */ jsx(EditDialog, { workshop: editing, onClose: () => setEditing(null) })
  ] });
}
function EditDialog({
  workshop,
  onClose
}) {
  const [w, setW] = useState(workshop);
  function set(k, v) {
    setW((prev) => ({
      ...prev,
      [k]: v
    }));
  }
  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => set("image", String(reader.result || ""));
    reader.readAsDataURL(f);
  }
  return /* @__PURE__ */ jsxs("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "edit-title", className: "fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-lg rounded-2xl bg-card p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { id: "edit-title", className: "font-display text-xl", children: workshop.title ? "Επεξεργασία" : "Νέο εργαστήρι" }),
        /* @__PURE__ */ jsx("button", { onClick: onClose, "aria-label": "Κλείσιμο", className: "rounded-md p-2 hover:bg-accent", children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        upsertWorkshop(w);
        onClose();
      }, className: "mt-4 grid gap-3", children: [
        /* @__PURE__ */ jsx(Field, { label: "Τίτλος", children: /* @__PURE__ */ jsx("input", { required: true, className: "kp-input", value: w.title, onChange: (e) => set("title", e.target.value) }) }),
        /* @__PURE__ */ jsx(Field, { label: "Ημερομηνία/Ώρα", children: /* @__PURE__ */ jsx("input", { required: true, className: "kp-input", value: w.date, onChange: (e) => set("date", e.target.value) }) }),
        /* @__PURE__ */ jsx(Field, { label: "Περιγραφή", children: /* @__PURE__ */ jsx("textarea", { rows: 3, className: "kp-input", value: w.description, onChange: (e) => set("description", e.target.value) }) }),
        /* @__PURE__ */ jsx(Field, { label: "Τιμή", children: /* @__PURE__ */ jsx("input", { className: "kp-input", value: w.price, onChange: (e) => set("price", e.target.value) }) }),
        /* @__PURE__ */ jsx(Field, { label: "Κατηγορία", children: /* @__PURE__ */ jsxs("select", { className: "kp-input", value: w.category, onChange: (e) => set("category", e.target.value), children: [
          /* @__PURE__ */ jsx("option", { value: "art-history", children: "Εικαστικά & Ιστορικά" }),
          /* @__PURE__ */ jsx("option", { value: "birthday", children: "Γενέθλια" }),
          /* @__PURE__ */ jsx("option", { value: "adults", children: "Βραδιές Ενηλίκων" }),
          /* @__PURE__ */ jsx("option", { value: "kids", children: "Παιδικά" }),
          /* @__PURE__ */ jsx("option", { value: "other", children: "Άλλο" })
        ] }) }),
        /* @__PURE__ */ jsxs(Field, { label: "Εικόνα (URL ή upload)", children: [
          /* @__PURE__ */ jsx("input", { className: "kp-input", placeholder: "https://...", value: w.image, onChange: (e) => set("image", e.target.value) }),
          /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", onChange: onFile, className: "mt-2 text-sm", "aria-label": "Μεταφόρτωση εικόνας" })
        ] }),
        /* @__PURE__ */ jsx(Field, { label: "Εναλλακτικό κείμενο εικόνας (alt) — υποχρεωτικό για προσβασιμότητα", children: /* @__PURE__ */ jsx("input", { required: !!w.image, className: "kp-input", value: w.imageAlt, onChange: (e) => set("imageAlt", e.target.value) }) }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: !!w.past, onChange: (e) => set("past", e.target.checked) }),
          "Παρελθοντικό εργαστήρι"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex justify-end gap-2", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: "rounded-md border border-border px-4 py-2 text-sm hover:bg-accent", children: "Ακύρωση" }),
          /* @__PURE__ */ jsx("button", { type: "submit", className: "rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: "Αποθήκευση" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `.kp-input{width:100%;border:1px solid var(--input);background:var(--background);border-radius:.5rem;padding:.5rem .75rem;font:inherit}` })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxs("label", { className: "block text-sm", children: [
    /* @__PURE__ */ jsx("span", { className: "font-medium", children: label }),
    /* @__PURE__ */ jsx("div", { className: "mt-1", children })
  ] });
}
export {
  AdminWorkshopsPage as component
};
