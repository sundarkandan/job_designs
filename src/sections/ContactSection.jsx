import { Phone, MapPin, Clock, CheckCircle, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER, PHONE_NUMBER } from '../constants/vehicles';
import { motion } from 'framer-motion';
export default function ContactSection({ dark, t }) {
  const D = dark;

  return (
    <section id="contact" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-3xl p-6 sm:p-12 relative overflow-hidden grid lg:grid-cols-12 gap-8 items-center shadow-2xl">

        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* ── Left: Info ── */}
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs text-amber-500 font-bold uppercase tracking-widest">
            {t.contactTitle}
          </span>
          <h2 className="heading-font text-3xl sm:text-5xl font-black uppercase">
            {t.contactHeadingPart1} <br />{t.contactHeadingPart2}{' '}
            <span className="text-amber-500">{t.contactHeadingAccent}</span>
          </h2>
          <p className={`text-xs sm:text-sm max-w-lg leading-relaxed ${D ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {t.contactSub}
          </p>

          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs ${D ? 'text-zinc-400' : 'text-zinc-600'}`}>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-amber-400" /> {PHONE_NUMBER}
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-amber-400" /> {t.location}
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-amber-400" /> {t.opsHub}
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-4 w-4 text-amber-400" /> {t.verifiedAgency}
            </div>
          </div>
        </div>

  {/* ── Right: CTA Buttons ── */}
<div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 w-full">
  
  {/* Call Button: Horizontal Shake Animation */}
  <motion.a
    href={`tel:${PHONE_NUMBER}`}
    
    className= "shake-animation flex-1 py-3.5 text-center rounded-xl font-black uppercase text-xs tracking-widest bg-amber-500 text-zinc-950 flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors duration-300 shadow-lg"
  >
    <Phone className="h-4 w-4" /> {t.callNow}
  </motion.a>

  {/* WhatsApp Button: Badge Pulse Animation */}
  <motion.a
    href={`https://wa.me/${WHATSAPP_NUMBER}`}
    target="_blank"
    rel="noreferrer"
    animate={{ 
      scale: [1, 1.03, 1],
      boxShadow: [
        "0 0 0 0 rgba(52, 211, 153, 0.4)",
        "0 0 0 10px rgba(52, 211, 153, 0)",
        "0 0 0 0 rgba(52, 211, 153, 0)"
      ]
    }}
    transition={{ 
      duration: 2, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
    className="flex-1 py-3.5 text-center rounded-xl font-black uppercase text-xs tracking-widest bg-zinc-900 border border-zinc-800 text-emerald-400 flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors duration-300 shadow-lg"
  >
    <MessageCircle className="h-4 w-4" /> {t.whatsappDesk}
  </motion.a>
</div>

      </div>
    </section>
  );
}