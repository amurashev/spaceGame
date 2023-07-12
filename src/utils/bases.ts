export const getNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getChance = (value = 1) => value * 100 >= getNumber(0, 100);

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
