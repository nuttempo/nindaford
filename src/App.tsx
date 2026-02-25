import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, Phone, MapPin, Clock, MessageCircle, Star, ChevronDown } from "lucide-react";

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
  <section id={id} className="scroll-mt-20 py-10 md:py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="mb-8 md:mb-12 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gradient">{title}</h2>
        {subtitle ? <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">{subtitle}</p> : null}
        <div className="section-divider mx-auto mt-5 w-24 md:w-32"></div>
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
  { id: "offers", label: "โปรฯ Everest" },
  { id: "models", label: "รุ่นอื่นๆ" },
  { id: "features", label: "จุดเด่น" },
  { id: "calculator", label: "คำนวณค่างวด" },
  { id: "reviews", label: "รีวิว" },
  { id: "contact", label: "ติดต่อ" },
];

const STATS = [
  { value: "200+", label: "คันที่ส่งมอบแล้ว" },
  { value: "5★", label: "คะแนนรีวิวเฉลี่ย" },
  { value: "<5 นาที", label: "ตอบกลับใน" },
  { value: "10+", label: "ปีประสบการณ์" },
];

const OTHER_MODELS = [
  {
    name: "Ford Ranger XLS 2.0L",
    badge: "Ranger",
    tagline: "กระบะ 4 ประตู ดุดัน พร้อมทุกเส้นทาง ราคาเริ่มต้น 814,000 บาท",
    normalPrice: "814,000",
    specialPrice: "814,000",
    save: "ติดต่อสอบถาม",
    highlights: ["2.0L Turbo 170 แรงม้า", "เกียร์อัตโนมัติ 6 สปีด 4x2", "SYNC 4A 10.1\" Apple CarPlay", "ล้ออัลลอย 17\" ถุงลม 6 จุด"],
    color: "from-emerald-600 to-teal-500",
  },
  {
    name: "Ford Ranger Raptor V6 3.0L",
    badge: "Raptor",
    tagline: "สุดยอดสมรรถนะ V6 EcoBoost® เทอร์โบคู่ 397 แรงม้า ราคาเริ่มต้น 1,804,000 บาท",
    normalPrice: "1,804,000",
    specialPrice: "1,804,000",
    save: "ติดต่อสอบถาม",
    highlights: ["V6 3.0L EcoBoost® 397 แรงม้า", "4WD เกียร์อัตโนมัติ 10 สปีด", "โช้ค FOX 2.5\" Live Valve", "ยาง BFGoodrich K02 285/70 R17"],
    color: "from-orange-600 to-red-500",
  },
  {
    name: "Ford Ranger Wildtrak",
    badge: "Wildtrak",
    tagline: "ออฟโร้ดระดับพรีเมียม ครบครัน ราคาเริ่มต้น 1,534,000 บาท",
    normalPrice: "1,534,000",
    specialPrice: "1,534,000",
    save: "ติดต่อสอบถาม",
    highlights: ["2.0L Turbo / V6 3.0L 4WD", "SYNC 4A 12\" Apple CarPlay", "ถุงลม 7 จุด + ชาร์จไร้สาย", "ฝาท้าย Easy Lift + ช่อง 230V"],
    color: "from-blue-700 to-cyan-500",
  },
  {
    name: "Ford Ranger Sport 4x4",
    badge: "Sport",
    tagline: "สปอร์ตสุด 4x4 6 โหมดขับขี่ ราคาเริ่มต้น 1,089,000 บาท",
    normalPrice: "1,089,000",
    specialPrice: "1,089,000",
    save: "ติดต่อสอบถาม",
    highlights: ["2.0L Turbo 170 แรงม้า 4x4", "SYNC 4A 10.1\" Apple CarPlay", "6 โหมดขับขี่ + สตาร์ทไร้กุญแจ", "ชุดแต่งสปอร์ต ฝาท้าย Easy Lift"],
    color: "from-violet-700 to-purple-500",
  },
];

const TESTIMONIALS = [
  { name: "คุณสมชาย", role: "เจ้าของธุรกิจ", car: "Everest Trend", rating: 5, text: "นินดาช่วยดูแลเรื่องไฟแนนซ์ทุกขั้นตอน ตั้งแต่เช็กเครดิตยันรับรถ ติดต่อง่าย ตอบไว ประทับใจมากครับ" },
  { name: "คุณมินตรา", role: "พยาบาล", car: "Ranger XLS", rating: 5, text: "ถามเรื่องดาวน์เยอะมาก นินดาตอบทุกคำถามอย่างละเอียด ได้ราคาและของแถมที่พอใจ จะแนะนำเพื่อนต่อแน่นอนค่ะ" },
  { name: "คุณวิชัย", role: "ผู้รับเหมา", car: "Ranger Raptor", rating: 5, text: "ซื้อ Raptor ผ่านนินดา ได้โปรพิเศษที่ดีกว่าโชว์รูมหลายหมื่น อัปเดตสถานะตลอด รับรถเร็วกว่าที่คิด 2 สัปดาห์ครับ" },
];

