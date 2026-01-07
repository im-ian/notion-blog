export function throttle(fn, delay) {
  let timer: NodeJS.Timeout | null = null;

  return (...args) => {
    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
}
