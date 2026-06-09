import { motion } from 'framer-motion';
import { Shield, Clock, CheckCircle } from 'lucide-react';
import GlassReveal from '../components/GlassReveal';

export default function AboutSection({ dark, t }) {
  const D = dark;

  // Features mapping updated to use keys from your translation file
  const FEATURES = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: t.featTitle1 || 'Vetted Chauffeur Network',
      desc: t.featDesc1 || 'Background checked, professional transit handlers.',
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: t.featTitle2 || 'Real-time Live Dispatch',
      desc: t.featDesc2 || 'Fleet units aligned with autonomous routing.',
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: t.featTitle3 || 'Zero Surge Contingency',
      desc: t.featDesc3 || 'Flat per-kilometer balance standard.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="about" className={`py-20 relative border-t transition-colors duration-300 ${D ? 'border-zinc-900/40 bg-zinc-950/20' : 'border-zinc-200 bg-zinc-50'}`}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center"
      >
        <motion.div variants={itemVariants} className="lg:col-span-5 space-y-5">
          <span className="text-xs text-amber-500 font-bold uppercase tracking-widest">{t.whyChooseUs}</span>
          <h2 className="heading-font text-3xl sm:text-5xl font-black uppercase">{t.servicesTitle}</h2>
          <p className={`text-xs sm:text-sm leading-relaxed ${D ? 'text-zinc-400' : 'text-zinc-600'}`}>{t.featuresSub}</p>

          <div className="space-y-4">
            {FEATURES.map((feat, idx) => (
              <div key={idx} className={`flex gap-4 p-4 rounded-xl border transition-colors duration-300 ${D ? 'border-zinc-800/40 bg-zinc-900/20' : 'border-zinc-200 bg-white shadow-sm'}`}>
                <div className="p-2 h-fit bg-amber-500/10 text-amber-500 rounded-lg">{feat.icon}</div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wide">{feat.title}</h4>
                  <p className={`text-[11px] mt-0.5 ${D ? 'text-zinc-500' : 'text-zinc-500'}`}>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Image Card Section */}
        <motion.div className="lg:col-span-7 relative h-64 sm:h-[420px] rounded-3xl overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800"
            alt="Premium Interior"
            className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-6 glass-panel rounded-xl space-y-1">
            <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">{t.execStandard || 'Executive Standard'}</span>
            <h4 className="text-sm sm:text-lg font-bold text-white uppercase tracking-wide">{t.mechSanitation || 'Detailed Mechanics & Sanitation'}</h4>
            <p className="text-[10px] sm:text-xs text-zinc-300">{t.mechDesc || 'Every outstation module goes through meticulous verification.'}</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}