// i18n store — client-side language switching (Option A: instant, no reload)
import es from './es.json';
import en from './en.json';
import it from './it.json';

export type Lang = 'es' | 'en' | 'it';

const translations = { es, en, it } as const;

export function getLang(): Lang {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('lang') as Lang;
    if (saved && saved in translations) return saved;
  }
  return 'es';
}

export function setLang(lang: Lang) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('lang', lang);
  }
  // Dispatch event so all components can react
  window.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
}

export function t(lang: Lang): typeof es {
  return translations[lang];
}

export const langs: { code: Lang; label: string; flag: string }[] = [
  { code: 'es', label: 'ES', flag: '🇦🇷' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'it', label: 'IT', flag: '🇮🇹' },
];
