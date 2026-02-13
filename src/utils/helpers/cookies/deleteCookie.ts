import { setCookie } from './setCookie.ts';

export const deleteCookie = (name: string) => {
  setCookie(name, null, { expires: -1 });
};
