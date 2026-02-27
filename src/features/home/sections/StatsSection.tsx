import { motion } from "framer-motion";
import { STATS } from "../../../data/siteData";
import { fadeUpInView } from "../../../constants/animation";

export function StatsSection() {
  return (
    <motion.div {...fadeUpInView} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {STATS.map((stat) => (
        <div key={stat.label} className="rounded-2xl bg-white border border-black/5 shadow-sm p-5 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="text-center relative z-10">
            <div className="text-3xl font-extrabold text-gradient pt-1">{stat.value}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-2 bg-white/50 backdrop-blur-sm rounded-full py-1 inline-block px-3 border border-slate-100">{stat.label}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
