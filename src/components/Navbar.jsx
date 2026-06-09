import React, { useState, useEffect, useRef } from 'react';
import {
  House,
  BadgeIndianRupee,
  Info,
  MapPinned,
  Star,
  Phone,
  Globe,
  Sun,
  Moon,
  MessageCircle,
  CarTaxiFront
} from "lucide-react";
import Logo from "./1780410771882.png"
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_NUMBER, PHONE_NUMBER } from '../constants/vehicles';

const NAV_KEYS = ['home', 'tariff', 'about', 'destinations', 'reviews', 'contact'];

export default function Navbar({ dark, setDark, lang, onLangChange, t, onScroll }) {
  const [activeSection, setActiveSection] = useState('home');
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navTabsRef = useRef({});
  const isScrollingRef = useRef(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  // ── Draggable vertical position ──────────────────────────────────────────
  // ribbonY is stored as % of window height (0 = top, 100 = bottom)
  const [ribbonY, setRibbonY] = useState(50);          // default: 50% (center)
  const dragStartY = useRef(null);
  const dragStartRibbonY = useRef(null);
  const ribbonRef = useRef(null);

  const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'ml', label: 'മലയാളം' }
  ];

  const MOBILE_NAV = [
    { id: "home", icon: House, label: t.home },
    { id: "tariff", icon: BadgeIndianRupee, label: t.tariff },
    { id: "about", icon: Info, label: t.about },
    { id: "destinations", icon: MapPinned, label: t.destinations },
    { id: "reviews", icon: Star, label: t.reviews },
    { id: "contact", icon: Phone, label: t.contact }
  ];

  // Automatic "Peep" animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setNavOpen(true);
      setTimeout(() => setNavOpen(false), 800);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Section observers
  useEffect(() => {
    const observers = [];
    NAV_KEYS.forEach((key) => {
      const element = document.getElementById(key);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !isScrollingRef.current) {
              setActiveSection(key);
            }
          },
          { threshold: 0.2, rootMargin: "-10% 0px -10% 0px" }
        );
        observer.observe(element);
        observers.push({ observer, element });
      }
    });
    return () => observers.forEach(({ observer, element }) => observer.unobserve(element));
  }, []);

  useEffect(() => {
    const activeTab = navTabsRef.current[activeSection];
    if (activeTab) {
      setPillStyle({ left: activeTab.offsetLeft, width: activeTab.offsetWidth });
    }
  }, [activeSection, lang]);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const onDragStart = (e) => {
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  dragStartY.current = clientY;
  dragStartRibbonY.current = ribbonY;
  document.body.style.overflow = 'hidden';
  document.body.style.touchAction = 'none';
 
};

  const onDragMove = (e) => {
  if (dragStartY.current === null) return;
  // Block page scroll while dragging
 if (e.cancelable) {
    e.preventDefault();
  }
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  const deltaY = clientY - dragStartY.current;
  const deltaPercent = (deltaY / window.innerHeight) * 100;

  // Top: 20% — Bottom: 80% keeps full expanded ribbon on screen
  const newY = Math.min(80, Math.max(20, dragStartRibbonY.current + deltaPercent));
  setRibbonY(newY);
};

const onDragEnd = () => {
  dragStartY.current = null;
  dragStartRibbonY.current = null;
  document.body.style.overflow = '';
  document.body.style.touchAction = '';
};

