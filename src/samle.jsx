import React, { useState } from 'react';
import { 
  Car, Shield, Clock, ThumbsUp, MapPin, Phone, 
  ChevronRight, Star, Menu, X, Users, Briefcase, HelpCircle 
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingType, setBookingType] = useState('one-way');

  // Sample Data
  const fleet = [
    { name: 'Sedan', type: 'Etios, Dzire', capacity: '4+1', bags: '2', price: '₹13/km', image: '🚗' },
    { name: 'SUV Mini', type: 'Ertiga, Triber', capacity: '6+1', bags: '3', price: '₹17/km', image: '🚙' },
    { name: 'SUV Innova', type: 'Crysta', capacity: '7+1', bags: '4', price: '₹21/km', image: '🚐' },
    { name: 'Tempo', type: 'Traveler', capacity: '12+1', bags: '8', price: '₹28/km', image: '🚌' },
  ];

  const routes = [
    { name: 'Chennai to Madurai', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
    { name: 'Trichy to Bangalore', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=400&q=80' },
    { name: 'Coimbatore to Ooty', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80' },
    { name: 'Madurai to Kanyakumari', image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=400&q=80' },
  ];

  const services = [
    { title: 'One Way Drop', desc: 'Pay only for one side distance without any return fare traps.' },
    { title: 'Round Trip', desc: 'Affordable intercity packages for your weekend getaways.' },
    { title: 'Airport Transfers', desc: 'On-time guaranteed pickups and drops to catch your flights.' },
    { title: 'Local Packages', desc: 'Hourly rentals for seamless travel within city limits.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      
      {/* 1. HEADER & NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-tight text-emerald-600 flex items-center gap-1">
                <Car className="inline w-8 h-8 text-amber-500" /> Trending<span className="text-amber-500">Taxi</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8 font-medium text-slate-600">
              <a href="#home" className="hover:text-emerald-600 transition">Home</a>
              <a href="#fleet" className="hover:text-emerald-600 transition">Our Fleet</a>
              <a href="#routes" className="hover:text-emerald-600 transition">Top Routes</a>
              <a href="#services" className="hover:text-emerald-600 transition">Services</a>
              <a href="tel:+919876543210" className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-full hover:bg-emerald-700 transition shadow-md shadow-emerald-100">
                <Phone size={18} /> Book via WhatsApp
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-700 hover:text-emerald-600 focus:outline-none">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 absolute w-full left-0 shadow-xl transition-all">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Home</a>
            <a href="#fleet" onClick={() => setIsMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Our Fleet</a>
            <a href="#routes" onClick={() => setIsMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Top Routes</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Services</a>
            <a href="tel:+919876543210" className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold">
              <Phone size={18} /> Call / WhatsApp Now
            </a>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION & BOOKING WIDGET */}
      <section id="home" className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white py-12 lg:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase">
              ✨ Premium Intercity Taxi Service
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              One-Way Drop Taxi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">@ ₹13/km.</span> No Return Fare!
            </h1>
            <p className="text-slate-300 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Why pay double for roundtrips when you're only going one way? Experience verified drivers, completely transparent billing, and zero hidden charges.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-slate-300"><Shield className="text-emerald-400" size={18}/> Insured Rides</div>
              <div className="flex items-center gap-2 text-sm text-slate-300"><Clock className="text-emerald-400" size={18}/> 24/7 Support</div>
              <div className="flex items-center gap-2 text-sm text-slate-300"><ThumbsUp className="text-emerald-400" size={18}/> Top-Rated Drivers</div>
            </div>
          </div>

          {/* Booking Form Widget */}
          <div className="lg:col-span-6 bg-white text-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-100 max-w-lg mx-auto w-full">
            <div className="flex bg-slate-100 p-1.5 rounded-xl mb-6">
              <button 
                onClick={() => setBookingType('one-way')}
                className={`flex-1 py-2.5 text-center rounded-lg font-bold text-sm transition ${bookingType === 'one-way' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
                One Way Drop
              </button>
              <button 
                onClick={() => setBookingType('round-trip')}
                className={`flex-1 py-2.5 text-center rounded-lg font-bold text-sm transition ${bookingType === 'round-trip' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
                Round Trip
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Pick-up Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input type="text" placeholder="Enter departure city" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition font-medium" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Drop Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input type="text" placeholder="Enter destination city" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition font-medium" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Date</label>
                  <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Time</label>
                  <input type="time" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition font-medium" />
                </div>
              </div>

              <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition duration-200 shadow-lg shadow-amber-500/20 text-center tracking-wide mt-4">
                Check Fare & Book Now
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 3. FLEET FLEXX */}
      <section id="fleet" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm">Choose Comfort</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">Explore Our Fleet Portfolio</h2>
          <p className="text-slate-500">Perfect vehicles meticulously maintained for both lone business travels and extended family road trips.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fleet.map((car, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between">
              <div>
                <div className="text-5xl mb-4 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center">{car.image}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{car.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{car.type}</p>
                
                <div className="flex gap-4 mb-6 border-y border-slate-100 py-3 text-slate-600 text-sm">
                  <span className="flex items-center gap-1"><Users size={16}/> {car.capacity}</span>
                  <span className="flex items-center gap-1"><Briefcase size={16}/> {car.bags} Bags</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-2xl font-black text-emerald-600">{car.price}</span>
                  <span className="text-slate-400 text-xs block">per kilometer</span>
                </div>
                <button className="bg-slate-900 text-white hover:bg-emerald-600 p-2.5 rounded-xl transition">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TOP DROPS & POPULAR ROUTES */}
      <section id="routes" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm">Most Frequented Hubs</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">Top One-Way Taxi Routes</h2>
            <p className="text-slate-500">Our high-frequency corridor drops mapping critical business and travel networks perfectly.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {routes.map((route, idx) => (
              <div key={idx} className="group relative h-64 rounded-2xl overflow-hidden shadow-md cursor-pointer">
                <img src={route.image} alt={route.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-5 w-full">
                  <h3 className="text-lg font-bold text-white mb-1">{route.name}</h3>
                  <span className="text-xs text-amber-400 font-semibold tracking-wider uppercase flex items-center gap-1">
                    Book Drop <ChevronRight size={12}/>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AMENITIES AND PREMIUM SERVICES */}
      <section id="services" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm">Engineered For Ease</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">Services Handcrafted For You</h2>
          <p className="text-slate-500">Expect standard-defining execution across any premium transit choice you secure with us.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-5 font-bold text-lg">0{idx+1}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-20 bg-emerald-950 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">What Our Commuters Express</h2>
            <p className="text-emerald-200">Thousands of happy customers rely on us weekly for safety and punctuality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Arun Kumar', role: 'Business Consultant', text: 'Exceptional transparency. Saved over 40% on my ride from Chennai to Trichy because I only paid for the drop.' },
              { name: 'Deepa R.', role: 'Software Engineer', text: 'Clean vehicle, incredibly professional driver, and neat onboarding. Will absolutely recommend for late-night solo dropouts.' },
              { name: 'Michael S.', role: 'Travel Blogger', text: 'Extremely flexible scheduling options, precise pricing, and the driver layout made navigating routes wonderfully crisp.'
              }
            ].map((review, idx) => (
              <div key={idx} className="bg-emerald-900/40 backdrop-blur-sm border border-emerald-800/50 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-4 text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-emerald-100 italic text-sm leading-relaxed mb-6">"{review.text}"</p>
                </div>
                <div>
                  <h4 className="font-bold text-white">{review.name}</h4>
                  <span className="text-xs text-emerald-400">{review.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. QUICK FAQ */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <HelpCircle className="mx-auto text-amber-500 mb-2" size={36} />
          <h2 className="text-3xl font-black text-slate-900">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {[
            { q: "Are there any hidden costs or night charges?", a: "Absolutely not. Our quotes explicitly outline toll fares, permit taxes, and driver configurations upfront." },
            { q: "How is the distance for one-way calculated?", a: "Billing scales strictly across your specific home pickup boundary to your defined dropoff point coordinates." },
            { q: "Can I adjust or cancel bookings freely?", a: "Yes, you can modify or reschedule up to 24 hours prior to travel without incurring penalties." }
          ].map((faq, i) => (
            <details key={i} className="group bg-white rounded-xl border border-slate-200 p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
              <summary className="flex items-center justify-between font-bold text-slate-900 text-base">
                <span>{faq.q}</span>
                <span className="ml-1.5 shrink-0 rounded-full bg-slate-100 p-1.5 text-slate-900 group-open:rotate-180 transition duration-200">
                  <ChevronRight size={16} className="transform rotate-90"/>
                </span>
              </summary>
              <p className="mt-3 text-slate-500 text-sm leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 px-4 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
              <Car className="text-amber-500 w-6 h-6"/> Trending<span className="text-amber-500">Taxi</span>
            </span>
            <p className="text-xs leading-relaxed text-slate-500">
              Premium long distance regional intercity services engineered to replace exorbitant double fare billing structures across South India perfectly.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Core Fleet</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#fleet" className="hover:text-white transition">Premium Compact Sedans</a></li>
              <li><a href="#fleet" className="hover:text-white transition">Family Multi-Utility SUVs</a></li>
              <li><a href="#fleet" className="hover:text-white transition">Elite Class Innova Escapes</a></li>
              <li><a href="#fleet" className="hover:text-white transition">High Occupancy Microbuses</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Legal Framework</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition">Privacy Policy Agreement</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service Manifest</a></li>
              <li><a href="#" className="hover:text-white transition">Driver Code & Safety Compliance</a></li>
              <li><a href="#" className="hover:text-white transition">Refund Architecture</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Support Channels</h4>
            <p className="text-xs text-slate-500 mb-2">Available 24 hours everyday for active route assistance.</p>
            <span className="text-white font-bold text-base block mb-1">help@trendingtaxi.in</span>
            <span className="text-emerald-400 font-bold text-lg block">+91 98765 43210</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} TrendingTaxi Solutions India. All Rights Reserved. Built securely using React.
        </div>
      </footer>

    </div>
  );
}