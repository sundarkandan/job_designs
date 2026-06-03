import React, { useState, useEffect, useRef } from 'react';
import {
  Car, Shield, Clock, MapPin, Menu, X, Sun, Moon, ArrowRight,
  Calendar, User, ChevronRight, Navigation, Users, Briefcase,
  Phone, Star, CheckCircle, Zap, Award, TrendingUp
} from 'lucide-react';

import Img from "./1780410771882.png"

/* ─── GOOGLE FONTS INJECTION ─── */
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);


/* ─── INFINITE CAROUSEL WITH EXACT IMAGE-NAME MAPPING (LEFT TO RIGHT) ─── */
function VehicleImageSlider({ slides, alt }) {
  const extendedSlides = [...slides, ...slides, ...slides];
  const totalItems = slides.length;
  
  const [currentIndex, setCurrentIndex] = useState(totalItems * 2 - 1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [activeTextIndex, setActiveTextIndex] = useState((totalItems * 2 - 1) % totalItems);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex - 1;
        setActiveTextIndex((nextIndex % totalItems + totalItems) % totalItems);
        return nextIndex;
      });
      setIsTransitioning(true);
    }, 2500);

    return () => clearInterval(interval);
  }, [totalItems]);

  const handleTransitionEnd = () => {
    if (currentIndex <= totalItems - 1) {
      setIsTransitioning(false);
      const resetIndex = currentIndex + totalItems;
      setCurrentIndex(resetIndex);
      setActiveTextIndex(resetIndex % totalItems);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-900 group">
      <div 
        className="flex w-full h-full"
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedSlides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
              src={slide.img}
              alt={`${alt} ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 left-3 right-3 z-10">
        <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl inline-block max-w-[85%] shadow-lg">
          <p className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest opacity-80">
            Current Model
          </p>
          <h4 
            key={activeTextIndex}
            className="text-white heading font-black text-sm uppercase tracking-wide animate-[fadeIn_0.4s_ease-out]"
          >
            {slides[activeTextIndex]?.modelName}
          </h4>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ─── PARTICLE CANVAS ─── */
function CanvasParticles({ darkMode }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class P {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.r = Math.random() * 1.8 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }
      step() {
        this.x += this.vx; this.y += this.vy;
        if (this.x > canvas.width) this.x = 0; else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0; else if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = darkMode ? 'rgba(234,179,8,0.35)' : 'rgba(161,120,0,0.18)';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill();
      }
    }

    const pts = Array.from({ length: 55 }, () => new P());
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.strokeStyle = darkMode
              ? `rgba(234,179,8,${0.12 - d / 1200})`
              : `rgba(180,140,0,${0.1 - d / 1500})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
          }
        }
      }
      pts.forEach(p => { p.step(); p.draw(); });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf); };
  }, [darkMode]);
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}

/* ─── SCROLL REVEAL ─── */
function Reveal({ children, className = '', delay = 0 }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>
      {children}
    </div>
  );
}

