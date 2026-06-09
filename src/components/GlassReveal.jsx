import { useState, useEffect, useRef } from 'react';

export default function GlassReveal({ children, delay = 0, className = '' }) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        active
          ? 'opacity-100 translate-y-0 filter blur-0'
          : 'opacity-0 translate-y-8 filter blur-sm'
      } ${className}`}
    >
      {children}
    </div>
  );
}
