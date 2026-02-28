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

- มี `Campaign Landing` section สำหรับรวม CTA แคมเปญในจุดเดียว
- มี `section_view` อัตโนมัติสำหรับวิเคราะห์ funnel การเลื่อนดูแต่ละ section
- มี first-touch attribution อัตโนมัติ (UTM/referrer) แนบไปกับทุก event
- มี session context อัตโนมัติ (`session_id`, `event_index`) ในทุก event
- มี `scroll_depth` อัตโนมัติที่ milestone 25/50/75/100%
- มี `time_on_page` อัตโนมัติที่ 30/60/120 วินาที
- มี engagement event เพิ่มเติม: `faq_toggle` และ `carousel_interaction`
- มี event `test_drive_submit` สำหรับฟอร์มจองทดลองขับ
- มี event funnel ฟอร์มเพิ่ม: `test_drive_start`, `test_drive_validation_error`, `test_drive_abandon`
- รองรับ `VITE_HERO_CTA_VARIANT` เพื่อบังคับ variant ตอน QA
- รองรับ `VITE_LEAD_WEBHOOK_URL` สำหรับส่ง lead เข้า CRM/LINE OA

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
