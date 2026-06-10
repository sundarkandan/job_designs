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

// ── Language config ──────────────────────────────────────────────
const LANGUAGES = [
  { code: 'en', label: 'English',    nativeLabel: 'English',    flag: '🇬🇧' },
  { code: 'ta', label: 'Tamil',      nativeLabel: 'தமிழ்',      flag: '🇮🇳' },
  { code: 'hi', label: 'Hindi',      nativeLabel: 'हिन्दी',     flag: '🇮🇳' },
  { code: 'kn', label: 'Kannada',    nativeLabel: 'ಕನ್ನಡ',      flag: '🇮🇳' },
  { code: 'ml', label: 'Malayalam',  nativeLabel: 'മലയാളം',     flag: '🇮🇳' },
  { code: 'te', label: 'Telugu',     nativeLabel: 'తెలుగు',     flag: '🇮🇳' },
];

export default function Navbar({ dark, setDark, lang, onLangChange, t, onScroll }) {
  const [activeSection, setActiveSection] = useState('home');
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navTabsRef = useRef({});
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

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

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
  // This approach is far more reliable than IntersectionObserver for
  // jump navigation: on every scroll event we measure each section's
  // top offset and pick whichever one is closest to the viewport top.
  useEffect(() => {
    const getActiveSection = () => {
      // Don't override while a programmatic scroll is in flight
      if (isScrollingRef.current) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Collect all sections with their positions
      const sections = NAV_KEYS.map((key) => {
        const el = document.getElementById(key);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY; // absolute top from document
        return { key, top, bottom: top + rect.height };
      }).filter(Boolean);

      if (sections.length === 0) return;

      // At the very bottom of the page always mark last section active
      const pageBottom = document.documentElement.scrollHeight;
      if (scrollY + viewportHeight >= pageBottom - 5) {
        setActiveSection(sections[sections.length - 1].key);
        return;
      }

      // Find the section whose top is nearest to (but not past) 30% of viewport
      const triggerLine = scrollY + viewportHeight * 0.3;

      let best = sections[0];
      for (const section of sections) {
        if (section.top <= triggerLine) {
          best = section;
        }
      }

      setActiveSection(best.key);
    };

    // Throttle with requestAnimationFrame for performance
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        getActiveSection();
        rafId = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once immediately to set the correct state on mount
    getActiveSection();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []); // no deps — NAV_KEYS is constant

  // ── Pill position update ─────────────────────────────────────
  useEffect(() => {
    const activeTab = navTabsRef.current[activeSection];
    if (activeTab) {
      setPillStyle({ left: activeTab.offsetLeft, width: activeTab.offsetWidth });
    }
  }, [activeSection, lang]);

  // ── Scroll handler ───────────────────────────────────────────
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Mark programmatic scroll so the scroll listener doesn't fight us
      isScrollingRef.current = true;
      setActiveSection(id);
      element.scrollIntoView({ behavior: 'smooth' });

      // Clear any existing timer before setting a new one
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1200);
    }
    setIsMobileMenuOpen(false);
  };

  // ── Language select handler ──────────────────────────────────
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
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">

        {/* POD 1: Logo */}
        <div className={`flex items-center h-14 px-3 rounded-2xl border backdrop-blur-md shrink-0 ${dark ? 'bg-zinc-950/90 border-[#eab308]' : 'bg-white/95 border-[#eab308]'}`}>
          <button onClick={() => handleScroll('home')} className="h-full py-1">
            <img src={Logo} alt="Logo" className="h-full w-auto object-contain" />
          </button>
        </div>

        {/* POD 2: Desktop Center Dock */}
        <div className={`hidden lg:flex items-center h-14 px-2 rounded-2xl border backdrop-blur-xl shadow-lg min-w-0 overflow-x-auto ${
          dark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white/60 border-zinc-200'
        }`}>
          <div className="flex items-center gap-1 relative">
            <span
              className="absolute h-9 rounded-xl bg-[#eab308] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ left: `${pillStyle.left}px`, width: `${pillStyle.width}px`, maxWidth: '100%' }}
            />
            {NAV_KEYS.map(key => (
              <button
                key={key}
                ref={el => navTabsRef.current[key] = el}
                onClick={() => handleScroll(key)}
                className={`relative px-2 py-2 text-[9px] font-black uppercase tracking-normal rounded-xl whitespace-nowrap transition-colors duration-300 ${
                  activeSection === key ? 'text-black' : dark ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                {key === 'services' ? t.servicesNav : t[key] || key}
              </button>
            ))}
          </div>
        </div>

        {/* POD 3: Controls */}
        <div className={`shrink-0 flex items-center h-14 gap-2 px-3 rounded-2xl border backdrop-blur-md ${dark ? 'bg-zinc-950/90 border-[#eab308]' : 'bg-white/95 border-[#eab308]'}`}>

          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase text-amber-500 hover:bg-amber-500/10 transition-all"
            >
              <Globe className="h-3 w-3" />
              {lang}
              <ChevronDown className="h-3 w-3" />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 min-w-[180px] max-w-[220px] rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl p-1 z-[100]"
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLangSelect(l.code)}
                      className="w-full text-left px-3 py-2 text-[11px] text-white hover:bg-zinc-800 rounded-lg uppercase"
                    >
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={() => setDark(!dark)} className="p-1.5 text-[#eab308]">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
}