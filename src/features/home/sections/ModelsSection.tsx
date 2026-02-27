import { ArrowRight, CheckCircle2 } from "lucide-react";
import { OTHER_MODELS } from "../../../data/siteData";
import { formatTHB } from "../../../utils/format";
import { Button, Card, Pill, Section } from "../../../components/ui";

export function ModelsSection() {
  return (
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
  );
}
