import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES_CONFIG } from '../constants/services';
import { WHATSAPP_NUMBER } from '../constants/vehicles';

export default function ServicesSection({ dark, t }) {
  if (!t || !t.services) return null;

  const handleWhatsApp = (serviceTitle) => {
    const message = encodeURIComponent(
      `Hi! I'm interested in your "${serviceTitle}" service. Please share details.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <section
      id="services"
      className={`py-24 px-6 transition-colors duration-500 ${
        dark ? 'bg-[#09090b]' : 'bg-[#fcfbf7]'
      }`}
    >
      <style>{`
        .svc-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .svc-card .flood-blob {
          position: absolute;
          bottom: -10%;
          left: 50%;
          width: 20px;
          height: 20px;
          background: #eab308;
          border-radius: 50%;
          transform: translate(-50%, 0) scale(1);
          transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
          pointer-events: none;
        }
        .svc-card:hover .flood-blob {
          transform: translate(-50%, 0) scale(45);
        }
        .svc-card .flood-icon {
          transition: background 0.3s ease 0.1s, color 0.3s ease 0.1s;
        }
        .svc-card:hover .flood-icon {
          background: rgba(0,0,0,0.12) !important;
          color: #000 !important;
        }
        .svc-card .flood-num {
          transition: color 0.3s ease 0.1s;
        }
        .svc-card:hover .flood-num {
          color: rgba(0,0,0,0.12) !important;
        }
        .svc-card .flood-title {
          transition: color 0.28s ease 0.1s;
        }
        .svc-card:hover .flood-title {
          color: #000 !important;
        }
        .svc-card .flood-desc {
          transition: color 0.28s ease 0.1s;
        }
        .svc-card:hover .flood-desc {
          color: rgba(0,0,0,0.65) !important;
        }
        .svc-card .flood-btn {
          transition: color 0.28s ease 0.1s, border-color 0.28s ease 0.1s;
        }
        .svc-card:hover .flood-btn {
          color: #000 !important;
          border-color: rgba(0,0,0,0.3) !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <p className="text-[10px] font-black tracking-[0.35em] uppercase text-amber-500 mb-3">
            What We Offer
          </p>
          <div className={`flex items-end justify-between border-b pb-6 ${
            dark ? 'border-zinc-800' : 'border-zinc-200'
          }`}>
            <h2
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              className={`text-4xl md:text-5xl font-black uppercase leading-none ${
                dark ? 'text-zinc-100' : 'text-zinc-900'
              }`}
            >
              {t.servicesTitle || 'Our Services'}
            </h2>
            <span className={`text-xs font-bold tracking-widest hidden sm:block ${
              dark ? 'text-zinc-700' : 'text-zinc-300'
            }`}>
              {SERVICES_CONFIG.length} Services
            </span>
          </div>
        </motion.div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES_CONFIG.map((item, i) => {
            const content = t.services[item.key];
            if (!content) return null;

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{
                  delay: i * 0.05,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`svc-card flex flex-col gap-5 p-7 rounded-2xl border ${
                  dark
                    ? 'bg-zinc-900/60 border-zinc-800'
                    : 'bg-white border-zinc-200'
                }`}
              >
                {/* Flood blob */}
                <div className="flood-blob" />

                {/* Icon + Number */}
                <div className="relative z-10 flex items-start justify-between">
                  <div
                    className={`flood-icon w-11 h-11 rounded-xl flex items-center justify-center border text-amber-500 ${
                      dark
                        ? 'bg-zinc-800 border-zinc-700'
                        : 'bg-zinc-50 border-zinc-200'
                    }`}
                  >
                    <item.icon size={20} strokeWidth={1.75} />
                  </div>
                 
                </div>

                {/* Text */}
                <div className="relative z-10 flex flex-col gap-2 flex-1">
                  <h3 className={`flood-title text-base font-black leading-snug ${
                    dark ? 'text-zinc-100' : 'text-zinc-900'
                  }`}>
                    {content.title}
                  </h3>
                  <p className={`flood-desc text-xs leading-relaxed ${
                    dark ? 'text-zinc-500' : 'text-zinc-500'
                  }`}>
                    {content.desc}
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleWhatsApp(content.title)}
                  className={`flood-btn relative z-10 self-start inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.12em] px-4 py-2 rounded border text-amber-500 bg-transparent ${
                    dark ? 'border-zinc-700' : 'border-zinc-300'
                  }`}
                >
                  Book Now
                  <ArrowUpRight size={12} strokeWidth={2.5} />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}