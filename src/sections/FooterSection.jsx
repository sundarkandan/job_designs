const NAV_KEYS = ['home', 'about', 'tariff', 'destinations', 'reviews', 'contact'];
import Logo from "./1780410771882.png"
export default function FooterSection({ dark, t, onScroll }) {
  const D = dark;

  return (
    <footer
      className={`border-t transition-colors duration-300 ${D ? 'bg-[#09090b] border-zinc-900' : 'bg-zinc-50 border-zinc-200'} pt-12 pb-8 text-xs text-zinc-500`}
    >
      {/* Centered grid for mobile and standard alignment for desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8 text-center sm:text-left">

        {/* Brand blurb - Flex centers items on mobile */}
        <div className="flex flex-col items-center sm:items-start gap-4">
          <button 
            onClick={() => onScroll('home')} 
            className="w-32 h-20 flex items-center justify-center sm:justify-start focus:outline-none" 
          >
            <img src={Logo} alt="Trending Drop Taxi" className="w-full h-full object-contain hover:opacity-90 transition-opacity" />
          </button>
          <p className="max-w-[200px] text-zinc-500 leading-relaxed text-[11px]">
            {t.brandFooterDesc}
          </p>
        </div>

        {/* Quick links - Grid container centered */}
        <div className="flex flex-col items-center sm:items-start">
          <h5 className="font-bold uppercase tracking-wider text-zinc-400 mb-3">{t.quickLinks}</h5>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 font-medium">
            {NAV_KEYS.map(k => (
              <button
                key={k}
                onClick={() => onScroll(k)}
                className="text-center sm:text-left hover:text-amber-500 uppercase text-[11px] tracking-wide transition-colors duration-300"
              >
                {t[k]}
              </button>
            ))}
          </div>
        </div>

        {/* Contact info - Centered */}
        <div className="flex flex-col items-center sm:items-start">
          <h5 className="font-bold uppercase tracking-wider text-zinc-400 mb-3">{t.contactInfo}</h5>
          <p className="leading-relaxed max-w-[200px]">
            {t.footerAddress}
          </p>
        </div>
      </div>

      {/* Copyright and Creator Credit */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900/40 pt-6 text-center tracking-wider text-[10px]">
        <p className="mb-2">© 2026 TRENDING DROP TAXI. {t.rights}</p>
         WANT A SITE LIKE THIS? CLICK <a 
          href="https://creatorzsite.com" 
          target="_blank" 
          rel="noreferrer"
          className="hover:text-amber-500 yellow transition-colors duration-300 font-semibold"
        >
        CREATORZSITE.COM
        </a>
      </div>
    </footer>
  );
}