export const isDev = ():boolean => window.location.host.indexOf('localhost') !== -1;
export const isProd = ():boolean => !isDev();