/* ─── COUNTER ANIMATION ─── */
function CountUp({ target, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        obs.disconnect();
        let start = 0;
        const step = Math.ceil(target / 60);
        const t = setInterval(() => {
          start += step;
          if (start >= target) { setVal(target); clearInterval(t); } else setVal(start);
        }, 20);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ═══════════════════════════════════════════════ MAIN APP ═══ */
export default function App() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tripType, setTripType] = useState('oneway');
  
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  const D = dark;
  const scroll = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'book-trip', label: 'Book Ride' },
    { id: 'services', label: 'Services' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'blog', label: 'Blog' },
    { id: 'terms', label: 'Terms' },
  ];

  const vehicles = [
    { 
      name: 'Premium Sedan', 
      tag: 'Dzire / Etios', 
      slides: [
        { img: 'https://imgd.aeplcdn.com/1056x594/n/17ueora_1420377.jpg?q=80&q=80&wm=1', modelName: 'Swift Dzire' },
        { img: 'https://static.vecteezy.com/system/resources/previews/051/565/283/non_2x/side-view-of-white-sports-sedan-car-isolated-on-white-background-with-clipping-path-photo.jpg', modelName: 'Toyota Etios' },
        { img: 'https://cdn.corenexis.com/files/c/1661562720.jpg', modelName: 'Maruti Ciaz' }
      ], 
      seats: '4+1', 
      bags: '2 Bags', 
      feat: 'Compact & Cost Effective', 
      oneWay: '₹16/km', 
      round: '₹14/km' 
    },
    { 
      name: 'Executive SUV', 
      tag: 'Ertiga / Marazzo', 
      slides: [
        { img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600', modelName: 'Maruti Ertiga' },
        { img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=600', modelName: 'Mahindra Marazzo' },
        { img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600', modelName: 'Renault Triber' }
      ], 
      seats: '6+1', 
      bags: '4 Bags', 
      feat: 'Great Family Value', 
      oneWay: '₹20/km', 
      round: '₹19/km' 
    },
    { 
      name: 'Innova Crysta', 
      tag: 'Premium MPV', 
      slides: [
        { img: 'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?auto=format&fit=crop&q=80&w=600', modelName: 'Innova Crysta Premium' },
        { img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600', modelName: 'Innova Touring Sport' }
      ], 
      seats: '7+1', 
      bags: '5 Bags', 
      feat: 'Ultimate Highway Comfort', 
      oneWay: '₹24/km', 
      round: '₹23/km' 
    },
  ];

  const oneWayRows = [
    { type: 'SEDAN', rate: '₹16/KM', bata: '₹500', charge: 'One Way Toll' },
    { type: 'ETIOS', rate: '₹16/KM', bata: '₹500', charge: 'One Way Toll' },
    { type: 'SUV', rate: '₹20/KM', bata: '₹500', charge: 'One Way Toll' },
    { type: 'INNOVA', rate: '₹21/KM', bata: '₹500', charge: 'One Way Toll' },
    { type: 'INNOVA CRYSTA', rate: '₹24/KM', bata: '₹600', charge: 'One Way Toll' },
  ];
  const roundRows = [
    { type: 'SEDAN', rate: '₹14/KM', bata: '₹500', charge: 'Toll, Parking' },
    { type: 'ETIOS', rate: '₹14/KM', bata: '₹500', charge: 'Toll, Parking' },
    { type: 'SUV', rate: '₹19/KM', bata: '₹500', charge: 'Toll, Parking' },
    { type: 'INNOVA', rate: '₹20/KM', bata: '₹500', charge: 'Toll, Parking' },
    { type: 'INNOVA CRYSTA', rate: '₹23/KM', bata: '₹600', charge: 'Toll, Parking' },
  ];

  const blogPosts = [
    { title: 'Top Weekend Getaways Near Major Indian Metro Hubs', date: 'June 02, 2026', author: 'Ananya Iyer', img: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&q=80&w=600', tag: 'Travel' },
    { title: '5 Smart Airport Layout Navigation Rules for Fast Boarding', date: 'May 24, 2026', author: 'Rahul Sharma', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600', tag: 'Tips' },
    { title: 'Our Clean Transit Vision: Adding EV Models to the Fleet', date: 'May 11, 2026', author: 'Operations Desk', img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600', tag: 'Fleet' },
  ];

  useEffect(() => {
    const flatVehicleImages = vehicles.flatMap(v => v.slides?.map(s => s.img) || []);
    
    const imageUrls = [
      Img,
      "https://trendingtaxi.in/wp-content/uploads/2025/08/cropped-cropped-cropped-Quick-Fix-10-300x141.png",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
      ...flatVehicleImages,
      ...blogPosts.map(b => b.img)
    ];

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    if (totalImages === 0) {
      setIsLoading(false);
      setShowLoader(false);
      return;
    }

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setIsLoading(false);
        setTimeout(() => setShowLoader(false), 500);
      }
    };

    imageUrls.forEach(url => {
      if (!url) {
        handleImageLoad();
        return;
      }
      const img = new Image();
      img.src = url;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
    });
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${D ? 'bg-zinc-950 text-white' : 'bg-amber-50 text-zinc-900'}`}>

      {/* ── LOADING SCREEN ── */}
      {showLoader && (
        <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${isLoading ? 'opacity-100' : 'opacity-0'} ${D ? 'bg-zinc-950' : 'bg-amber-50'}`}>
          <div className="relative flex items-center justify-center mb-4">
            <div className="w-20 h-20 border-4 border-zinc-300 border-t-yellow-400 rounded-full animate-spin"></div>
            <Car className="absolute h-8 w-8 text-yellow-400 animate-pulse" />
          </div>
          <h2 className="heading font-bold text-2xl tracking-widest uppercase text-yellow-400 animate-bounce">
            Trending Drop Taxi
          </h2>
          <p className={`text-xs uppercase tracking-widest mt-1 ${D ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Loading Rides...
          </p>
        </div>
      )}

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        h1,h2,h3,.heading { font-family:'Barlow Condensed',sans-serif; }
        ::-webkit-scrollbar{width:8px}
        ::-webkit-scrollbar-track{background:${D?'#09090b':'#fefce8'}}
        ::-webkit-scrollbar-thumb{background:${D?'#3f3f46':'#d4b83a'};border-radius:4px}
        ::-webkit-scrollbar-thumb:hover{background:#eab308}
        .checker-bg {
          background-image: ${D
            ? 'linear-gradient(rgba(234,179,8,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(234,179,8,0.04) 1px,transparent 1px)'
            : 'linear-gradient(rgba(161,120,0,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(161,120,0,0.07) 1px,transparent 1px)'};
          background-size:48px 48px;
        }
        .marquee-track { display:flex; animation:marquee 22s linear infinite; white-space:nowrap; }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .card-hover { transition:transform .35s ease, box-shadow .35s ease; }
        .card-hover:hover { transform:translateY(-6px); }
        .shine { position:relative; overflow:hidden; }
        .shine::after { content:''; position:absolute; top:-60%;left:-60%;width:60%;height:220%;
          background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.12) 50%,transparent 60%);
          transform:skewX(-20deg); transition:left .6s ease; }
        .shine:hover::after { left:130%; }
        input[type="datetime-local"]::-webkit-calendar-picker-indicator { filter:${D?'invert(1)':'none'}; opacity:.5; }
      `}</style>

      {/* ══════════════ NAVBAR ══════════════ */}
      <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${D ? 'bg-zinc-950/85 border-zinc-800/60' : 'bg-amber-50/90 border-amber-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[70px]">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scroll('home')}>
            <div className="w-32 h-16 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={dark ? Img : "https://trendingtaxi.in/wp-content/uploads/2025/08/cropped-cropped-cropped-Quick-Fix-10-300x141.png"}
                alt="Trending Drop Taxi"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scroll(l.id)}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-yellow-400 ${D ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {l.label}
              </button>
            ))}
            <button onClick={() => setDark(!D)}
              className={`p-2 rounded-lg transition-all ${D ? 'bg-zinc-800 text-yellow-400 hover:bg-zinc-700' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}>
              {D ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button onClick={() => scroll('book-trip')}
              className="shine bg-yellow-400 hover:bg-yellow-300 text-zinc-950 px-5 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg shadow-yellow-400/20 transition-colors">
              Book Now
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setDark(!D)} className={`p-2 rounded-lg ${D ? 'text-yellow-400' : 'text-amber-700'}`}>
              {D ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className={`md:hidden border-t px-4 pt-3 pb-5 space-y-1 ${D ? 'bg-zinc-900 border-zinc-800' : 'bg-amber-50 border-amber-200'}`}>
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scroll(l.id)}
                className={`block w-full text-left py-3 px-2 text-base font-medium rounded-lg transition-colors hover:text-yellow-400 ${D ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {l.label}
              </button>
            ))}
            <button onClick={() => scroll('book-trip')}
              className="w-full mt-3 bg-yellow-400 text-zinc-950 font-bold py-3.5 rounded-xl uppercase tracking-wider">
              Book a Ride
            </button>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section id="home" className={`relative min-h-[calc(100vh-70px)] flex items-center checker-bg overflow-hidden pt-8 pb-16`}>
        <CanvasParticles darkMode={D} />
        <div className="absolute top-20 right-10 w-64 h-64 bg-yellow-400/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Reveal delay={0}>
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${D ? 'bg-yellow-400/10 border-yellow-400/20 text-yellow-400' : 'bg-yellow-400/15 border-yellow-500/30 text-yellow-700'}`}>
                  <Zap className="h-3 w-3" /> Premium Outstation Taxi Service
                </div>
              </Reveal>
              <Reveal delay={100}>
                <h1 className="heading text-5xl sm:text-6xl xl:text-7xl font-black uppercase leading-none tracking-tight">
                  One-Way<br />Drop Taxi<br /><span className="text-yellow-400">@ ₹16/km</span>
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className={`text-base max-w-md leading-relaxed ${D ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  No return fare. No hidden charges. Just seamless intercity travel with professional chauffeurs across Tamil Nadu & India.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => scroll('book-trip')}
                    className="shine inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bold px-7 py-3.5 rounded-xl uppercase tracking-wider shadow-xl shadow-yellow-400/25 transition-colors text-sm">
                    Book Your Ride <ArrowRight className="h-4 w-4" />
                  </button>
                  <a href="tel:+919876543210"
                    className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider border transition-colors ${D ? 'border-zinc-700 text-zinc-300 hover:border-yellow-400 hover:text-yellow-400' : 'border-zinc-300 text-zinc-700 hover:border-yellow-500 hover:text-yellow-700'}`}>
                    <Phone className="h-4 w-4" /> Call Now
                  </a>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <div className="flex flex-wrap gap-5 pt-2">
                  {[['⭐ 4.9', 'Rating'], ['🚗 500+', 'Rides Daily'], ['📍 50+', 'Cities']].map(([num, lbl]) => (
                    <div key={lbl}>
                      <div className="heading font-black text-xl text-yellow-400">{num}</div>
                      <div className="text-xs text-zinc-500">{lbl}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} className="relative flex justify-center">
              <div className={`absolute inset-0 rounded-3xl ${D ? 'bg-zinc-900/60' : 'bg-amber-100/60'} blur-2xl scale-90`} />
              <div className="relative">
                {/* FIXED: Reverted back to the original black & yellow classic taxi image */}
                <img
                  src="https://images4.alphacoders.com/590/thumb-1920-590571.jpg"
                  alt="Taxi"
                  className="rounded-3xl object-cover w-full max-w-lg border-2 border-yellow-400/40 shadow-2xl shadow-yellow-400/10"
                />
                <div className={`absolute -top-4 -left-4 px-4 py-2 rounded-2xl shadow-xl border text-xs font-bold ${D ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-amber-200 text-zinc-800'}`}>
                  <div className="text-yellow-400 heading font-black text-xl">NO</div>
                  <div className="opacity-70 uppercase tracking-wider">Return Fare</div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-zinc-950 px-4 py-2 rounded-2xl shadow-xl text-xs font-bold">
                  <div className="heading font-black text-xl">24/7</div>
                  <div className="uppercase tracking-wider">Available</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE TICKER ─── */}
      <div className={`py-3 overflow-hidden border-y ${D ? 'bg-yellow-400/5 border-yellow-400/15' : 'bg-yellow-400/10 border-yellow-500/20'}`}>
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex gap-12 mr-12">
              {['🚕 One-Way Drop Only', '✅ No Return Fare', '🛣️ Outstation Experts', '💰 Transparent Pricing', '🔒 Verified Drivers', '⭐ 4.9 Rated Service', '📞 24/7 Support', '🌍 50+ Cities Covered'].map(t => (
                <span key={t} className={`text-sm font-semibold tracking-wide uppercase ${D ? 'text-yellow-400/70' : 'text-yellow-700/70'}`}>{t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ─── STATS BAR ─── */}
      <div className={`py-12 border-b ${D ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-amber-100'}`}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: 50000, s: '+', lbl: 'Happy Customers' },
            { n: 50, s: '+', lbl: 'Cities Covered' },
            { n: 99, s: '%', lbl: 'On-Time Rate' },
            { n: 8, s :' yrs', lbl: 'Experience' },
          ].map(({ n, s, lbl }) => (
            <Reveal key={lbl}>
              <div>
                <div className="heading font-black text-4xl text-yellow-400">
                  <CountUp target={n} suffix={s} />
                </div>
                <div className="text-xs mt-1 uppercase tracking-wider font-medium text-zinc-500">{lbl}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ─── BOOK A TRIP ─── */}
      <section id="book-trip" className={`py-20 ${D ? 'bg-zinc-950 checker-bg' : 'bg-amber-50 checker-bg'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 ${D ? 'bg-yellow-400/10 text-yellow-400' : 'bg-yellow-400/15 text-yellow-700'}`}>Plan Your Journey</div>
              <h2 className="heading font-black text-4xl sm:text-5xl uppercase">Book Your <span className="text-yellow-400">Ride</span></h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className={`rounded-3xl border overflow-hidden shadow-2xl ${D ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-amber-200'}`}>
              <div className={`p-1.5 flex border-b ${D ? 'bg-zinc-800/70 border-zinc-800' : 'bg-amber-50 border-amber-100'}`}>
                {['oneway', 'roundtrip'].map(t => (
                  <button key={t} onClick={() => setTripType(t)}
                    className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider rounded-2xl transition-all ${tripType === t ? 'bg-yellow-400 text-zinc-950 shadow-md' : D ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-500 hover:text-zinc-800'}`}>
                    {t === 'oneway' ? '⭢ One Way' : '⭢⭠ Round Trip'}
                  </button>
                ))}
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold uppercase tracking-widest ${D ? 'text-zinc-500' : 'text-zinc-400'}`}>From</label>
                    <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-colors focus-within:border-yellow-400 ${D ? 'bg-zinc-800 border-zinc-700' : 'bg-amber-50 border-amber-200'}`}>
                      <MapPin className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                      <input type="text" placeholder="Departure city..." className="bg-transparent w-full text-sm focus:outline-none placeholder-zinc-500 font-medium" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold uppercase tracking-widest ${D ? 'text-zinc-500' : 'text-zinc-400'}`}>To</label>
                    <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-colors focus-within:border-yellow-400 ${D ? 'bg-zinc-800 border-zinc-700' : 'bg-amber-50 border-amber-200'}`}>
                      <Navigation className="h-4 w-4 text-amber-500 flex-shrink-0" />
                      <input type="text" placeholder="Destination city..." className="bg-transparent w-full text-sm focus:outline-none placeholder-zinc-500 font-medium" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold uppercase tracking-widest ${D ? 'text-zinc-500' : 'text-zinc-400'}`}>Pickup Date & Time</label>
                    <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border ${D ? 'bg-zinc-800 border-zinc-700' : 'bg-amber-50 border-amber-200'}`}>
                      <Calendar className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                      <input type="datetime-local" className={`bg-transparent w-full text-sm focus:outline-none font-medium ${D ? 'text-zinc-300' : 'text-zinc-700'}`} />
                    </div>
                  </div>
                  {tripType === 'roundtrip' ? (
                    <div className="space-y-1.5">
                      <label className={`text-xs font-bold uppercase tracking-widest ${D ? 'text-zinc-500' : 'text-zinc-400'}`}>Return Date & Time</label>
                      <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border ${D ? 'bg-zinc-800 border-zinc-700' : 'bg-amber-50 border-amber-200'}`}>
                        <Calendar className="h-4 w-4 text-amber-500 flex-shrink-0" />
                        <input type="datetime-local" className={`bg-transparent w-full text-sm focus:outline-none font-medium ${D ? 'text-zinc-300' : 'text-zinc-700'}`} />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <label className={`text-xs font-bold uppercase tracking-widest ${D ? 'text-zinc-500' : 'text-zinc-400'}`}>Special Notes</label>
                      <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border ${D ? 'bg-zinc-800 border-zinc-700' : 'bg-amber-50 border-amber-200'}`}>
                        <input type="text" placeholder="Flight no., extra luggage..." className="bg-transparent w-full text-sm focus:outline-none placeholder-zinc-500 font-medium" />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className={`text-xs font-bold uppercase tracking-widest block mb-2 ${D ? 'text-zinc-500' : 'text-zinc-400'}`}>Choose Vehicle</label>
                  <div className="grid grid-cols-3 gap-3">
                    {vehicles.map((v, i) => (
                      <button key={i} className={`p-3 rounded-xl border text-left transition-all hover:border-yellow-400 group ${D ? 'bg-zinc-800 border-zinc-700' : 'bg-amber-50 border-amber-200'}`}>
                        <div className="text-xs font-black uppercase group-hover:text-yellow-400 transition-colors">{v.name}</div>
                        <div className="text-xs mt-0.5 text-zinc-500">{v.seats} • {tripType === 'oneway' ? v.oneWay : v.round}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full shine bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black py-4 rounded-2xl uppercase tracking-wider text-base flex items-center justify-center gap-2 shadow-xl shadow-yellow-400/20 transition-colors mt-2">
                  Get Instant Quote <ArrowRight className="h-5 w-5" />
                </button>
                <p className={`text-center text-xs ${D ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  ✅ No booking fee &nbsp;•&nbsp; ✅ No return fare &nbsp;•&nbsp; ✅ Driver assigned instantly
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className={`py-24 ${D ? 'bg-zinc-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
              <div>
                <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${D ? 'text-yellow-400/70' : 'text-yellow-600'}`}>Why Choose Us</div>
                <h2 className="heading font-black text-4xl sm:text-5xl uppercase">Our <span className="text-yellow-400">Services</span></h2>
              </div>
              <div className="w-32 h-1 rounded-full bg-yellow-400" />
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Clock className="h-7 w-7" />, title: '24/7 Rapid Dispatch', desc: 'Late-night terminal returns or tight early commutes — our dispatch network is live around the clock.', tag: 'Always On' },
              { icon: <Shield className="h-7 w-7" />, title: 'Verified Chauffeurs', desc: 'Every driver undergoes criminal vetting, professional training, and route optimization certification.', tag: 'Top Rated' },
              { icon: <Car className="h-7 w-7" />, title: 'Premium Fleet', desc: 'Late-model vehicles maintained with routine detailing, mechanical inspections, and safety checks.', tag: 'Well Maintained' },
              { icon: <CheckCircle className="h-7 w-7" />, title: 'Transparent Pricing', desc: 'Flat per-km rate. No surge pricing, no hidden charges. What you see is exactly what you pay.', tag: 'No Surprises' },
              { icon: <MapPin className="h-7 w-7" />, title: 'Intercity Routes', desc: 'Covering 50+ cities across Tamil Nadu and beyond. Outstation specialists with local route mastery.', tag: '50+ Cities' },
              { icon: <Award className="h-7 w-7" />, title: 'One-Way Specialists', desc: 'India\'s most flexible one-way drop taxi. No return fare ever charged. Pure drop convenience.', tag: 'Our Specialty' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className={`card-hover p-7 rounded-2xl border h-full relative overflow-hidden group ${D ? 'bg-zinc-950 border-zinc-800 hover:border-yellow-400/40' : 'bg-amber-50 border-amber-200 hover:border-yellow-500/50'}`}>
                  <div className={`absolute top-0 right-0 px-3 py-1.5 text-xs font-bold uppercase tracking-widest ${D ? 'bg-zinc-800 text-zinc-400' : 'bg-amber-100 text-zinc-500'} rounded-bl-2xl`}>{s.tag}</div>
                  <div className="p-3 bg-yellow-400/10 inline-flex rounded-xl mb-5 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-zinc-950 transition-colors">{s.icon}</div>
                  <h3 className="heading font-black text-xl uppercase tracking-wide mb-2">{s.title}</h3>
                  <p className={`text-sm leading-relaxed ${D ? 'text-zinc-400' : 'text-zinc-500'}`}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className={`py-24 border-t border-b ${D ? 'bg-zinc-950 border-zinc-800 checker-bg' : 'bg-amber-50 border-amber-100 checker-bg'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${D ? 'text-yellow-400/70' : 'text-yellow-600'}`}>Transparent Tariffs</div>
              <h2 className="heading font-black text-4xl sm:text-5xl uppercase">Our <span className="text-yellow-400">Pricing</span></h2>
              <p className="mt-3 text-sm text-zinc-500">Flat-rate per-km pricing. Zero surge. Zero hidden fees.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {vehicles.map((v, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className={`card-hover rounded-2xl overflow-hidden border group ${D ? 'bg-zinc-900 border-zinc-800 hover:border-yellow-400/40' : 'bg-white border-amber-200 hover:border-yellow-500/40'}`}>
                  
                  <div className="relative h-44 overflow-hidden bg-zinc-800">
                    <VehicleImageSlider slides={v.slides} alt={v.name} />
                    <div className="absolute top-3 right-3 bg-yellow-400 text-zinc-950 text-xs font-black px-2.5 py-1 rounded-lg uppercase shadow z-10">{v.tag}</div>
                  </div>

                  <div className="p-5">
                    <h3 className="heading font-black text-xl uppercase tracking-wide">{v.name}</h3>
                    <div className={`flex items-center gap-4 text-xs mt-2 mb-3 pb-3 border-b ${D ? 'border-zinc-800 opacity-60' : 'border-amber-100 opacity-70'}`}>
                      <span className="flex items-center gap-1"><Users className="h-3 w-3 text-yellow-400" />{v.seats} Seats</span>
                      <span className="flex items-center gap-1"><Briefcase className="h-3 w-3 text-yellow-400" />{v.bags}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs opacity-50 uppercase">One Way</div>
                        <div className="text-yellow-400 font-black text-lg heading">{v.oneWay}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs opacity-50 uppercase">Round Trip</div>
                        <div className={`font-black text-lg heading ${D ? 'text-zinc-300' : 'text-zinc-700'}`}>{v.round}</div>
                      </div>
                    </div>
                    <p className="text-xs mt-3 font-semibold text-yellow-400/80 uppercase tracking-wide">⚡ {v.feat}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Reveal delay={100}>
              <div className={`rounded-2xl overflow-hidden border shadow-xl ${D ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-amber-200'}`}>
                <div className="bg-yellow-400 px-6 py-4 flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-zinc-950" />
                  <h3 className="heading font-black text-xl uppercase tracking-wider text-zinc-950">One Way Tariff</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className={`text-xs uppercase tracking-wider font-bold border-b ${D ? 'bg-zinc-800/60 border-zinc-700 text-zinc-400' : 'bg-amber-50 border-amber-100 text-zinc-500'}`}>
                        {['Vehicle', 'Rate/KM', 'Driver Bata', 'Extra'].map(h => <th key={h} className="px-5 py-3.5">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {oneWayRows.map((r, i) => (
                        <tr key={i} className={`border-b transition-colors hover:bg-yellow-400/5 ${D ? 'border-zinc-800' : 'border-amber-50'}`}>
                          <td className="px-5 py-4 font-black text-xs tracking-wide">{r.type}</td>
                          <td className="px-5 py-4 font-bold text-yellow-400">{r.rate}</td>
                          <td className={`px-5 py-4 text-sm ${D ? 'text-zinc-300' : 'text-zinc-600'}`}>{r.bata}</td>
                          <td className={`px-5 py-4 text-xs ${D ? 'text-zinc-500' : 'text-zinc-400'}`}>{r.charge}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className={`rounded-2xl overflow-hidden border shadow-xl ${D ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-amber-200'}`}>
                <div className={`px-6 py-4 flex items-center gap-3 border-b ${D ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-900 border-zinc-800'}`}>
                  <TrendingUp className="h-5 w-5 text-yellow-400" />
                  <h3 className="heading font-black text-xl uppercase tracking-wider text-yellow-400">Round Trip Tariff</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className={`text-xs uppercase tracking-wider font-bold border-b ${D ? 'bg-zinc-800/60 border-zinc-700 text-zinc-400' : 'bg-amber-50 border-amber-100 text-zinc-500'}`}>
                        {['Vehicle', 'Rate/KM', 'Driver Bata', 'Extra'].map(h => <th key={h} className="px-5 py-3.5">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {roundRows.map((r, i) => (
                        <tr key={i} className={`border-b transition-colors hover:bg-yellow-400/5 ${D ? 'border-zinc-800' : 'border-amber-50'}`}>
                          <td className="px-5 py-4 font-black text-xs tracking-wide">{r.type}</td>
                          <td className="px-5 py-4 font-bold text-yellow-400">{r.rate}</td>
                          <td className={`px-5 py-4 text-sm ${D ? 'text-zinc-300' : 'text-zinc-600'}`}>{r.bata}</td>
                          <td className={`px-5 py-4 text-xs ${D ? 'text-zinc-500' : 'text-zinc-400'}`}>{r.charge}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <div className="bg-yellow-400 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="heading font-black text-4xl sm:text-5xl uppercase text-zinc-950 mb-3">Ready for Your Next Trip?</h2>
          <p className="text-zinc-800 mb-7 font-medium">Book in under 60 seconds. Pay only per km. No return fare — ever.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => scroll('book-trip')}
              className="shine bg-zinc-950 hover:bg-zinc-800 text-white font-bold px-8 py-3.5 rounded-xl uppercase tracking-wider transition-colors flex items-center gap-2 text-sm">
              Book Now <ArrowRight className="h-4 w-4" />
            </button>
            <a href="tel:+919876543210"
              className="bg-white/20 hover:bg-white/30 text-zinc-950 font-bold px-8 py-3.5 rounded-xl uppercase tracking-wider transition-colors flex items-center gap-2 text-sm border border-zinc-950/20">
              <Phone className="h-4 w-4" /> Call Us
            </a>
          </div>
        </div>
      </div>

      {/* ─── BLOG ─── */}
      <section id="blog" className={`py-24 ${D ? 'bg-zinc-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${D ? 'text-yellow-400/70' : 'text-yellow-600'}`}>Stories & Tips</div>
                <h2 className="heading font-black text-4xl sm:text-5xl uppercase">Travel <span className="text-yellow-400">Blog</span></h2>
              </div>
              <button className="text-sm font-bold text-yellow-400 hover:text-yellow-300 flex items-center gap-1 transition-colors">
                All Articles <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <article className={`card-hover rounded-2xl overflow-hidden border flex flex-col h-full group ${D ? 'bg-zinc-950 border-zinc-800 hover:border-zinc-700' : 'bg-amber-50 border-amber-200 hover:border-amber-300'}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-yellow-400 text-zinc-950 text-xs font-black px-2.5 py-1 rounded-lg uppercase">{p.tag}</div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className={`flex items-center gap-4 text-xs mb-3 ${D ? 'text-zinc-600' : 'text-zinc-400'}`}>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{p.date}</span>
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{p.author}</span>
                    </div>
                    <h3 className={`font-bold text-base leading-snug mb-4 flex-1 group-hover:text-yellow-400 transition-colors ${D ? 'text-white' : 'text-zinc-900'}`}>{p.title}</h3>
                    <button className="text-sm font-bold text-yellow-400 flex items-center gap-1 group/btn self-start">
                      Read More <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <div className={`py-16 border-t border-b ${D ? 'bg-zinc-950 border-zinc-800' : 'bg-amber-50 border-amber-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="heading font-black text-3xl uppercase text-center mb-10">What Customers <span className="text-yellow-400">Say</span></h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { name: 'Priya M.', loc: 'Chennai → Bangalore', txt: 'Booked at midnight, driver arrived in 20 mins. Professional, clean car. Exactly ₹16/km — no surprises!', stars: 5 },
              { name: 'Karthik R.', loc: 'Coimbatore → Chennai', txt: 'Best outstation taxi service I have used. No return fare saved me a LOT. Will book again.', stars: 5 },
              { name: 'Deepa S.', loc: 'Madurai → Trichy', txt: 'The Innova Crysta was spotless. Driver was punctual and courteous. Highly recommended.', stars: 5 },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className={`p-6 rounded-2xl border ${D ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-amber-200'}`}>
                  <div className="flex text-yellow-400 mb-3 gap-0.5">
                    {Array(t.stars).fill(0).map((_, j) => <Star key={j} className="h-4 w-4 fill-yellow-400" />)}
                  </div>
                  <p className={`text-sm leading-relaxed mb-4 ${D ? 'text-zinc-400' : 'text-zinc-500'}`}>{t.txt}</p>
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className={`text-xs ${D ? 'text-zinc-600' : 'text-zinc-400'}`}>{t.loc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ─── TERMS ─── */}
      <section id="terms" className={`py-20 ${D ? 'bg-zinc-900' : 'bg-white'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="heading font-black text-4xl uppercase">Terms & <span className="text-yellow-400">Conditions</span></h2>
              <div className="h-1 w-20 bg-yellow-400 mx-auto mt-4 rounded-full" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className={`rounded-2xl border overflow-hidden ${D ? 'border-zinc-800' : 'border-amber-200'}`}>
              {[
                { title: '1. Base Booking & Fare Tariffs', body: 'Fares outlined are computed via baseline matrix approximations. Final invoice balances may adjust during extreme dynamic rerouting deviations or lengthy customer-instructed standby times.' },
                { title: '2. Cancellation Policy', body: 'Confirmed reservations canceled less than 15 minutes prior to dispatch generate driver restitution penalties deducted from active transaction profiles.' },
                { title: '3. Toll & State Taxes', body: 'All interstate permit modifications, highway toll calculations, and state entrance levies are collected inside the final electronic receipt.' },
              ].map((item, i) => (
                <div key={i} className={`p-6 border-b last:border-b-0 ${D ? 'border-zinc-800 hover:bg-zinc-800/30' : 'border-amber-100 hover:bg-amber-50/60'} transition-colors`}>
                  <h4 className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-2">{item.title}</h4>
                  <p className={`text-sm leading-relaxed ${D ? 'text-zinc-400' : 'text-zinc-500'}`}>{item.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className={`border-t pt-12 pb-8 ${D ? 'bg-zinc-950 border-zinc-800' : 'bg-amber-50 border-amber-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-32 h-16 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={dark ? Img : "https://trendingtaxi.in/wp-content/uploads/2025/08/cropped-cropped-cropped-Quick-Fix-10-300x141.png"}
                    alt="Trending Drop Taxi"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <p className="text-xs leading-relaxed text-zinc-500">Premium one-way outstation taxi service across Tamil Nadu & India. No return fare, ever.</p>
            </div>
            <div>
              <h5 className="heading font-black uppercase text-sm mb-3 text-yellow-400">Quick Links</h5>
              <div className="space-y-2">
                {navLinks.map(l => (
                  <button key={l.id} onClick={() => scroll(l.id)} className="block text-sm transition-colors hover:text-yellow-400 text-zinc-500">{l.label}</button>
                ))}
              </div>
            </div>
            <div>
              <h5 className="heading font-black uppercase text-sm mb-3 text-yellow-400">Contact</h5>
              <div className="space-y-2 text-sm text-zinc-500">
                <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-yellow-400" /> +91 98765 43210</div>
                <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-yellow-400" /> Chennai, Tamil Nadu</div>
                <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-yellow-400" /> 24/7 Available</div>
              </div>
            </div>
          </div>
          <div className={`border-t pt-6 text-center text-xs tracking-wider ${D ? 'border-zinc-800 text-zinc-600' : 'border-amber-200 text-zinc-400'}`}>
            © 2026 Trending Drop Taxi. All Rights Reserved. &nbsp;|&nbsp; Designed with ❤️ in Tamil Nadu
          </div>
        </div>
      </footer>

    </div>
  );
}