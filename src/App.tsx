import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

import img7508 from "./assets/images/IMG_7508.JPG";
import img7509 from "./assets/images/IMG_7509.JPG";
import img7510 from "./assets/images/IMG_7510.JPG";

// Delivery Images
import del1 from "./assets/images/518354740_1356748536133668_1537036633555395839_n.jpg";
import del2 from "./assets/images/520327181_1356644202810768_3359533342953354306_n.jpg";
import del3 from "./assets/images/521008990_1357155082759680_266049088416494662_n.jpg";
import del4 from "./assets/images/527224258_1369000494908472_6770609366300285063_n.jpg";
import del5 from "./assets/images/534597078_1379261157215739_4765641842671221225_n.jpg";
import del6 from "./assets/images/534633544_1380203383788183_423890981387154358_n.jpg";
import del7 from "./assets/images/535920017_1382860176855837_5397091415575020861_n.jpg";
import del8 from "./assets/images/536277688_1391181682690353_430960558036038701_n.jpg";
import del9 from "./assets/images/549571249_1410725507402637_3770870615834480586_n.jpg";
import del10 from "./assets/images/558304431_1427933749015146_1638164802735735501_n.jpg";

/**
 * Quick question (to avoid guessing wrong):
 * ในกล่องตัวเลข 3 ช่อง (ราคาปกติ/ราคาพิเศษ/ส่วนลด) ถ้าหน้าจอแคบมาก คุณอยากให้ “เรียงเป็น 1 คอลัมน์” หรือ “ยังคง 3 คอลัมน์แต่ตัวเลขย่อ/ตัด …” ?
 * (ตอนนี้ผมตั้งค่าให้: < md เรียงลง, >= md เป็น 3 คอลัมน์ และตัวเลขจะไม่ล้นกรอบ)
 */

// ---------- Theme ----------
const THEME = {
  primary: "#789DBC",
  secondary: "#C6E7FF",
  soft: "#C6E7FF",
  cream: "#FBFBFB",
  accent: "#FFDDAE",
};

// ---------- Small helpers (with tiny tests) ----------
function formatTHB(value: string | number) {
  const n = typeof value === "string" ? Number(value.replace(/,/g, "")) : value;
  if (Number.isNaN(n)) return String(value);
  return n.toLocaleString("th-TH");
}

(function runMiniTests() {
  try {
    // eslint-disable-next-line no-console
    console.assert(formatTHB("1249000") === "1,249,000", "formatTHB should format numeric strings");
    // eslint-disable-next-line no-console
    console.assert(formatTHB("1,249,000") === "1,249,000", "formatTHB should tolerate commas");
    // eslint-disable-next-line no-console
    console.assert(formatTHB(1397000) === "1,397,000", "formatTHB should format numbers");
    // eslint-disable-next-line no-console
    console.assert(formatTHB("abc") === "abc", "formatTHB should passthrough non-numeric");
  } catch {
    // ignore
  }
})();

// ---------- UI Primitives ----------
const Section: React.FC<{
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}> = ({ id, title, subtitle, children }) => (
  <section id={id} className="scroll-mt-24 py-14">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">{title}</h2>
        {subtitle ? <p className="mt-2 text-base text-zinc-600 max-w-3xl leading-relaxed">{subtitle}</p> : null}
      </div>
      {children}
    </div>
  </section>
);

const Pill: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span
    className={
      "inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white/50 px-3 py-1 text-xs font-medium text-zinc-600 backdrop-blur " +
      className
    }
  >
    {children}
  </span>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`rounded-3xl border border-black/5 bg-white shadow-sm ${className}`}>{children}</div>
);

const Button: React.FC<
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

