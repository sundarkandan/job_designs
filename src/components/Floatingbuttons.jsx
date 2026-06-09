import { MessageCircle, Phone } from 'lucide-react';
import { WHATSAPP_NUMBER, PHONE_NUMBER } from '../constants/vehicles';

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2">
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        className="p-3 rounded-full bg-emerald-500 text-white shadow-2xl hover:bg-emerald-400 hover:scale-110 transform transition-all duration-300"
      >
        <MessageCircle className="h-5 w-5 stroke-[2.5]" />
      </a>
      <a
        href={`tel:${PHONE_NUMBER}`}
        className="p-3 rounded-full bg-amber-500 text-zinc-950 shadow-2xl hover:bg-amber-400 hover:scale-110 transform transition-all duration-300"
      >
        <Phone className="h-5 w-5 stroke-[2.5]" />
      </a>
    </div>
  );
}
