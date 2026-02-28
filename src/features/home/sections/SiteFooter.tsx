import { Sparkles } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-20 overflow-hidden">
      <div className="section-divider mx-auto w-full max-w-7xl"></div>
      <div className="bg-white/40 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[color:var(--c-primary)] to-[color:var(--c-secondary)] text-white flex items-center justify-center shadow-lg shadow-[color:var(--c-primary)]/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="text-sm font-bold text-gradient">นินดาขายฟอร์ด</div>
            </div>
            <div className="text-xs text-zinc-400">
              © 2026 — นินดาขายฟอร์ด | สุขุมวิท 62
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
