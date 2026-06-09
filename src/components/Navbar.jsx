import React, { useState, useEffect, useRef } from 'react';
import { Car, Menu, X, Sun, Moon, Globe } from 'lucide-react';
import Logo from "./1780410771882.png"
import { motion, AnimatePresence } from 'framer-motion';
const NAV_KEYS = ['home', 'tariff', 'about', 'destinations', 'reviews', 'contact'];

export default function Navbar({ dark, setDark, lang, onLangChange, t, onScroll }) {
  const [activeSection, setActiveSection] = useState('home');
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile state
  const navTabsRef = useRef({});
  const isScrollingRef = useRef(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'ml', label: 'മലയാളം' }
  ];

  useEffect(() => {
    const observers = [];
    NAV_KEYS.forEach((key) => {
      const element = document.getElementById(key);
      console.log(`Observing ${key}:`, element);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !isScrollingRef.current) {
              setActiveSection(key);
            }
          },
          { 
            threshold: 0.2, 
            rootMargin: "-10% 0px -10% 0px" 
          }
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

  // OPTIMIZED: Centralized scroll handler that automatically collapses mobile drawer layouts
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // <-- Automatically close the menu panel
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* POD 1: Logo */}
        <div className={`flex items-center h-16 px-4 rounded-2xl border backdrop-blur-md ${dark ? 'bg-zinc-950/90 border-[#eab308]' : 'bg-white/95 border-[#eab308]'}`}>
          <button className="flex items-center h-full py-2 cursor-pointer" onClick={() => handleScroll('home')}>
            <img src={Logo} alt="Trending Drop Taxi" className="h-full w-auto object-contain scale-110" />
          </button>
        </div>

        {/* POD 2: Desktop Center Dock */}
        <div className={`hidden md:flex items-center h-14 px-2 rounded-2xl border backdrop-blur-md relative ${dark ? 'bg-zinc-950/80 border-[#eab308]' : 'bg-white/90 border-[#eab308]'}`}>
          <div className="flex items-center gap-1 relative">
            <span className="absolute h-8 rounded-xl bg-[#eab308] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" style={{ left: `${pillStyle.left}px`, width: `${pillStyle.width}px` }} />
            {NAV_KEYS.map(key => (
              <button key={key} ref={el => navTabsRef.current[key] = el} onClick={() => handleScroll(key)}
                className={`relative px-4 py-2 text-[11px] font-black uppercase tracking-widest rounded-xl z-10 ${activeSection === key ? 'text-black' : dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Hamburger Toggle (Visible only on mobile) */}
        <button 
          className={`md:hidden p-4 rounded-2xl border backdrop-blur-md transition-colors duration-300 border-[#eab308] text-[#eab308] ${
            dark ? 'bg-zinc-950/90' : 'bg-white/90'
          }`} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.div>
        </button>

        {/* POD 3: Language & Theme Controls */}
        <div className={`hidden md:flex items-center h-14 gap-2 px-3 rounded-2xl border backdrop-blur-md ${dark ? 'bg-zinc-950/90 border-[#eab308]' : 'bg-white/95 border-[#eab308]'}`}>
          <button onClick={onLangChange} className="text-[10px] font-black uppercase text-zinc-500 hover:text-[#eab308] flex items-center gap-1">
            <Globe className="h-4 w-4" /> {lang === 'en' ? 'TA' : 'EN'}
          </button>
          <button onClick={() => setDark(!dark)} className="p-2 text-[#eab308]">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed inset-0 z-[60] flex items-center justify-center p-6`}
          >
            {/* Background Blur Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Glass Command Center */}
            <div className={`relative w-full max-w-sm p-8 rounded-[2rem] border backdrop-blur-2xl shadow-2xl flex flex-col gap-8 ${
              dark 
                ? 'bg-zinc-950/80 border-[#eab308]/30' 
                : 'bg-white/90 border-[#eab308]/20'
            }`}>
              
              {/* Navigation Items */}
              <div className="flex flex-col gap-4">
                {NAV_KEYS.map((key, i) => (
                  <motion.button 
                    key={key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => handleScroll(key)}
                    className={`text-center font-black uppercase tracking-[0.2em] text-xl transition-all duration-300 hover:text-[#eab308] ${
                      dark ? 'text-white' : 'text-zinc-900'
                    }`}
                  >
                    {t[key]}
                  </motion.button>
                ))}
              </div>

              {/* Action Pod */}
              <div className={`flex items-center justify-center gap-6 pt-6 border-t ${dark ? 'border-white/10' : 'border-zinc-200'}`}>
                 <button onClick={onLangChange} className="text-[#eab308] font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                   <Globe className="h-5 w-5" /> {lang === 'en' ? 'தமிழ்' : 'ENGLISH'}
                 </button>
                 <button onClick={() => setDark(!dark)} className={`p-3 rounded-full transition-all ${dark ? 'bg-zinc-800 text-[#eab308]' : 'bg-zinc-100 text-[#eab308]'}`}>
                   {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}