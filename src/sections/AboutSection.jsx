import { Shield, Clock, CheckCircle } from 'lucide-react';
import GlassReveal from '../components/GlassReveal';

export default function AboutSection({ dark, t }) {
  const D = dark;

  // Map features to use the translation keys
  const FEATURES = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: t.featTitle1,
      desc: t.featDesc1,
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: t.featTitle2,
      desc: t.featDesc2,
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: t.featTitle3,
      desc: t.featDesc3,
    },
  ];

  return (
    <section
      id="about"
      className={`py-20 relative border-t transition-colors duration-300 ${D ? 'border-zinc-900/40 bg-zinc-950/20' : 'border-zinc-200 bg-zinc-50'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">

        {/* ── Left: Copy + Feature List ── */}
        <div className="lg:col-span-5 space-y-5">
          <GlassReveal>
            <span className="text-xs text-amber-500 font-bold uppercase tracking-widest">
              {t.whyChooseUs}
            </span>
            <h2 className="heading-font text-3xl sm:text-5xl font-black uppercase">
              {t.servicesTitle}
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${D ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {t.featuresSub}
            </p>
          </GlassReveal>

          <div className="space-y-4">
            {FEATURES.map((feat, idx) => (
              <GlassReveal key={idx} delay={idx * 100}>
                <div className={`flex gap-4 p-4 rounded-xl border transition-colors duration-300 ${D ? 'border-zinc-800/40 bg-zinc-900/20' : 'border-zinc-200 bg-white shadow-sm'}`}>
                  <div className="p-2 h-fit bg-amber-500/10 text-amber-500 rounded-lg">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wide">
                      {feat.title}
                    </h4>
                    <p className={`text-[11px] mt-0.5 ${D ? 'text-zinc-500' : 'text-zinc-500'}`}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </GlassReveal>
            ))}
          </div>
        </div>

        {/* ── Right: Image + Overlay Card ── */}
        <div className="lg:col-span-7 relative h-64 sm:h-[420px] rounded-3xl overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800"
            alt="Premium Interior Cabin"
            className="w-full h-full object-cover filter brightness-75 scale-105 group-hover:scale-100 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-6 glass-panel rounded-xl space-y-1">
            <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">
              {t.execStandard}
            </span>
            <h4 className="text-sm sm:text-lg font-bold text-white uppercase tracking-wide">
              {t.mechSanitation}
            </h4>
            <p className="text-[10px] sm:text-xs text-zinc-300">
              {t.mechDesc}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}