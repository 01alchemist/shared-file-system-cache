/**
 * Created by n.vinayakan on 06.06.17.
 */
//tslint:disable-next-line
export const isBrowser = new Function(
  "try {return this===window;}catch(e){ return false;}"
)();
//tslint:disable-next-line
export const isWorker = new Function(
  "try {return this===self && typeof importScripts !== 'undefined';}catch(e){return false;}"
)();
//tslint:disable-next-line
export const isNode =
  typeof global !== "undefined" &&
  typeof process !== "undefined" &&
  typeof process.stdout !== "undefined";

export function env(name, defaultValue): string {
  const envValue = process.env[name];
  return envValue || defaultValue;
}
export function envInt(name, defaultValue): number {
  const envValue = process.env[name];
  return envValue ? parseInt(envValue) : defaultValue;
}
export function envFloat(name, defaultValue): number {
  const envValue = process.env[name];
  return envValue ? parseFloat(envValue) : defaultValue;
}
