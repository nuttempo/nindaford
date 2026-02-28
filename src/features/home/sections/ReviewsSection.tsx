import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DELIVERY_IMAGES } from "../../../data/siteData";
import { fadeInScaleInView } from "../../../constants/animation";
import { Button, Section } from "../../../components/ui";
import { trackEvent } from "../../../utils/analytics";

export function ReviewsSection() {
  return (
    <Section
      id="reviews"
      title="ภาพส่งมอบความประทับใจ"
      subtitle="ขอบคุณลูกค้าทุกท่านที่ไว้วางใจให้นินดาดูแลรถคันใหม่ของคุณ"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {DELIVERY_IMAGES.map((src, i) => (
          <motion.div
            key={i}
            {...fadeInScaleInView(i * 0.05)}
            className="aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-sm ring-1 ring-slate-900/5 bg-white relative group cursor-pointer"
          >
            <img src={src} alt={`Delivery review ${i + 1}`} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <a href="https://www.facebook.com/nindaford/" target="_blank" rel="noreferrer" onClick={() => trackEvent("cta_click", { area: "reviews", channel: "facebook", cta: "view_more_reviews" })}>
          <Button variant="outline" className="rounded-2xl px-10 py-3 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-slate-700">
            ดูรีวิวเพิ่มเติมที่เพจ <ArrowRight className="h-4 w-4" />
          </Button>
        </a>
      </div>
    </Section>
  );
}
