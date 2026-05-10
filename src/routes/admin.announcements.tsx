import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/use-store";
import {
  Announcement,
  getAnnouncements,
  newId,
  saveAnnouncements,
} from "@/lib/workshops-store";
import { Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/announcements")({
  component: AdminAnnouncementsPage,
});

function AdminAnnouncementsPage() {
  const list = useStore(getAnnouncements);
  const [text, setText] = useState("");

  function add() {
    if (!text.trim()) return;
    const ann: Announcement = { id: newId(), text: text.trim(), createdAt: new Date().toISOString() };
    saveAnnouncements([ann, ...list]);
    setText("");
  }

  function remove(id: string) {
    saveAnnouncements(list.filter((a) => a.id !== id));
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-3xl">Ανακοινώσεις</h1>
      <p className="mt-1 text-sm text-muted-foreground">Η πιο πρόσφατη εμφανίζεται στην αρχική σελίδα.</p>

      <div className="mt-6 rounded-xl border border-border bg-card p-4">
        <label htmlFor="ann" className="text-sm font-medium">Νέα ανακοίνωση</label>
        <textarea
          id="ann"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 w-full rounded-md border border-input bg-background p-2"
        />
        <button onClick={add} className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" aria-hidden /> Προσθήκη
        </button>
      </div>

      <ul className="mt-6 space-y-2">
        {list.map((a) => (
          <li key={a.id} className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4">
            <div>
              <p>{a.text}</p>
              <p className="mt-1 text-xs text-muted-foreground">{new Date(a.createdAt).toLocaleString("el-GR")}</p>
            </div>
            <button aria-label="Διαγραφή ανακοίνωσης" onClick={() => remove(a.id)} className="rounded-md p-2 text-destructive hover:bg-destructive/10">
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
        {list.length === 0 && <li className="text-sm text-muted-foreground">Καμία ανακοίνωση.</li>}
      </ul>
    </div>
  );
}
