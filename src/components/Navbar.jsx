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
  CarTaxiFront,
  MessageCircleQuestionMark,
  LayoutPanelLeft,
  ChevronDown,
  Check
} from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io";
import Logo from "./1780410771882.png";
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_NUMBER, PHONE_NUMBER } from '../constants/vehicles';

const NAV_KEYS = ['home', 'tariff', 'about', 'services', 'destinations', 'reviews', 'faq', 'contact'];

const LANGUAGES = [
  { code: 'en', label: 'English',   nativeLabel: 'English',   flag: '🇬🇧' },
  { code: 'ta', label: 'Tamil',     nativeLabel: 'தமிழ்',     flag: '🇮🇳' },
  { code: 'hi', label: 'Hindi',     nativeLabel: 'हिन्दी',    flag: '🇮🇳' },
  { code: 'kn', label: 'Kannada',   nativeLabel: 'ಕನ್ನಡ',     flag: '🇮🇳' },
  { code: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം',    flag: '🇮🇳' },
  { code: 'te', label: 'Telugu',    nativeLabel: 'తెలుగు',    flag: '🇮🇳' },
];

export default function Navbar({ dark, setDark, lang, onLangChange, t, onScroll }) {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrollingRef = useRef(false);
  const scrollTimerRef = useRef(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);
  const [navOpen, setNavOpen] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  // ── Draggable vertical position ──────────────────────────────
  const [ribbonY, setRibbonY] = useState(50);
  const dragStartY = useRef(null);
  const dragStartRibbonY = useRef(null);
  const ribbonRef = useRef(null);

  const MOBILE_NAV = [
    { id: "home",         icon: House,                     label: t.home },
    { id: "tariff",       icon: BadgeIndianRupee,          label: t.tariff },
    { id: "about",        icon: Info,                      label: t.about },
    { id: "services",     icon: LayoutPanelLeft,           label: t.servicesNav },
    { id: "destinations", icon: MapPinned,                 label: t.destinations },
    { id: "reviews",      icon: Star,                      label: t.reviews },
    { id: "faq",          icon: MessageCircleQuestionMark, label: t.faq },
    { id: "contact",      icon: Phone,                     label: t.contact },
  ];

  // ── Close dropdown on outside click ─────────────────────────
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // ── Contact visibility observer ──────────────────────────────
  useEffect(() => {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsContactVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(contactSection);
    return () => observer.unobserve(contactSection);
  }, []);

  // ── Auto "Peep" animation on mount ──────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      setNavOpen(true);
      setTimeout(() => setNavOpen(false), 800);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // ── Scroll-position-based active section detection ───────────
  useEffect(() => {
    const getActiveSection = () => {
      if (isScrollingRef.current) return;
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const sections = NAV_KEYS.map((key) => {
        const el = document.getElementById(key);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        return { key, top, bottom: top + rect.height };
      }).filter(Boolean);
      if (sections.length === 0) return;
      const pageBottom = document.documentElement.scrollHeight;
      if (scrollY + viewportHeight >= pageBottom - 5) {
        setActiveSection(sections[sections.length - 1].key);
        return;
      }
      const triggerLine = scrollY + viewportHeight * 0.3;
      let best = sections[0];
      for (const section of sections) {
        if (section.top <= triggerLine) best = section;
      }
      setActiveSection(best.key);
    };
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => { getActiveSection(); rafId = null; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    getActiveSection();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Scroll handler ───────────────────────────────────────────
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      isScrollingRef.current = true;
      setActiveSection(id);
      element.scrollIntoView({ behavior: 'smooth' });
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => { isScrollingRef.current = false; }, 1200);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLangSelect = (code) => {
    onLangChange(code);
    setLangDropdownOpen(false);
  };

  // ── Drag handlers ─────────────────────────────────────────────
  const onDragStart = (e) => {
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragStartY.current = clientY;
    dragStartRibbonY.current = ribbonY;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  };
  const onDragMove = (e) => {
    if (dragStartY.current === null) return;
    if (e.cancelable) e.preventDefault();
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - dragStartY.current;
    const deltaPercent = (deltaY / window.innerHeight) * 100;
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
    const moveHandler = (e) => onDragMove(e);
    const endHandler = () => onDragEnd();
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', endHandler);
    window.addEventListener('touchmove', moveHandler, { passive: false });
    window.addEventListener('touchend', endHandler);
    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', endHandler);
      window.removeEventListener('touchmove', moveHandler);
      window.removeEventListener('touchend', endHandler);
    };
  }, [ribbonY]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          DESKTOP NAVBAR — classic horizontal bar (lg and above)
      ════════════════════════════════════════════════════════ */}
      <nav className={`hidden lg:flex fixed top-0 left-0 right-0 z-50 h-16 items-center justify-between px-6 shadow-md transition-colors duration-300 ${
        dark ? 'bg-zinc-950 border-b border-zinc-800' : 'bg-white border-b border-zinc-200'
      }`}>

        {/* Logo */}
        <button onClick={() => handleScroll('home')} className="h-10 flex items-center">
          <img src={Logo} alt="Logo" className="h-full w-auto object-contain" />
        </button>

        {/* Nav links */}
        <ul className="flex items-center gap-1">
          {NAV_KEYS.map(key => (
            <li key={key}>
              <button
                onClick={() => handleScroll(key)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all duration-200 ${
                  activeSection === key
                    ? 'bg-[#eab308] text-black'
                    : dark
                      ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                {key === 'services' ? t.servicesNav : t[key] || key}
              </button>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Language selector */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase border transition-all ${
                dark
                  ? 'border-zinc-700 text-amber-400 hover:bg-zinc-800'
                  : 'border-zinc-200 text-amber-600 hover:bg-zinc-50'
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              {lang}
              <ChevronDown className="h-3 w-3" />
            </button>
            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 top-full mt-2 min-w-[160px] rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl p-1 z-[100]"
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLangSelect(l.code)}
                      className="w-full flex items-center justify-between text-left px-3 py-2 text-[11px] text-white hover:bg-zinc-800 rounded-lg uppercase"
                    >
                      {l.label}
                      {lang === l.code && <Check className="h-3 w-3 text-amber-400" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark/light toggle */}
          <button
            onClick={() => setDark(!dark)}
            className={`p-2 rounded-lg transition-all ${
              dark ? 'text-amber-400 hover:bg-zinc-800' : 'text-amber-600 hover:bg-zinc-100'
            }`}
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════
          MOBILE TOP BAR — logo + controls (below lg)
      ════════════════════════════════════════════════════════ */}
      <header className={`lg:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-3 shadow-md transition-colors duration-300 ${
        dark ? 'bg-zinc-950 border-b border-zinc-800' : 'bg-white border-b border-zinc-200'
      }`}>
        {/* Logo */}
        <button onClick={() => handleScroll('home')} className="h-9 flex items-center">
          <img src={Logo} alt="Logo" className="h-full w-auto object-contain" />
        </button>

        {/* Controls: language + theme */}
        <div className="flex items-center gap-2">
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase border transition-all ${
                dark
                  ? 'border-zinc-700 text-amber-400 hover:bg-zinc-800'
                  : 'border-zinc-200 text-amber-600 hover:bg-zinc-50'
              }`}
            >
              <Globe className="h-3 w-3" />
              {lang}
              <ChevronDown className="h-3 w-3" />
            </button>
            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 top-full mt-2 min-w-[160px] rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl p-1 z-[100]"
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLangSelect(l.code)}
                      className="w-full flex items-center justify-between text-left px-3 py-2 text-[11px] text-white hover:bg-zinc-800 rounded-lg uppercase"
                    >
                      {l.label}
                      {lang === l.code && <Check className="h-3 w-3 text-amber-400" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setDark(!dark)}
            className={`p-1.5 rounded-lg transition-all ${
              dark ? 'text-amber-400 hover:bg-zinc-800' : 'text-amber-600 hover:bg-zinc-100'
            }`}
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════
          MOBILE RIBBON NAV — draggable side panel (unchanged)
      ════════════════════════════════════════════════════════ */}
      <div
        ref={ribbonRef}
        className="lg:hidden sets fixed right-0 z-[9999] w-fit"
        style={{ top: `${ribbonY}%`, transform: 'translateY(-50%)' }}
      >
        <motion.div
          initial={false}
          animate={{ x: navOpen ? 0 : "70%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex items-center"
        >
          {/* Handle */}
          <div className="flex flex-col w-8 rounded-l-2xl overflow-hidden shadow-lg">
            {/* Drag grip */}
            <div
              onMouseDown={onDragStart}
              onTouchStart={onDragStart}
              className="w-full bg-[#eab308] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
              style={{ height: '28px' }}
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
          <div className={`py-4 px-2 rounded-r-2xl border-y border-r shadow-2xl backdrop-blur-xl ${
            dark ? "bg-zinc-900/95 border-zinc-700" : "bg-white/95 border-zinc-200"
          }`}>
            <div className="flex flex-col gap-5 items-center">
              {MOBILE_NAV.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { handleScroll(item.id); setNavOpen(false); }}
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-[#eab308] text-black"
                      : dark ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  <item.icon size={22} strokeWidth={2} />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          FLOATING ACTION BUTTONS (mobile, when ribbon closed)
      ════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {!navOpen && (
          <motion.div
            key="floating-buttons"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            className="lg:hidden fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-3"
          >
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-full bg-emerald-500 text-white shadow-2xl hover:bg-emerald-400 transition-transform hover:scale-105"
            >
              <IoLogoWhatsapp className="h-6 w-6" />
            </motion.a>
            <motion.a
              href={`tel:${PHONE_NUMBER}`}
              className="p-4 rounded-full bg-amber-500 text-zinc-950 shadow-2xl hover:bg-amber-400 transition-transform hover:scale-105"
            >
              <Phone className="h-6 w-6" strokeWidth={2.5} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}