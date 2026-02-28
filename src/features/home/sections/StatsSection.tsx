import { motion } from "framer-motion";
import { STATS } from "../../../data/siteData";
import { fadeUpInView } from "../../../constants/animation";
import { Card } from "../../../components/ui";

export function StatsSection() {
  return (
    <motion.div {...fadeUpInView} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {STATS.map((stat) => (
        <Card key={stat.label} hoverable className="glass-card p-5 text-center">
          <div className="text-center relative z-10">
            <div className="text-3xl font-extrabold text-gradient pt-1">{stat.value}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-2 bg-white/50 backdrop-blur-sm rounded-full py-1 inline-block px-3 border border-white/30">{stat.label}</div>
          </div>
        </Card>
      ))}
    </motion.div>
  );
}
