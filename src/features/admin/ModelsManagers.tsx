import React from "react";
import {
  getFordModels,
  saveFordModels,
  resetFordModels,
  createBlankFordModel,
  getOtherModels,
  saveOtherModels,
  resetOtherModels,
  createBlankOtherModel,
} from "../../data/modelsStore";
import type { StoredFordModel, StoredOtherModel } from "../../data/modelsStore";

export function FordModelsManager() {
  const [items, setItems] = React.useState<StoredFordModel[]>(getFordModels);
  const [saved, setSaved] = React.useState(false);

  const addItem = () => {
    setItems((prev) => [...prev, createBlankFordModel()]);
    setSaved(false);
  };

  const removeItem = (id: string) => {
    if (!confirm("ลบรถรุ่นนี้?")) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
    setSaved(false);
  };

  const updateData = (id: string, field: keyof StoredFordModel, value: string | number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
    setSaved(false);
  };

  const moveItem = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= items.length) return;
    setItems((prev) => {
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
    setSaved(false);
  };

  const handleSave = () => {
    saveFordModels(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (!confirm("รีเซ็ตรุ่นรถในค่างวดกลับเป็นค่าเริ่มต้น?")) return;
    resetFordModels();
    setItems(getFordModels());
    setSaved(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        {items.map((item, idx) => (
          <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white p-4 rounded-xl shadow-sm ring-1 ring-black/5">
            <span className="font-bold text-zinc-400 w-6">{idx + 1}.</span>
            <div className="flex-1 grid gap-3 grid-cols-1 sm:grid-cols-2 w-full">
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateData(item.id, "name", e.target.value)}
                placeholder="ชื่อรุ่นรถ"
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="number"
                value={item.price}
                onChange={(e) => updateData(item.id, "price", Number(e.target.value))}
                placeholder="ราคารถ"
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <button onClick={() => moveItem(idx, -1)} disabled={idx === 0} className="rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-200 disabled:opacity-30">▲</button>
              <button onClick={() => moveItem(idx, 1)} disabled={idx === items.length - 1} className="rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-200 disabled:opacity-30">▼</button>
              <button onClick={() => removeItem(item.id)} className="rounded bg-red-50 px-3 py-1.5 text-xs text-red-500 hover:bg-red-100">ลบ</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={addItem} className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition-colors">➕ เพิ่มรุ่นรถ</button>
        <button onClick={handleSave} className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors">{saved ? "✅ บันทึกแล้ว!" : "💾 บันทึกทั้งหมด"}</button>
        <button onClick={handleReset} className="rounded-xl bg-zinc-100 px-6 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-200 transition-colors">🔄 รีเซ็ตค่าเริ่มต้น</button>
      </div>
    </div>
  );
}

export function OtherModelsManager() {
  const [items, setItems] = React.useState<StoredOtherModel[]>(getOtherModels);
  const [saved, setSaved] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState<string | null>(items.length > 0 ? items[0].id : null);

  const addItem = () => {
    const blank = createBlankOtherModel();
    setItems((prev) => [...prev, blank]);
    setExpandedId(blank.id);
    setSaved(false);
  };

  const removeItem = (id: string) => {
    if (!confirm("ลบรถรุ่นนี้?")) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
    setSaved(false);
  };

  const updateData = (id: string, field: keyof StoredOtherModel, value: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
    setSaved(false);
  };

  const updateHighlight = (id: string, index: number, value: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newHighlights = [...item.highlights];
        newHighlights[index] = value;
        return { ...item, highlights: newHighlights };
      })
    );
    setSaved(false);
  };

  const moveItem = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= items.length) return;
    setItems((prev) => {
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
    setSaved(false);
  };

  const handleSave = () => {
    saveOtherModels(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (!confirm("รีเซ็ตรุ่นรถอื่นๆ กลับเป็นค่าเริ่มต้น?")) return;
    resetOtherModels();
    const defaults = getOtherModels();
    setItems(defaults);
    setExpandedId(defaults[0]?.id ?? null);
    setSaved(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        {items.map((item, idx) => {
          const expanded = expandedId === item.id;
          return (
            <div key={item.id} className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden">
              <button
                type="button"
                onClick={() => setExpandedId(expanded ? null : item.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-zinc-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-zinc-400">{idx + 1}.</span>
                  <div>
                    <div className="font-bold text-zinc-900">{item.name || "รุ่นใหม่"}</div>
                    <div className="text-xs text-zinc-500">{item.badge}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 mr-2" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => moveItem(idx, -1)} disabled={idx === 0} className="rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-200 disabled:opacity-30">▲</button>
                    <button onClick={() => moveItem(idx, 1)} disabled={idx === items.length - 1} className="rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-200 disabled:opacity-30">▼</button>
                  </div>
                  <span className="text-zinc-400 text-lg">{expanded ? "▾" : "▸"}</span>
                </div>
              </button>

              {expanded && (
                <div className="border-t border-zinc-100 p-5 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="block text-sm font-medium text-zinc-600 mb-1">ชื่อเต็ม</span>
                      <input type="text" value={item.name} onChange={(e) => updateData(item.id, "name", e.target.value)} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300" />
                    </label>
                    <label className="block">
                      <span className="block text-sm font-medium text-zinc-600 mb-1">Badge (ชื่อย่อ)</span>
                      <input type="text" value={item.badge} onChange={(e) => updateData(item.id, "badge", e.target.value)} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300" />
                    </label>
                  </div>
                  
                  <label className="block">
                    <span className="block text-sm font-medium text-zinc-600 mb-1">Tagline (คำอธิบาย)</span>
                    <input type="text" value={item.tagline} onChange={(e) => updateData(item.id, "tagline", e.target.value)} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300" />
                  </label>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <label className="block">
                      <span className="block text-sm font-medium text-zinc-600 mb-1">ราคาปกติ</span>
                      <input type="text" value={item.normalPrice} onChange={(e) => updateData(item.id, "normalPrice", e.target.value)} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300" />
                    </label>
                    <label className="block">
                      <span className="block text-sm font-medium text-zinc-600 mb-1">ราคาพิเศษ</span>
                      <input type="text" value={item.specialPrice} onChange={(e) => updateData(item.id, "specialPrice", e.target.value)} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300" />
                    </label>
                    <label className="block">
                      <span className="block text-sm font-medium text-zinc-600 mb-1">ส่วนลด</span>
                      <input type="text" value={item.save} onChange={(e) => updateData(item.id, "save", e.target.value)} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300" />
                    </label>
                  </div>

                  <div>
                    <span className="block text-sm font-medium text-zinc-600 mb-2">จุดเด่น (Highlights) 4 ข้อ</span>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {item.highlights.map((h, i) => (
                        <input key={i} type="text" value={h} onChange={(e) => updateHighlight(item.id, i, e.target.value)} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300" placeholder={`ข้อที่ ${i+1}`} />
                      ))}
                    </div>
                  </div>

                  <label className="block">
                    <span className="block text-sm font-medium text-zinc-600 mb-1">สีแถบ (Tailwind Classes)</span>
                    <input type="text" value={item.color} onChange={(e) => updateData(item.id, "color", e.target.value)} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300 font-mono text-xs" />
                  </label>

                  <div className="pt-3 border-t border-zinc-100">
                    <button onClick={() => removeItem(item.id)} className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100">🗑️ ลบข้อมูล</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={addItem} className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition-colors">➕ เพิ่มรุ่นรถ</button>
        <button onClick={handleSave} className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors">{saved ? "✅ บันทึกแล้ว!" : "💾 บันทึกทั้งหมด"}</button>
        <button onClick={handleReset} className="rounded-xl bg-zinc-100 px-6 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-200 transition-colors">🔄 รีเซ็ตค่าเริ่มต้น</button>
      </div>
    </div>
  );
}