const FAQS = [
  { q: "ต้องใช้เอกสารอะไรบ้างในการยื่นไฟแนนซ์?", a: "พนักงานประจำ: บัตรประชาชน + สลิปเงินเดือน 1-3 เดือน + statement 3-6 เดือน\nเจ้าของกิจการ: บัตรประชาชน + ทะเบียนพาณิชย์ + statement 6 เดือน" },
  { q: "ดาวน์ขั้นต่ำเท่าไหร่?", a: "โดยทั่วไปอยู่ที่ 15-20% ขึ้นอยู่กับโปรแกรมไฟแนนซ์แต่ละเดือน บางแคมเปญอาจดาวน์ต่ำกว่านั้นได้ ทักมาคุยเพื่อหาตัวเลขที่เหมาะกับงบได้เลย" },
  { q: "ซื้อผ่านนินดาต่างจากไปซื้อที่โชว์รูมโดยตรงอย่างไร?", a: "นินดาช่วยทำข้อเสนอเฉพาะบุคคล ดูแลเรื่องเอกสาร ติดตามสถานะรถ และช่วยเจรจาของแถมและโปรพิเศษที่อาจไม่ได้ประกาศทั่วไป" },
  { q: "รอรถนานไหม?", a: "บางรุ่นมีสต๊อกพร้อมส่งทันที บางรุ่นรอ 4-8 สัปดาห์ ทักมาเช็กสต๊อกก่อนได้เลยค่ะ" },
  { q: "ทดลองขับได้ไหม?", a: "ได้เลยค่ะ! ทักนัดวันเวลาที่สะดวก นินดาจะจัดรถทดลองขับให้ถึงที่ หรือนัดที่โชว์รูมก็ได้" },
  { q: "ซื้อรถใหม่ต้องเสียภาษีอะไรบ้าง?", a: "รถใหม่ป้ายแดงเสียภาษีสรรพสามิตและภาษีแสตมป์รถยนต์ ชำระครั้งเดียว (รวมท้ายอยู่ในราคาโครงผู้ผลิตแล้ว) มีค่าโอน ค่าจดทะเบียน และค่าประกันภัยแยกต่างหาก ทักมาถามรายละเอียดได้ค่ะ" },
  { q: "ผ่อนได้นานแค่ไหน?", a: "โดยทั่วไปอยู่ที่ 48-84 งวด (4-7 ปี) ขึ้นอยู่กับโปรแกรมไฟแนนซ์แต่ละรอบ ผ่อนนานกว่า ค่างวดลดลง แต่ดอกเบี้ยรวมสูงขึ้น นินดาจะช่วยวิเคราะห์ว่าเหมาะกับคุณที่สุดค่ะ" },
];