useEffect(() => {
  const moveHandler = (e) => {
    // Prevent default ONLY if it's not passive
    // Modern browsers require the listener to be attached with {passive: false}
    onDragMove(e);
  };
  
  const endHandler = () => onDragEnd();

  window.addEventListener('mousemove', moveHandler);
  window.addEventListener('mouseup', endHandler);
  
  // CRITICAL: Explicitly pass { passive: false } here
  window.addEventListener('touchmove', moveHandler, { passive: false });
  window.addEventListener('touchend', endHandler);
  
  return () => {
    window.removeEventListener('mousemove', moveHandler);
    window.removeEventListener('mouseup', endHandler);
    window.removeEventListener('touchmove', moveHandler);
    window.removeEventListener('touchend', endHandler);
  };
}, [ribbonY]); // Ensure this is only re-binding if ribbonY changes

  return (
    <>
      <nav className="fixed no-scrollbar overflow-y-auto top-0 left-0 right-0 z-50 p-4 transition-all duration-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          {/* POD 1: Logo */}
          <div className={`flex items-center h-16 px-4 rounded-2xl border backdrop-blur-md ${dark ? 'bg-zinc-950/90 border-[#eab308]' : 'bg-white/95 border-[#eab308]'}`}>
            <button className="flex items-center h-full py-2 cursor-pointer" onClick={() => handleScroll('home')}>
              <img src={Logo} alt="Trending Drop Taxi" className="h-full w-auto object-contain scale-110" />
            </button>
          </div>

         {/* POD 2: Desktop Center Dock */}
<div className={`hidden md:flex items-center h-14 px-2 rounded-2xl border backdrop-blur-xl transition-colors duration-300 relative shadow-lg ${
  dark 
    ? 'bg-zinc-900/60 border-zinc-800' 
    : 'bg-white/60 border-zinc-200'
}`}>
  <div className="flex items-center gap-1 relative">
    {/* Animated Active Pill */}
    <span
      className="absolute h-8 rounded-xl bg-[#eab308] shadow-[0_0_15px_rgba(234,179,8,0.4)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
      style={{ left: `${pillStyle.left}px`, width: `${pillStyle.width}px` }}
    />
    
    {NAV_KEYS.map(key => (
      <button
        key={key}
        ref={el => navTabsRef.current[key] = el}
        onClick={() => handleScroll(key)}
        className={`relative px-5 py-2 text-[11px] font-black uppercase tracking-widest rounded-xl z-10 transition-colors duration-300 ${
          activeSection === key 
            ? 'text-black' 
            : dark 
              ? 'text-zinc-400 hover:text-zinc-100' 
              : 'text-zinc-600 hover:text-zinc-900'
        }`}
      >
        {t[key]}
      </button>
    ))}
  </div>
</div>

          {/* POD 3: Controls */}
          <div className={`shrink-0 flex items-center h-14 gap-2 px-3 rounded-2xl border backdrop-blur-md ${dark ? 'bg-zinc-950/90 border-[#eab308]' : 'bg-white/95 border-[#eab308]'}`}>
            <button onClick={onLangChange} className="text-[10px] font-black uppercase text-zinc-500 hover:text-[#eab308] flex items-center gap-1">
              <Globe className="h-4 w-4" /> {lang === 'en' ? 'TA' : 'EN'}
            </button>
            <button onClick={() => setDark(!dark)} className="p-2 text-[#eab308]">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* ── MOBILE RIBBON NAV (draggable vertically) ───────────────────── */}
        <div
          ref={ribbonRef}
          className="md:hidden fixed right-0 z-[9999]"
          style={{
            top: `${ribbonY}%`,
            transform: 'translateY(-50%)',
          }}
        >
          <motion.div
            initial={false}
            animate={{ x: navOpen ? 0 : "70%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex items-center"
          >
            {/* Handle — top portion is drag grip, bottom is toggle */}
            <div className="flex flex-col w-8 rounded-l-2xl overflow-hidden shadow-lg">

              {/* ↕ Drag grip strip */}
              <div
                onMouseDown={onDragStart}
                onTouchStart={onDragStart}
                className="w-full bg-[#eab308] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
                 style={{ height: '28px' }}
                title="Drag to reposition"
              >
                <span className="flex flex-col gap-[3px] items-center">
                  <span className="w-3 h-[2px] bg-black rounded-full" />
<span className="w-3 h-[2px] bg-black rounded-full" />
<span className="w-3 h-[2px] bg-black rounded-full" />
                </span>
              </div>

              {/* Toggle button */}
              <button
                onClick={() => setNavOpen(!navOpen)}
                className="w-full bg-[#eab308] flex items-center justify-center text-black"
                style={{ height: '52px' }}
              >
                <motion.div animate={{ rotate: navOpen ? 180 : 0 }}>
                  <span className="font-bold text-lg">◀</span>
                </motion.div>
              </button>
            </div>

            {/* Menu icons panel */}
            <div
              className={`py-4 px-2 rounded-r-2xl border-y border-r shadow-2xl backdrop-blur-xl ${
                dark ? "bg-zinc-900/95 border-zinc-700" : "bg-white/95 border-zinc-200"
              }`}
            >
              <div className="flex flex-col gap-6 items-center">
                {MOBILE_NAV.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleScroll(item.id);
                      setNavOpen(false);
                    }}
                    className={`p-2 rounded-xl transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-[#eab308] text-black"
                        : dark
                        ? "text-zinc-400"
                        : "text-zinc-500"
                    }`}
                  >
                    <item.icon size={22} strokeWidth={2} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* ── FLOATING BUTTONS — visible only when mobile nav is CLOSED ──────── */}
   {/* ── FLOATING BUTTONS ───────────────────── */}
<AnimatePresence>
  {!navOpen && (
    <motion.div
      key="floating-buttons"
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2"
    >
      {/* WhatsApp: Pulsing/Badge-like Animation */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        animate={{ 
          scale: [1, 1.1, 1],
          boxShadow: ["0px 0px 0px rgba(16, 185, 129, 0)", "0px 0px 20px rgba(16, 185, 129, 0.6)", "0px 0px 0px rgba(16, 185, 129, 0)"]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="p-3 rounded-full bg-emerald-500 text-white shadow-2xl hover:bg-emerald-400"
      >
        <MessageCircle className="h-5 w-5 stroke-[2.5]" />
      </motion.a>

      {/* Phone: Shake/Wobble Animation */}
      <motion.a
        href={`tel:${PHONE_NUMBER}`}
        animate={{ 
          rotate: [0, -15, 15, -15, 0],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatDelay: 3, // Pauses for 3 seconds between shakes
          ease: "easeInOut" 
        }}
        className="p-3 rounded-full bg-amber-500 text-zinc-950 shadow-2xl hover:bg-amber-400"
      >
        <Phone className="h-5 w-5 animate-pop stroke-[2.5]" />
      </motion.a>
    </motion.div>
  )}
</AnimatePresence>
    </>
  );
}