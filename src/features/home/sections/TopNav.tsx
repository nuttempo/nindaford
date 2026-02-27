import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { NAV } from "../../../data/siteData";
import { Button } from "../../../components/ui";

export function TopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-900/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2.5 group">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 shadow-sm ring-1 ring-white/20 text-white group-hover:scale-105 transition-transform">
              <Sparkles className="h-4.5 w-4.5" />
            </span>
            <div className="leading-tight">
              <span className="font-bold text-base text-white block">นินดาขายฟอร์ด</span>
              <span className="text-[10px] text-white/70 block uppercase tracking-wide">ที่ปรึกษาการขายมืออาชีพ</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="https://m.me/nindaford" target="_blank" rel="noreferrer" className="hidden sm:inline-block">
              <Button variant="primary" className="rounded-full px-6 shadow-[color:var(--c-primary)]/40 hover:shadow-[color:var(--c-primary)]/60">
                ขอใบเสนอราคา <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <button
              type="button"
              className="md:hidden rounded-xl p-2 text-slate-300 hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileMenuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                  : <><line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" /></>}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 mt-0">
            <nav className="flex flex-col gap-1 pt-3">
              {NAV.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a href="https://m.me/nindaford" target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full mt-2 rounded-xl justify-center">
                  ทักแชทเลย <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
