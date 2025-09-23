import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import hiTranslation from './locales/hi.json';
import teTranslation from './locales/te.json';
import taTranslation from './locales/ta.json';
import knTranslation from './locales/kn.json';
import bnTranslation from './locales/bn.json';
import mrTranslation from './locales/mr.json';
import guTranslation from './locales/gu.json';
import paTranslation from './locales/pa.json';
import mlTranslation from './locales/ml.json';
import orTranslation from './locales/or.json';
import asTranslation from './locales/as.json';

const resources = {
  en: { translation: enTranslation },
  hi: { translation: hiTranslation },
  te: { translation: teTranslation },
  ta: { translation: taTranslation },
  kn: { translation: knTranslation },
  bn: { translation: bnTranslation },
  mr: { translation: mrTranslation },
  gu: { translation: guTranslation },
  pa: { translation: paTranslation },
  ml: { translation: mlTranslation },
  or: { translation: orTranslation },
  as: { translation: asTranslation },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;