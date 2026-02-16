import type { AcceptLocales } from './getLocale';
import { DEFAULT_LOCALE } from './getLocale';

export const getMessages = async (locale: AcceptLocales) => {
  try {
    const messages = await import(`/src/static/locales/${locale}.json`);
    return messages.default; // ← не забудь .default
  } catch (e) {
    const defaultMessages = await import(`/src/static/locales/${DEFAULT_LOCALE}.json`);
    return defaultMessages.default;
  }
};
