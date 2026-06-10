import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import GlassReveal from '../components/GlassReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function ReviewsSection({ dark, t }) {
  const D = dark;
  const reviews = t.reviewsData;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const autoPlayRef = useRef(null);

  // ── Auto-play: advance every 3.5s ──────────────────────────────
  const startAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setCurrent(i => (i === reviews.length - 1 ? 0 : i + 1));
    }, 3500);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(autoPlayRef.current);
  }, [reviews.length]);

  // ── Manual controls — reset auto-play timer on tap ─────────────
  const goNext = () => {
    setDirection(1);
    setCurrent(i => (i === reviews.length - 1 ? 0 : i + 1));
    startAutoPlay();
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent(i => (i === 0 ? reviews.length - 1 : i - 1));
    startAutoPlay();
  };

  const goDot = (i) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
    startAutoPlay();
  };

  // ── Slide variants ─────────────────────────────────────────────
  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
  };

  return (
 <section
  id="reviews"
  className={`border-t transition-colors duration-300 
    /* Mobile: 60% top, 80% bottom */
    pt-[60%] pb-[80%] 
    /* Desktop (md and up): 15% bottom, reset top to default/fixed value */
    md:pt-20 md:pb-[15%]
    ${D ? 'border-zinc-900/40 bg-zinc-950/10' : 'border-zinc-200 bg-zinc-100/60'}
  `}
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <GlassReveal>
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs text-amber-500 font-bold uppercase tracking-widest">
              {t.reviewTitle}
            </span>
            <h2 className="heading-font text-3xl sm:text-5xl font-black uppercase">
              {t.reviewTitle} <span className="text-amber-500">Feedback</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
              {t.reviewSub}
            </p>
          </div>
        </GlassReveal>

        {/* ── DESKTOP: 3-column grid ── */}
        <div className="hidden sm:grid grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <GlassReveal key={idx} delay={idx * 100}>
              <motion.div
                whileHover={{ rotateX: 5, rotateY: 5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="h-full"
              >
                <ReviewCard rev={rev} dark={D} />
              </motion.div>
            </GlassReveal>
          ))}
        </div>

        {/* ── MOBILE: Carousel ── */}
        <div className="sm:hidden select-none">

          {/* Fixed-height card container — prevents layout jump */}
          <div className="relative overflow-hidden" style={{ minHeight: '220px' }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                className="w-full"
              >
                <ReviewCard rev={reviews[current]} dark={D} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Auto-play progress bar */}
          <div className={`mt-4 h-[2px] rounded-full overflow-hidden ${D ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
            <motion.div
              key={current}
              className="h-full bg-amber-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3.5, ease: 'linear' }}
            />
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between mt-4 px-1">

            {/* Prev */}
            <button
              onClick={goPrev}
              className={`p-2.5 rounded-xl border transition-all duration-200 active:scale-95 ${
                D
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-amber-500 hover:text-amber-400'
                  : 'bg-white border-zinc-200 text-zinc-500 hover:border-amber-400 hover:text-amber-500'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goDot(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-6 h-2 bg-amber-500'
                      : D
                        ? 'w-2 h-2 bg-zinc-700 hover:bg-zinc-500'
                        : 'w-2 h-2 bg-zinc-300 hover:bg-zinc-400'
                  }`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={goNext}
              className={`p-2.5 rounded-xl border transition-all duration-200 active:scale-95 ${
                D
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-amber-500 hover:text-amber-400'
                  : 'bg-white border-zinc-200 text-zinc-500 hover:border-amber-400 hover:text-amber-500'
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Counter */}
          <p className={`text-center text-[10px] font-bold uppercase tracking-widest mt-3 ${
            D ? 'text-zinc-600' : 'text-zinc-400'
          }`}>
            {current + 1} / {reviews.length}
          </p>
        </div>

      </div>
    </section>
  );
}

/* ── Shared Review Card ── */
function ReviewCard({ rev, dark: D }) {
  return (
    <div className={`liquid-hover glass-panel p-6 rounded-2xl space-y-4 flex flex-col justify-between shadow-lg border ${
      D ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white/50 border-zinc-200'
    }`}>
      <div className="space-y-2">
        <div className="flex gap-0.5">
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
  );
}