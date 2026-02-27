import React from "react";
import { ChevronDown } from "lucide-react";

export function FaqAccordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="rounded-2xl border border-black/5 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-zinc-800 hover:bg-zinc-50 transition-colors"
      >
        <span>{q}</span>
        <ChevronDown className={`h-4 w-4 flex-none text-zinc-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-zinc-600 leading-relaxed border-t border-black/5 pt-3 whitespace-pre-line">{a}</div>
      )}
    </div>
  );
}
