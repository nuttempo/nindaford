import { FEATURE_DATA } from "../../../data/siteData";
import { Card, Section } from "../../../components/ui";

export function FeaturesSection() {
  return (
    <Section
      id="features"
      title="ทำไมลูกค้าถึงเลือกนินดา"
      subtitle="โฟกัสเรื่องที่ลูกค้าซื้อรถสนใจจริง ๆ: ตัวเลขชัด, ติดต่อไว, ดูแลเอกสาร, อัปเดตส่งมอบ"
    >
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
        {FEATURE_DATA.map((feature, index) => (
          <Card key={feature.title} className="p-6 md:p-8 shadow-sm bg-gradient-to-br from-white to-slate-50 ring-1 ring-slate-900/5 hover:-translate-y-1.5 hover:shadow-xl hover:ring-[color:var(--c-primary)]/20 transition-all duration-300 group">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <span className="flex-none mt-1 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--c-primary)] to-[color:var(--c-secondary)] text-white shadow-lg shadow-[color:var(--c-primary)]/20 group-hover:scale-110 transition-transform duration-300">
                <span className="text-lg font-bold">0{index + 1}</span>
              </span>
              <div>
                <div className="text-xl font-bold text-slate-900 pt-1">{feature.title}</div>
                <div className="mt-2 text-base text-slate-500 leading-relaxed">{feature.desc}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
