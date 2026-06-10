// useSEO.js — Drop this in src/hooks/useSEO.js
// Usage: call useSEO(lang) in App.jsx to auto-update meta tags on lang change

import { useEffect } from 'react';
import { seoMeta } from '../constants/translations';

export default function useSEO(lang = 'en') {
  useEffect(() => {
    const meta = seoMeta[lang] || seoMeta.en;

    // ── <title> ──────────────────────────────────────────────────
    document.title = meta.pageTitle;

    // ── Helper: upsert a <meta> tag ──────────────────────────────
    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // ── Standard Meta ────────────────────────────────────────────
    setMeta('meta[name="description"]', 'name', 'description');
    document.querySelector('meta[name="description"]').setAttribute('content', meta.metaDescription);

    setMeta('meta[name="keywords"]', 'name', 'keywords');
    document.querySelector('meta[name="keywords"]').setAttribute('content', meta.metaKeywords);

    // ── Open Graph ───────────────────────────────────────────────
    const og = (property, content) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    og('og:title', meta.ogTitle);
    og('og:description', meta.ogDescription);
    og('og:type', meta.ogType || 'website');
    og('og:locale', lang === 'ta' ? 'ta_IN' : 'en_IN');

    // ── hreflang ─────────────────────────────────────────────────
    ['en', 'ta'].forEach(l => {
      let el = document.querySelector(`link[hreflang="${l}"]`);
      if (!el) { el = document.createElement('link'); el.setAttribute('rel', 'alternate'); el.setAttribute('hreflang', l); document.head.appendChild(el); }
      el.setAttribute('href', `${window.location.origin}${l === 'en' ? '/' : '/ta'}`);
    });

    // ── Structured Data JSON-LD (only for 'en', once) ────────────
    if (lang === 'en' && seoMeta.en.structuredData) {
      const injectLD = (id, data) => {
        let el = document.getElementById(id);
        if (!el) { el = document.createElement('script'); el.id = id; el.type = 'application/ld+json'; document.head.appendChild(el); }
        el.textContent = JSON.stringify(data);
      };
      injectLD('ld-localbusiness', seoMeta.en.structuredData);
      injectLD('ld-faq', seoMeta.en.faqStructuredData);
    }
  }, [lang]);
}