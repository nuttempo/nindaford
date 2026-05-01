import React from "react";
import {
  getPromotion,
  savePromotion,
  resetPromotion,
  getPromotionImages,
  savePromotionImages,
  resetPromotionImages,
  compressImage,
  hasCustomPromotion,
  hasCustomImages,
} from "../../data/promotionStore";
import type { PromotionData, StoredImageItem } from "../../data/promotionTypes";

/* ──────────────────────────────────────────────────────────────────── */

export function AdminPanel() {
  // ── Promo form state ────────────────────────────────────────────
  const [form, setForm] = React.useState<PromotionData>(getPromotion);
  const [images, setImages] = React.useState<StoredImageItem[]>(getPromotionImages);
  const [saved, setSaved] = React.useState(false);
  const [imageSaved, setImageSaved] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const update = (field: keyof PromotionData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  // ── Save / Reset ────────────────────────────────────────────────

  const handleSavePromo = () => {
    savePromotion(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetPromo = () => {
    if (!confirm("รีเซ็ตข้อมูลโปรโมชั่นกลับเป็นค่าเริ่มต้น?")) return;
    resetPromotion();
    setForm(getPromotion());
    setSaved(false);
  };

  const handleSaveImages = () => {
    savePromotionImages(images);
    setImageSaved(true);
    setTimeout(() => setImageSaved(false), 2500);
  };

  const handleResetImages = () => {
    if (!confirm("รีเซ็ตรูปภาพกลับเป็นค่าเริ่มต้น?")) return;
    resetPromotionImages();
    setImages(getPromotionImages());
    setImageSaved(false);
  };

  // ── Image upload ────────────────────────────────────────────────

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
      setImages((prev) => [...prev, ...newImages]);
      setImageSaved(false);
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการอัพโหลดรูป: " + (err instanceof Error ? err.message : "Unknown"));
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setImageSaved(false);
  };

  const updateCaption = (idx: number, caption: string) => {
    setImages((prev) => prev.map((img, i) => (i === idx ? { ...img, caption } : img)));
    setImageSaved(false);
  };

  const moveImage = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= images.length) return;
    setImages((prev) => {
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
    setImageSaved(false);
  };

  // ── Render ──────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-zinc-200 shadow-sm">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex items-center justify-between h-14">
          <h1 className="text-lg font-bold text-zinc-900">⚙️ จัดการโปรโมชั่น</h1>
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
      </header>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
        {/* ─── PROMO DATA FORM ─────────────────────────────────── */}
        <section className="rounded-2xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-black/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-zinc-900">📋 ข้อมูลโปรโมชั่น</h2>
            {hasCustomPromotion() && (
              <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium">
                ✏️ มีข้อมูลที่กำหนดเอง
              </span>
            )}
          </div>

          <div className="grid gap-5">
            <Field label="ชื่อรุ่น / ชื่อโปรฯ" value={form.name} onChange={(v) => update("name", v)} />
            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="ราคาปกติ" value={form.normalPrice} onChange={(v) => update("normalPrice", v)} placeholder="เช่น 1,397,000" />
              <Field label="ราคาพิเศษ" value={form.specialPrice} onChange={(v) => update("specialPrice", v)} placeholder="เช่น 1,249,000" />
              <Field label="ส่วนลด" value={form.save} onChange={(v) => update("save", v)} placeholder="เช่น 148,000" />
            </div>
            <Field label="หมายเหตุ" value={form.note} onChange={(v) => update("note", v)} multiline />
            <Field label="ลิงก์โปรฯ ทางการ (Ford)" value={form.offerUrl} onChange={(v) => update("offerUrl", v)} type="url" />
            <Field label="ลิงก์รวมโปรฯ ทั้งหมด" value={form.allOffersUrl} onChange={(v) => update("allOffersUrl", v)} type="url" />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleSavePromo}
              className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors"
            >
              {saved ? "✅ บันทึกแล้ว!" : "💾 บันทึกข้อมูล"}
            </button>
            <button
              onClick={handleResetPromo}
              className="rounded-xl bg-zinc-100 px-6 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-200 transition-colors"
            >
              🔄 รีเซ็ตเป็นค่าเริ่มต้น
            </button>
          </div>
        </section>

        {/* ─── IMAGE MANAGEMENT ────────────────────────────────── */}
        <section className="rounded-2xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-black/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-zinc-900">🖼️ รูปภาพสไลด์</h2>
            {hasCustomImages() && (
              <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium">
                ✏️ มีรูปที่กำหนดเอง
              </span>
            )}
          </div>

          {/* Upload */}
          <div className="mb-6">
            <label className="block">
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
                className="cursor-pointer rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-6 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-colors"
              >
                {uploading ? (
                  <p className="text-sm text-zinc-500">⏳ กำลังประมวลผลรูป...</p>
                ) : (
                  <>
                    <p className="text-2xl mb-1">📤</p>
                    <p className="text-sm font-medium text-zinc-600">คลิกเพื่ออัพโหลดรูป</p>
                    <p className="text-xs text-zinc-400 mt-1">รองรับ JPG, PNG, WebP · ปรับขนาดอัตโนมัติ</p>
                  </>
                )}
              </div>
            </label>
          </div>

          {/* Gallery */}
          {images.length === 0 ? (
            <p className="text-sm text-zinc-400 text-center py-8">ยังไม่มีรูปภาพ</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 overflow-hidden"
                >
                  <div className="aspect-[16/10] bg-zinc-200">
                    <img
                      src={img.src}
                      alt={img.caption}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-3 space-y-2">
                    <input
                      type="text"
                      value={img.caption}
                      onChange={(e) => updateCaption(idx, e.target.value)}
                      className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="คำอธิบายรูป"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        <button
                          onClick={() => moveImage(idx, -1)}
                          disabled={idx === 0}
                          className="rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="เลื่อนไปซ้าย"
                        >
                          ◀
                        </button>
                        <button
                          onClick={() => moveImage(idx, 1)}
                          disabled={idx === images.length - 1}
                          className="rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="เลื่อนไปขวา"
                        >
                          ▶
                        </button>
                      </div>
                      <button
                        onClick={() => removeImage(idx)}
                        className="rounded-md bg-red-50 px-2.5 py-1 text-xs text-red-500 hover:bg-red-100 transition-colors"
                      >
                        🗑️ ลบ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleSaveImages}
              disabled={images.length === 0}
              className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {imageSaved ? "✅ บันทึกรูปแล้ว!" : "💾 บันทึกรูปภาพ"}
            </button>
            <button
              onClick={handleResetImages}
              className="rounded-xl bg-zinc-100 px-6 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-200 transition-colors"
            >
              🔄 รีเซ็ตรูปเป็นค่าเริ่มต้น
            </button>
          </div>
        </section>

        {/* ─── PREVIEW ────────────────────────────────────────── */}
        <section className="rounded-2xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-black/5">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">👁️ ตัวอย่าง (Preview)</h2>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 space-y-3">
            <div className="text-lg font-bold text-zinc-900">{form.name}</div>
            <div className="grid gap-3 grid-cols-3">
              <PriceBox label="ราคาปกติ" value={form.normalPrice} />
              <PriceBox label="ราคาพิเศษ" value={form.specialPrice} highlight />
              <PriceBox label="ส่วนลด" value={form.save} />
            </div>
            <p className="text-sm text-zinc-500">{form.note}</p>
          </div>

          {images.length > 0 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.caption}
                  className="h-20 w-32 flex-none rounded-lg object-cover border border-zinc-200"
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* Reusable sub-components (internal to this file)                     */
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
        ฿{value}
      </div>
    </div>
  );
}
