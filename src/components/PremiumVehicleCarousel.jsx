import { useState, useEffect, useRef } from 'react';

export default function PremiumVehicleCarousel({ slides, alt, lang }) { // Added lang prop
  const extendedSlides = [...slides, ...slides, ...slides];
  const totalItems = slides.length;
  const [currentIndex, setCurrentIndex] = useState(totalItems);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const wasHidden = useRef(false);

  // Calculate the index for the badge (handles the infinite loop offset)
  const activeSlideIndex = (currentIndex - totalItems + totalItems) % totalItems;

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        wasHidden.current = true;
      } else if (wasHidden.current) {
        wasHidden.current = false;
        if (currentIndex < totalItems || currentIndex >= totalItems * 2) {
          setIsTransitioning(false);
          setCurrentIndex(totalItems);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [currentIndex, totalItems]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex >= totalItems * 2) {
      setCurrentIndex(totalItems);
    } else if (currentIndex < totalItems) {
      setCurrentIndex(totalItems * 2 - 1);
    }
  };

  return (
    <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-[#FFFFFF]">
      {/* DYNAMIC BADGE */}
    {/* DYNAMIC BADGE */}
<div className="absolute top-3 left-3 z-20 pointer-events-none">
  <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase px-3 py-1 rounded-full border border-white/10 shadow-lg">
    {/* Use safe navigation: ?. checks if the object exists before reading properties */}
    {slides[activeSlideIndex]?.carname?.[lang] || "Loading..."}
  </span>
</div>

      <div
        className="flex h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 850ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedSlides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 flex items-center justify-center p-6">
            <img
              src={slide.img} // Updated to access slide.img
              alt={`${alt} view`}
              className="w-full h-full object-contain scale-110 transition-transform duration-500 hover:scale-125 pointer-events-none"
              style={{ filter: 'drop-shadow(0 10px 8px rgba(0,0,0,0.1))' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}