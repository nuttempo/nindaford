# NindaFord Website

เว็บไซต์แนะนำโปรโมชันรถ Ford พร้อมเครื่องมือคำนวณค่างวดเบื้องต้น พัฒนาโดยใช้ React + TypeScript + Vite

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Lucide Icons

## Scripts

- `npm run dev` เริ่มโหมดพัฒนา
- `npm run lint` ตรวจคุณภาพโค้ดด้วย ESLint
- `npm run build` build production
- `npm run preview` preview ไฟล์ที่ build แล้ว
- `npm run images:webp` แปลงรูปใน `src/assets/images` เป็น `.webp`
- `npm run gemini:plan` เปิด Gemini โหมดวางแผน (read-only)
- `npm run gemini:control` เปิด Gemini โหมดควบคุมงานแก้โค้ด (auto-edit)
- `npm run gemini:control:yolo` เปิด Gemini โหมดควบคุมแบบอนุมัติทุก action อัตโนมัติ

## Tracking Events

- โปรเจกต์มี utility ติดตาม event ที่ `src/utils/analytics.ts`
- CTA หลัก (Hero, Offers, Calculator, Contact, Floating CTA) ส่ง event `cta_click` ไปที่ `window.gtag` (ถ้ามี) หรือ `window.dataLayer`
- รองรับ GTM แบบ env-safe: ตั้งค่า `VITE_GTM_ID` แล้วระบบจะ inject script อัตโนมัติ
- Hero CTA มี A/B test (`hero_primary_cta_v1`) พร้อม event `experiment_exposure` และ `experiment_conversion`

### ตั้งค่า GTM/GA4

1. คัดลอก `.env.example` เป็น `.env.local`
2. ใส่ค่า `VITE_GTM_ID=GTM-XXXXXXX`
3. รัน `npm run dev` หรือ deploy build

ดู mapping events และ conversion recommendation ได้ที่ `ANALYTICS_EVENTS.md`

## โครงสร้างหลัก

```text
src/
  App.tsx
  data/
    siteData.ts
    types.ts
  constants/
    animation.ts
  utils/
    format.ts
  features/
    home/
      hooks/
        useFinanceCalculator.ts
      layout/
        PageShell.tsx
      sections/
        TopNav.tsx
        HeroSection.tsx
        StatsSection.tsx
        OffersSection.tsx
        FeaturesSection.tsx
        CalculatorSection.tsx
        ReviewsSection.tsx
        ModelsSection.tsx
        TestimonialsSection.tsx
        FaqSection.tsx
        ContactSection.tsx
        SidebarEmbedSection.tsx
        FloatingCta.tsx
        SiteFooter.tsx
        types.ts
  components/
    ui.tsx
    FaqAccordion.tsx
```

## หมายเหตุ

- หน้า Home ถูกแยกแบบ co-location ไว้ใน `src/features/home`
- `App.tsx` ทำหน้าที่ประกอบหน้า (composition) และส่ง props ระหว่างส่วนต่าง ๆ
- คำสั่ง Gemini ใช้ policy จาก `.gemini/policies` และ instructions โครงการจาก `GEMINI.md`
