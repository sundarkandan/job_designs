import { Star } from 'lucide-react';
import GlassReveal from '../components/GlassReveal';
import { motion } from 'framer-motion';
const REVIEWS = [
  {
    name: 'Dr. Anand Gopalan',
    route: 'Chennai ⭢ Madurai',
    text: 'Exceptional transit execution module. Car interior was clean, driver displayed master level navigational orientation.',
  },
  {
    name: 'Meera Krishnan',
    route: 'Coimbatore ⭢ Bangalore',
    text: 'One-way operational billing metrics are highly transparent. Saved around 40% travel expenses over alternative outstation services.',
  },
  {
    name: 'S. Ranganathan',
    route: 'Tirunelveli ⭢ Chennai',
    text: 'Professional corporate travel arrangement desk. The online estimate matches exactly down to the final printed invoice.',
  },
];

export default function ReviewsSection({ dark, t }) {
  const D = dark;

  return (
    <section id="reviews" style={{padding:"10%"}} className={`py-20 border-t transition-colors duration-300 ${D ? 'border-zinc-900/40 bg-zinc-950/10' : 'border-zinc-200 bg-zinc-100/60'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassReveal>
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs text-amber-500 font-bold uppercase tracking-widest">{t.reviewTitle}</span>
            <h2 className="heading-font text-3xl sm:text-5xl font-black uppercase">
              {t.reviewTitle} <span className="text-amber-500">Feedback</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">{t.reviewSub}</p>
          </div>
        </GlassReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {t.reviewsData.map((rev, idx) => (
  <GlassReveal key={idx} delay={idx * 100}>
    {/* 3D Tilt Wrapper */}
    <motion.div
      whileHover={{ 
        rotateX: 5, 
        rotateY: 5, 
        scale: 1.02,
        z: 10 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 20 
      }}
      className="perspective-1000 h-full"
    >
      <div className={`liquid-hover glass-panel p-6 rounded-2xl space-y-4 flex flex-col justify-between h-full shadow-lg border ${
        D ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white/50 border-zinc-200'
      }`}>
        <div className="space-y-2">
          <div className="flex text-amber-400 gap-0.5">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            ))}
          </div>
          <p className={`text-xs leading-relaxed italic ${D ? 'text-zinc-400' : 'text-zinc-600'}`}>
            "{rev.text}"
          </p>
        </div>
        <div className={`border-t pt-3 ${D ? 'border-zinc-800/40' : 'border-zinc-200'}`}>
          <div className="text-xs font-bold uppercase tracking-wide">{rev.name}</div>
          <div className="text-[10px] text-amber-500 font-medium uppercase tracking-wider mt-0.5">
            {rev.route}
          </div>
        </div>
      </div>
    </motion.div>
  </GlassReveal>
))}
        </div>
      </div>
    </section>
  );
}
