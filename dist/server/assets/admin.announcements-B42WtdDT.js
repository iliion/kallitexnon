import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { u as useStore, a as getAnnouncements, n as newId, s as saveAnnouncements } from "./workshops-store-BN6NBv-r.js";
import { Plus, Trash2 } from "lucide-react";
function AdminAnnouncementsPage() {
  const list = useStore(getAnnouncements);
  const [text, setText] = useState("");
  function add() {
    if (!text.trim()) return;
    const ann = {
      id: newId(),
      text: text.trim(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    saveAnnouncements([ann, ...list]);
    setText("");
  }
  function remove(id) {
    saveAnnouncements(list.filter((a) => a.id !== id));
  }
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 py-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl", children: "Ανακοινώσεις" }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Η πιο πρόσφατη εμφανίζεται στην αρχική σελίδα." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "ann", className: "text-sm font-medium", children: "Νέα ανακοίνωση" }),
      /* @__PURE__ */ jsx("textarea", { id: "ann", rows: 3, value: text, onChange: (e) => setText(e.target.value), className: "mt-1 w-full rounded-md border border-input bg-background p-2" }),
      /* @__PURE__ */ jsxs("button", { onClick: add, className: "mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4", "aria-hidden": true }),
        " Προσθήκη"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("ul", { className: "mt-6 space-y-2", children: [
      list.map((a) => /* @__PURE__ */ jsxs("li", { className: "flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: a.text }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: new Date(a.createdAt).toLocaleString("el-GR") })
        ] }),
        /* @__PURE__ */ jsx("button", { "aria-label": "Διαγραφή ανακοίνωσης", onClick: () => remove(a.id), className: "rounded-md p-2 text-destructive hover:bg-destructive/10", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
      ] }, a.id)),
      list.length === 0 && /* @__PURE__ */ jsx("li", { className: "text-sm text-muted-foreground", children: "Καμία ανακοίνωση." })
    ] })
  ] });
}
export {
  AdminAnnouncementsPage as component
};
