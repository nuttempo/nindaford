import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { Card, Section } from "../../../components/ui";
import { trackEvent } from "../../../utils/analytics";

export function ContactSection() {
  return (
    <Section id="contact" title="ติดต่อนินดา" subtitle="พร้อมดูแลคุณทุกวัน ทักแชทหรือโทรมาได้เลย">
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <a href="tel:0959608274" className="group" onClick={() => trackEvent("cta_click", { area: "contact", channel: "phone", cta: "call_card" })}>
          <Card className="p-6 text-center shadow-sm ring-1 ring-slate-900/5 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--c-primary)] to-[color:var(--c-secondary)] text-white shadow-lg mb-4 group-hover:scale-110 transition-transform">
              <Phone className="h-6 w-6" />
            </div>
            <div className="font-bold text-zinc-900">โทร</div>
            <div className="mt-1 text-sm text-zinc-500">095-960-8274</div>
            <div className="text-xs text-[color:var(--c-primary)] font-medium mt-0.5">กดเพื่อโทรทันที</div>
          </Card>
        </a>
        <a href="https://m.me/nindaford" target="_blank" rel="noreferrer" className="group" onClick={() => trackEvent("cta_click", { area: "contact", channel: "messenger", cta: "inbox_card" })}>
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
  );
}
