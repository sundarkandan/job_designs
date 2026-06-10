import { Shield, Clock, CheckCircle } from 'lucide-react';
import GlassReveal from '../components/GlassReveal';

export default function AboutSection({ dark, t }) {
  const D = dark;

  const FEATURES = [
    { icon: <Shield className="h-5 w-5" />,      title: t.featTitle1, desc: t.featDesc1 },
    { icon: <Clock className="h-5 w-5" />,        title: t.featTitle2, desc: t.featDesc2 },
    { icon: <CheckCircle className="h-5 w-5" />,  title: t.featTitle3, desc: t.featDesc3 },
  ];

  return (
    <section
      id="about"
      className={`py-20 relative border-t transition-colors duration-300 ${
        D ? 'border-zinc-900/40 bg-zinc-950/20' : 'border-zinc-200 bg-zinc-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">

        {/* ── Left: Copy + Feature List ── */}
        <div className="lg:col-span-5 space-y-5">
         <center>
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

         </center>
          <div className="space-y-4">
            {FEATURES.map((feat, idx) => (
              <GlassReveal key={idx} delay={idx * 100}>
                <div className={`flex gap-4 p-4 rounded-xl border transition-colors duration-300 ${
                  D ? 'border-zinc-800/40 bg-zinc-900/20' : 'border-zinc-200 bg-white shadow-sm'
                }`}>
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
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
            style={{
              // ✅ FIX: Dark theme = dim; Light theme = slightly dim only at bottom
              filter: D ? 'brightness(0.6)' : 'brightness(0.75)',
            }}
          />

          {/* ✅ FIX: Gradient — dark theme keeps zinc-950, light theme uses strong black gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: D
                ? 'linear-gradient(to top, rgba(9,9,11,0.97) 0%, rgba(9,9,11,0.3) 50%, transparent 100%)'
                : 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.10) 100%)',
            }}
          />

          {/* ✅ FIX: Overlay card — always dark bg regardless of theme for readability */}
          <div
            className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 rounded-xl space-y-1.5 p-4 sm:p-5"
            style={{
              background: D
                ? 'rgba(9, 9, 11, 0.82)'       // dark theme: near-black
                : 'rgba(10, 10, 10, 0.78)',     // ✅ light theme: also dark card — white text readable
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: D
                ? '1px solid rgba(255,255,255,0.07)'
                : '1px solid rgba(234,179,8,0.25)',  // ✅ amber border on light for polish
            }}
          >
            {/* Label */}
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">
              {t.execStandard}
            </span>

            {/* Heading — always white */}
            <h4 className="text-sm sm:text-lg font-bold text-white uppercase tracking-wide leading-tight">
              {t.mechSanitation}
            </h4>

            {/* Body — always light zinc for contrast on dark card */}
            <p className="text-[10px] sm:text-xs text-zinc-300 leading-relaxed">
              {t.mechDesc}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}