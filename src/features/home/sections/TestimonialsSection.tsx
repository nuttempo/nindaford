import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "../../../data/siteData";
import { fadeUpInViewWithDelay } from "../../../constants/animation";
import { Card, Section } from "../../../components/ui";

export function TestimonialsSection() {
  return (
    <Section id="testimonials" title="ลูกค้าพูดถึงนินดา" subtitle="ความประทับใจจากลูกค้าที่ไว้วางใจให้นินดาดูแลรถคันใหม่">
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.div key={t.name} {...fadeUpInViewWithDelay(i * 0.1)}>
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
  );
}
