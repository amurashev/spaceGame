export const debounce = (fn, ms = 0) => {
    let timeoutId
    return function (...args) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn.apply(this, args), ms)
    }
  }
  
  export const throttle = (fn, wait) => {
    let inThrottle, lastFn, lastTime
    return function () {
      const context = this,
        args = arguments
      if (!inThrottle) {
        fn.apply(context, args)
        lastTime = Date.now()
        inThrottle = true
      } else {
        clearTimeout(lastFn)
        lastFn = setTimeout(
          function () {
            if (Date.now() - lastTime >= wait) {
              fn.apply(context, args)
              lastTime = Date.now()
            }
          },
          Math.max(wait - (Date.now() - lastTime), 0)
        )
      }
    }
  }

  export const recursiveFunc = (
    fn: (it: number) => void,
    timeout,
    iMax = 0,
    iCurrent = 0
  ) => {
    if (iCurrent > iMax) return;
  
    fn(iCurrent);
  
    setTimeout(
      () => recursiveFunc(fn, timeout, iMax, iCurrent + 1),
      timeout / iMax
    );
  };
  