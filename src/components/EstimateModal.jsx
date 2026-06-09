import { Car, MessageCircle } from 'lucide-react';
import { vehicles, WHATSAPP_NUMBER } from '../constants/vehicles';

export default function EstimateModal({ modal, selectedCar, formData, tripType, t, onClose }) {
  const vehicle = vehicles[selectedCar];

  const triggerWhatsAppBooking = () => {
    let text =
      `*Booking Request via Website*\n\n` +
      `Type: ${tripType === 'oneway' ? 'One Way' : 'Round Trip'}\n` +
      `Name: ${formData.name}\n` +
      `Mobile: ${formData.mobile}\n` +
      `Pickup: ${formData.pickupAddress}\n` +
      `Drop: ${formData.dropAddress}\n` +
      `Pickup Date/Time: ${formData.date} at ${formData.time}`;

    if (tripType === 'roundtrip') {
      text += `\nReturn Date/Time: ${formData.returnDate} at ${formData.returnTime}`;
    }

    text += `\nCar Selected: ${vehicle.name}\nEstimated Fare: ₹${modal.price}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!modal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-md rounded-2xl p-6 shadow-2xl border border-amber-500/30 text-center space-y-5">

        {/* Icon */}
        <div className="mx-auto w-11 h-11 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
          <Car className="h-5 w-5" />
        </div>

        {/* Heading */}
        <div className="space-y-1">
          <h3 className="heading-font text-2xl sm:text-3xl font-black uppercase text-amber-500 tracking-wide">
            {t.estTitle}
          </h3>
          <p className="text-[11px] text-zinc-400 uppercase tracking-widest font-semibold">
            {vehicle.name}
          </p>
        </div>

        {/* Fare Breakdown */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
          <div className="flex justify-between text-xs text-zinc-500 uppercase font-bold">
            <span>Calculated Distance</span>
            <span className="text-zinc-300">~ {modal.distance} KM</span>
          </div>
          <div className="flex justify-between text-xs text-zinc-500 uppercase font-bold">
            <span>Base Per KM Tariff</span>
            <span className="text-zinc-300">₹ {vehicle.rate} / KM</span>
          </div>
          <div className="border-t border-zinc-800/80 my-2 pt-2 flex justify-between items-baseline">
            <span className="text-xs font-bold uppercase text-amber-500">{t.totalEst}</span>
            <span className="text-2xl sm:text-3xl font-black heading-font text-white">
              ₹{modal.price}/-
            </span>
          </div>
        </div>

        <p className="text-[10px] text-zinc-500 italic leading-snug">{t.distanceNote}</p>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={triggerWhatsAppBooking}
            className="w-full py-3 rounded-xl font-bold uppercase text-xs tracking-wider bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center gap-2 transition-colors duration-300 shadow-lg"
          >
            <MessageCircle className="h-4 w-4" /> {t.confirmWhatsApp}
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors duration-300"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
}
