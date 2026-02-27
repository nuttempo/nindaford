import { FAQS } from "../../../data/siteData";
import { FaqAccordion } from "../../../components/FaqAccordion";
import { Section } from "../../../components/ui";

export function FaqSection() {
  return (
    <Section id="faq" title="คำถามที่พบบ่อย" subtitle="ข้อสงสัยทั่วไปเกี่ยวกับการซื้อรถและไฟแนนซ์">
      <div className="max-w-3xl mx-auto grid gap-3">
        {FAQS.map((faq, i) => <FaqAccordion key={i} q={faq.q} a={faq.a} />)}
      </div>
    </Section>
  );
}
