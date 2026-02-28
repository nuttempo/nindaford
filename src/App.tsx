import {
  CalculatorSection,
  CampaignSection,
  ContactSection,
  FaqSection,
  FeaturesSection,
  FloatingCta,
  HeroSection,
  ModelsSection,
  OffersSection,
  ReviewsSection,
  SidebarEmbedSection,
  SiteFooter,
  StatsSection,
  TestDriveSection,
  TestimonialsSection,
  TopNav,
  useFinanceCalculator,
  PageShell,
} from "./features/home";
import { FORD_MODELS } from "./data/siteData";

/**
 * Quick question (to avoid guessing wrong):
 * ในกล่องตัวเลข 3 ช่อง (ราคาปกติ/ราคาพิเศษ/ส่วนลด) ถ้าหน้าจอแคบมาก คุณอยากให้ “เรียงเป็น 1 คอลัมน์” หรือ “ยังคง 3 คอลัมน์แต่ตัวเลขย่อ/ตัด …” ?
 * (ตอนนี้ผมตั้งค่าให้: < md เรียงลง, >= md เป็น 3 คอลัมน์ และตัวเลขจะไม่ล้นกรอบ)
 */

// ---------- Theme ----------
// 🎨 สีทั้งหมดถูกย้ายไปอยู่ที่ src/index.css (:root) แล้ว
// แก้ไขสีได้ที่ไฟล์เดียว ไม่ต้องมาแก้ที่นี่อีก!


export default function WebsiteStarter() {
  const financeCalculator = useFinanceCalculator(FORD_MODELS);

  return (
    <div className="min-h-screen text-zinc-800 bg-[color:var(--c-bg)] selection:bg-[color:var(--c-primary)] selection:text-white">
      <TopNav />

      <main>
        <HeroSection />

        <PageShell
          main={
            <>
              <StatsSection />
              <CampaignSection />
              <OffersSection />
              <FeaturesSection />
              <CalculatorSection {...financeCalculator} fordModels={FORD_MODELS} />
              <ReviewsSection />
              <ModelsSection />
              <TestDriveSection />
              <TestimonialsSection />
              <FaqSection />
              <ContactSection />
            </>
          }
          sidebar={<SidebarEmbedSection />}
        />
      </main>

      <FloatingCta />

      <SiteFooter />
    </div >
  );
}
