// 函数防抖
export function debounce(fn: Function, delay: number) {
  let timer: number | null = null;
  return function(...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      fn.call(this, ...args);
    }, delay);
  };
}