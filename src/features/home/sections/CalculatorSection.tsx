import { ArrowRight } from "lucide-react";
import { Button, Card, Section } from "../../../components/ui";
import { trackEvent } from "../../../utils/analytics";
import { formatTHB } from "../../../utils/format";
import type { CalculatorSectionProps } from "./types";

export function CalculatorSection({
  selectedModelIndex,
  setSelectedModelIndex,
  downType,
  setDownType,
  downPercent,
  setDownPercent,
  downAmount,
  setDownAmount,
  interestRate,
  setInterestRate,
  months,
  setMonths,
  handleDownPercentChange,
  monthlyInstallment,
  carPrice,
  financeAmount,
  totalInterest,
  fordModels,
}: CalculatorSectionProps) {
  return (
    <Section
      id="calculator"
      title="ประเมินค่างวดรถเบื้องต้น"
      subtitle="ลองปรับตัวเลขเพื่อหาค่างวดที่เหมาะกับคุณ (ค่างวดจริงอาจแตกต่างเล็กน้อยตามแคมเปญไฟแนนซ์แต่ละเดือน)"
    >
      <Card className="glow-ring p-6 md:p-10 border-none shadow-2xl shadow-[color:var(--c-primary)]/10 ring-1 ring-slate-900/5 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 h-40 w-40 bg-[color:var(--c-soft)] blur-[60px] opacity-60 pointer-events-none rounded-full"></div>
        <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:items-start relative z-10">
          <div className="flex flex-col gap-8 mt-2">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-3">เลือกรุ่นรถ</label>
              <div className="relative">
                <select
                  value={selectedModelIndex}
                  onChange={(e) => {
                    setSelectedModelIndex(Number(e.target.value));
                    setDownType("percent");
                  }}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-5 pr-10 py-4 text-base md:text-lg font-medium text-slate-900 outline-none focus:border-[color:var(--c-primary)] focus:bg-white focus:ring-4 focus:ring-[color:var(--c-primary)]/10 transition-all cursor-pointer font-sans appearance-none shadow-inner"
                >
                  {fordModels.map((model, idx) => (
                    <option key={idx} value={idx}>
                      {model.name} — ฿{formatTHB(model.price)}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-bold text-slate-800">เงินดาวน์</label>
                <div className="flex items-center rounded-xl bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setDownType("percent")}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${downType === "percent" ? "bg-white text-slate-900 shadow-md ring-1 ring-black/5" : "text-slate-500 hover:text-slate-700 hover:bg-black/5"}`}
                  >
                    % เปอร์เซ็นต์
                  </button>
                  <button
                    type="button"
                    onClick={() => setDownType("amount")}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${downType === "amount" ? "bg-white text-slate-900 shadow-md ring-1 ring-black/5" : "text-slate-500 hover:text-slate-700 hover:bg-black/5"}`}
                  >
                    บาท
                  </button>
                </div>
              </div>

              {downType === "amount" ? (
                <div className="relative mb-6">
                  <input
                    type="number"
                    min={0}
                    value={downAmount}
                    onChange={(e) => {
                      setDownType("amount");
                      setDownAmount(Number(e.target.value));
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-5 pr-12 py-4 text-xl font-bold text-slate-900 outline-none focus:border-[color:var(--c-primary)] focus:bg-white focus:ring-4 focus:ring-[color:var(--c-primary)]/10 transition-all font-sans shadow-inner"
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 font-bold text-lg">฿</div>
                </div>
              ) : (
                <div className="relative mb-6">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={downPercent}
                    onChange={(e) => {
                      setDownType("percent");
                      setDownPercent(Number(e.target.value));
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-5 pr-12 py-4 text-xl font-bold text-slate-900 outline-none focus:border-[color:var(--c-primary)] focus:bg-white focus:ring-4 focus:ring-[color:var(--c-primary)]/10 transition-all font-sans shadow-inner"
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 font-bold text-lg">%</div>
                </div>
              )}

              <div className="px-1 mt-2">
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={downPercent}
                  onChange={handleDownPercentChange}
                  className="w-full accent-[color:var(--c-primary)] h-1.5 rounded-lg appearance-none bg-black/10 cursor-pointer"
                />
                <div className="relative h-4 mt-2 text-[11px] text-zinc-400 font-medium px-1">
                  <span className="absolute left-1">0%</span>
                  <span className="absolute left-[30%] -translate-x-1/2">15%</span>
                  <span className="absolute left-[50%] -translate-x-1/2">25%</span>
                  <span className="absolute right-1">50%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 mt-4">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-800 mb-3 whitespace-nowrap">ดอกเบี้ย/ปี</label>
                <div className="relative flex-1">
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-5 pr-12 py-4 text-base font-bold text-slate-900 outline-none focus:border-[color:var(--c-primary)] focus:bg-white focus:ring-4 focus:ring-[color:var(--c-primary)]/10 transition-all font-sans shadow-inner"
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 font-bold">%</div>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-800 mb-3 whitespace-nowrap">ระยะเวลา</label>
                <div className="relative flex-1">
                  <select
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="w-full h-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-5 pr-10 py-4 text-base font-bold text-slate-900 outline-none focus:border-[color:var(--c-primary)] focus:bg-white focus:ring-4 focus:ring-[color:var(--c-primary)]/10 transition-all cursor-pointer font-sans appearance-none shadow-inner"
                  >
                    <option value={48}>48 งวด (4 ปี)</option>
                    <option value={60}>60 งวด (5 ปี)</option>
                    <option value={72}>72 งวด (6 ปี)</option>
                    <option value={84}>84 งวด (7 ปี)</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[color:var(--c-primary)] text-white p-8 md:p-10 flex flex-col h-full justify-center relative overflow-hidden shadow-2xl shadow-[color:var(--c-primary)]/30">
            <div className="absolute -top-[120px] -right-[120px] h-[300px] w-[300px] rounded-full bg-white/10 blur-3xl pointer-events-none"></div>

            <div className="text-center relative z-10 pt-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 mb-6 border border-white/20 shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--c-accent)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[color:var(--c-accent)]"></span>
                </span>
                <span className="text-sm font-bold text-white tracking-wide">ยอดผ่อนชำระประมาณการ</span>
              </div>

              <div className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold text-white tabular-nums leading-snug mb-2">
                <span className="text-[color:var(--c-soft)]/70 text-2xl md:text-3xl font-medium mr-1.5 align-top mt-2 inline-block">฿</span>
                <span className="drop-shadow-sm">{formatTHB(monthlyInstallment)}</span>
              </div>
              <div className="text-base font-medium text-white/70">ต่อเดือน</div>
            </div>

            <div className="mt-10 space-y-4 relative z-10 flex-1">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div className="text-sm text-white/70">ราคารถยนต์</div>
                <div className="font-bold text-white tracking-wide">฿{formatTHB(carPrice)}</div>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div className="text-sm text-white/70">ยอดเงินดาวน์ ({downPercent}%)</div>
                <div className="font-bold text-white tracking-wide">฿{formatTHB(downAmount)}</div>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div className="text-sm text-white/70">ยอดจัดไฟแนนซ์</div>
                <div className="font-bold text-white tracking-wide">฿{formatTHB(financeAmount)}</div>
              </div>
              <div className="flex justify-between items-center text-[color:var(--c-accent)] font-bold">
                <div className="text-sm">ดอกเบี้ยรวม ({months} งวด)</div>
                <div>฿{formatTHB(Math.ceil(totalInterest))}</div>
              </div>
            </div>

            <div className="mt-10 relative z-10">
              <a href={`https://m.me/nindaford?text=${encodeURIComponent(`สนใจให้ทำใบเสนอราคา\nรุ่นรถ: ${fordModels[selectedModelIndex].name}\nราคารถ: ${formatTHB(carPrice)} บ.\nดาวน์: ${downPercent}% (${formatTHB(downAmount)} บ.)\nผ่อน: ${months} งวด\n(รบกวนคำนวณเรทดอกเบี้ย ${interestRate}% ให้หน่อยค่ะ)`)}`} target="_blank" rel="noreferrer" className="block w-full group" onClick={() => trackEvent("cta_click", { area: "calculator", channel: "messenger", cta: "chat_with_quote", model: fordModels[selectedModelIndex].name, months })}>
                <Button variant="outline" className="w-full py-4 text-[16px] rounded-2xl bg-white text-[color:var(--c-primary)] shadow-xl hover:scale-[1.02] transition-transform font-bold border-transparent">
                  ทักแชทพร้อมยอดนี้ <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <p className="mt-5 text-[11px] text-white/50 text-center leading-relaxed px-2">
                * การคำนวณเบื้องต้นแบบ Flat Rate ยังไม่รวมประกันภัยและรายละเอียดอื่น ยอดผ่อนและดอกเบี้ยจริงขึ้นอยู่กับการอนุมัติของไฟแนนซ์
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Section>
  );
}
