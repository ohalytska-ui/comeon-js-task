const DEBOUNCE_DELAY = 500;

export const debounce = (fn, delay = DEBOUNCE_DELAY) => {
  let timeoutId;
  function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  }
  return debounced;
};
