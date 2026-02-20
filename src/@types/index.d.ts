interface User {
  username: string;
  password: string;
}

declare module '*.svg' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type $TSFixMe = any;
