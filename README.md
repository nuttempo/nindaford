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

## AI Agents ฝ่ายต่างๆ

Agent เฉพาะทางแต่ละฝ่ายใช้ policy ที่กำหนดขอบเขตและข้อจำกัดของตัวเองใน `.gemini/policies/agents/`

| Agent | Execute | Plan (read-only) | ขอบเขต |
|-------|---------|------------------|--------|
| **UX/UI Designer** | `npm run agent:ux` | `npm run agent:ux:plan` | Visual design, layout, animation, responsive, UI components |
| **Marketing/Content** | `npm run agent:marketing` | `npm run agent:marketing:plan` | Copy, โปรโมชัน, campaign, CTA, hero messaging |
| **Analytics** | `npm run agent:analytics` | `npm run agent:analytics:plan` | Event tracking, GA4/GTM, KPI, conversion funnel |
| **Performance** | `npm run agent:performance` | `npm run agent:performance:plan` | Build optimization, Lighthouse, bundle size, web vitals |
| **QA** | `npm run agent:qa` | `npm run agent:qa:plan` | TypeScript errors, ESLint, accessibility, validation |

> แต่ละ agent มีสองโหมด: **Execute** (auto-edit) สำหรับลงมือทำ และ **Plan** (read-only) สำหรับวางแผนก่อนลงมือ

## Tracking Events

- Campaign Landing มี event เฉพาะ `campaign_view` และ `campaign_click_through`
- มี `time_on_page` อัตโนมัติที่ 30/60/120 วินาที
- มี engagement event เพิ่มเติม: `faq_toggle` และ `carousel_interaction`
- มี event `test_drive_submit` สำหรับฟอร์มจองทดลองขับ
- มี event funnel ฟอร์มเพิ่ม: `test_drive_start`, `test_drive_validation_error`, `test_drive_abandon`
- รองรับ `VITE_HERO_CTA_VARIANT` เพื่อบังคับ variant ตอน QA
- รองรับ `VITE_LEAD_WEBHOOK_URL` สำหรับส่ง lead เข้า CRM/LINE OA
- รองรับ `VITE_RELEASE_VERSION` เพื่อแนบเวอร์ชัน release ไปกับทุก analytics event

### ตั้งค่า GTM/GA4

1. คัดลอก `.env.example` เป็น `.env.local`
2. ใส่ค่า `VITE_GTM_ID=GTM-XXXXXXX`
3. รัน `npm run dev` หรือ deploy build

ดู mapping events และ conversion recommendation ได้ที่ `ANALYTICS_EVENTS.md`
มี GA4 setup แบบลงมือทำได้ทันทีในหัวข้อ `GA4 Implementation Checklist`
มี GTM setup runbook แบบ step-by-step ในหัวข้อ `GTM Container Checklist`
มี KPI metric/formula พร้อม owner/cadence ในหัวข้อ `KPI Definition Table`
มี dashboard template สำหรับ Looker Studio ในหัวข้อ `Looker Studio Dashboard Template`

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
- Agent ฝ่ายต่างๆ มี policy เฉพาะใน `.gemini/policies/agents/` — แต่ละ agent มีขอบเขตและข้อจำกัดของตัวเอง
