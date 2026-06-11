import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import GlassReveal from '../components/GlassReveal';
import { popularDestinations, vehicles } from '../constants/vehicles';

const vehicleRows = [
  { key: 'sedan',  label: 'SEDAN'  },
  { key: 'suv',    label: 'SUV'    },
  { key: 'innova', label: 'INNOVA' },
  { key: 'crysta', label: 'CRYSTA' },
];

const includedItems = [
  'Driver Bata Rs.400',
  'Hillstation Charges Rs.300',
  'Other State Permit Charges',
  'Toll & Parking Charges',
];

function AnimatedBentoCard({ dest, idx, lang }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), spring);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const title = typeof dest.title === 'object' ? dest.title[lang] : dest.title;

  return (
    /*
      FIX: rounded-3xl + overflow-hidden live on this outer wrapper div — NOT on the
      motion.div. The motion.div only carries the 3D transform. This way the border
      radius is always respected and never collapses to a sharp edge on hover.
    */
    <div
      className={`rounded-3xl overflow-hidden h-[300px] md:h-full ${
        idx === 0 || idx === 4 ? 'md:row-span-2' : 'md:row-span-1'
      }`}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="
          bento-card relative group w-full h-full cursor-pointer
          border border-black/10 dark:border-white/10
          shadow-2xl
        "
      >
        {/* Background image */}
        <img
          src={dest.img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
        />

        {/* Default gradient + title — visible when NOT hovered */}
        <div className="
          absolute inset-0
          bg-gradient-to-t from-black/90 via-black/20 to-transparent
          transition-opacity duration-300 group-hover:opacity-0
        " />
        <div className="
          absolute bottom-0 left-0 p-6 z-30
          transition-opacity duration-300 group-hover:opacity-0
        ">
          <h4 className="heading-font text-2xl font-black uppercase text-white tracking-wide">
            {title}
          </h4>
        </div>

        {/* ── HOVER OVERLAY ── */}
        <div className="
          absolute inset-0 z-40
          flex flex-col
          opacity-0 group-hover:opacity-100
          translate-y-3 group-hover:translate-y-0
          transition-all duration-300 ease-out
          bg-white/95 dark:bg-black/90
          backdrop-blur-sm
          p-5
        ">
          {/* Route title */}
          <p className="
            heading-font text-sm font-black uppercase tracking-widest truncate
            text-amber-600 dark:text-amber-400
          ">
            {title}
          </p>

          {/* Pricing table */}
          <div className="flex-1 flex flex-col justify-center gap-1 mt-3">
            {/* Header */}
            <div className="
              grid grid-cols-3 text-[9px] font-bold uppercase tracking-widest pb-1
              border-b border-black/10 dark:border-white/10
              text-black/40 dark:text-white/40
            ">
              <span>Vehicle</span>
              <span className="text-center">One Way</span>
              <span className="text-right">Round Trip</span>
            </div>

            {vehicleRows.map(({ key, label }) => {
              const v = vehicles[key];
              if (!v) return null;
              return (
                <div
                  key={key}
                  className="
                    grid grid-cols-3 items-center py-[5px]
                    border-b border-black/5 dark:border-white/5 last:border-0
                  "
                >
                  <span className="
                    text-[11px] font-semibold uppercase tracking-wide
                    text-black/70 dark:text-white/80
                  ">
                    {label}
                  </span>
                  <span className="text-center text-[13px] font-black text-amber-600 dark:text-amber-400">
                    ₹{v.rate}/km
                  </span>
                  <span className="text-right text-[13px] font-black text-amber-500/80 dark:text-amber-300/80">
                    ₹{v.rate2}/km
                  </span>
                </div>
              );
            })}
          </div>

          {/* Included section */}
          <div className="mt-3 pt-3 border-t border-amber-500/30">
            <p className="
              text-[9px] font-black uppercase tracking-[0.2em] mb-2
              text-amber-600 dark:text-amber-500
            ">
              Included With
            </p>
            <ul className="space-y-[3px]">
              {includedItems.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <span className="mt-[3px] w-1 h-1 rounded-full bg-amber-500 dark:bg-amber-400 flex-shrink-0" />
                  <span className="text-[10px] leading-tight text-black/60 dark:text-white/70">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function DestinationsSection({ t, onScroll, lang }) {
  return (
    <section
      id="destinations"
      className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bento-card-container"
    >
      <GlassReveal>
        <div className="text-center mb-16">
          <span className="text-[10px] text-amber-500 font-black uppercase tracking-[0.3em]">
            {t.destTitle}
          </span>
          <h2 className="
            heading-font text-5xl sm:text-6xl font-black uppercase italic tracking-tighter mt-2
            text-black dark:text-white
          ">
            {t.popularRoutesTitle || 'Top Tracks'}
          </h2>
        </div>
      </GlassReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 h-auto md:h-[1200px]">
        {popularDestinations.slice(0, 9).map((dest, idx) => (
          <GlassReveal key={idx} delay={idx * 50}>
            <AnimatedBentoCard dest={dest} idx={idx} lang={lang} />
          </GlassReveal>
        ))}
      </div>
    </section>
  );
}