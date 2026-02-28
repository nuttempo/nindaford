import { ArrowRight } from "lucide-react";
import { Button, Card, Pill } from "../../../components/ui";
import { trackEvent } from "../../../utils/analytics";

export function SidebarEmbedSection() {
  return (
    <aside className="md:sticky md:top-24 h-fit">
      <Card className="p-6 md:p-8 shadow-sm ring-1 ring-slate-900/5 rounded-[2rem] bg-gradient-to-br from-white to-slate-50/50 hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-base font-bold text-slate-800">อัปเดตจากเพจ</div>
            <div className="text-xs text-slate-500 mt-1">Timeline (Embed)</div>
          </div>
          <Pill className="border-black/10">Live</Pill>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-black/10 bg-white">
          <iframe
            title="NindaFord Facebook"
            src={
              "https://www.facebook.com/plugins/page.php?href=" +
              encodeURIComponent("https://www.facebook.com/nindaford/") +
              "&tabs=timeline&width=340&height=520&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
            }
            width="100%"
            height={520}
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder={0}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>

        <div className="mt-4 grid gap-2">
          <a href="https://m.me/nindaford" target="_blank" rel="noreferrer" onClick={() => trackEvent("cta_click", { area: "sidebar", channel: "messenger", cta: "sidebar_inbox" })}>
            <Button variant="primary" className="w-full justify-center">
              ทัก Inbox <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
          <a href="https://www.facebook.com/nindaford/" target="_blank" rel="noreferrer" onClick={() => trackEvent("cta_click", { area: "sidebar", channel: "facebook", cta: "sidebar_open_page" })}>
            <Button variant="outline" className="w-full justify-center">เปิดหน้าเพจ</Button>
          </a>
        </div>

        <p className="mt-3 text-xs text-zinc-500">
          หมายเหตุ: บางเบราว์เซอร์บล็อกคุกกี้อาจทำให้ Embed แสดงไม่เต็ม แต่ลิงก์ยังใช้งานได้
        </p>
      </Card>
    </aside>
  );
}
