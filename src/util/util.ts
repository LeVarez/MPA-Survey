export function throttle(fn: () => void, wait: number): () => void {
  let isCalled = false;

  return function(...args){
    if (!isCalled){
      fn(...args);
      isCalled = true;
      setTimeout(function(){
        isCalled = false;
      }, wait);
    }
  };
}

interface DebouncedFunction {
    (): void;
    cancel: () => void;
}

export function trailingDebounce(fn: () => void, delay: number): DebouncedFunction {
  let timeout: number;
  const _fn = function() {
    if (timeout) window.clearTimeout(timeout);
    timeout = window.setTimeout(fn, delay);
  };
  _fn.cancel = () => window.clearTimeout(timeout);
  return _fn;
}

export function clamp(val: number, min:number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function* generateRange(end: number, start = 0, step = 1): Iterable<number> {
  let x = start - step;
  while(x < end - step) yield x += step;
}

export function createLookup<T, Y>
(
  arr: T[],
  keyFn: (d: T) => string,
  valFn: (d: T) => Y
): {[key: string]: Y} {

  const lookup: {[key: string]: Y} = {};

  arr.forEach(d => {
    const key = keyFn(d);
    lookup[key] = valFn(d);
  });

  return lookup;
}

function getDynamicDp(val: number): number {
  if (val < 10) return 2;
  else if (val < 100) return 1;
  else return 0;
}

export function displayVal(val: number, dp: number = getDynamicDp(val)): string {
  const multiplier = Math.pow(10, dp);
  return (Math.round(val * multiplier) / multiplier)
    .toLocaleString(undefined, {minimumFractionDigits: dp});
}

export function getRandom<T>(data: T[]): T {
  const r = Math.floor(Math.random() * data.length);
  return data[r];
}

export function getXRandom<T>(data: T[], x: number): T[] {
  if (data.length < x) throw Error(`${data} has <${x} elements`);

  if (data.length === x) return data;

  const items = [];
  const remaining = [...data];
  for (let i = 0; i < x; i++) {
    const r = Math.floor(Math.random() * remaining.length);
    items.push(remaining[r]);
    remaining.splice(r, 1);
  }
  return items;
}

export interface RGB{
    r: number,
    g: number,
    b: number
}

export const strToId = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

export const range = (from: number, to: number): number[] => {
  return [...new Array(to - from)].map((_, i) => from + i);
};

export type Unpacked<T> = T extends (infer U)[] ? U : T;

export const getSentences = (str: string) => str.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
export const getMDWords = (str: string) => {
  const htmlText = str
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*)\*/gim, '<i>$1</i>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' target='_blank'>$1</a>")
    .replace(/\n$/gim, '<br />');

  return htmlText.trim();
};

export const setCookie = (name, value, days = 7, path = '/') => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path;
};

export const getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
};

export const deleteCookie = (name, path) => {
  setCookie(name, '', -1, path);
};