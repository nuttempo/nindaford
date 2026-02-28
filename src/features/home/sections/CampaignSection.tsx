import React from "react";
import { ArrowRight, BadgePercent, CalendarClock, ShieldCheck } from "lucide-react";
import { EVEREST_TREND_OFFER } from "../../../data/siteData";
import { formatTHB } from "../../../utils/format";
import { trackEvent } from "../../../utils/analytics";
import { Button, Card, Pill, Section } from "../../../components/ui";

export function CampaignSection() {
  const campaignId = "everest_trend_campaign_v1";
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const hasTrackedViewRef = React.useRef(false);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const sectionEl = sectionRef.current;
    if (!sectionEl) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      if (!hasTrackedViewRef.current) {
        hasTrackedViewRef.current = true;
        trackEvent("campaign_view", {
          area: "campaign",
          campaign_id: campaignId,
          placement: "campaign_section",
        });
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting || hasTrackedViewRef.current) {
          return;
        }

        hasTrackedViewRef.current = true;
        trackEvent("campaign_view", {
          area: "campaign",
          campaign_id: campaignId,
          placement: "campaign_section",
        });

        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
    };
  }, [campaignId]);

  const trackCampaignClickThrough = (cta: string, channel: "messenger" | "onsite" | "ford_official") => {
    trackEvent("campaign_click_through", {
      area: "campaign",
      campaign_id: campaignId,
      cta,
      channel,
    });
  };

  return (
    <section ref={sectionRef}>
      <Section
        id="campaign"
        title="Campaign Landing"
        subtitle="แคมเปญโฟกัสสำหรับคนที่ต้องการตัดสินใจไว: ดูดีลหลัก เลือกช่องทางคุย และนัดทดลองขับได้ทันที"
      >
      <Card className="p-6 md:p-8 shadow-sm ring-1 ring-slate-900/5 bg-white hover:shadow-lg hover:ring-slate-900/10 transition-all duration-300">
        <div className="grid gap-6 md:gap-7">
          <div className="flex flex-wrap items-center gap-2.5">
            <Pill className="border-[color:var(--c-primary)]/20 bg-[color:var(--c-primary)]/5 text-[color:var(--c-primary)]">
              <BadgePercent className="h-3.5 w-3.5" />
              แคมเปญเด่น
            </Pill>
            <Pill className="border-black/5 bg-zinc-100/60 text-zinc-600">
              <CalendarClock className="h-3.5 w-3.5" />
              อัปเดตเงื่อนไขล่าสุดผ่านแชท
            </Pill>
            <Pill className="border-emerald-200/70 bg-emerald-50 text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              ดูแลตั้งแต่เสนอราคา-ส่งมอบ
            </Pill>
          </div>

          <div className="rounded-2xl border border-black/5 bg-zinc-50 p-5 md:p-6">
            <h3 className="text-xl md:text-2xl font-extrabold text-zinc-900 leading-tight">{EVEREST_TREND_OFFER.name}</h3>
            <p className="mt-2 text-sm md:text-base text-zinc-600">ดีลกลางที่ใช้เป็นฐานต่อรอง พร้อมช่วยสรุปค่างวดให้เหมาะกับงบก่อนตัดสินใจ</p>

            <div className="mt-4 grid gap-3 grid-cols-1 sm:grid-cols-3">
              <div className="rounded-xl border border-black/5 bg-white p-4">
                <div className="text-xs text-zinc-500">ราคาปกติ</div>
                <div className="mt-1 text-base font-bold text-zinc-900 tabular-nums">฿{formatTHB(EVEREST_TREND_OFFER.normalPrice)}</div>
              </div>
              <div className="rounded-xl border border-[color:var(--c-primary)]/15 bg-[color:var(--c-primary)]/5 p-4">
                <div className="text-xs text-zinc-500">ราคาแคมเปญ</div>
                <div className="mt-1 text-base font-bold text-[color:var(--c-primary)] tabular-nums">฿{formatTHB(EVEREST_TREND_OFFER.specialPrice)}</div>
              </div>
              <div className="rounded-xl border border-emerald-200/70 bg-emerald-50 p-4">
                <div className="text-xs text-emerald-700/80">ส่วนต่างสูงสุด</div>
                <div className="mt-1 text-base font-bold text-emerald-700 tabular-nums">฿{formatTHB(EVEREST_TREND_OFFER.save)}</div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://m.me/nindaford"
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                trackCampaignClickThrough("campaign_quote_now", "messenger");
                trackEvent("cta_click", { area: "campaign", channel: "messenger", cta: "campaign_quote_now" });
              }}
            >
              <Button variant="primary" className="w-full justify-center py-3.5 rounded-xl">
                ขอราคาแคมเปญทันที <ArrowRight className="h-4 w-4" />
              </Button>
            </a>

            <a
              href="#test-drive"
              onClick={() => {
                trackCampaignClickThrough("campaign_book_test_drive", "onsite");
                trackEvent("cta_click", { area: "campaign", channel: "onsite", cta: "campaign_book_test_drive" });
              }}
            >
              <Button variant="outline" className="w-full justify-center py-3.5 rounded-xl border-black/10">
                นัดทดลองขับ
              </Button>
            </a>

            <a
              href={EVEREST_TREND_OFFER.offerUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                trackCampaignClickThrough("campaign_official_offer", "ford_official");
                trackEvent("cta_click", { area: "campaign", channel: "ford_official", cta: "campaign_official_offer" });
              }}
            >
              <Button variant="outline" className="w-full justify-center py-3.5 rounded-xl border-black/10">
                ดูเงื่อนไขทางการ
              </Button>
            </a>
          </div>
        </div>
      </Card>
      </Section>
    </section>
  );
}
