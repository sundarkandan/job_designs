import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQ_DATA } from '../constants/faq';

export default function FAQSection({ dark, lang = 'en' }) {
  const [activeIndex, setActiveIndex] = useState(null);
const faqHeading = {
  en: "Frequently Asked Questions",
  ta: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
  hi: "अक्सर पूछे जाने वाले प्रश्न",
  kn: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
  ml: "പതിവായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ",
  te: "తరచుగా అడిగే ప్రశ్నలు"
};
  return (
    <section id="faq" className={`py-24 px-6 ${dark ? 'bg-[#0a0a0a]' : 'bg-[#fcfbf7]'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-black uppercase mb-16 text-center ${dark ? 'text-white' : 'text-zinc-900'}`}>
        <h2>
  {faqHeading[lang] || faqHeading.en}
</h2>
        </h2>

        {/* Responsive Grid: 1 column on mobile, 2 columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {FAQ_DATA.map((item, idx) => (
            <div 
              key={idx} 
              className={`rounded-3xl border h-fit ${dark ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'}`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`font-bold ${dark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                  {item.q[lang]}
                </span>
                <motion.div 
                  className="shrink-0 ml-4"
                  animate={{ rotate: activeIndex === idx ? 180 : 0 }}
                >
                  <ChevronDown className="text-amber-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-zinc-500 dark:text-zinc-400 leading-relaxed"
                  >
                    {item.a[lang]}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}