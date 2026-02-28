import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { trackEvent } from "../utils/analytics";

export function FaqAccordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="rounded-2xl border border-black/5 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => {
          const nextOpen = !open;
          setOpen(nextOpen);
          trackEvent("faq_toggle", {
            question: q,
            state: nextOpen ? "open" : "close",
          });
        }}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-zinc-800 hover:bg-zinc-50 transition-colors"
      >
        <span>{q}</span>
        <ChevronDown className={`h-4 w-4 flex-none text-zinc-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-6 pb-5 text-sm text-zinc-600 leading-relaxed border-t border-black/5 pt-3 whitespace-pre-line">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
