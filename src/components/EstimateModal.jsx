import React, { useState } from 'react';
import { Car, Clock, MapPin, AlertCircle, Loader2, Gauge, RefreshCw, ArrowRight, CheckCircle2, User } from 'lucide-react';
import { vehicles, WHATSAPP_NUMBER } from '../constants/vehicles';
import { IoLogoWhatsapp } from "react-icons/io";

// ── Booking ID generator ──
function generateBookingId() {
  const L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const N = '0123456789';
  const r = (arr, n) => Array.from({ length: n }, () => arr[Math.floor(Math.random() * arr.length)]).join('');
  
  const tsPart = String(Date.now()).slice(-3);          
  const letPart = r(L, 2);                              
  const midPart = r(L + N, 3);                          
  
  return letPart + midPart + tsPart;                    
}

export default function EstimateModal({ modal, dark, selectedCar, formData, tripType, t, onClose, lang = 'en' }) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const vehicle = vehicles[selectedCar];
  const vehicleName = typeof vehicle.name === 'object' ? (vehicle.name[lang] || vehicle.name.en) : vehicle.name;

  const activeRate = tripType === 'oneway' ? vehicle.rate : vehicle.rate2;

  const MIN_KM = tripType === 'oneway' ? 130 : 250;
  const appliedKm = Math.max(modal.distance, MIN_KM);
  const driverBatta = 500;
  const finalFare = Math.round(appliedKm * activeRate * (tripType === 'roundtrip' ? 2 : 1)) + driverBatta;

  const triggerWhatsAppBooking = () => {
    const bookingId = generateBookingId();
    const timeStr = formData.time
      ? new Date(`2000-01-01T${formData.time}`).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
      : formData.time;

    const text =
`*Your Booking Details:*
        Booking ID: ${bookingId}
        Name: ${formData.name}
        Mobile Number: ${formData.mobile}
        Pickup Location: ${formData.pickupAddress}
        Drop Location: ${formData.dropAddress}
        Pickup Date: ${formData.date}
        Pickup Time: ${timeStr}
        Trip Type: ${tripType === 'oneway' ? 'one_way' : 'round_trip'}${tripType === 'roundtrip' ? `\n        Return Date: ${formData.returnDate}\n        Return Time: ${formData.returnTime}` : ''}
        Car Selected: ${vehicleName}
        Total KM: ${appliedKm} KM
        Rate Per KM: ${activeRate} ₹
        Driver Batta: ${driverBatta} ₹
        Total Trip Fare: ${finalFare} ₹
        Toll, parking, permit, Hills Charges extra

        -----------------------------------------
               *Accepted:*
          Minimum KM Policy:
       _Oneway - 130 Km Minimum_
       _Roundtrip - 250 KM Minimum_

        -----------------------------------------

     *Thank you for choosing Trending Drop Taxi! Safe Travels!*

     *For any questions please contact* *+91 80157 85116*
     *www.trendingtaxi.in*`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    setIsConfirmed(true);
  };

  const handleClose = () => {
    setIsConfirmed(false);
    onClose();
  };

  if (!modal.isOpen) return null;

  const panelCls = `p-4 rounded-xl border space-y-2 ${dark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-100 border-zinc-200'}`;
  const rowLabelCls = 'text-xs text-zinc-500 uppercase font-bold';
  const rowValueCls = `text-xs font-bold uppercase ${dark ? 'text-zinc-300' : 'text-zinc-700'}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
      
      <style>{`
        @keyframes scaleIn {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes popSuccess {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes floatEffect {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-pop-success { animation: popSuccess 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-float { animation: floatEffect 3s ease-in-out infinite; }
      `}</style>

      <div className={`w-full max-w-md rounded-2xl p-6 shadow-2xl border text-center space-y-5 animate-scale-in transition-colors duration-300 ${
        dark ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-zinc-200'
      }`}>

        {/* ── ✅ MULTI-LANGUAGE CONFIRMED SCREEN ── */}
        {isConfirmed ? (
          <div className="py-6 space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse"></div>
                <div className="relative w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 animate-pop-success">
                  <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="heading-font text-2xl sm:text-3xl font-black uppercase tracking-wide text-emerald-500 animate-float">
                {t.bookingConfirmed || 'Booking Confirmed! 🎉'}
              </h3>
              <p className={`text-xs font-bold uppercase tracking-wider max-w-xs mx-auto leading-relaxed ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t.bookingSuccessDesc || 'Your ride has been successfully registered.'}
              </p>
            </div>

            <div className={`p-4 rounded-xl border border-dashed ${dark ? 'bg-zinc-900/40 border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-500'} text-[11px] font-semibold uppercase tracking-wider`}>
              🙏 {t.thankYouBrand || 'Thank you for choosing'} <span className="text-amber-500 font-bold">Trending Drop Taxi</span>!
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 rounded-xl font-bold uppercase text-xs tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {t.doneBtn || 'Done'}
            </button>
          </div>
        ) : (
          
          // ── ORIGINAL ESTIMATE SCREEN ──
          <>
            <div className="mx-auto w-11 h-11 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
              {modal.isLoading
                ? <Loader2 className="h-5 w-5 animate-spin" />
                : modal.error
                  ? <AlertCircle className="h-5 w-5 text-red-500" />
                  : <Car className="h-5 w-5" />
              }
            </div>

            <div className="space-y-1">
              <h3 className={`heading-font text-2xl sm:text-3xl font-black uppercase tracking-wide ${dark ? 'text-amber-500' : 'text-zinc-900'}`}>
                {modal.isLoading ? t.calculating : modal.error ? t.routeError : t.estTitle}
              </h3>
              <p className="text-[11px] text-zinc-500 uppercase tracking-widest font-semibold">
                {vehicleName}
              </p>
            </div>

            {modal.isLoading && (
              <div className={panelCls}>
                <div className="flex flex-col items-center gap-3 py-4">
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="block w-2 h-2 rounded-full bg-amber-500"
                        style={{ animation: `bounce 1s ease-in-out ${i * 0.15}s infinite` }}
                      />
                    ))}
                  </div>
                  <p className={`text-xs font-bold uppercase tracking-wider ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {t.fetchingRoute}
                  </p>
                </div>
              </div>
            )}

            {!modal.isLoading && modal.error && (
              <div className={`p-4 rounded-xl border space-y-2 ${dark ? 'bg-red-950/30 border-red-900/40' : 'bg-red-50 border-red-200'}`}>
                <p className="text-xs font-bold text-red-500 uppercase tracking-wide">
                  {modal.error}
                </p>
                <p className={`text-[10px] ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  {t.validAddressNote}
                </p>
              </div>
            )}

            {!modal.isLoading && !modal.error && (
              <>
                <div className={panelCls}>
                  <div className="flex justify-between items-center">
                    <span className={rowLabelCls}>
                      <MapPin className="inline h-3 w-3 mr-1 -mt-0.5" />
                      {t.distance}
                    </span>
                    <span className={rowValueCls}>
                      {modal.distanceText || `~ ${modal.distance} KM`}
                    </span>
                  </div>

                  {modal.durationText && (
                    <div className="flex justify-between items-center">
                      <span className={rowLabelCls}>
                        <Clock className="inline h-3 w-3 mr-1 -mt-0.5" />
                        {t.estDriveTime}
                      </span>
                      <span className={rowValueCls}>{modal.durationText}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className={rowLabelCls}>
                      <Gauge className="inline h-3 w-3 mr-1 -mt-0.5" />
                      {t.rate}
                    </span>
                    <span className={rowValueCls}>₹ {activeRate} {t.perKm}</span>
                  </div>

                  {tripType === 'roundtrip' && (
                    <div className="flex justify-between items-center">
                      <span className={rowLabelCls}>
                        <RefreshCw className="inline h-3 w-3 mr-1 -mt-0.5" />
                        {t.tripTypeLabel}
                      </span>
                      <span className="text-xs font-bold uppercase text-amber-500 flex items-center gap-1">
                        <RefreshCw className="h-3 w-3" />
                        {t.roundTripLabel}
                      </span>
                    </div>
                  )}

                  {tripType === 'oneway' && (
                    <div className="flex justify-between items-center">
                      <span className={rowLabelCls}>
                        <ArrowRight className="inline h-3 w-3 mr-1 -mt-0.5" />
                        {t.tripTypeLabel}
                      </span>
                      <span className="text-xs font-bold uppercase text-amber-500 flex items-center gap-1">
                        <ArrowRight className="h-3 w-3" />
                        {t.oneWayLabel}
                      </span>
                    </div>
                  )}

                  {/* ── ✅ FIXED: EMOJI REPLACED WITH LUCIDE-REACT USER ICON ── */}
                  <div className="flex justify-between items-center">
                    <span className={rowLabelCls}>
                      <User className="inline h-3 w-3 mr-1 -mt-0.5" />
                      {t.driverBattaLabel || 'Driver Bata'}
                    </span>
                    <span className={rowValueCls}>₹ {driverBatta}</span>
                  </div>

                  <div className={`border-t my-2 pt-2 flex justify-between items-baseline ${dark ? 'border-zinc-800' : 'border-zinc-300'}`}>
                    <span className="text-xs font-bold uppercase text-amber-500">{t.totalEst}</span>
                    <span className={`text-2xl sm:text-3xl font-black heading-font ${dark ? 'text-white' : 'text-zinc-900'}`}>
                      ₹{finalFare}/-
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-zinc-500 italic leading-snug">{t.distanceNote}</p>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={triggerWhatsAppBooking}
                    className="w-full py-3 rounded-xl font-bold uppercase text-xs tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 transition-colors duration-300 shadow-lg shadow-emerald-600/10"
                  >
                    <IoLogoWhatsapp className="h-6 w-6" />
                    {t.confirmWhatsApp}
                  </button>
                  <button
                    onClick={handleClose}
                    className={`w-full py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition-colors duration-300 ${
                      dark ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400' : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-600'
                    }`}
                  >
                    {t.close}
                  </button>
                </div>
              </>
            )}

            {(modal.isLoading || modal.error) && (
              <button
                onClick={handleClose}
                className={`w-full py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition-colors duration-300 ${
                  dark ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400' : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-600'
                }`}
              >
                {t.close}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}