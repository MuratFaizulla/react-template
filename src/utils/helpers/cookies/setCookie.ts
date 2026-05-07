interface CookieOptions {
  expires?: number | Date | string;
  path?: string;
  domain?: string;
  secure?: boolean;
  [key: string]: string | number | boolean | Date | undefined;
}

export const setCookie = (
  name: string,
  value: string | number | boolean | null,
  props: CookieOptions = {}
) => {
  const cookieOptions: CookieOptions = { ...props };

  if (typeof props.expires === 'number' && props.expires) {
    const date = new Date();
    date.setTime(date.getTime() + props.expires * 1000);
    cookieOptions.expires = date;
  }

  if (props.expires instanceof Date && props.expires.toUTCString) {
    cookieOptions.expires = props.expires.toUTCString();
  }

  const cookieValue = value ? encodeURIComponent(value) : null;
  let updatedCookie = `${name}=${cookieValue}`;
  Object.keys(cookieOptions).forEach((propName) => {
    updatedCookie += `; ${propName}`;
    const propValue = cookieOptions[propName];
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  });

  document.cookie = updatedCookie;
};
