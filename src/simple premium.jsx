import React, { useState, useEffect } from 'react';
import {
  Car, Shield, Clock, MapPin, Menu, X, ArrowRight,
  Calendar, User, ChevronRight, Navigation, Users, Briefcase,
  Phone, Star, CheckCircle, Award, TrendingUp
} from 'lucide-react';

import Img from "./1780410771882.png";

/* ─── GOOGLE FONTS INJECTION ─── */
if (typeof document !== 'undefined') {
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tripType, setTripType] = useState('oneway');
  const [isLoading, setIsLoading] = useState(true);

  // Core content image arrays strictly for loading monitor state tracking
  const imageUrls = [
    "https://trendingtaxi.in/wp-content/uploads/2025/08/cropped-cropped-cropped-Quick-Fix-10-300x141.png",
    "https://tse3.mm.bing.net/th/id/OIP.bFwSk_zoIc9OpyBR9-p-xwHaE8?cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://tse4.mm.bing.net/th/id/OIP.D6rJA1gWFSPXLIxHMshpMwHaEK?cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://tse1.mm.bing.net/th/id/OIP.o01kt1f3WAVtLFXrNkGX2wHaEP?cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://tse3.mm.bing.net/th/id/OIP.7Oqpsocz4_Awsb2ZwDfcxQHaE-?cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600"
  ];

  useEffect(() => {
    let loadedCount = 0;
    if (imageUrls.length === 0) {
      setIsLoading(false);
      return;
    }

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount >= imageUrls.length) {
        // Safe timeout simulation for visual micro-animations smoothness
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    imageUrls.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad; // Fallback handle structure
    });
  }, []);

  const scroll = id => { 
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); 
    setMenuOpen(false); 
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'book-trip', label: 'Book Ride' },
    { id: 'services', label: 'Services' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'blog', label: 'Blog' },
    { id: 'terms', label: 'Terms' },
  ];

  const vehicles = [
    { name: 'Premium Sedan', tag: 'Dzire / Etios', img: 'https://tse4.mm.bing.net/th/id/OIP.D6rJA1gWFSPXLIxHMshpMwHaEK?cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3', seats: '4+1', bags: '2 Bags', feat: 'Compact & Cost Effective', oneWay: '₹16/km', round: '₹14/km' },
    { name: 'Executive SUV', tag: 'Ertiga / Marazzo', img: 'https://tse1.mm.bing.net/th/id/OIP.o01kt1f3WAVtLFXrNkGX2wHaEP?cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3', seats: '6+1', bags: '4 Bags', feat: 'Great Family Value', oneWay: '₹20/km', round: '₹19/km' },
    { name: 'Innova Crysta', tag: 'Premium MPV', img: 'https://tse3.mm.bing.net/th/id/OIP.7Oqpsocz4_Awsb2ZwDfcxQHaE-?cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3', seats: '7+1', bags: '5 Bags', feat: 'Ultimate Highway Comfort', oneWay: '₹24/km', round: '₹23/km' },
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

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white space-y-4">
        <div className="relative w-16 h-16 border-4 border-neutral-100 border-t-yellow-500 rounded-full animate-spin"></div>
        <p className="text-sm font-semibold tracking-widest uppercase text-neutral-400 animate-pulse">
          Loading Premium Fleet...
        </p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="min-h-screen bg-white text-neutral-800 antialiased selection:bg-yellow-100">
      <style>{`
        h1, h2, h3, .heading { font-family: 'Playfair Display', serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #ffffff; }
        ::-webkit-scrollbar-thumb { background: #e5e5e5; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #eab308; }
      `}</style>

      {/* ══════════════ NAVBAR ══════════════ */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => scroll('home')}>
            <img
              src="https://trendingtaxi.in/wp-content/uploads/2025/08/cropped-cropped-cropped-Quick-Fix-10-300x141.png"
              alt="Trending Drop Taxi"
              className="w-28 h-12 object-contain"
            />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scroll(l.id)}
                className="text-sm font-medium tracking-wide text-neutral-600 transition-colors hover:text-yellow-600">
                {l.label}
              </button>
            ))}
            <button onClick={() => scroll('book-trip')}
              className="bg-yellow-400 hover:bg-yellow-500 text-neutral-900 px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-sm">
              Book Now
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-neutral-700">
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-neutral-100 bg-white px-4 py-4 space-y-2 shadow-inner animate-fadeIn">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scroll(l.id)}
                className="block w-full text-left py-2.5 px-3 text-sm font-medium rounded-md text-neutral-700 hover:bg-neutral-50 hover:text-yellow-600 transition-all">
                {l.label}
              </button>
            ))}
            <button onClick={() => scroll('book-trip')}
              className="w-full mt-2 bg-yellow-400 text-neutral-900 font-bold py-3 rounded-lg text-xs uppercase tracking-wider text-center block">
              Book a Ride
            </button>
          </div>
        )}
      </nav>

      {/* ══════════════ HERO ══════════════ */}
      <section id="home" className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-yellow-50/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/20 text-yellow-800 text-xs font-semibold tracking-wider uppercase rounded-full">
                Premium Outstation Taxi Service
              </div>
              <h1 className="heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 leading-tight">
                One-Way Drop Taxi <br/>
                <span className="underline decoration-yellow-400 decoration-wavy decoration-2">@ ₹16/km</span>
              </h1>
              <p className="text-neutral-600 max-w-lg leading-relaxed text-base">
                No return fare. No hidden charges. Just clean, reliable, professional ride comfort across Tamil Nadu. Simple pricing for premium business logic standards.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button onClick={() => scroll('book-trip')}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-8 py-4 rounded-lg uppercase tracking-wider transition-all text-xs flex items-center gap-2 shadow-md">
                  Book Your Ride <ArrowRight className="h-4 w-4 text-yellow-400" />
                </button>
                <a href="tel:+919876543210"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-neutral-50 rounded-lg font-bold text-xs uppercase tracking-wider border border-neutral-200 text-neutral-800 transition-all">
                  <Phone className="h-4 w-4 text-yellow-500" /> Call Now
                </a>
              </div>
            </div>

            <div className="relative w-full max-w-md mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-yellow-400/10 rounded-2xl transform rotate-2 scale-105"></div>
              <img
                src="https://tse3.mm.bing.net/th/id/OIP.bFwSk_zoIc9OpyBR9-p-xwHaE8?cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Taxi Fleet"
                className="relative rounded-2xl object-cover w-full shadow-xl border border-neutral-100"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════ BOOK A TRIP ══════════════ */}
      <section id="book-trip" className="py-16 bg-white border-t border-neutral-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="heading font-bold text-3xl sm:text-4xl text-neutral-900">Plan Your Journey</h2>
            <div className="w-12 h-1 bg-yellow-400 mx-auto mt-3 rounded-full" />
          </div>

          <div className="bg-white border border-neutral-200/80 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex bg-neutral-50 p-1 border-b border-neutral-100">
              <button onClick={() => setTripType('oneway')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${tripType === 'oneway' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-800'}`}>
                One Way
              </button>
              <button onClick={() => setTripType('roundtrip')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${tripType === 'roundtrip' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-800'}`}>
                Round Trip
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">From</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-neutral-50 rounded-lg border border-neutral-200 focus-within:border-yellow-400 transition-all">
                    <MapPin className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                    <input type="text" placeholder="Departure city..." className="bg-transparent w-full text-sm focus:outline-none placeholder-neutral-400" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">To</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-neutral-50 rounded-lg border border-neutral-200 focus-within:border-yellow-400 transition-all">
                    <Navigation className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                    <input type="text" placeholder="Destination city..." className="bg-transparent w-full text-sm focus:outline-none placeholder-neutral-400" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Pickup Date & Time</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-neutral-50 rounded-lg border border-neutral-200 focus-within:border-yellow-400 transition-all">
                    <Calendar className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                    <input type="datetime-local" className="bg-transparent w-full text-sm focus:outline-none text-neutral-700" />
                  </div>
                </div>
                {tripType === 'roundtrip' ? (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Return Date & Time</label>
                    <div className="flex items-center gap-2 px-4 py-3 bg-neutral-50 rounded-lg border border-neutral-200 focus-within:border-yellow-400 transition-all">
                      <Calendar className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                      <input type="datetime-local" className="bg-transparent w-full text-sm focus:outline-none text-neutral-700" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Special Notes</label>
                    <div className="flex items-center gap-2 px-4 py-3 bg-neutral-50 rounded-lg border border-neutral-200 focus-within:border-yellow-400 transition-all">
                      <input type="text" placeholder="Extra luggage details etc..." className="bg-transparent w-full text-sm focus:outline-none placeholder-neutral-400" />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-2">Choose Vehicle</label>
                <div className="grid grid-cols-3 gap-3">
                  {vehicles.map((v, i) => (
                    <button key={i} className="p-3 bg-white border border-neutral-200 rounded-xl text-left hover:border-yellow-400 transition-all focus:ring-2 focus:ring-yellow-400/20">
                      <div className="text-xs font-bold text-neutral-800">{v.name}</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">{v.seats} • {tripType === 'oneway' ? v.oneWay : v.round}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-neutral-900 font-bold py-4 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-sm mt-2">
                Get Instant Quote <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ SERVICES ══════════════ */}
      <section id="services" className="py-20 bg-neutral-50/50 border-t border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading font-bold text-3xl sm:text-4xl text-neutral-900">Our Services</h2>
            <div className="w-12 h-1 bg-yellow-400 mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Clock className="h-6 w-6 text-yellow-600" />, title: '24/7 Rapid Dispatch', desc: 'Late-night terminal returns or tight early commutes — live network operations.' },
              { icon: <Shield className="h-6 w-6 text-yellow-600" />, title: 'Verified Chauffeurs', desc: 'Every driver undergoes complete profile background check validation workflows.' },
              { icon: <Car className="h-6 w-6 text-yellow-600" />, title: 'Premium Fleet', desc: 'Late-model vehicles maintained perfectly with comprehensive maintenance parameters.' },
              { icon: <CheckCircle className="h-6 w-6 text-yellow-600" />, title: 'Transparent Pricing', desc: 'Flat per-km rates. No sudden platform surges or opaque line-item additions.' },
              { icon: <MapPin className="h-6 w-6 text-yellow-600" />, title: 'Intercity Routes', desc: 'Comfortable long-distance transits scaling dynamic locations flawlessly.' },
              { icon: <Award className="h-6 w-6 text-yellow-600" />, title: 'One-Way Specialists', desc: 'No structural requirement for empty return mileage billing structures.' },
            ].map((s, i) => (
              <div key={i} className="p-6 bg-white rounded-xl border border-neutral-200/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="p-2.5 bg-yellow-100 w-fit rounded-lg mb-4">{s.icon}</div>
                  <h3 className="font-bold text-base text-neutral-900 mb-1">{s.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ PRICING ══════════════ */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading font-bold text-3xl sm:text-4xl text-neutral-900">Simple Tariff Plans</h2>
            <div className="w-12 h-1 bg-yellow-400 mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {vehicles.map((v, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-sm flex flex-col justify-between">
                <div className="h-40 bg-neutral-100 overflow-hidden">
                  <img src={v.img} alt={v.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-neutral-900">{v.name}</h3>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">{v.tag}</span>
                    </div>
                    <div className="flex gap-3 text-[11px] text-neutral-400 my-2">
                      <span className="flex items-center gap-0.5"><Users className="h-3 w-3 text-yellow-500"/> {v.seats}</span>
                      <span className="flex items-center gap-0.5"><Briefcase className="h-3 w-3 text-yellow-500"/> {v.bags}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between mt-2">
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase font-medium">One Way</div>
                      <div className="text-sm font-bold text-neutral-900">{v.oneWay}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-neutral-400 uppercase font-medium">Round Trip</div>
                      <div className="text-sm font-bold text-neutral-600">{v.round}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-yellow-400 px-5 py-3.5 font-bold text-sm text-neutral-900 uppercase tracking-wider">
                One Way Rates
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-neutral-50 text-neutral-500 border-b border-neutral-200 font-semibold">
                      <th className="px-4 py-3">Vehicle</th>
                      <th className="px-4 py-3">Rate/KM</th>
                      <th className="px-4 py-3">Driver Bata</th>
                      <th className="px-4 py-3">Inclusions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {oneWayRows.map((r, i) => (
                      <tr key={i} className="hover:bg-neutral-50/50">
                        <td className="px-4 py-3 font-bold text-neutral-800">{r.type}</td>
                        <td className="px-4 py-3 text-neutral-900 font-semibold">{r.rate}</td>
                        <td className="px-4 py-3 text-neutral-600">{r.bata}</td>
                        <td className="px-4 py-3 text-neutral-400 text-[11px]">{r.charge}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-neutral-900 px-5 py-3.5 font-bold text-sm text-yellow-400 uppercase tracking-wider">
                Round Trip Rates
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-neutral-50 text-neutral-500 border-b border-neutral-200 font-semibold">
                      <th className="px-4 py-3">Vehicle</th>
                      <th className="px-4 py-3">Rate/KM</th>
                      <th className="px-4 py-3">Driver Bata</th>
                      <th className="px-4 py-3">Inclusions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {roundRows.map((r, i) => (
                      <tr key={i} className="hover:bg-neutral-50/50">
                        <td className="px-4 py-3 font-bold text-neutral-800">{r.type}</td>
                        <td className="px-4 py-3 text-neutral-900 font-semibold">{r.rate}</td>
                        <td className="px-4 py-3 text-neutral-600">{r.bata}</td>
                        <td className="px-4 py-3 text-neutral-400 text-[11px]">{r.charge}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ BLOG ══════════════ */}
      <section id="blog" className="py-20 bg-neutral-50/50 border-t border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="heading font-bold text-3xl text-neutral-900">Travel Blog</h2>
            <button className="text-xs font-bold text-yellow-600 hover:underline flex items-center gap-0.5">
              All Articles <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((p, i) => (
              <article key={i} className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <div className="h-44 bg-neutral-100 overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-[10px] text-neutral-400 mb-2">
                      <span>{p.date}</span>
                      <span>•</span>
                      <span>By {p.author}</span>
                    </div>
                    <h3 className="font-bold text-sm text-neutral-900 line-clamp-2">{p.title}</h3>
                  </div>
                  <button className="text-xs font-semibold text-yellow-600 hover:text-yellow-700 flex items-center gap-1 self-start">
                    Read Post <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TERMS ══════════════ */}
      <section id="terms" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="heading font-bold text-2xl text-neutral-900">Terms & Conditions</h2>
          </div>
          <div className="border border-neutral-200 rounded-xl divide-y divide-neutral-100 text-xs">
            {[
              { title: '1. Base Booking & Fare Tariffs', body: 'Fares outlined are computed via baseline matrix approximations. Final invoice balances may adjust during extreme routing deviations.' },
              { title: '2. Cancellation Policy', body: 'Confirmed reservations canceled less than 15 minutes prior to dispatch generate standard driver restitution configurations.' },
              { title: '3. Toll & State Taxes', body: 'All interstate permit modifications, highway toll calculations, and state entrance levies are logged directly into final receipts.' },
            ].map((item, i) => (
              <div key={i} className="p-4 hover:bg-neutral-50/40 transition-colors">
                <h4 className="text-yellow-700 font-bold mb-1 uppercase tracking-wide">{item.title}</h4>
                <p className="text-neutral-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="border-t border-neutral-100 bg-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 mb-8 text-xs">
            <div className="space-y-3">
              <img src="https://trendingtaxi.in/wp-content/uploads/2025/08/cropped-cropped-cropped-Quick-Fix-10-300x141.png" alt="Logo" className="w-24 h-10 object-contain" />
              <p className="text-neutral-400 leading-relaxed">Premium outstation drop services natively scaling custom journey logic with flat parameters.</p>
            </div>
            <div>
              <h5 className="font-bold uppercase tracking-wider text-neutral-900 mb-3">Quick Navigation</h5>
              <div className="space-y-2">
                {navLinks.map(l => (
                  <button key={l.id} onClick={() => scroll(l.id)} className="block text-neutral-500 hover:text-yellow-600 transition-colors">{l.label}</button>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-bold uppercase tracking-wider text-neutral-900 mb-3">Contact Support</h5>
              <div className="space-y-2 text-neutral-500">
                <p>📞 +91 98765 43210</p>
                <p>📍 Chennai, Tamil Nadu</p>
                <p>⏰ 24/7 Live Monitoring Active</p>
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-100 pt-6 text-center text-[11px] text-neutral-400">
            © 2026 Trending Drop Taxi. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}