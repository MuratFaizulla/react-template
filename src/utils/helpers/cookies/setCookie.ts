

export const setCookie = (
  name: string,
  value: string | number | boolean | null,
  props: CookieOptions = {}
) => {
  const cookieOptions: CookieOptions = { ...props };

  if (typeof cookieOptions.expires === 'number') {
    const date = new Date();
    date.setTime(date.getTime() + cookieOptions.expires * 1000);
    cookieOptions.expires = date;
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value !== null ? String(value) : ''
  )}`;

  Object.entries(cookieOptions).forEach(([propName, propValue]) => {
    if (!propValue) return;

    updatedCookie += `; ${propName}`;
    if (propValue !== true && propValue !== '') {
      if (propValue instanceof Date) {
        updatedCookie += `=${propValue.toUTCString()}`;
      } else {
        updatedCookie += `=${propValue}`;
      }
    }
  });

  document.cookie = updatedCookie;
};
