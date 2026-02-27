import React from "react";
import { formatTHB } from "../utils/format";

export const Section: React.FC<{
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}> = ({ id, title, subtitle, children }) => (
  <section id={id} className="scroll-mt-20 py-10 md:py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="mb-8 md:mb-12 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-normal text-gradient pt-2 pb-1">{title}</h2>
        {subtitle ? <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">{subtitle}</p> : null}
        <div className="section-divider mx-auto mt-5 w-24 md:w-32"></div>
      </div>
      {children}
    </div>
  </section>
);

export const Pill: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span
    className={
      "inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white/50 px-3 py-1 text-xs font-medium text-zinc-600 backdrop-blur " +
      className
    }
  >
    {children}
  </span>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`rounded-3xl border border-black/5 bg-white shadow-sm ${className}`}>{children}</div>
);

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string; variant?: "primary" | "outline" | "ghost" }
> = ({ children, className = "", variant = "primary", ...props }) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-[color:var(--c-primary)] text-white hover:bg-[color:var(--c-secondary)] shadow-lg shadow-[color:var(--c-primary)]/20",
    outline: "bg-white border border-black/10 text-zinc-700 hover:bg-zinc-50 hover:border-black/20",
    ghost: "bg-transparent text-zinc-600 hover:bg-black/5",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export function AutoCarousel({
  items,
  intervalMs = 3500,
  overlayTitle,
  overlaySubtitle,
  overlayPrice,
}: {
  items: { src: string; caption: string }[];
  intervalMs?: number;
  overlayTitle: string;
  overlaySubtitle?: string;
  overlayPrice: string;
}) {
  const [idx, setIdx] = React.useState(0);
  const pausedRef = React.useRef(false);

  React.useEffect(() => {
    if (!items?.length) return;
    const t = setInterval(() => {
      if (pausedRef.current) return;
      setIdx((v) => (v + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [items?.length, intervalMs]);

  const go = (n: number) => setIdx((n + items.length) % items.length);

  if (!items?.length) {
    return (
      <div className="rounded-2xl border border-black/10 bg-[color:var(--c-cream)]/60 p-6 text-sm text-zinc-700">
        ยังไม่มีรูปในสไลด์ — กรุณาวางไฟล์ไว้ที่ <span className="font-medium">/public/images</span>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden rounded-2xl border border-black/10 bg-white"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="relative">
        <div className="aspect-[16/10] bg-[color:var(--c-cream)]/60">
          <img src={items[idx].src} alt={items[idx].caption} className="h-full w-full object-cover" loading="lazy" />
        </div>

        <div className="absolute left-3 top-3 right-3 flex items-start justify-between gap-2">
          <div className="rounded-2xl border border-black/10 bg-white/85 px-3 py-2 backdrop-blur shadow-sm">
            <div className="text-xs font-semibold text-zinc-900">{overlayTitle}</div>
            {overlaySubtitle ? <div className="mt-0.5 text-[11px] text-zinc-600">{overlaySubtitle}</div> : null}
          </div>

          <div className="rounded-2xl border border-black/10 bg-[color:var(--c-primary)]/92 px-3 py-2 backdrop-blur shadow-sm text-white text-right">
            <div className="text-[11px] opacity-90">ราคาโปรฯ</div>
            <div className="text-[clamp(0.92rem,1.6vw,1.05rem)] font-semibold tabular-nums whitespace-nowrap">
              ฿{formatTHB(overlayPrice)}
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Previous"
          onClick={() => go(idx - 1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white/85 px-3 py-2 text-sm shadow-sm hover:bg-[color:var(--c-cream)]"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => go(idx + 1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white/85 px-3 py-2 text-sm shadow-sm hover:bg-[color:var(--c-cream)]"
        >
          ›
        </button>

        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              className={
                "h-2.5 w-2.5 rounded-full border border-black/10 bg-white/75 shadow-sm " +
                (i === idx ? "opacity-100" : "opacity-45")
              }
            />
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="text-sm font-semibold">{items[idx].caption}</div>
        <div className="mt-1 text-xs text-zinc-500">* เลื่อนอัตโนมัติ (วางเมาส์ค้างเพื่อหยุด)</div>
      </div>
    </div>
  );
}
