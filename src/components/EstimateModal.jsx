import { Car, MessageCircle } from 'lucide-react';
import { vehicles, WHATSAPP_NUMBER } from '../constants/vehicles';
import { IoLogoWhatsapp } from "react-icons/io";
export default function EstimateModal({ modal, dark, selectedCar, formData, tripType, t, onClose, lang = 'en' }) {
  const vehicle = vehicles[selectedCar];
  const vehicleName = typeof vehicle.name === 'object' ? (vehicle.name[lang] || vehicle.name.en) : vehicle.name;

  const triggerWhatsAppBooking = () => {
    let text = `*Booking Request via Website*\n\nType: ${tripType === 'oneway' ? 'One Way' : 'Round Trip'}\nName: ${formData.name}\nMobile: ${formData.mobile}\nPickup: ${formData.pickupAddress}\nDrop: ${formData.dropAddress}\nPickup Date/Time: ${formData.date} at ${formData.time}`;
    if (tripType === 'roundtrip') text += `\nReturn Date/Time: ${formData.returnDate} at ${formData.returnTime}`;
    text += `\nCar Selected: ${vehicleName}\nEstimated Fare: ₹${modal.price}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!modal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      {/* Dynamic Background and Border based on 'dark' state */}
      <div className={`w-full max-w-md rounded-2xl p-6 shadow-2xl border text-center space-y-5 transition-colors duration-300 ${
        dark ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-zinc-200'
      }`}>

        {/* Icon */}
        <div className="mx-auto w-11 h-11 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
          <Car className="h-5 w-5" />
        </div>

        {/* Heading */}
        <div className="space-y-1">
          <h3 className={`heading-font text-2xl sm:text-3xl font-black uppercase tracking-wide ${dark ? 'text-amber-500' : 'text-zinc-900'}`}>
            {t.estTitle}
          </h3>
          <p className="text-[11px] text-zinc-500 uppercase tracking-widest font-semibold">
            {vehicleName}
          </p>
        </div>

        {/* Fare Breakdown */}
        <div className={`p-4 rounded-xl border space-y-2 ${dark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-100 border-zinc-200'}`}>
          <div className="flex justify-between text-xs text-zinc-500 uppercase font-bold">
            <span>Calculated Distance</span>
            <span className={dark ? 'text-zinc-300' : 'text-zinc-700'}>~ {modal.distance} KM</span>
          </div>
          <div className="flex justify-between text-xs text-zinc-500 uppercase font-bold">
            <span>Base Per KM Tariff</span>
            <span className={dark ? 'text-zinc-300' : 'text-zinc-700'}>₹ {vehicle.rate} / KM</span>
          </div>
          <div className={`border-t my-2 pt-2 flex justify-between items-baseline ${dark ? 'border-zinc-800' : 'border-zinc-300'}`}>
            <span className="text-xs font-bold uppercase text-amber-500">{t.totalEst}</span>
            <span className={`text-2xl sm:text-3xl font-black heading-font ${dark ? 'text-white' : 'text-zinc-900'}`}>
              ₹{modal.price}/-
            </span>
          </div>
        </div>

        <p className="text-[10px] text-zinc-500 italic leading-snug">{t.distanceNote}</p>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={triggerWhatsAppBooking}
            className="w-full py-3 rounded-xl font-bold uppercase text-xs tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 transition-colors duration-300"
          >
          <IoLogoWhatsapp className="h-6 w-6" />{t.confirmWhatsApp}
          </button>
          <button
            onClick={onClose}
            className={`w-full py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition-colors duration-300 ${
              dark ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400' : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-600'
            }`}
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}