import React from "react";
import {
  getPromotions,
  savePromotions,
  resetPromotions,
  hasCustomPromotions,
  getCampaigns,
  saveCampaigns,
  resetCampaigns,
  hasCustomCampaigns,
  compressImage,
  createBlankPromotion,
} from "../../data/promotionStore";
import { hasCustomFordModels, hasCustomOtherModels } from "../../data/modelsStore";
import type { PromotionData, PromotionItem, StoredImageItem } from "../../data/promotionTypes";
import { FordModelsManager, OtherModelsManager } from "./ModelsManagers";

/* ──────────────────────────────────────────────────────────────────── */

export function AdminPanel() {
  const [tab, setTab] = React.useState<"promotions" | "campaigns" | "ford_models" | "other_models">("promotions");

  const [promoItems, setPromoItems] = React.useState<PromotionItem[]>(getPromotions);
  const [campItems, setCampItems] = React.useState<PromotionItem[]>(getCampaigns);

  const [promoSaved, setPromoSaved] = React.useState(false);
  const [campSaved, setCampSaved] = React.useState(false);

  const [expandedId, setExpandedId] = React.useState<string | null>(() => {
    const promos = getPromotions();
    return promos.length > 0 ? promos[0].id : null;
  });

  const items = tab === "promotions" ? promoItems : campItems;
  const setItems = tab === "promotions" ? setPromoItems : setCampItems;
  const saved = tab === "promotions" ? promoSaved : campSaved;
  const setSaved = tab === "promotions" ? setPromoSaved : setCampSaved;

  const switchTab = (newTab: "promotions" | "campaigns" | "ford_models" | "other_models") => {
    setTab(newTab);
    if (newTab === "promotions" || newTab === "campaigns") {
      const targetItems = newTab === "promotions" ? promoItems : campItems;
      setExpandedId(targetItems.length > 0 ? targetItems[0].id : null);
    }
  };

  // ── Item CRUD ───────────────────────────────────────────────────

  const addItem = () => {
    const blank = createBlankPromotion();
    setItems((prev) => [...prev, blank]);
    setExpandedId(blank.id);
    setSaved(false);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) {
      alert("ต้องมีอย่างน้อย 1 โปรโมชั่น");
      return;
    }
    if (!confirm("ลบโปรโมชั่นนี้?")) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (expandedId === id) setExpandedId(null);
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

  const updateData = (id: string, field: keyof PromotionData, value: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, data: { ...item.data, [field]: value } } : item
      )
    );
    setSaved(false);
  };

  const updateImages = (id: string, images: StoredImageItem[]) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, images } : item))
    );
    setSaved(false);
  };

  // ── Save / Reset ────────────────────────────────────────────────

  const handleSave = () => {
    if (tab === "promotions") {
      savePromotions(promoItems);
    } else {
      saveCampaigns(campItems);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    const isPromo = tab === "promotions";
    if (!confirm(`รีเซ็ต${isPromo ? "โปรโมชั่น" : "แคมเปญ"}ทั้งหมดกลับเป็นค่าเริ่มต้น?`)) return;
    
    if (isPromo) {
      resetPromotions();
      const defaults = getPromotions();
      setPromoItems(defaults);
      setExpandedId(defaults[0]?.id ?? null);
    } else {
      resetCampaigns();
      const defaults = getCampaigns();
      setCampItems(defaults);
      setExpandedId(defaults[0]?.id ?? null);
    }
    setSaved(false);
  };

  // ── Render ──────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-zinc-200 shadow-sm">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-zinc-900">⚙️ จัดการเนื้อหา</h1>
            <div className="hidden sm:flex items-center bg-zinc-100 rounded-lg p-1">
              <button
                onClick={() => switchTab("promotions")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  tab === "promotions" ? "bg-white text-blue-700 shadow-sm" : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                โปรโมชั่น
              </button>
              <button
                onClick={() => switchTab("campaigns")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  tab === "campaigns" ? "bg-white text-blue-700 shadow-sm" : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Campaign Landing
              </button>
              <button
                onClick={() => switchTab("ford_models")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  tab === "ford_models" ? "bg-white text-blue-700 shadow-sm" : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                รถในค่างวด
              </button>
              <button
                onClick={() => switchTab("other_models")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  tab === "other_models" ? "bg-white text-blue-700 shadow-sm" : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                รุ่นอื่นๆที่น่าสนใจ
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {tab === "promotions" && hasCustomPromotions() && (
              <span className="hidden sm:inline text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium">
                ✏️ มีข้อมูลที่กำหนดเอง
              </span>
            )}
            {tab === "campaigns" && hasCustomCampaigns() && (
              <span className="hidden sm:inline text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium">
                ✏️ มีข้อมูลที่กำหนดเอง
              </span>
            )}
            {tab === "ford_models" && hasCustomFordModels() && (
              <span className="hidden sm:inline text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium">
                ✏️ มีข้อมูลที่กำหนดเอง
              </span>
            )}
            {tab === "other_models" && hasCustomOtherModels() && (
              <span className="hidden sm:inline text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium">
                ✏️ มีข้อมูลที่กำหนดเอง
              </span>
            )}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = "";
              }}
              className="rounded-lg bg-zinc-100 px-4 py-1.5 text-sm text-zinc-600 hover:bg-zinc-200 transition-colors"
            >
              ← กลับหน้าหลัก
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-6">
        <div className="sm:hidden grid grid-cols-2 bg-zinc-100 rounded-lg p-1 mb-4 gap-1">
          <button
            onClick={() => switchTab("promotions")}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
              tab === "promotions" ? "bg-white text-blue-700 shadow-sm" : "text-zinc-600"
            }`}
          >
            โปรโมชั่น
          </button>
          <button
            onClick={() => switchTab("campaigns")}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
              tab === "campaigns" ? "bg-white text-blue-700 shadow-sm" : "text-zinc-600"
            }`}
          >
            Campaigns
          </button>
          <button
            onClick={() => switchTab("ford_models")}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
              tab === "ford_models" ? "bg-white text-blue-700 shadow-sm" : "text-zinc-600"
            }`}
          >
            รถในค่างวด
          </button>
          <button
            onClick={() => switchTab("other_models")}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
              tab === "other_models" ? "bg-white text-blue-700 shadow-sm" : "text-zinc-600"
            }`}
          >
            รุ่นอื่นๆที่น่าสนใจ
          </button>
        </div>
        {/* ─── PROMOTION & CAMPAIGN LIST ──────────────────────────────────── */}
        {(tab === "promotions" || tab === "campaigns") && (
          <>
            {items.map((item, idx) => (
          <PromotionEditor
            key={item.id}
            item={item}
            index={idx}
            total={items.length}
            expanded={expandedId === item.id}
            onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
            onUpdateData={(field, value) => updateData(item.id, field, value)}
            onUpdateImages={(imgs) => updateImages(item.id, imgs)}
            onRemove={() => removeItem(item.id)}
            onMove={(dir) => moveItem(idx, dir)}
            tab={tab}
          />
        ))}

        {/* ─── ADD + GLOBAL ACTIONS ────────────────────────────── */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={addItem}
            className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition-colors"
          >
            ➕ เพิ่ม{tab === "promotions" ? "โปรโมชั่น" : "แคมเปญ"}ใหม่
          </button>
          <button
            onClick={handleSave}
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors"
          >
            {saved ? "✅ บันทึกทั้งหมดแล้ว!" : "💾 บันทึกทั้งหมด"}
          </button>
          <button
            onClick={handleReset}
            className="rounded-xl bg-zinc-100 px-6 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-200 transition-colors"
          >
            🔄 รีเซ็ตเป็นค่าเริ่มต้น
          </button>
        </div>

        {/* ─── PREVIEW ALL ─────────────────────────────────────── */}
        <section className="rounded-2xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-black/5">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">
            👁️ ตัวอย่าง ({items.length} รุ่น)
          </h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 space-y-3">
                <div className="text-lg font-bold text-zinc-900">
                  {item.data.name || <span className="text-zinc-300 italic">ยังไม่ได้ตั้งชื่อ</span>}
                </div>
                <div className="grid gap-3 grid-cols-3">
                  <PriceBox label="ราคาปกติ" value={item.data.normalPrice} />
                  <PriceBox label="ราคาพิเศษ" value={item.data.specialPrice} highlight />
                  <PriceBox label="ส่วนลด" value={item.data.save} />
                </div>
                {item.data.note && <p className="text-sm text-zinc-500">{item.data.note}</p>}
                {item.images.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {item.images.map((img, i) => (
                      <img
                        key={i}
                        src={img.src}
                        alt={img.caption}
                        className="h-16 w-24 flex-none rounded-lg object-cover border border-zinc-200"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        </>
        )}
        
        {tab === "ford_models" && <FordModelsManager />}
        {tab === "other_models" && <OtherModelsManager />}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* PromotionEditor — collapsible editor for a single promotion item    */
/* ──────────────────────────────────────────────────────────────────── */

function PromotionEditor({
  item,
  index,
  total,
  expanded,
  onToggle,
  onUpdateData,
  onUpdateImages,
  onRemove,
  onMove,
  tab,
}: {
  item: PromotionItem;
  index: number;
  total: number;
  expanded: boolean;
  onToggle: () => void;
  onUpdateData: (field: keyof PromotionData, value: string) => void;
  onUpdateImages: (images: StoredImageItem[]) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
  tab: "promotions" | "campaigns";
}) {
  // Derive a simple string like 'promotions' or 'campaigns' based on the name fallback, mostly for generic buttons
  // But actually we need `tab` to be passed down. Since `tab` isn't passed down, we use generic text in the body or pass `tab` as prop.
  // Wait, I can just use generic text.
  const [uploading, setUploading] = React.useState(false);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      const newImages: StoredImageItem[] = [];
      for (const file of Array.from(files)) {
        const base64 = await compressImage(file);
        newImages.push({
          src: base64,
          caption: file.name.replace(/\.[^.]+$/, ""),
        });
      }
      onUpdateImages([...item.images, ...newImages]);
    } catch (err) {
      alert("เกิดข้อผิดพลาด: " + (err instanceof Error ? err.message : "Unknown"));
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const removeImage = (idx: number) => {
    onUpdateImages(item.images.filter((_, i) => i !== idx));
  };

  const updateCaption = (idx: number, caption: string) => {
    onUpdateImages(item.images.map((img, i) => (i === idx ? { ...img, caption } : img)));
  };

  const moveImage = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= item.images.length) return;
    const next = [...item.images];
    [next[idx], next[target]] = [next[target], next[idx]];
    onUpdateImages(next);
  };

  return (
    <section className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden">
      {/* Header — always visible */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-zinc-50/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex-none inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 text-sm font-bold">
            {index + 1}
          </span>
          <div className="min-w-0">
            <div className="font-bold text-zinc-900 truncate">
              {item.data.name || <span className="text-zinc-300 italic">{tab === "promotions" ? "โปรโมชั่น" : "แคมเปญ"}ใหม่</span>}
            </div>
            <div className="text-xs text-zinc-400 mt-0.5">
              {item.data.specialPrice ? `฿${item.data.specialPrice}` : "ยังไม่ได้ตั้งราคา"} · {item.images.length} รูป
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 mr-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onMove(-1)}
              disabled={index === 0}
              className="rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="เลื่อนขึ้น"
            >
              ▲
            </button>
            <button
              onClick={() => onMove(1)}
              disabled={index === total - 1}
              className="rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="เลื่อนลง"
            >
              ▼
            </button>
          </div>
          <span className="text-zinc-400 text-lg">{expanded ? "▾" : "▸"}</span>
        </div>
      </button>

      {/* Body — collapsible */}
      {expanded && (
        <div className="border-t border-zinc-100 p-5 md:p-6 space-y-6">
          {/* Data fields */}
          <div className="grid gap-5">
            <Field label="ชื่อรุ่น / ชื่อโปรฯ" value={item.data.name} onChange={(v) => onUpdateData("name", v)} />
            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="ราคาปกติ" value={item.data.normalPrice} onChange={(v) => onUpdateData("normalPrice", v)} placeholder="เช่น 1,397,000" />
              <Field label="ราคาพิเศษ" value={item.data.specialPrice} onChange={(v) => onUpdateData("specialPrice", v)} placeholder="เช่น 1,249,000" />
              <Field label="ส่วนลด" value={item.data.save} onChange={(v) => onUpdateData("save", v)} placeholder="เช่น 148,000" />
            </div>
            <Field label="หมายเหตุ" value={item.data.note} onChange={(v) => onUpdateData("note", v)} multiline />
            <Field label="ลิงก์โปรฯ ทางการ (Ford)" value={item.data.offerUrl} onChange={(v) => onUpdateData("offerUrl", v)} type="url" />
            <Field label="ลิงก์รวมโปรฯ ทั้งหมด" value={item.data.allOffersUrl} onChange={(v) => onUpdateData("allOffersUrl", v)} type="url" />
          </div>

          {/* Image management */}
          <div>
            <h3 className="text-base font-bold text-zinc-800 mb-3">🖼️ รูปภาพ ({item.images.length})</h3>

            <div className="mb-4">
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <div
                onClick={() => fileRef.current?.click()}
                className="cursor-pointer rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-4 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-colors"
              >
                {uploading ? (
                  <p className="text-sm text-zinc-500">⏳ กำลังประมวลผล...</p>
                ) : (
                  <p className="text-sm text-zinc-500">📤 คลิกเพื่ออัพโหลดรูป (JPG, PNG, WebP)</p>
                )}
              </div>
            </div>

            {item.images.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {item.images.map((img, idx) => (
                  <div key={idx} className="rounded-xl border border-zinc-200 bg-zinc-50 overflow-hidden">
                    <div className="aspect-[16/10] bg-zinc-200">
                      <img src={img.src} alt={img.caption} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-2.5 space-y-2">
                      <input
                        type="text"
                        value={img.caption}
                        onChange={(e) => updateCaption(idx, e.target.value)}
                        className="w-full rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs text-zinc-700 outline-none focus:ring-2 focus:ring-blue-300"
                        placeholder="คำอธิบายรูป"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          <button onClick={() => moveImage(idx, -1)} disabled={idx === 0} className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-500 hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed">◀</button>
                          <button onClick={() => moveImage(idx, 1)} disabled={idx === item.images.length - 1} className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-500 hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed">▶</button>
                        </div>
                        <button onClick={() => removeImage(idx)} className="rounded bg-red-50 px-2 py-0.5 text-xs text-red-500 hover:bg-red-100">🗑️ ลบ</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Delete button */}
          <div className="pt-2 border-t border-zinc-100">
            <button
              onClick={onRemove}
              className="rounded-xl bg-red-50 px-5 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
            >
              🗑️ ลบ{tab === "promotions" ? "โปรโมชั่น" : "แคมเปญ"}นี้
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* Reusable sub-components                                              */
/* ──────────────────────────────────────────────────────────────────── */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
}) {
  const cls =
    "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-800 outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-colors";
  return (
    <label className="block">
      <span className="block text-sm font-medium text-zinc-600 mb-1.5">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={cls + " resize-y"}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}

function PriceBox({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={
        "rounded-xl border p-3 " +
        (highlight ? "border-blue-200 bg-blue-50" : "border-zinc-200 bg-white")
      }
    >
      <div className="text-xs text-zinc-500">{label}</div>
      <div className={"mt-0.5 text-sm font-bold tabular-nums " + (highlight ? "text-blue-600" : "text-zinc-900")}>
        {value ? `฿${value}` : "—"}
      </div>
    </div>
  );
}
