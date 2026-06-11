import { useState, useEffect, useCallback } from 'react';
import { Car } from 'lucide-react';

import { translations } from './constants/translations';
import { vehicles } from './constants/vehicles';
import useSEO from './hooks/useSEO';

import Navbar from './components/Navbar';
import EstimateModal from './components/EstimateModal';
import HeroSection from './sections/HeroSection';
import TariffSection from './sections/TariffSection';
import AboutSection from './sections/AboutSection';
import DestinationsSection from './sections/DestinationsSection';
import ReviewsSection from './sections/ReviewsSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';
import ServicesSection from './sections/ServicesSection';
import FAQSection from './sections/FAQSection';

/* ── Google Fonts ── */
if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.href =
    'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

/* ── Load Google Maps script once ── */
const MAPS_API_KEY = 'AIzaSyAUThUmfMul1TMOGnfdg9gCfCGR8eIi0B8';

function loadGoogleMapsScript() {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(window.google.maps);
      return;
    }
    // Check if script tag already exists (avoid duplicates)
    if (document.querySelector(`script[src*="maps.googleapis.com"]`)) {
      const poll = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(poll);
          resolve(window.google.maps);
        }
      }, 100);
      return;
    }
    const script = document.createElement('script');
    // script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google.maps);
    script.onerror = () => reject(new Error('Google Maps failed to load'));
    document.head.appendChild(script);
  });
}

const PRELOAD_IMAGES = [
  'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
];