function FaqAccordion({ q, a }: { q: string; a: string }) {
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

const FORD_MODELS = [
  // Everest
  { name: "Everest 2.0L Turbo Trend 4x2 6AT", price: 1397000 },
  { name: "Everest 2.0L Turbo Sport 4x2 6AT", price: 1527000 },
  { name: "Everest 2.0L Turbo Sport 4x2 6AT (Special Edition)", price: 1619000 },
  { name: "Everest 2.0L Bi-Turbo Titanium+ 4x2 10AT", price: 1767000 },
  { name: "Everest 2.0L Bi-Turbo Titanium+ 4x4 10AT", price: 1917000 },
  { name: "Everest 2.0L Bi-Turbo Wildtrak 4x4 10AT", price: 1942000 },
  { name: "Everest 3.0L V6 Turbo Platinum 4WD 10AT", price: 2284000 },
  // Ranger XL / XLS
  { name: "Ranger Standard Cab XL 2.0L Turbo 4x4 6MT", price: 732000 },
  { name: "Ranger Open Cab XL+ 2.0L Turbo HR 6MT", price: 734000 },
  { name: "Ranger Open Cab XLS 2.0L Turbo HR 6AT", price: 814000 },
  { name: "Ranger Double Cab XLS 2.0L Turbo HR 6AT", price: 924000 },
  { name: "Ranger Double Cab XLS 2.0L Turbo HR 6AT (Extra Pack)", price: 934000 },
  // Ranger Sport / Wildtrak / SWB
  { name: "Ranger SWB 2.0L Bi-turbo 4x4 10AT", price: 919000 },
  { name: "Ranger Double Cab Sport 2.0L Turbo HR 6AT", price: 999000 },
  { name: "Ranger Double Cab Sport 2.0L Turbo 4x4 6AT", price: 1089000 },
  { name: "Ranger Double Cab Wildtrak 2.0L Turbo HR 6AT", price: 1094000 },
  { name: "Ranger Double Cab Wildtrak 2.0L Turbo HR 6AT (Extra Pack)", price: 1104000 },
  { name: "Ranger Double Cab Wildtrak 3.0L V6 Turbo 4WD 10AT", price: 1534000 },
  // Ranger Stormtrak
  { name: "Ranger Double Cab Stormtrak 2.0L Bi-Turbo HR 10AT", price: 1294000 },
  { name: "Ranger Double Cab Stormtrak 2.0L Bi-Turbo 4x4 10AT", price: 1429000 },
  // Ranger Raptor
  { name: "Ranger Double Cab Raptor 2.0L Bi-Turbo 4WD 10AT", price: 1804000 },
  { name: "Ranger Double Cab Raptor 3.0L V6 Twin-Turbo EcoBoost 4WD 10AT", price: 1984000 },
];

export default function WebsiteStarter() {
  // --- Calculator State ---
  const [selectedModelIndex, setSelectedModelIndex] = React.useState<number>(0);
  const carPrice = FORD_MODELS[selectedModelIndex].price;
  const [downType, setDownType] = React.useState<"percent" | "amount">("percent");
  const [downPercent, setDownPercent] = React.useState<number>(25);
  const [downAmount, setDownAmount] = React.useState<number>(Math.round(FORD_MODELS[0].price * 0.25));
  const [interestRate, setInterestRate] = React.useState<number>(2.99);
  const [months, setMonths] = React.useState<number>(84);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (downType === "percent") {
      setDownAmount(Math.round(carPrice * (downPercent / 100)));
    } else {
      setDownPercent(Math.round((downAmount / carPrice) * 100));
    }
  }, [carPrice, downPercent, downAmount, downType]);

  const handleDownPercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const p = Number(e.target.value);
    setDownType("percent");
    setDownPercent(p);
  };

  const financeAmount = Math.max(0, carPrice - downAmount);
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
              {/* Hamburger */}
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

          {/* Mobile dropdown menu */}
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

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-[color:var(--c-primary)]/30 pb-20 pt-10 md:pt-20 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-2xl z-20">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-[color:var(--c-primary)]/25 blur-[120px] mix-blend-screen animate-pulse" />
            <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[color:var(--c-secondary)]/20 blur-[100px] mix-blend-screen" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-[color:var(--c-accent)]/8 blur-[80px] mix-blend-screen" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.07]"></div>
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

                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                    นินดาขายฟอร์ด <br />
                    <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent sm:text-4xl md:text-5xl">โปรฯ ฟอร์ดอัปเดต</span>
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
                    <a href="tel:0959608274">
                      <Button variant="outline" className="w-full sm:w-auto px-8 py-3.5 text-base rounded-2xl bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm">
                        <Phone className="h-4 w-4" /> โทรเลย
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
                  <Card className="p-6 md:p-8 shadow-2xl shadow-black/20 ring-1 ring-white/10 bg-white/90 backdrop-blur-2xl">
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

              {/* Stats */}
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {STATS.map((s) => (
                  <div key={s.label} className="rounded-2xl bg-white border border-black/5 shadow-sm p-5 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="text-3xl font-extrabold text-gradient tracking-tight">{s.value}</div>
                    <div className="mt-1 text-xs text-zinc-500 font-medium">{s.label}</div>
                  </div>
                ))}
              </motion.div>

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
                          <div className="mt-3 text-lg font-bold text-zinc-900 break-words">{EVEREST_TREND_OFFER.name}</div>
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
                              <div className={`mt-1 text-base font-bold tracking-tight tabular-nums truncate ${x.label === "ราคาพิเศษ" ? "text-[color:var(--c-primary)]" : "text-zinc-900"}`}>
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
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
                  {FEATURE_DATA.map((f, i) => (
                    <Card key={f.title} className="p-6 md:p-8 shadow-sm bg-gradient-to-br from-white to-slate-50 ring-1 ring-slate-900/5 hover:-translate-y-1.5 hover:shadow-xl hover:ring-[color:var(--c-primary)]/20 transition-all duration-300 group">
                      <div className="flex flex-col sm:flex-row items-start gap-5">
                        <span className="flex-none mt-1 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--c-primary)] to-[color:var(--c-secondary)] text-white shadow-lg shadow-[color:var(--c-primary)]/20 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-lg font-bold">0{i + 1}</span>
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
                <Card className="glow-ring p-6 md:p-10 border-none shadow-2xl shadow-[color:var(--c-primary)]/10 ring-1 ring-slate-900/5 bg-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-40 w-40 bg-[color:var(--c-soft)] blur-[60px] opacity-60 pointer-events-none rounded-full"></div>
                  <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:items-start relative z-10">
                    {/* Left: Input Form */}
                    <div className="flex flex-col gap-8 mt-2">

                      {/* Car Model Select */}
                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-3">เลือกรุ่นรถ</label>
                        <div className="relative">
                          <select
                            value={selectedModelIndex}
                            onChange={(e) => {
                              setSelectedModelIndex(Number(e.target.value));
                              setDownType("percent");
                            }}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-5 pr-10 py-4 text-base md:text-lg font-bold text-slate-900 outline-none focus:border-[color:var(--c-primary)] focus:bg-white focus:ring-4 focus:ring-[color:var(--c-primary)]/10 transition-all cursor-pointer font-sans appearance-none shadow-inner"
                          >
                            {FORD_MODELS.map((model, idx) => (
                              <option key={idx} value={idx}>
                                {model.name} — ฿{formatTHB(model.price)}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </div>
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
                        <a href={`https://m.me/nindaford?text=${encodeURIComponent(`สนใจให้ทำใบเสนอราคา\nรุ่นรถ: ${FORD_MODELS[selectedModelIndex].name}\nราคารถ: ${formatTHB(carPrice)} บ.\nดาวน์: ${downPercent}% (${formatTHB(downAmount)} บ.)\nผ่อน: ${months} งวด\n(รบกวนคำนวณเรทดอกเบี้ย ${interestRate}% ให้หน่อยค่ะ)`)}`} target="_blank" rel="noreferrer" className="block w-full group">
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

              {/* Ranger & Raptor */}
              <Section id="models" title="รุ่นรถอื่นๆ ที่น่าสนใจ" subtitle="ไม่ใช่แค่ Everest — นินดาดูแลทุกรุ่น ทุกโปร พร้อมทำข้อเสนอเฉพาะคุณ">
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
                  {OTHER_MODELS.map((m) => (
                    <Card key={m.name} className="overflow-hidden shadow-sm ring-1 ring-slate-900/5 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                      <div className={`h-3 bg-gradient-to-r ${m.color}`} />
                      <div className="p-6">
                        <Pill className={`bg-gradient-to-r ${m.color} text-white border-transparent mb-3`}>{m.badge}</Pill>
                        <div className="text-xl font-bold text-zinc-900">{m.name}</div>
                        <div className="mt-1 text-sm text-zinc-500 mb-4">{m.tagline}</div>
                        <ul className="mb-5 grid grid-cols-2 gap-2">
                          {m.highlights.map((h) => (
                            <li key={h} className="flex items-center gap-2 text-sm text-zinc-600">
                              <CheckCircle2 className="h-4 w-4 flex-none text-[color:var(--c-primary)]" />{h}
                            </li>
                          ))}
                        </ul>
                        <div className="grid grid-cols-3 gap-2 mb-5">
                          {[{ label: "ราคาปกติ", value: m.normalPrice }, { label: "ราคาพิเศษ", value: m.specialPrice }, { label: "ส่วนลด", value: m.save }].map((x) => (
                            <div key={x.label} className={`rounded-xl border border-black/5 p-3 ${x.label === "ราคาพิเศษ" ? "bg-[color:var(--c-primary)]/5" : "bg-zinc-50"}`}>
                              <div className="text-[10px] text-zinc-400">{x.label}</div>
                              <div className={`mt-0.5 text-xs font-bold truncate ${x.label === "ราคาพิเศษ" ? "text-[color:var(--c-primary)]" : "text-zinc-800"}`}>฿{formatTHB(x.value)}</div>
                            </div>
                          ))}
                        </div>
                        <a href="https://m.me/nindaford" target="_blank" rel="noreferrer">
                          <Button variant="primary" className="w-full py-3 rounded-xl">ขอข้อเสนอ {m.badge} <ArrowRight className="h-4 w-4" /></Button>
                        </a>
                      </div>
                    </Card>
                  ))}
                </div>
              </Section>

              {/* Testimonials */}
              <Section id="testimonials" title="ลูกค้าพูดถึงนินดา" subtitle="ความประทับใจจากลูกค้าที่ไว้วางใจให้นินดาดูแลรถคันใหม่">
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  {TESTIMONIALS.map((t, i) => (
                    <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <Card className="p-6 h-full flex flex-col shadow-sm ring-1 ring-slate-900/5 bg-gradient-to-br from-white to-slate-50/70 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center gap-1 mb-4">
                          {Array.from({ length: t.rating }).map((_, si) => <Star key={si} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                        </div>
                        <p className="flex-1 text-sm text-zinc-600 leading-relaxed italic">"{t.text}"</p>
                        <div className="mt-5 pt-4 border-t border-black/5 flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[color:var(--c-primary)] to-[color:var(--c-secondary)] flex items-center justify-center text-white font-bold text-base shadow-sm">{t.name.charAt(0)}</div>
                          <div>
                            <div className="text-sm font-semibold text-zinc-900">{t.name}</div>
                            <div className="text-xs text-zinc-500">{t.role} · {t.car}</div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </Section>

              {/* FAQ */}
              <Section id="faq" title="คำถามที่พบบ่อย" subtitle="ข้อสงสัยทั่วไปเกี่ยวกับการซื้อรถและไฟแนนซ์">
                <div className="max-w-3xl mx-auto grid gap-3">
                  {FAQS.map((faq, i) => <FaqAccordion key={i} q={faq.q} a={faq.a} />)}
                </div>
              </Section>

              {/* Contact */}
              <Section id="contact" title="ติดต่อนินดา" subtitle="พร้อมดูแลคุณทุกวัน ทักแชทหรือโทรมาได้เลย">
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  <a href="tel:0959608274" className="group">
                    <Card className="p-6 text-center shadow-sm ring-1 ring-slate-900/5 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--c-primary)] to-[color:var(--c-secondary)] text-white shadow-lg mb-4 group-hover:scale-110 transition-transform">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div className="font-bold text-zinc-900">โทร</div>
                      <div className="mt-1 text-sm text-zinc-500">095-960-8274</div>
                      <div className="text-xs text-[color:var(--c-primary)] font-medium mt-0.5">กดเพื่อโทรทันที</div>
                    </Card>
                  </a>
                  <a href="https://m.me/nindaford" target="_blank" rel="noreferrer" className="group">
                    <Card className="p-6 text-center shadow-sm ring-1 ring-slate-900/5 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg mb-4 group-hover:scale-110 transition-transform">
                        <MessageCircle className="h-6 w-6" />
                      </div>
                      <div className="font-bold text-zinc-900">Inbox Facebook</div>
                      <div className="mt-1 text-sm text-zinc-500">nindaford</div>
                      <div className="text-xs text-[color:var(--c-primary)] font-medium mt-0.5">ตอบภายใน 24 ชม.</div>
                    </Card>
                  </a>
                  <Card className="p-6 text-center shadow-sm ring-1 ring-slate-900/5">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-lg mb-4">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div className="font-bold text-zinc-900">เวลาทำการ</div>
                    <div className="mt-2 text-sm text-zinc-500">
                      <div>ทุกวัน: 08:00–18:00</div>
                    </div>
                  </Card>
                </div>
                <div className="mt-8 rounded-3xl overflow-hidden border border-black/5 shadow-sm">
                  <div className="flex items-center gap-2 px-5 py-3 bg-white border-b border-black/5">
                    <MapPin className="h-4 w-4 text-[color:var(--c-primary)]" />
                    <span className="text-sm font-semibold text-zinc-800">นินดาขายฟอร์ด — สุขุมวิท 62</span>
                  </div>
                  <iframe title="NindaFord Location" src="https://www.google.com/maps?q=13.694910870806051,100.6040596960761&output=embed" width="100%" height="280" style={{ border: "none" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
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

      {/* Floating CTA — dual buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
        <motion.a
          href="tel:0959608274"
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

      <footer className="relative mt-20 overflow-hidden">
        <div className="section-divider mx-auto w-full max-w-7xl"></div>
        <div className="bg-gradient-to-b from-transparent to-white/80 backdrop-blur-sm">
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
    </div >
  );
}
