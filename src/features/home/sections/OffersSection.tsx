import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { EVEREST_TREND_IMAGES, EVEREST_TREND_OFFER } from "../../../data/siteData";
import { formatTHB } from "../../../utils/format";
import { trackEvent } from "../../../utils/analytics";
import { AutoCarousel, Button, Card, Pill, Section } from "../../../components/ui";

export function OffersSection() {
  return (
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
              <a href="https://m.me/nindaford" target="_blank" rel="noreferrer" onClick={() => trackEvent("cta_click", { area: "offers", channel: "messenger", cta: "request_personal_offer" })}>
                <Button variant="primary" className="w-full sm:w-auto py-3 rounded-xl shadow-md shadow-[color:var(--c-primary)]/20">
                  ขอข้อเสนอเฉพาะของคุณ <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href={EVEREST_TREND_OFFER.offerUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("cta_click", { area: "offers", channel: "ford_official", cta: "official_offer" })}>
                <Button variant="outline" className="w-full sm:w-auto py-3 rounded-xl bg-slate-50 border-black/5 hover:bg-slate-100">ดูโปรฯ ทางการ (Ford)</Button>
              </a>
              <a href={EVEREST_TREND_OFFER.allOffersUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("cta_click", { area: "offers", channel: "ford_official", cta: "all_offers" })}>
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
            <a href="https://m.me/nindaford" target="_blank" rel="noreferrer" onClick={() => trackEvent("cta_click", { area: "offers_info", channel: "messenger", cta: "inbox_offer_now" })}>
              <Button variant="outline" className="w-full justify-center py-3.5 rounded-xl border-[color:var(--c-primary)]/20 text-[color:var(--c-primary)] hover:bg-[color:var(--c-primary)]/5 font-semibold text-base">ทัก Inbox รับข้อเสนอทันที</Button>
            </a>
          </div>
        </Card>
      </div>
    </Section>
  );
}
