import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassReveal from '../components/GlassReveal';
import PremiumVehicleCarousel from '../components/PremiumVehicleCarousel';
import { vehicles } from '../constants/vehicles';
import { Users, Briefcase } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
  }
};

export default function TariffSection({ dark, t, lang }) {
  const D = dark;

  return (
    <section id="tariff" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <GlassReveal>
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs text-amber-500 font-bold uppercase tracking-widest">
            {t.transparentTariff}
          </span>
          <h2 className="heading-font text-3xl sm:text-5xl font-black uppercase">
            {t.tariff}
          </h2>
        </div>
      </GlassReveal>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {Object.entries(vehicles).map(([key, item]) => (
          <motion.div key={key} variants={cardVariants}>
            <div className={`liquid-hover glass-panel rounded-2xl overflow-hidden flex flex-col justify-between h-full shadow-lg ${D ? 'bg-zinc-900/50' : 'bg-white'}`}>
              
              {/* Carousel Container */}
              <div className="bg-[#FFFFFF] rounded-t-2xl overflow-hidden relative">
              <PremiumVehicleCarousel slides={item.slides} alt={item.name[lang]} darkMode={D} lang={lang} />
              </div>

              {/* Card Content */}
              <div className="p-5 space-y-4 relative z-10 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] bg-amber-500/10 text-amber-500 font-extrabold px-2 py-0.5 rounded-md uppercase border border-amber-500/20">
                    {item.name2[lang]}
                  </span>
                  <h3 className="heading-font text-2xl font-black uppercase tracking-wide mt-2">
                    {item.name[lang]}
                  </h3>

                  <div className={`flex items-center gap-4 text-xs border-b pb-3 mt-1 ${D ? 'text-zinc-400 border-zinc-800/50' : 'text-zinc-500 border-zinc-200'}`}>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-amber-500" /> {item.seats} {t.passengers}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5 text-amber-500" /> {item.bags}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <ul className="space-y-1.5 mb-4">
                    {item.instructions.map((inst, i) => (
                      <li key={i} className="flex items-center gap-2 text-[10px] uppercase font-bold text-zinc-500">
                        <span className="h-1 w-1 rounded-full bg-amber-500 shrink-0" />
                        <span className="leading-tight">{inst[lang]}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-2 border-t pt-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase">{t.oneWay}</span>
                      <span className="text-lg font-black text-amber-500">₹{item.rate}/km</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase">{t.roundTrip}</span>
                      <span className="text-lg font-black text-amber-500">₹{item.rate2}/km</span>
                    </div>
                  </div>
                  
                  <div className={`text-[9px] text-center mt-3 font-medium ${D ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    {t.extraCharges}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}