import { getCookie } from '../cookies';
import { COOKIE_NAMES } from '../../constants';

const ACCEPT_LOCALES = ['kk', 'ru', 'en-US'] as const;
export const DEFAULT_LOCALE = ACCEPT_LOCALES[1];
export type AcceptLocales = (typeof ACCEPT_LOCALES)[number];

export const getLocale = (): AcceptLocales => {
  const cookieLocale = getCookie(COOKIE_NAMES.LOCALE);
  if (cookieLocale && ACCEPT_LOCALES.includes(cookieLocale as AcceptLocales)) {
    return cookieLocale as AcceptLocales;
  }

  if (ACCEPT_LOCALES.find((locale) => locale === navigator.language)) {
    return navigator.language as AcceptLocales;
  }

  return DEFAULT_LOCALE;
};
