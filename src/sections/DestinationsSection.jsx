import { motion } from 'framer-motion';
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

function AnimatedBentoCard({ dest, idx, lang, dark }) {
  const title = typeof dest.title === 'object' ? dest.title[lang] : dest.title;

  return (
    <div
      className={`rounded-3xl overflow-hidden h-[300px] md:h-full ${
        idx === 0 || idx === 4 ? 'md:row-span-2' : 'md:row-span-1'
      }`}
    >
      <div className="relative group w-full h-full cursor-pointer shadow-2xl"
        style={{ border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)' }}
      >
        {/* Background image */}
        <img
          src={dest.img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
        />

        {/* Default gradient + title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
        <div className="absolute bottom-0 left-0 p-6 z-30 transition-opacity duration-300 group-hover:opacity-0">
          <h4 className="heading-font text-2xl font-black uppercase text-white tracking-wide">
            {title}
          </h4>
        </div>

        {/* ── HOVER OVERLAY ── */}
        <div
          className="absolute inset-0 z-40 flex flex-col opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-out backdrop-blur-sm p-5"
          style={{ backgroundColor: dark ? 'rgba(0,0,0,0.92)' : 'rgba(255,255,255,0.97)' }}
        >
          {/* Route title */}
          <p
            className="heading-font text-sm font-black uppercase tracking-widest truncate"
            style={{ color: dark ? '#fbbf24' : '#d97706' }}
          >
            {title}
          </p>

          {/* Pricing table */}
          <div className="flex-1 flex flex-col justify-center gap-1 mt-3">
            {/* Header */}
            <div
              className="grid grid-cols-3 text-[9px] font-bold uppercase tracking-widest pb-1"
              style={{
                borderBottom: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.12)',
                color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.45)',
              }}
            >
              <span>Vehicle</span>
              <span className="text-center">One Way</span>
              <span className="text-right">Round Trip</span>
            </div>

            {vehicleRows.map(({ key, label }, i) => {
              const v = vehicles[key];
              if (!v) return null;
              return (
                <div
                  key={key}
                  className="grid grid-cols-3 items-center py-[5px]"
                  style={{
                    borderBottom: i < vehicleRows.length - 1
                      ? dark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.06)'
                      : 'none',
                  }}
                >
                  <span
                    className="text-[11px] font-semibold uppercase tracking-wide"
                    style={{ color: dark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.75)' }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-center text-[13px] font-black"
                    style={{ color: dark ? '#fbbf24' : '#d97706' }}
                  >
                    ₹{v.rate}/km
                  </span>
                  <span
                    className="text-right text-[13px] font-black"
                    style={{ color: dark ? 'rgba(252,211,77,0.8)' : 'rgba(180,83,9,0.85)' }}
                  >
                    ₹{v.rate2}/km
                  </span>
                </div>
              );
            })}
          </div>

          {/* Included section */}
          <div
            className="mt-3 pt-3"
            style={{ borderTop: '1px solid rgba(245,158,11,0.3)' }}
          >
            <p
              className="text-[9px] font-black uppercase tracking-[0.2em] mb-2"
              style={{ color: dark ? '#f59e0b' : '#b45309' }}
            >
              Included With
            </p>
            <ul className="space-y-[3px]">
              {includedItems.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <span
                    className="mt-[3px] w-1 h-1 rounded-full flex-shrink-0"
                    style={{ backgroundColor: dark ? '#fbbf24' : '#d97706' }}
                  />
                  <span
                    className="text-[10px] leading-tight"
                    style={{ color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DestinationsSection({ t, onScroll, lang, dark }) {
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
          <h2
            className="heading-font text-5xl sm:text-6xl font-black uppercase italic tracking-tighter mt-2"
            style={{ color: dark ? '#ffffff' : '#09090b' }}
          >
            {t.popularRoutesTitle || 'Top Tracks'}
          </h2>
        </div>
      </GlassReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 h-auto md:h-[1200px]">
        {popularDestinations.slice(0, 9).map((dest, idx) => (
          <GlassReveal key={idx} delay={idx * 50}>
            <AnimatedBentoCard dest={dest} idx={idx} lang={lang} dark={dark} />
          </GlassReveal>
        ))}
      </div>
    </section>
  );
}