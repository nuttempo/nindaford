import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { trackEvent } from "../../../utils/analytics";

export function FloatingCta() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
      <motion.a
        href="tel:0959608274"
        onClick={() => trackEvent("cta_click", { area: "floating", channel: "phone", cta: "floating_call" })}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center gap-2 rounded-full bg-white border border-black/10 px-4 py-3 text-zinc-800 font-semibold text-sm shadow-lg hover:bg-zinc-50 hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <Phone className="h-4 w-4 text-[color:var(--c-primary)]" />
        <span>โทรเลย</span>
      </motion.a>
      <motion.a
        href="https://m.me/nindaford"
        onClick={() => trackEvent("cta_click", { area: "floating", channel: "messenger", cta: "floating_chat" })}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center gap-2.5 rounded-full bg-[color:var(--c-primary)] px-5 py-3.5 text-white font-semibold text-sm shadow-xl shadow-[color:var(--c-primary)]/40 hover:bg-[color:var(--c-secondary)] hover:scale-105 active:scale-95 transition-all duration-200 ring-4 ring-white/20"
      >
        <MessageCircle className="h-5 w-5" />
        <span>ทักแชทเลย</span>
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
        </span>
      </motion.a>
    </div>
  );
}
