import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Phone, Sparkles } from "lucide-react";
import { FADE_UP_VARIANTS, SCALE_UP_VARIANTS } from "../../../constants/animation";
import { Button, Card, Pill } from "../../../components/ui";
import { trackEvent } from "../../../utils/analytics";
import { useHeroCtaExperiment } from "../hooks";

export function HeroSection() {
  const { variant, assignmentSource, primaryLabel, primaryCtaId, experimentId } = useHeroCtaExperiment();
  const hasTrackedExposure = useRef(false);
  const hasTrackedHeroView = useRef(false);

  useEffect(() => {
    if (hasTrackedHeroView.current) {
      return;
    }

    trackEvent("section_view", {
      section_id: "hero",
      section_title: "Hero",
    });

    hasTrackedHeroView.current = true;
  }, []);

  useEffect(() => {
    if (hasTrackedExposure.current) {
      return;
    }

    trackEvent("experiment_exposure", {
      experiment_id: experimentId,
      variant,
      assignment_source: assignmentSource,
      placement: "hero_primary_cta",
    });

    hasTrackedExposure.current = true;
  }, [assignmentSource, experimentId, variant]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-[color:var(--c-primary)]/30 pb-20 pt-10 md:pt-20 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-2xl z-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-[color:var(--c-primary)]/25 blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[color:var(--c-secondary)]/20 blur-[100px] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-[color:var(--c-accent)]/8 blur-[80px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.07]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <motion.div initial="hidden" animate="show" variants={FADE_UP_VARIANTS}>
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

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-[1.3] pt-2 pb-1">
                นินดาขายฟอร์ด <br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent sm:text-4xl md:text-5xl">โปรฯ ฟอร์ดอัปเดต</span>
              </h1>

              <div className="mt-4 text-xl md:text-2xl font-medium text-slate-300">จองรถ • ทดลองขับ • ขอใบเสนอราคา ได้ไว</div>

              <p className="mt-6 text-base md:text-lg text-slate-400 max-w-lg leading-relaxed mix-blend-lighten">
                สรุปโปรฯ และตัวเลขสำคัญแบบอ่านง่าย พร้อมทางลัดติดต่อ <span className="font-semibold text-white">Inbox/โทร</span> เพื่อทำข้อเสนอเฉพาะคุณ
                (ดาวน์/ผ่อน/ของแถม) ได้ทันที
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://m.me/nindaford"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    trackEvent("cta_click", {
                      area: "hero",
                      channel: "messenger",
                      cta: primaryCtaId,
                      experiment_id: experimentId,
                      variant,
                      assignment_source: assignmentSource,
                    });

                    trackEvent("experiment_conversion", {
                      experiment_id: experimentId,
                      variant,
                      assignment_source: assignmentSource,
                      goal: "messenger_click",
                    });
                  }}
                >
                  <Button variant="primary" className="w-full sm:w-auto px-8 py-3.5 text-base rounded-2xl shadow-[0_8px_30px_rgb(29,78,216,0.3)]">
                    {primaryLabel} <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
                <a href="tel:0959608274" onClick={() => trackEvent("cta_click", { area: "hero", channel: "phone", cta: "call_primary" })}>
                  <Button variant="outline" className="w-full sm:w-auto px-8 py-3.5 text-base rounded-2xl bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm">
                    <Phone className="h-4 w-4" /> โทรเลย
                  </Button>
                </a>
                <a href="#offers" onClick={() => trackEvent("cta_click", { area: "hero", channel: "onsite", cta: "view_offer_section" })}>
                  <Button variant="outline" className="w-full sm:w-auto px-8 py-3.5 text-base rounded-2xl bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm">
                    ดูโปรฯ Everest Trend
                  </Button>
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {["Ranger", "Everest", "Raptor"].map((tag) => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 rounded-md bg-white/10 text-xs font-medium text-slate-300 border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" animate="show" variants={SCALE_UP_VARIANTS}>
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
                  <a href="https://m.me/nindaford" target="_blank" rel="noreferrer" onClick={() => trackEvent("cta_click", { area: "hero_quick", channel: "messenger", cta: "quote_quick" })}>
                    <Button variant="primary" className="w-full justify-between py-3.5 rounded-xl text-base shadow-lg shadow-[color:var(--c-primary)]/20 hover:scale-[1.02] transition-transform">
                      ขอใบเสนอราคา <ArrowRight className="h-4.5 w-4.5" />
                    </Button>
                  </a>
                  <a href="https://m.me/nindaford" target="_blank" rel="noreferrer" onClick={() => trackEvent("cta_click", { area: "hero_quick", channel: "messenger", cta: "inbox_page" })}>
                    <Button variant="outline" className="w-full justify-center py-3 rounded-xl border-black/10 text-zinc-700 bg-white hover:bg-zinc-50 font-medium">ทัก Inbox เพจ</Button>
                  </a>
                  <a href="https://www.facebook.com/nindaford/" target="_blank" rel="noreferrer" onClick={() => trackEvent("cta_click", { area: "hero_quick", channel: "facebook", cta: "open_facebook_page" })}>
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
  );
}
