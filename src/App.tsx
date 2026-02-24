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
// 🎨 สีทั้งหมดถูกย้ายไปอยู่ที่ src/index.css (:root) แล้ว
// แก้ไขสีได้ที่ไฟล์เดียว ไม่ต้องมาแก้ที่นี่อีก!

// ---------- Small helpers (with tiny tests) ----------
function formatTHB(value: string | number) {
  const n = typeof value === "string" ? Number(value.replace(/,/g, "")) : value;
  if (Number.isNaN(n)) return String(value);
  return n.toLocaleString("th-TH");
}

(function runMiniTests() {
  try {

    console.assert(formatTHB("1249000") === "1,249,000", "formatTHB should format numeric strings");

    console.assert(formatTHB("1,249,000") === "1,249,000", "formatTHB should tolerate commas");

    console.assert(formatTHB(1397000) === "1,397,000", "formatTHB should format numbers");

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
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800 drop-shadow-sm">{title}</h2>
        {subtitle ? <p className="mt-3 text-base md:text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">{subtitle}</p> : null}
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
  { id: "calculator", label: "คำนวณค่างวด" },
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
  // --- Calculator State ---
  const [carPrice, setCarPrice] = React.useState<number>(1249000);
  const [downType, setDownType] = React.useState<"percent" | "amount">("percent");
  const [downPercent, setDownPercent] = React.useState<number>(25);
  const [downAmount, setDownAmount] = React.useState<number>(312250); // 25% of 1,249,000
  const [interestRate, setInterestRate] = React.useState<number>(2.99); // 2.99% fixed string fallback handling
  const [months, setMonths] = React.useState<number>(84);

  // Sync downPercent <-> downAmount when carPrice changes or user toggles
  React.useEffect(() => {
    if (downType === "percent") {
      setDownAmount(Math.round(carPrice * (downPercent / 100)));
    } else {
      setDownPercent(Math.round((downAmount / carPrice) * 100));
    }
  }, [carPrice, downPercent, downAmount, downType]);

  // Handle Percentage change from Range Slider
  const handleDownPercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const p = Number(e.target.value);
    setDownType("percent");
    setDownPercent(p);
  };

  // Safe Calculator math
  const financeAmount = Math.max(0, carPrice - downAmount); // ยอดจัดไฟแนนซ์
  const totalInterest = financeAmount * (interestRate / 100) * (months / 12);
  const totalFinance = financeAmount + totalInterest;
  const monthlyInstallment = months > 0 ? Math.ceil(totalFinance / months) : 0;

  return (
    <div className="min-h-screen text-zinc-800 bg-[color:var(--c-bg)] selection:bg-[color:var(--c-primary)] selection:text-white">
      {/* Top Nav */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-900/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            <a href="#" className="flex items-center gap-2.5 group">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 shadow-sm ring-1 ring-white/20 text-white group-hover:scale-105 transition-transform">
                <Sparkles className="h-4.5 w-4.5" />
              </span>
              <div className="leading-tight">
                <span className="font-bold text-base tracking-tight text-white block">นินดาขายฟอร์ด</span>
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
              <a className="md:hidden rounded-xl p-2 text-slate-300 hover:bg-white/10" href="#offers">
                <span className="text-sm font-medium">เมนู</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden bg-slate-900 pb-16 pt-8 md:pt-16 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-2xl z-20">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[color:var(--c-primary)]/20 blur-[100px] mix-blend-screen" />
            <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-[color:var(--c-secondary)]/15 blur-[80px] mix-blend-screen" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
            {/* HERO CONTENT */}
            <div className="max-w-7xl">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Pill className="bg-white/10 text-white border-white/20 shadow-sm backdrop-blur">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--c-secondary)]" />
                      โปรฯ อัปเดตตลอด
                    </Pill>
                    <Pill className="bg-white/10 text-white border-white/20 shadow-sm backdrop-blur">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--c-secondary)]" />
                      ทำข้อเสนอเฉพาะคุณ
                    </Pill>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                    นินดาขายฟอร์ด <br />
                    <span className="text-[color:var(--c-secondary)] md:text-5xl">โปรฯ ฟอร์ดอัปเดต</span>
                  </h1>

                  <div className="mt-4 text-xl md:text-2xl font-medium text-slate-300">
                    จองรถ • ทดลองขับ • ขอใบเสนอราคา ได้ไว
                  </div>

                  <p className="mt-6 text-base md:text-lg text-slate-400 max-w-lg leading-relaxed mix-blend-lighten">
                    สรุปโปรฯ และตัวเลขสำคัญแบบอ่านง่าย พร้อมทางลัดติดต่อ <span className="font-semibold text-white">Inbox/โทร</span> เพื่อทำข้อเสนอเฉพาะคุณ
                    (ดาวน์/ผ่อน/ของแถม) ได้ทันที
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <a href="https://m.me/nindaford" target="_blank" rel="noreferrer">
                      <Button variant="primary" className="w-full sm:w-auto px-8 py-3.5 text-base rounded-2xl shadow-[0_8px_30px_rgb(29,78,216,0.3)]">
                        ขอโปร/ใบเสนอราคา <ArrowRight className="h-4 w-4" />
                      </Button>
                    </a>
                    <a href="#offers">
                      <Button variant="outline" className="w-full sm:w-auto px-8 py-3.5 text-base rounded-2xl bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm">
                        ดูโปรฯ Everest Trend
                      </Button>
                    </a>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {["Ranger", "Everest", "Raptor"].map(tag => (
                      <span key={tag} className="inline-flex items-center px-3 py-1 rounded-md bg-white/10 text-xs font-medium text-slate-300 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.05 }}>
                  <Card className="p-6 md:p-8 shadow-2xl shadow-black/20 ring-1 ring-white/10 bg-white/95 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-zinc-900">ติดต่อด่วน (Quick CTA)</div>
                        <div className="text-xs text-zinc-500">กดแล้วทักแชทได้ทันที</div>
                      </div>
                      <Pill className="border-black/5 bg-slate-100 text-slate-800">
                        <Sparkles className="h-4 w-4 text-[color:var(--c-accent)]" />
                        Fast
                      </Pill>
                    </div>

                    <div className="mt-6 grid gap-3">
                      <a href="https://m.me/nindaford" target="_blank" rel="noreferrer">
                        <Button variant="primary" className="w-full justify-between py-3.5 rounded-xl text-base shadow-lg shadow-[color:var(--c-primary)]/20 hover:scale-[1.02] transition-transform">
                          ขอใบเสนอราคา <ArrowRight className="h-4.5 w-4.5" />
                        </Button>
                      </a>
                      <a href="https://m.me/nindaford" target="_blank" rel="noreferrer">
                        <Button variant="outline" className="w-full justify-center py-3 rounded-xl border-black/10 text-zinc-700 bg-white hover:bg-zinc-50 font-medium">ทัก Inbox เพจ</Button>
                      </a>
                      <a href="https://www.facebook.com/nindaford/" target="_blank" rel="noreferrer">
                        <Button variant="outline" className="w-full justify-center py-3 rounded-xl border-black/10 text-zinc-700 bg-white hover:bg-zinc-50 font-medium">เปิดดูเพจ Facebook</Button>
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
            </div>
          </div>
        </section>

        {/* --- MAIN PAGE CONTENT --- */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10 mt-8 mb-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:items-start">
            {/* LEFT (Offers, Features, Calculator) */}
            <div className="min-w-0">

              {/* Everest Trend Offer */}
              {/* Everest Trend Offer */}
              <Section
                id="offers"
                title="โปรฯ กลาง — Everest Trend"
                subtitle="อ้างอิงโปรฯ ทางการจาก Ford Thailand (กดลิงก์เพื่อดูเงื่อนไข/ระยะเวลาล่าสุด)"
              >
                <div className="flex flex-col gap-8">
                  <Card className="p-6 md:p-8 shadow-sm ring-1 ring-slate-900/5 bg-white hover:shadow-lg hover:ring-slate-900/10 transition-all duration-300">
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

                      <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <a href="https://m.me/nindaford" target="_blank" rel="noreferrer">
                          <Button variant="primary" className="w-full sm:w-auto py-3 rounded-xl shadow-md shadow-[color:var(--c-primary)]/20">
                            ขอข้อเสนอเฉพาะของคุณ <ArrowRight className="h-4 w-4" />
                          </Button>
                        </a>
                        <a href={EVEREST_TREND_OFFER.offerUrl} target="_blank" rel="noreferrer">
                          <Button variant="outline" className="w-full sm:w-auto py-3 rounded-xl bg-slate-50 border-black/5 hover:bg-slate-100">ดูโปรฯ ทางการ (Ford)</Button>
                        </a>
                        <a href={EVEREST_TREND_OFFER.allOffersUrl} target="_blank" rel="noreferrer">
                          <Button variant="outline" className="w-full sm:w-auto py-3 rounded-xl bg-slate-50 border-black/5 hover:bg-slate-100">ดูรวมโปรฯ ทั้งหมด</Button>
                        </a>
                      </div>

                      <p className="mt-4 text-xs text-zinc-400">
                        * หมายเหตุ: เงื่อนไข/ระยะเวลาโปรฯ อาจเปลี่ยนได้ตามประกาศของ Ford Thailand
                      </p>
                    </div>
                  </Card>

                  <Card className="p-6 md:p-8 shadow-sm ring-1 ring-slate-900/5 bg-gradient-to-br from-white to-slate-50/50 hover:shadow-md hover:ring-slate-900/10 transition-all duration-300">
                    <div>
                      <div className="text-lg font-bold text-slate-800">อยากได้ “ข้อเสนอเฉพาะคุณ” ต้องเตรียมข้อมูลอะไรบ้าง?</div>
                      <ul className="mt-5 grid gap-4 text-sm md:text-base">
                        {["พื้นที่รับรถ (จังหวัดจดทะเบียน)", "สีที่ต้องการ (มีผลต่อตัวรถในสต๊อก)", "เงินดาวน์ หรือ งบผ่อนต่อเดือนที่ตั้งไว้", "อาชีพ/รายได้ (เพื่อประเมินไฟแนนซ์)", "ระบุเดือนที่สะดวกรับรถ"].map((t) => (
                          <li key={t} className="flex items-start gap-3 text-slate-600">
                            <span className="flex-none rounded-full bg-[color:var(--c-primary)]/10 p-1.5 text-[color:var(--c-primary)] mt-0.5">
                              <CheckCircle2 className="h-4 w-4" />
                            </span>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-8">
                      <a href="https://m.me/nindaford" target="_blank" rel="noreferrer">
                        <Button variant="outline" className="w-full justify-center py-3.5 rounded-xl border-[color:var(--c-primary)]/20 text-[color:var(--c-primary)] hover:bg-[color:var(--c-primary)]/5 font-semibold text-base">ทัก Inbox รับข้อเสนอทันที</Button>
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
                <div className="grid gap-6 md:grid-cols-2">
                  {FEATURE_DATA.map((f) => (
                    <Card key={f.title} className="p-6 md:p-8 shadow-sm bg-white ring-1 ring-slate-900/5 hover:-translate-y-1 hover:shadow-md hover:ring-slate-900/10 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row items-start gap-5">
                        <span className="flex-none mt-1 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--c-soft)] text-[color:var(--c-primary)] shadow-inner">
                          <CheckCircle2 className="h-7 w-7" />
                        </span>
                        <div>
                          <div className="text-xl font-bold text-slate-900">{f.title}</div>
                          <div className="mt-2.5 text-base text-slate-500 leading-relaxed">{f.desc}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Section>

              {/* Calculator */}
              <Section
                id="calculator"
                title="ประเมินค่างวดรถเบื้องต้น"
                subtitle="ลองปรับตัวเลขเพื่อหาค่างวดที่เหมาะกับคุณ (ค่างวดจริงอาจแตกต่างเล็กน้อยตามแคมเปญไฟแนนซ์แต่ละเดือน)"
              >
                <Card className="p-6 md:p-10 border-none shadow-2xl shadow-[color:var(--c-primary)]/10 ring-1 ring-slate-900/5 bg-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-40 w-40 bg-[color:var(--c-soft)] blur-[60px] opacity-60 pointer-events-none rounded-full"></div>
                  <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:items-start relative z-10">
                    {/* Left: Input Form */}
                    <div className="flex flex-col gap-8 mt-2">

                      {/* Car Price */}
                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-3">ราคารถ (บาท)</label>
                        <div className="relative">
                          <input
                            type="number"
                            min={0}
                            value={carPrice}
                            onChange={(e) => setCarPrice(Number(e.target.value))}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-5 pr-12 py-4 text-xl font-bold text-slate-900 outline-none focus:border-[color:var(--c-primary)] focus:bg-white focus:ring-4 focus:ring-[color:var(--c-primary)]/10 transition-all font-sans shadow-inner"
                          />
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 font-bold text-lg">฿</div>
                        </div>
                      </div>

                      {/* Down Payment */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-sm font-bold text-slate-800">เงินดาวน์</label>
                          <div className="flex items-center rounded-xl bg-slate-100 p-1">
                            <button
                              type="button"
                              onClick={() => setDownType("percent")}
                              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${downType === "percent" ? "bg-white text-slate-900 shadow-md ring-1 ring-black/5" : "text-slate-500 hover:text-slate-700 hover:bg-black/5"}`}
                            >
                              % เปอร์เซ็นต์
                            </button>
                            <button
                              type="button"
                              onClick={() => setDownType("amount")}
                              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${downType === "amount" ? "bg-white text-slate-900 shadow-md ring-1 ring-black/5" : "text-slate-500 hover:text-slate-700 hover:bg-black/5"}`}
                            >
                              บาท
                            </button>
                          </div>
                        </div>

                        {downType === "amount" ? (
                          <div className="relative mb-6">
                            <input
                              type="number"
                              min={0}
                              value={downAmount}
                              onChange={(e) => {
                                setDownType("amount");
                                setDownAmount(Number(e.target.value));
                              }}
                              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-5 pr-12 py-4 text-xl font-bold text-slate-900 outline-none focus:border-[color:var(--c-primary)] focus:bg-white focus:ring-4 focus:ring-[color:var(--c-primary)]/10 transition-all font-sans shadow-inner"
                            />
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 font-bold text-lg">฿</div>
                          </div>
                        ) : (
                          <div className="relative mb-6">
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={downPercent}
                              onChange={(e) => {
                                setDownType("percent");
                                setDownPercent(Number(e.target.value));
                              }}
                              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-5 pr-12 py-4 text-xl font-bold text-slate-900 outline-none focus:border-[color:var(--c-primary)] focus:bg-white focus:ring-4 focus:ring-[color:var(--c-primary)]/10 transition-all font-sans shadow-inner"
                            />
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 font-bold text-lg">%</div>
                          </div>
                        )}

                        {/* Slider for quick adjustments */}
                        <div className="px-1 mt-2">
                          <input
                            type="range"
                            min="0" max="50" step="5"
                            value={downPercent}
                            onChange={handleDownPercentChange}
                            className="w-full accent-[color:var(--c-primary)] h-1.5 rounded-lg appearance-none bg-black/10 cursor-pointer"
                          />
                          <div className="relative h-4 mt-2 text-[11px] text-zinc-400 font-medium px-1">
                            <span className="absolute left-1">0%</span>
                            <span className="absolute left-[30%] -translate-x-1/2">15%</span>
                            <span className="absolute left-[50%] -translate-x-1/2">25%</span>
                            <span className="absolute right-1">50%</span>
                          </div>
                        </div>
                      </div>

                      {/* Details (Interest + Duration) */}
                      <div className="grid grid-cols-2 gap-5 mt-4">
                        <div className="flex flex-col">
                          <label className="text-sm font-bold text-slate-800 mb-3 whitespace-nowrap">ดอกเบี้ย/ปี</label>
                          <div className="relative flex-1">
                            <input
                              type="number"
                              step="0.01"
                              min={0}
                              value={interestRate}
                              onChange={(e) => setInterestRate(Number(e.target.value))}
                              className="w-full h-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-5 pr-12 py-4 text-base font-bold text-slate-900 outline-none focus:border-[color:var(--c-primary)] focus:bg-white focus:ring-4 focus:ring-[color:var(--c-primary)]/10 transition-all font-sans shadow-inner"
                            />
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 font-bold">%</div>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm font-bold text-slate-800 mb-3 whitespace-nowrap">ระยะเวลา</label>
                          <div className="relative flex-1">
                            <select
                              value={months}
                              onChange={(e) => setMonths(Number(e.target.value))}
                              className="w-full h-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-5 pr-10 py-4 text-base font-bold text-slate-900 outline-none focus:border-[color:var(--c-primary)] focus:bg-white focus:ring-4 focus:ring-[color:var(--c-primary)]/10 transition-all cursor-pointer font-sans appearance-none shadow-inner"
                            >
                              <option value={48}>48 งวด (4 ปี)</option>
                              <option value={60}>60 งวด (5 ปี)</option>
                              <option value={72}>72 งวด (6 ปี)</option>
                              <option value={84}>84 งวด (7 ปี)</option>
                            </select>
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                              <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Right: Summary Result */}
                    <div className="rounded-3xl bg-[color:var(--c-primary)] text-white p-8 md:p-10 flex flex-col h-full justify-center relative overflow-hidden shadow-2xl shadow-[color:var(--c-primary)]/30">

                      <div className="absolute -top-[120px] -right-[120px] h-[300px] w-[300px] rounded-full bg-white/10 blur-3xl pointer-events-none"></div>

                      <div className="text-center relative z-10 pt-2">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 mb-6 border border-white/20 shadow-sm backdrop-blur-sm">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--c-accent)] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[color:var(--c-accent)]"></span>
                          </span>
                          <span className="text-sm font-bold text-white tracking-wide">ยอดผ่อนชำระประมาณการ</span>
                        </div>

                        <div className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold text-white tabular-nums tracking-tight leading-none mb-2">
                          <span className="text-[color:var(--c-soft)]/70 text-2xl md:text-3xl font-medium mr-1.5 align-top mt-2 inline-block">฿</span>
                          <span className="drop-shadow-sm">{formatTHB(monthlyInstallment)}</span>
                        </div>
                        <div className="text-base font-medium text-white/70">ต่อเดือน</div>
                      </div>

                      <div className="mt-10 space-y-4 relative z-10 flex-1">
                        <div className="flex justify-between items-center pb-4 border-b border-white/10">
                          <div className="text-sm text-white/70">ราคารถยนต์</div>
                          <div className="font-bold text-white tracking-wide">฿{formatTHB(carPrice)}</div>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-white/10">
                          <div className="text-sm text-white/70">ยอดเงินดาวน์ ({downPercent}%)</div>
                          <div className="font-bold text-white tracking-wide">฿{formatTHB(downAmount)}</div>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-white/10">
                          <div className="text-sm text-white/70">ยอดจัดไฟแนนซ์</div>
                          <div className="font-bold text-white tracking-wide">฿{formatTHB(financeAmount)}</div>
                        </div>
                        <div className="flex justify-between items-center text-[color:var(--c-accent)] font-bold">
                          <div className="text-sm">ดอกเบี้ยรวม ({months} งวด)</div>
                          <div>฿{formatTHB(Math.ceil(totalInterest))}</div>
                        </div>
                      </div>

                      <div className="mt-10 relative z-10">
                        <a href={`https://m.me/nindaford?text=${encodeURIComponent(`สนใจให้ทำใบเสนอราคา\nราคารถ: ${formatTHB(carPrice)} บ.\nดาวน์: ${downPercent}% (${formatTHB(downAmount)} บ.)\nผ่อน: ${months} งวด\n(รบกวนคำนวณดอกเบี้ยจริงให้หน่อยครับ/ค่ะ)`)}`} target="_blank" rel="noreferrer" className="block w-full group">
                          <Button variant="outline" className="w-full py-4 text-[16px] rounded-2xl bg-white text-[color:var(--c-primary)] shadow-xl hover:scale-[1.02] transition-transform font-bold border-transparent">
                            ทักแชทพร้อมยอดนี้ <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </a>
                        <p className="mt-5 text-[11px] text-white/50 text-center leading-relaxed px-2">
                          * การคำนวณเบื้องต้นแบบ Flat Rate ยังไม่รวมประกันภัยและรายละเอียดอื่น ยอดผ่อนและดอกเบี้ยจริงขึ้นอยู่กับการอนุมัติของไฟแนนซ์
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Section>

              {/* Reviews / Deliveries */}
              <Section
                id="reviews"
                title="ภาพส่งมอบความประทับใจ"
                subtitle="ขอบคุณลูกค้าทุกท่านที่ไว้วางใจให้นินดาดูแลรถคันใหม่ของคุณ"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {DELIVERY_IMAGES.map((src, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-sm ring-1 ring-slate-900/5 bg-white relative group cursor-pointer"
                    >
                      <img src={src} alt={`Delivery review ${i + 1}`} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-12 text-center">
                  <a href="https://www.facebook.com/nindaford/" target="_blank" rel="noreferrer">
                    <Button variant="outline" className="rounded-2xl px-10 py-3 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-slate-700">
                      ดูรีวิวเพิ่มเติมที่เพจ <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </Section>

            </div>

            {/* RIGHT: Sidebar (Facebook Embed) */}
            <aside className="md:sticky md:top-24 h-fit">
              <Card className="p-6 md:p-8 shadow-sm ring-1 ring-slate-900/5 rounded-[2rem] bg-gradient-to-br from-white to-slate-50/50 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-base font-bold text-slate-800">อัปเดตจากเพจ</div>
                    <div className="text-xs text-slate-500 mt-1">Timeline (Embed)</div>
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
      </main>

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
              © 2026 — นินดาขายฟอร์ด
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
