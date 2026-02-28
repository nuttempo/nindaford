import React from "react";
import { ArrowRight, Calendar, CarFront, Phone, User } from "lucide-react";
import { FORD_MODELS } from "../../../data/siteData";
import { Button, Card, Section } from "../../../components/ui";
import { trackEvent } from "../../../utils/analytics";

export function TestDriveSection() {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [model, setModel] = React.useState(FORD_MODELS[0].name);
  const [date, setDate] = React.useState("");
  const [note, setNote] = React.useState("");

  const canSubmit = name.trim().length > 1 && phone.trim().length >= 9 && model.trim().length > 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    const message = [
      "สนใจจองทดลองขับ",
      `ชื่อ: ${name.trim()}`,
      `เบอร์โทร: ${phone.trim()}`,
      `รุ่นที่สนใจ: ${model}`,
      `วันที่สะดวก: ${date || "ขอให้ช่วยแนะนำช่วงเวลา"}`,
      `หมายเหตุ: ${note.trim() || "-"}`,
    ].join("\n");

    trackEvent("test_drive_submit", {
      area: "test_drive",
      channel: "messenger",
      model,
      preferred_date: date || undefined,
    });

    window.open(`https://m.me/nindaford?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <Section
      id="test-drive"
      title="จองทดลองขับ"
      subtitle="กรอกข้อมูลสั้น ๆ แล้วทัก Messenger ต่อได้ทันที ทีมงานจะยืนยันคิวให้เร็วที่สุด"
    >
      <Card className="p-6 md:p-8 shadow-sm ring-1 ring-slate-900/5 bg-white">
        <form className="grid gap-4 md:gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700 flex items-center gap-2"><User className="h-4 w-4" /> ชื่อผู้ติดต่อ</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="เช่น คุณนิดา"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm outline-none focus:border-[color:var(--c-primary)] focus:ring-4 focus:ring-[color:var(--c-primary)]/10"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700 flex items-center gap-2"><Phone className="h-4 w-4" /> เบอร์โทร</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08x-xxx-xxxx"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm outline-none focus:border-[color:var(--c-primary)] focus:ring-4 focus:ring-[color:var(--c-primary)]/10"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700 flex items-center gap-2"><CarFront className="h-4 w-4" /> รุ่นที่สนใจ</span>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm outline-none focus:border-[color:var(--c-primary)] focus:ring-4 focus:ring-[color:var(--c-primary)]/10"
              >
                {FORD_MODELS.slice(0, 12).map((item) => (
                  <option key={item.name} value={item.name}>{item.name}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700 flex items-center gap-2"><Calendar className="h-4 w-4" /> วันที่สะดวก</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm outline-none focus:border-[color:var(--c-primary)] focus:ring-4 focus:ring-[color:var(--c-primary)]/10"
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">หมายเหตุเพิ่มเติม (ถ้ามี)</span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="เช่น สะดวกช่วงบ่ายหลัง 14:00"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm outline-none focus:border-[color:var(--c-primary)] focus:ring-4 focus:ring-[color:var(--c-primary)]/10"
            />
          </label>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">* เมื่อกดส่ง ระบบจะเปิด Messenger พร้อมข้อความจองทดลองขับอัตโนมัติ</p>
            <Button type="submit" variant="primary" className="px-6 py-3 rounded-xl" disabled={!canSubmit}>
              ส่งคำขอจองทดลองขับ <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>
    </Section>
  );
}
