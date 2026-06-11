import React, { useEffect, useRef } from 'react';
import {
  ArrowRight, Calendar, Clock, MapPin, Navigation,
  Phone, User, Zap,
} from 'lucide-react';

import GlassReveal from '../components/GlassReveal';
import { vehicles } from '../constants/vehicles';

export default function HeroSection({
  dark, t, tripType, setTripType,
  selectedCar, setSelectedCar,
  formData, onInputChange,
  onSubmit,
}) {
  const D = dark;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouseTimeout;
    
    const mouse = {
      x: null,
      y: null,
      active: false
    };

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Strict Single-Color Rule Engine
    const getParticleColors = () => {
      const rand = Math.random();
      
      // ── Strict Light Theme Rule: Solid Yellow Only (No Double Colors) ──
      if (!D) {
        return {
          color: '#eab308',
          shadow: '#facc15'
        };
      }
const onSubmit = (e) => {
  e.preventDefault();
  
  const vehicle = vehicles[selectedCar];
  const distance = calculateDistance(formData.pickupAddress, formData.dropAddress);
  
  // Store only primitives (strings/numbers)
  setResult({
    price: `₹${vehicle.rate * distance}`,
    vehicleName: vehicle.name.en,  // string ✓
    rate: vehicle.rate,             // number ✓
  });
}
      // ── Dark Theme Rules ──
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        return {
          color: rand > 0.5 ? '#eab308' : '#000000',
          shadow: rand > 0.5 ? '#facc15' : 'transparent'
        };
      } else {
        return {
          color: rand > 0.8 ? '#fbbf24' : '#ffffff',
          shadow: rand > 0.8 ? '#fbbf24' : '#ffffff'
        };
      }
    };

    // Particle Logic Constructor
    class Particle {
      constructor(x, y, isBlast = false, angle = 0, speed = 0) {
        this.x = x;
        this.y = y;
        this.isBlast = isBlast;

        if (isBlast) {
          this.size = !D ? Math.random() * 4 + 2 : Math.random() * 3.5 + 1.5;
          this.alpha = 1;
          this.decay = !D ? Math.random() * 0.016 + 0.010 : Math.random() * 0.025 + 0.015;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
        } else {
          this.size = Math.random() * 2.5 + 1;
          this.alpha = 1;
          this.decay = Math.random() * 0.012 + 0.008;
          this.vx = (Math.random() - 0.5) * 1.5;
          this.vy = (Math.random() - 0.5) * 1.5 - 0.4;
        }

        const palette = getParticleColors();
        this.color = palette.color;
        this.shadowColor = palette.shadow;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        
        ctx.shadowBlur = D ? 8 : this.isBlast ? 6 : 3;
        ctx.shadowColor = this.shadowColor;
        
        ctx.fill();
        ctx.restore();
      }
    }

    const triggerBlastEffect = (x, y) => {
      const particleCount = window.innerWidth < 640 ? 25 : 55;
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5);
        const speed = !D ? Math.random() * 2.8 + 1.2 : Math.random() * 4 + 2; 
        particles.push(new Particle(x, y, true, angle, speed));
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      
      mouse.x = currentX;
      mouse.y = currentY;
      mouse.active = true;

      clearTimeout(mouseTimeout);

      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(currentX, currentY));
      }

      mouseTimeout = setTimeout(() => {
        if (mouse.active) {
          triggerBlastEffect(currentX, currentY);
        }
      }, 80);
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      clearTimeout(mouseTimeout);
    };

    const parentElement = canvas.parentElement;
    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseleave', handleMouseLeave);

    const spawnAmbientParticles = () => {
      if (Math.random() > 0.35) return;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const p = new Particle(x, y);
      p.alpha = Math.random() * 0.3 + 0.1; 
      p.decay = Math.random() * 0.004 + 0.002; 
      particles.push(p);
    };

    const renderLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      spawnAmbientParticles();

      particles = particles.filter(p => p.alpha > 0);
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(mouseTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [D]);

  return (
    <section
      id="home"
      className={`relative min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] lg:max-h-[950px] flex items-center justify-center px-4 py-8 lg:py-0 overflow-hidden transition-colors duration-500 ${
        D ? 'bg-zinc-950' : 'bg-zinc-50'
      }`}
    >
      {/* Inject professional web-easing custom animation classes */}
      <style>{`
        .pro-animate-fade {
          opacity: 0;
          animation: pro-fade-in-up 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .pro-animate-scale {
          opacity: 0;
          animation: pro-scale-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes pro-fade-in-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pro-scale-up {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <div className={`absolute top-1/4 left-10 w-[45vw] h-[45vw] rounded-full blur-[150px] pointer-events-none z-0 ${
        D ? 'bg-amber-500/5' : 'bg-amber-500/10'
      }`} />
      <div className={`absolute bottom-5 right-5 w-[35vw] h-[35vw] rounded-full blur-[130px] pointer-events-none z-0 ${
        D ? 'bg-yellow-600/5' : 'bg-yellow-500/5'
      }`} />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-6 lg:gap-12 items-center relative z-10">
        
        {/* Left Layout Pane Elements */}
        <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
          <GlassReveal delay={0}>
            <div 
              style={{ animationDelay: '100s' }}
              className="pro-animate-fade inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border bg-amber-100 border-amber-200 text-amber-800 dark:bg-zinc-900 dark:border-zinc-800 dark:text-amber-400"
            >
              <Zap className="h-3 w-3" /> {t.subtitle}
            </div>
          </GlassReveal>

          <GlassReveal delay={150}>
            <h1 
              style={{ animationDelay: '200ms' }}
              className="pro-animate-fade heading-font text-4xl sm:text-5xl xl:text-6xl font-black uppercase leading-[0.95] tracking-tight text-current"
            >
              {t.mainTitle+" "} 
               <span className="yellow bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                {tripType === 'oneway' ? '@ ₹16/km' : 'Best Rates'}
              </span>
            </h1>
          </GlassReveal>

          <GlassReveal delay={250}>
            <p 
              style={{ animationDelay: '300ms' }}
              className={`pro-animate-fade text-xs sm:text-sm max-w-sm mx-auto lg:mx-0 leading-relaxed ${D ? 'text-zinc-400' : 'text-zinc-600'}`}
            >
              {t.desc}
            </p>
          </GlassReveal>

          <GlassReveal delay={350} className="pt-1">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-left">
              {[
                ['⭐ 4.9', t.rating, '400ms'], 
                ['🚗 500+', t.activeRides, '480ms']
              ].map(([stat, label, delay]) => (
                <div 
                  key={label} 
                  style={{ animationDelay: delay }}
                  className={`pro-animate-fade px-3 py-1.5 rounded-xl border transition-transform duration-200 hover:scale-[1.02] ${D ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-zinc-100 border-zinc-200 text-zinc-900'}`}
                >
                  <div className="text-sm sm:text-base font-bold text-amber-500 heading-font">{stat}</div>
                  <div className="text-[9px] uppercase tracking-wider text-zinc-500">{label}</div>
                </div>
              ))}
            </div>
          </GlassReveal>
        </div>

        {/* Form Container Wrapper Block */}
        <div 
          style={{ animationDelay: '250ms' }}
          className="pro-animate-fade lg:col-span-7 w-full max-w-xl mx-auto"
        >
          {/* OPTIMIZED: Adjusted card inner vertical padding and structure so form content sits higher */}
          <div className={`rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3.5 border ${
            D ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-zinc-200/80'
          }`}>
            
            {/* Trip Type Tabs */}
            <div 
              style={{ animationDelay: '350ms' }}
              className={`pro-animate-scale p-1 flex rounded-xl border ${D ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-100 border-zinc-200'}`}
            >
              {['oneway', 'roundtrip'].map(mode => {
                const isActive = tripType === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setTripType(mode)}
                    className={`flex-1 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-amber-500 text-zinc-950 shadow-sm font-black'
                        : D
                          ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                          : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
                    }`}
                  >
                    {mode === 'oneway' ? `✓ ${t.oneWay}` : `⇄ ${t.roundTrip}`}
                  </button>
                );
              })}
            </div>

            <form onSubmit={onSubmit} className="space-y-3.5">
              {/* Form Input Grid Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <Field label={t.name} dark={D} style={{ animationDelay: '420ms' }} className="pro-animate-scale">
                  <User className="h-3.5 w-3.5 text-amber-500" />
                  <input type="text" name="name" required  value={formData.name} onChange={onInputChange} className="bg-transparent w-full text-xs focus:outline-none font-medium text-current" />
                </Field>

                <Field label={t.mobile} dark={D} style={{ animationDelay: '470ms' }} className="pro-animate-scale">
                  <Phone className="h-3.5 w-3.5 text-amber-500" />
                  <input type="tel" name="mobile" required  value={formData.mobile} onChange={onInputChange} className="bg-transparent w-full text-xs focus:outline-none font-medium text-current" />
                </Field>

                <Field label={t.pickup} dark={D} style={{ animationDelay: '520ms' }} className="pro-animate-scale">
                  <MapPin className="h-3.5 w-3.5 text-amber-500" />
                  <input type="text" name="pickupAddress" required  value={formData.pickupAddress} onChange={onInputChange} className="bg-transparent w-full text-xs focus:outline-none font-medium text-current" />
                </Field>

                <Field label={t.drop} dark={D} style={{ animationDelay: '570ms' }} className="pro-animate-scale">
                  <Navigation className="h-3.5 w-3.5 text-yellow-500" />
                  <input type="text" name="dropAddress" required  value={formData.dropAddress} onChange={onInputChange} className="bg-transparent w-full text-xs focus:outline-none font-medium text-current" />
                </Field>

                <Field label={t.date} dark={D} style={{ animationDelay: '620ms' }} className="pro-animate-scale">
                  <Calendar className="h-3.5 w-3.5 text-amber-500" />
                  <input type="date" name="date" required value={formData.date} onChange={onInputChange} className="bg-transparent w-full text-xs focus:outline-none font-medium text-current" />
                </Field>

                <Field label={t.time} dark={D} style={{ animationDelay: '670ms' }} className="pro-animate-scale">
                  <Clock className="h-3.5 w-3.5 text-yellow-500" />
                  <input type="time" name="time" required value={formData.time} onChange={onInputChange} className="bg-transparent w-full text-xs focus:outline-none font-medium text-current" />
                </Field>

                {tripType === 'roundtrip' && (
                  <>
                    <Field label={t.returnDate} dark={D} style={{ animationDelay: '720ms' }} className="pro-animate-scale">
                      <Calendar className="h-3.5 w-3.5 text-amber-500" />
                      <input type="date" name="returnDate" required value={formData.returnDate} onChange={onInputChange} className="bg-transparent w-full text-xs focus:outline-none font-medium text-current" />
                    </Field>

                    <Field label={t.returnTime} dark={D} style={{ animationDelay: '770ms' }} className="pro-animate-scale">
                      <Clock className="h-3.5 w-3.5 text-yellow-500" />
                      <input type="time" name="returnTime" required value={formData.returnTime} onChange={onInputChange} className="bg-transparent w-full text-xs focus:outline-none font-medium text-current" />
                    </Field>
                  </>
                )}
              </div>

              {/* Car Selection Sub-Block */}
              <div style={{ animationDelay: '740ms' }} className="pro-animate-scale space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                  {t.selectCar}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(vehicles).map(([key, value], index) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedCar(key)}
                      style={{ animationDelay: `${800 + index * 60}ms` }}
                      className={`pro-animate-scale p-1.5 rounded-xl text-center transition-all duration-200 flex flex-col items-center justify-between border hover:scale-[1.02] ${
                        selectedCar === key
                          ? 'border-amber-500 bg-amber-500/10'
                          : D
                            ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                            : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <img src={value.slides[0].img} alt={value.name.en} className="h-7 sm:h-7 w-auto object-contain pointer-events-none mb-1" />
                      <div>
                        <div className="text-[9px] font-bold uppercase tracking-tight text-current">
                          {value.name2.en.split(' ')[0] || value.name2.en}
                        </div>
                        <div className="text-[9px] text-amber-500 font-extrabold">₹{value.rate}/km</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* FIXED BUTTON: Forced explicit solid background color with pure black text contrast inside structural layout buffer */}
              <div className="pt-1.5 relative z-30">
                <button
                  type="submit"
                  style={{ animationDelay: '1050ms' }}
                  className="pro-animate-scale w-full py-3 rounded-xl font-black uppercase text-xs tracking-widest bg-[#eab308] hover:bg-[#facc15] text-black flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                >
                  <span className="text-black font-black">{t.estimate}</span> 
                  <ArrowRight className="h-4 w-4 stroke-[3] text-black" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, dark, children, className = '', style }) {
  return (
    <div style={style} className={`space-y-1 ${className}`}>
      <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">
        {label}
      </label>
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-colors duration-200 focus-within:border-amber-500/40 ${
        dark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200'
      }`}>
        {children}
      </div>
    </div>
  );
}