function AutoCarousel({
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

        {/* Overlay badges */}
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

// ---------- Data ----------
const NAV = [
  { id: "offers", label: "โปรฯ Everest Trend" },
  { id: "features", label: "จุดเด่น" },
  { id: "reviews", label: "ส่งมอบความประทับใจ" },
];

const FEATURE_DATA = [
  {
    title: "ข้อเสนอชัดเจน ตรงงบ",
    desc: "คุยงบ/ดาวน์/ผ่อนต่อเดือนให้เหมาะกับคุณ พร้อมอธิบายเงื่อนไขแบบเข้าใจง่าย",
  },
  {
    title: "ดูแลเอกสารไฟแนนซ์",
    desc: "ช่วยเช็กเอกสารและเตรียมขั้นตอนยื่นไฟแนนซ์ ลดการตีกลับและประหยัดเวลา",
  },
  {
    title: "นัดดูรถ/ทดลองขับได้ไว",
    desc: "ทัก Inbox แล้วนัดวันเวลาได้ทันที พร้อมแนะนำรุ่น/ออปชันที่คุ้มที่สุด",
  },
  {
    title: "ติดตามส่งมอบ & หลังการขาย",
    desc: "อัปเดตสถานะรถ/วันรับรถ และดูแลหลังส่งมอบให้สบายใจตลอดการใช้งาน",
  },
];

const EVEREST_TREND_OFFER = {
  name: "Ford Everest Trend 2.0L Turbo 4x2 6AT",
  normalPrice: "1,397,000",
  specialPrice: "1,249,000",
  save: "148,000",
  note: "ราคาพิเศษเมื่อจัดไฟแนนซ์ผ่าน Ford Leasing (ไม่รวมประกันภัยชั้นหนึ่ง) พร้อมโปรแกรม Ford Care*",
  offerUrl: "https://www.ford.co.th/showroom/all-offers/ford-everest-2-0l-turbo-trend-4x2-6at/",
  allOffersUrl: "https://www.ford.co.th/showroom/all-offers/",
};

// รูปรถใหม่ (Everest Trend) — วางไฟล์ไว้ที่ /src/assets/images/
const EVEREST_TREND_IMAGES = [
  { src: img7508, caption: "Everest Trend — มุมเฉียง (โชว์เส้นสาย/ล้อ/ทรงรถ)" },
  { src: img7509, caption: "Everest Trend — มุมหน้าเต็ม (กระจัง/ไฟหน้า)" },
  { src: img7510, caption: "Everest Trend — มุมด้านข้าง (สัดส่วน/พื้นที่ห้องโดยสาร)" },
];

const DELIVERY_IMAGES = [
  del1, del2, del3, del4, del5, del6, del7, del8, del9, del10
];

// ---------- Page ----------
export default function WebsiteStarter() {
  return (
    <div
      className="min-h-screen text-zinc-800 bg-[color:var(--c-cream)] selection:bg-[color:var(--c-primary)] selection:text-white"
      style={
        {
          "--c-primary": THEME.primary,
          "--c-secondary": THEME.secondary,
          "--c-soft": THEME.soft,
          "--c-cream": THEME.cream,
          "--c-accent": THEME.accent,
        } as React.CSSProperties
      }
    >
      {/* Top Nav */}
      <header className="sticky top-0 z-30 border-b border-black/5 bg-[color:var(--c-cream)]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            <a href="#" className="flex items-center gap-2.5 group">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/5 text-[color:var(--c-primary)] group-hover:scale-105 transition-transform">
                <Sparkles className="h-4.5 w-4.5" />
              </span>
              <div className="leading-tight">
                <span className="font-bold text-base tracking-tight text-zinc-900 block">นินดาขายฟอร์ด</span>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {NAV.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 hover:bg-black/5 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a href="https://m.me/nindaford" target="_blank" rel="noreferrer" className="hidden sm:inline-block">
                <Button variant="primary" className="rounded-full px-6">
                  ขอใบเสนอราคา <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a className="md:hidden rounded-xl p-2 text-zinc-600 hover:bg-black/5" href="#offers">
                <span className="text-sm font-medium">เมนู</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-28 -right-28 h-72 w-72 rounded-full bg-[#82c0cc]/25 blur-2xl" />
            <div className="absolute top-24 -left-20 h-72 w-72 rounded-full bg-[#489fb5]/15 blur-2xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-12 py-12 lg:grid-cols-[1fr_400px] lg:items-start">
              {/* LEFT */}
              <div>
                <div className="grid gap-8 py-6 md:grid-cols-2 md:items-center">
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Pill className="bg-white/80 border-transparent shadow-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--c-primary)]" />
                        โปรฯ อัปเดตตลอด
                      </Pill>
                      <Pill className="bg-white/80 border-transparent shadow-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--c-primary)]" />
                        ทำข้อเสนอเฉพาะคุณ
                      </Pill>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
                      นินดาขายฟอร์ด <br />
                      <span className="text-zinc-500 md:text-5xl">โปรฯ ฟอร์ดอัปเดต</span>
                    </h1>

                    <div className="mt-4 text-xl md:text-2xl font-medium text-zinc-700">
                      จองรถ • ทดลองขับ • ขอใบเสนอราคา ได้ไว
                    </div>

                    <p className="mt-6 text-base md:text-lg text-zinc-500 max-w-lg leading-relaxed">
                      สรุปโปรฯ และตัวเลขสำคัญแบบอ่านง่าย พร้อมทางลัดติดต่อ <span className="font-semibold text-zinc-800">Inbox/โทร</span> เพื่อทำข้อเสนอเฉพาะคุณ
                      (ดาวน์/ผ่อน/ของแถม) ได้ทันที
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      <a href="https://m.me/nindaford" target="_blank" rel="noreferrer">
                        <Button variant="primary" className="w-full sm:w-auto px-8 py-3 text-base">
                          ขอโปร/ใบเสนอราคา <ArrowRight className="h-4 w-4" />
                        </Button>
                      </a>
                      <a href="#offers">
                        <Button variant="outline" className="w-full sm:w-auto px-8 py-3 text-base">
                          ดูโปรฯ Everest Trend
                        </Button>
                      </a>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {["Ranger", "Everest", "Raptor"].map(tag => (
                        <span key={tag} className="inline-flex items-center px-3 py-1 rounded-md bg-black/5 text-xs font-medium text-zinc-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.05 }}>
                    <Card className="p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">Quick CTA</div>
                          <div className="text-xs text-zinc-500">กดแล้วทักได้ทันที</div>
                        </div>
                        <Pill className="border-black/10">
                          <Sparkles className="h-4 w-4" />
                          Fast
                        </Pill>
                      </div>

                      <div className="mt-4 grid gap-3">
                        <a href="https://m.me/nindaford" target="_blank" rel="noreferrer">
                          <Button variant="primary" className="w-full justify-between">
                            ขอโปร/ราคา <ArrowRight className="h-4 w-4" />
                          </Button>
                        </a>
                        <a href="https://m.me/nindaford" target="_blank" rel="noreferrer">
                          <Button variant="outline" className="w-full justify-center">ทัก Inbox (Facebook)</Button>
                        </a>
                        <a href="https://www.facebook.com/nindaford/" target="_blank" rel="noreferrer">
                          <Button variant="outline" className="w-full justify-center">เปิดหน้าเพจ</Button>
                        </a>
                      </div>

                      <div className="mt-5 rounded-2xl border border-black/10 bg-[#ede7e3]/50 p-4">
                        <div className="text-sm font-semibold">ต้องการข้อเสนอแบบไว ๆ</div>
                        <ul className="mt-3 grid gap-2 text-sm">
                          {["รุ่นที่สนใจ", "งบ/ดาวน์", "พื้นที่รับรถ", "วันสะดวกทดลองขับ"].map((t) => (
                            <li key={t} className="flex items-center gap-2 text-zinc-700">
                              <CheckCircle2 className="h-4 w-4" /> {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  </motion.div>
                </div>

                {/* Everest Trend Offer */}
                <Section
                  id="offers"
                  title="โปรฯ กลาง — Everest Trend"
                  subtitle="อ้างอิงโปรฯ ทางการจาก Ford Thailand (กดลิงก์เพื่อดูเงื่อนไข/ระยะเวลาล่าสุด)"
                >
                  <div className="flex flex-col gap-6">
                    <Card className="p-5">
                      <div className="grid gap-4">
                        <AutoCarousel
                          items={EVEREST_TREND_IMAGES}
                          intervalMs={3500}
                          overlayTitle="Everest Trend"
                          overlaySubtitle="โปรฯ กลางอ้างอิง Ford Thailand"
                          overlayPrice={EVEREST_TREND_OFFER.specialPrice}
                        />

                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Pill className="border-black/5 bg-zinc-100/50">Everest Trend</Pill>
                            <div className="mt-3 text-xl font-bold text-zinc-900 truncate">{EVEREST_TREND_OFFER.name}</div>
                            <div className="mt-2 text-sm text-zinc-500">{EVEREST_TREND_OFFER.note}</div>
                          </div>
                          <Pill className="bg-orange-100/50 text-orange-700 border-orange-200/50">
                            <Sparkles className="h-3.5 w-3.5" />
                            Offer
                          </Pill>
                        </div>

                        {/* Numbers: prevent overflow */}
                        <div className="mt-2 grid gap-3 grid-cols-1 sm:grid-cols-3">
                          {[{ label: "ราคาปกติ", value: EVEREST_TREND_OFFER.normalPrice }, { label: "ราคาพิเศษ", value: EVEREST_TREND_OFFER.specialPrice }, { label: "ส่วนลด", value: EVEREST_TREND_OFFER.save }].map(
                            (x) => (
                              <div
                                key={x.label}
                                className={
                                  "rounded-2xl border border-black/5 p-4 min-w-0 " +
                                  (x.label === "ราคาพิเศษ" ? "bg-[color:var(--c-primary)]/5 border-transparent" : "bg-zinc-50")
                                }
                              >
                                <div className="text-xs text-zinc-500">{x.label}</div>
                                <div className={`mt-1 text-[clamp(1rem,1.8vw,1.25rem)] font-bold tracking-tight tabular-nums truncate ${x.label === "ราคาพิเศษ" ? "text-[color:var(--c-primary)]" : "text-zinc-900"}`}>
                                  ฿{formatTHB(x.value)}
                                </div>
                              </div>
                            )
                          )}
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                          <a href="https://m.me/nindaford" target="_blank" rel="noreferrer">
                            <Button variant="primary" className="w-full sm:w-auto">
                              ขอข้อเสนอเฉพาะของคุณ <ArrowRight className="h-4 w-4" />
                            </Button>
                          </a>
                          <a href={EVEREST_TREND_OFFER.offerUrl} target="_blank" rel="noreferrer">
                            <Button variant="outline" className="w-full sm:w-auto">ดูโปรฯ ทางการ (Ford)</Button>
                          </a>
                          <a href={EVEREST_TREND_OFFER.allOffersUrl} target="_blank" rel="noreferrer">
                            <Button variant="outline" className="w-full sm:w-auto">ดูรวมโปรฯ ทั้งหมด</Button>
                          </a>
                        </div>

                        <p className="mt-4 text-xs text-zinc-400">
                          * หมายเหตุ: เงื่อนไข/ระยะเวลาโปรฯ อาจเปลี่ยนได้ตามประกาศของ Ford Thailand
                        </p>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div>
                        <div className="text-base font-semibold text-zinc-900">อยากได้ “ข้อเสนอเฉพาะคุณ” ต้องมีอะไรบ้าง</div>
                        <ul className="mt-5 grid gap-3 text-sm">
                          {["พื้นที่จดทะเบียน", "สีที่ต้องการ", "ดาวน์/งบต่อเดือน", "อาชีพ/เอกสาร", "วันรับรถ"].map((t) => (
                            <li key={t} className="flex items-center gap-3 text-zinc-600">
                              <span className="flex-none rounded-full bg-[color:var(--c-soft)]/20 p-1 text-[color:var(--c-primary)]">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              </span>
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-8">
                        <a href="https://m.me/nindaford" target="_blank" rel="noreferrer">
                          <Button variant="outline" className="w-full justify-center py-3">ทัก Inbox เพื่อคุยรายละเอียด</Button>
                        </a>
                      </div>
                    </Card>
                  </div>
                </Section>

                {/* Features */}
                <Section
                  id="features"
                  title="ทำไมลูกค้าถึงเลือกนินดา"
                  subtitle="โฟกัสเรื่องที่ลูกค้าซื้อรถสนใจจริง ๆ: ตัวเลขชัด, ติดต่อไว, ดูแลเอกสาร, อัปเดตส่งมอบ"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    {FEATURE_DATA.map((f) => (
                      <Card key={f.title} className="p-6 transition-colors hover:border-[color:var(--c-primary)]/20">
                        <div className="flex items-start gap-4">
                          <span className="mt-1 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--c-cream)] text-[color:var(--c-primary)]">
                            <CheckCircle2 className="h-6 w-6" />
                          </span>
                          <div>
                            <div className="text-lg font-semibold text-zinc-900">{f.title}</div>
                            <div className="mt-2 text-sm text-zinc-600 leading-relaxed">{f.desc}</div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Section>

                {/* Reviews / Deliveries */}
                <Section
                  id="reviews"
                  title="ภาพส่งมอบความประทับใจ"
                  subtitle="ขอบคุณลูกค้าทุกท่านที่ไว้วางใจให้นินดาดูแลรถคันใหม่ของคุณ"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {DELIVERY_IMAGES.map((src, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="aspect-square rounded-2xl overflow-hidden border border-black/10 bg-white shadow-sm"
                      >
                        <img src={src} alt={`Delivery review ${i + 1}`} className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-10 text-center">
                    <a href="https://www.facebook.com/nindaford/" target="_blank" rel="noreferrer">
                      <Button variant="outline" className="rounded-full px-8">
                        ดูรีวิวเพิ่มเติมที่เพจ <ArrowRight className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </Section>

                <footer className="border-t border-black/5 bg-white/50 backdrop-blur-sm mt-20">
                  <div className="mx-auto max-w-7xl px-4 py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-[color:var(--c-primary)] text-white flex items-center justify-center">
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <div className="text-sm font-bold text-zinc-900">นินดาขายฟอร์ด</div>
                      </div>
                      <div className="text-xs text-zinc-500">
                        © 2026 — พร้อมใช้งานหน้าแรก
                      </div>
                    </div>
                  </div>
                </footer>
              </div>

              {/* RIGHT: Sidebar (Facebook Embed) */}
              <aside className="md:sticky md:top-24 h-fit">
                <Card className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">อัปเดตจากเพจ</div>
                      <div className="text-xs text-zinc-500">Timeline (Embed)</div>
                    </div>
                    <Pill className="border-black/10">Live</Pill>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-2xl border border-black/10 bg-white">
                    <iframe
                      title="NindaFord Facebook"
                      src={
                        "https://www.facebook.com/plugins/page.php?href=" +
                        encodeURIComponent("https://www.facebook.com/nindaford/") +
                        "&tabs=timeline&width=340&height=520&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
                      }
                      width="100%"
                      height={520}
                      style={{ border: "none", overflow: "hidden" }}
                      scrolling="no"
                      frameBorder={0}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />
                  </div>

                  <div className="mt-4 grid gap-2">
                    <a href="https://m.me/nindaford" target="_blank" rel="noreferrer">
                      <Button variant="primary" className="w-full justify-center">
                        ทัก Inbox <ArrowRight className="h-4 w-4" />
                      </Button>
                    </a>
                    <a href="https://www.facebook.com/nindaford/" target="_blank" rel="noreferrer">
                      <Button variant="outline" className="w-full justify-center">เปิดหน้าเพจ</Button>
                    </a>
                  </div>

                  <p className="mt-3 text-xs text-zinc-500">
                    หมายเหตุ: บางเบราว์เซอร์บล็อกคุกกี้อาจทำให้ Embed แสดงไม่เต็ม แต่ลิงก์ยังใช้งานได้
                  </p>
                </Card>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
