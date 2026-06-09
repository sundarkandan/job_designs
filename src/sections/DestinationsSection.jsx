import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import GlassReveal from '../components/GlassReveal';
import { popularDestinations } from '../constants/vehicles';

function AnimatedBentoCard({ dest, onScroll, idx, lang }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for the tilt
  const spring = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), spring);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);

    // Sync shine effect
    e.currentTarget.style.setProperty('--x', `${(mouseX / width) * 100}%`);
    e.currentTarget.style.setProperty('--y', `${(mouseY / height) * 100}%`);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`bento-card relative group overflow-hidden rounded-3xl h-[300px] md:h-full border border-white/10 shadow-2xl ${
        idx === 0 || idx === 4 ? "md:row-span-2" : "md:row-span-1"
      }`}
    >
    
<img
  src={dest.img}
  alt={dest.title}

  className="w-full h-full object-cover transition-transform duration-[2s]"
/>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

   <div className="absolute bottom-0 left-0 p-8 z-30">
        <h4 className="heading-font text-2xl font-black uppercase text-white tracking-wide">
          {dest.title[lang]} {/* Access title using lang key */}
        </h4>
       
      </div>
    </motion.div>
  );
}

export default function DestinationsSection({ t, onScroll, lang }) {
  return (
    <section id="destinations" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bento-card-container">
      <GlassReveal>
        <div className="text-center mb-16">
          <span className="text-[10px] text-amber-500 font-black uppercase tracking-[0.3em]">{t.destTitle}</span>
          <h2 className="heading-font text-5xl sm:text-6xl font-black uppercase italic tracking-tighter mt-2">
            {t.popularRoutesTitle || "Top Tracks"}
          </h2>
        </div>
      </GlassReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 h-auto md:h-[1200px]">
        {popularDestinations.slice(0, 9).map((dest, idx) => (
          <GlassReveal key={idx} delay={idx * 50}>
            {/* Pass lang down to the card */}
            <AnimatedBentoCard dest={dest} onScroll={onScroll} idx={idx} lang={lang} />
          </GlassReveal>
        ))}
      </div>
    </section>
  );
}