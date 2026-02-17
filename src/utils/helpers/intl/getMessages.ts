import type { AcceptLocales } from './getLocale';
import { DEFAULT_LOCALE } from './getLocale';

type Messages = Record<string, string>;

const localeModules = import.meta.glob<{
  default: Messages;
}>('../../../static/locales/*.json');

export const getMessages = async (locale: AcceptLocales): Promise<Messages> => {
  const modules = Object.keys(localeModules);

  const localePath = modules.find((path) => path.endsWith(`${locale}.json`));

  const fallbackPath = modules.find((path) => path.endsWith(`${DEFAULT_LOCALE}.json`));

  const loader =
    (localePath && localeModules[localePath]) || (fallbackPath && localeModules[fallbackPath]);

  if (!loader) {
    throw new Error('Default locale not found');
  }

  const messages = await loader();

  return messages.default; // ✅ больше не горит
};
