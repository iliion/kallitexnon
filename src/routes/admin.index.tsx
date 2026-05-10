import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/use-store";
import {
  Workshop,
  deleteWorkshop,
  getWorkshops,
  moveToPast,
  newId,
  upsertWorkshop,
} from "@/lib/workshops-store";
import { Pencil, Trash2, Archive, ArchiveRestore, Plus, X } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminWorkshopsPage,
});

const empty = (): Workshop => ({
  id: newId(),
  title: "",
  date: "",
  description: "",
  image: "",
  imageAlt: "",
  price: "",
  category: "other",
  past: false,
});

function AdminWorkshopsPage() {
  const list = useStore(getWorkshops);
  const [editing, setEditing] = useState<Workshop | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Εργαστήρια</h1>
        <button
          onClick={() => setEditing(empty())}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" aria-hidden /> Νέο εργαστήρι
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-3 py-2">Τίτλος</th>
              <th className="px-3 py-2">Ημ/νία</th>
              <th className="px-3 py-2">Κατηγορία</th>
              <th className="px-3 py-2">Τιμή</th>
              <th className="px-3 py-2">Κατάσταση</th>
              <th className="px-3 py-2 text-right">Ενέργειες</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr><td colSpan={6} className="px-3 py-6 text-center text-muted-foreground">Καμία εγγραφή.</td></tr>
            )}
            {list.map((w) => (
              <tr key={w.id} className="border-t border-border">
                <td className="px-3 py-2 font-medium">{w.title}</td>
                <td className="px-3 py-2">{w.date}</td>
                <td className="px-3 py-2">{w.category}</td>
                <td className="px-3 py-2">{w.price}</td>
                <td className="px-3 py-2">{w.past ? "Παρελθόν" : "Τρέχον"}</td>
                <td className="px-3 py-2">
                  <div className="flex justify-end gap-1">
                    <button aria-label={`Επεξεργασία ${w.title}`} onClick={() => setEditing(w)} className="rounded-md p-2 hover:bg-accent"><Pencil className="h-4 w-4" /></button>
                    <button
                      aria-label={w.past ? `Επαναφορά ${w.title}` : `Μετακίνηση στο παρελθόν ${w.title}`}
                      onClick={() => moveToPast(w.id, !w.past)}
                      className="rounded-md p-2 hover:bg-accent"
                    >
                      {w.past ? <ArchiveRestore className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
                    </button>
                    <button
                      aria-label={`Διαγραφή ${w.title}`}
                      onClick={() => { if (confirm(`Διαγραφή του "${w.title}";`)) deleteWorkshop(w.id); }}
                      className="rounded-md p-2 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && <EditDialog workshop={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}

function EditDialog({ workshop, onClose }: { workshop: Workshop; onClose: () => void }) {
  const [w, setW] = useState<Workshop>(workshop);

  function set<K extends keyof Workshop>(k: K, v: Workshop[K]) {
    setW((prev) => ({ ...prev, [k]: v }));
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => set("image", String(reader.result || ""));
    reader.readAsDataURL(f);
  }

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="edit-title" className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 id="edit-title" className="font-display text-xl">{workshop.title ? "Επεξεργασία" : "Νέο εργαστήρι"}</h2>
          <button onClick={onClose} aria-label="Κλείσιμο" className="rounded-md p-2 hover:bg-accent"><X className="h-5 w-5" /></button>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); upsertWorkshop(w); onClose(); }}
          className="mt-4 grid gap-3"
        >
          <Field label="Τίτλος"><input required className="kp-input" value={w.title} onChange={(e) => set("title", e.target.value)} /></Field>
          <Field label="Ημερομηνία/Ώρα"><input required className="kp-input" value={w.date} onChange={(e) => set("date", e.target.value)} /></Field>
          <Field label="Περιγραφή"><textarea rows={3} className="kp-input" value={w.description} onChange={(e) => set("description", e.target.value)} /></Field>
          <Field label="Τιμή"><input className="kp-input" value={w.price} onChange={(e) => set("price", e.target.value)} /></Field>
          <Field label="Κατηγορία">
            <select className="kp-input" value={w.category} onChange={(e) => set("category", e.target.value as Workshop["category"])}>
              <option value="art-history">Εικαστικά & Ιστορικά</option>
              <option value="birthday">Γενέθλια</option>
              <option value="adults">Βραδιές Ενηλίκων</option>
              <option value="kids">Παιδικά</option>
              <option value="other">Άλλο</option>
            </select>
          </Field>
          <Field label="Εικόνα (URL ή upload)">
            <input className="kp-input" placeholder="https://..." value={w.image} onChange={(e) => set("image", e.target.value)} />
            <input type="file" accept="image/*" onChange={onFile} className="mt-2 text-sm" aria-label="Μεταφόρτωση εικόνας" />
          </Field>
          <Field label="Εναλλακτικό κείμενο εικόνας (alt) — υποχρεωτικό για προσβασιμότητα">
            <input required={!!w.image} className="kp-input" value={w.imageAlt} onChange={(e) => set("imageAlt", e.target.value)} />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!!w.past} onChange={(e) => set("past", e.target.checked)} />
            Παρελθοντικό εργαστήρι
          </label>
          <div className="mt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-md border border-border px-4 py-2 text-sm hover:bg-accent">Ακύρωση</button>
            <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Αποθήκευση</button>
          </div>
        </form>
      </div>
      <style>{`.kp-input{width:100%;border:1px solid var(--input);background:var(--background);border-radius:.5rem;padding:.5rem .75rem;font:inherit}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="font-medium">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
