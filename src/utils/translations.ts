import en from '@/locales/en.json';
import ko from '@/locales/ko.json';
import ja from '@/locales/ja.json';
import zh from '@/locales/zh.json';
import vi from '@/locales/vi.json';

export const translations = {
  en,
  ko,
  ja,
  zh,
  vi
};

export type Language = keyof typeof translations;

export const useTranslations = (lang: Language) => translations[lang];