export default function App() {
  /* ── App-level state ── */
  const [appLoading, setAppLoading] = useState(true);
  const [langChanging, setLangChanging] = useState(false);
  const [lang, setLang] = useState('en');

  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'dark';
    } catch {
      return false;
    }
  });

  /* ── Persist dark preference ── */
  useEffect(() => {
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {}
  }, [dark]);

  /* ── Booking form state ── */
  const [tripType, setTripType] = useState('oneway');
  const [selectedCar, setSelectedCar] = useState('sedan');
  const [formData, setFormData] = useState({
    name: '', mobile: '', pickupAddress: '', dropAddress: '',
    date: '', time: '', returnDate: '', returnTime: '',
  });

  useSEO(lang);

  /* ── Estimate modal state ── */
  const [estimateModal, setEstimateModal] = useState({
    isOpen: false,
    price: 0,
    distance: 0,
    distanceText: '',
    durationText: '',
    isLoading: false,
    error: null,
  });

  const t = translations[lang];

  /* ── Preload images + Maps script together ── */
  useEffect(() => {
    let mounted = true;
    Promise.all([
      ...PRELOAD_IMAGES.map(src =>
        new Promise(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        })
      ),
      loadGoogleMapsScript().catch(() => null), // don't block on maps failure
    ]).then(() => {
      if (mounted) setTimeout(() => setAppLoading(false), 1200);
    });
    return () => { mounted = false; };
  }, []);

  /* ── Helpers ── */
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 76, behavior: 'smooth' });
    }
  };

  const handleLangChange = (code) => {
    setLangChanging(true);
    setTimeout(() => {
      setLang(code);
      setLangChanging(false);
    }, 450);
  };

  const handleInputChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  /* ── Real distance via Google Maps Distance Matrix ── */
  const getDistanceFromMaps = useCallback((origin, destination) => {
    return new Promise((resolve, reject) => {
      if (!window.google || !window.google.maps) {
        reject(new Error('Google Maps not loaded'));
        return;
      }
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
        },
        (response, status) => {
          if (status !== 'OK') {
            reject(new Error(`Distance Matrix error: ${status}`));
            return;
          }
          const element = response.rows[0]?.elements[0];
          if (!element || element.status !== 'OK') {
            reject(new Error(`Route not found: ${element?.status || 'UNKNOWN'}`));
            return;
          }
          resolve({
            distanceMeters: element.distance.value,          // metres
            distanceKm: Math.ceil(element.distance.value / 1000), // rounded up km
            distanceText: element.distance.text,              // "142 km"
            durationText: element.duration.text,              // "2 hours 14 mins"
          });
        }
      );
    });
  }, []);

  /* ── Handle estimate submit ── */
  const handleEstimate = async (e) => {
    e.preventDefault();

    // Show loading state immediately
    setEstimateModal({ isOpen: true, price: 0, distance: 0, distanceText: '', durationText: '', isLoading: true, error: null });

    try {
      const { distanceKm, distanceText, durationText } = await getDistanceFromMaps(
        formData.pickupAddress,
        formData.dropAddress
      );

      const baseRate = vehicles[selectedCar].rate;
      const price = Math.round(distanceKm * baseRate * (tripType === 'roundtrip' ? 2 : 1));

      setEstimateModal({
        isOpen: true,
        price,
        distance: distanceKm,
        distanceText,
        durationText,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      console.error('Distance calculation failed:', err);
      setEstimateModal(prev => ({
        ...prev,
        isLoading: false,
        error: err.message || 'Could not calculate distance. Please check addresses.',
      }));
    }
  };

  /* ── Loading screen ── */
  if (appLoading) {
    const loaderBg      = dark ? '#09090b' : '#fcfbf7';
    const loaderText    = '#f59e0b';
    const loaderSub     = dark ? '#52525b' : '#a1a1aa';
    const spinnerTrack  = dark ? '#27272a' : '#e4e4e7';
    const spinnerAccent = '#f59e0b';
    const iconColor     = '#f59e0b';

    return (
      <div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ backgroundColor: loaderBg }}
      >
        <style>{`
          .reveal-text {
            background: linear-gradient(to right, ${loaderText} 50%, ${loaderSub} 50%);
            background-size: 200% 100%;
            background-position: 100% 0;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: reveal 2.5s ease-in-out infinite;
          }
          @keyframes reveal {
            0%   { background-position: 100% 0; }
            50%  { background-position: 0 0; }
            100% { background-position: -100% 0; }
          }
          .spinner-border {
            width: 80px; height: 80px;
            border: 1px solid ${spinnerTrack};
            border-radius: 50%;
            position: relative;
          }
          .spinner-border::after {
            content: '';
            position: absolute; top: -1px; left: -1px; right: -1px; bottom: -1px;
            border: 1px solid ${spinnerAccent};
            border-radius: 50%;
            border-top-color: transparent;
            animation: rotate 1.5s linear infinite;
          }
          @keyframes rotate { to { transform: rotate(360deg); } }
        `}</style>

        <div className="spinner-border mb-12 flex items-center justify-center">
          <Car className="h-8 w-8" style={{ color: iconColor }} />
        </div>

        <div className="text-center">
          <h2
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            className="text-4xl font-black uppercase tracking-[0.2em] reveal-text"
          >
            TRENDING DROP TAXI
          </h2>
          <p
            className="mt-4 text-[10px] tracking-[0.4em] font-mono uppercase"
            style={{ color: loaderSub }}
          >
            System Synchronizing...
          </p>
        </div>
      </div>
    );
  }

  /* ── Global CSS ── */
  const globalStyles = `
    h1, h2, h3, .heading-font { font-family: 'Barlow Condensed', sans-serif; }
    .glass-panel {
      background: ${dark ? 'rgba(18,18,22,0.45)' : 'rgba(255,255,255,0.65)'};
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'};
    }
    .liquid-hover { position: relative; overflow: hidden; transition: all 0.3s cubic-bezier(0.2,1,0.2,1); }
    .liquid-hover::before {
      content: '';
      position: absolute; top: 50%; left: 50%; width: 140%; height: 140%;
      background: radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%);
      transform: translate(-50%,-50%) scale(0);
      transition: transform 0.3s cubic-bezier(0.2,1,0.2,1);
      z-index: 0; pointer-events: none;
    }
    .liquid-hover:hover::before { transform: translate(-50%,-50%) scale(1); }
    .liquid-hover:hover { transform: translateY(-4px); border-color: rgba(245,158,11,0.4); }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${dark ? '#0e0e11' : '#f4f3ee'}; }
    ::-webkit-scrollbar-thumb { background: ${dark ? '#27272a' : '#d4d4d8'}; border-radius: 9px; }
    ::-webkit-scrollbar-thumb:hover { background: #f59e0b; }
    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  `;

  return (
    <div
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      className={`min-h-screen overflow-x-hidden pt-[76px] transition-colors duration-300 selection:bg-amber-400 selection:text-zinc-950 ${
        dark ? 'bg-[#09090b] text-zinc-100' : 'bg-[#fcfbf7] text-zinc-900'
      }`}
    >
      <style>{globalStyles}</style>

      <Navbar
        dark={dark}
        setDark={setDark}
        lang={lang}
        onLangChange={handleLangChange}
        t={t}
        onScroll={scrollTo}
      />

      <div className={`transition-all duration-500 ease-out ${
        langChanging ? 'opacity-30 blur-sm scale-[0.99]' : 'opacity-100 blur-0 scale-100'
      }`}>
        <HeroSection
          dark={dark}
          t={t}
          tripType={tripType}
          setTripType={setTripType}
          selectedCar={selectedCar}
          setSelectedCar={setSelectedCar}
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleEstimate}
        />

        <div className={`py-4 border-y overflow-hidden relative ${
          dark ? 'bg-zinc-900/20 border-zinc-800/60' : 'bg-zinc-100/60 border-zinc-200'
        }`}>
          <div className="flex whitespace-nowrap gap-16 animate-[marquee_25s_linear_infinite]">
            {Array(2).fill(['⚡ NO RETURN FARE', '🛡️ VERIFIED CHAUFFEURS', '👑 LUXURY TRANSPORTS', '📍 24/7 SUPPORT ROUTE MASTER']).map((arr, idx) => (
              <div key={idx} className="flex gap-16 text-xs font-black tracking-widest text-amber-500/80 uppercase">
                {arr.map(txt => <span key={txt}>{txt}</span>)}
              </div>
            ))}
          </div>
        </div>

        <TariffSection dark={dark} t={t} lang={lang} />
        <AboutSection dark={dark} t={t} />
        <ServicesSection dark={dark} t={t} />
        <DestinationsSection t={t} onScroll={scrollTo} lang={lang} dark={dark} />
        <ReviewsSection dark={dark} t={t} />
        <FAQSection dark={dark} lang={lang} />
        <ContactSection dark={dark} t={t} />
        <FooterSection dark={dark} t={t} onScroll={scrollTo} />
      </div>

      <EstimateModal
        modal={estimateModal}
        selectedCar={selectedCar}
        formData={formData}
        dark={dark}
        tripType={tripType}
        t={t}
        lang={lang}
        onClose={() => setEstimateModal(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}