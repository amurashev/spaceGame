export const getRandomInteger = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

export const getChance = (value = 1) => value >= Math.random();

export const getRandomNumbersArray = (min = 0, max = 100, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

export const getRandomByChanceRange = (arr) => {
  const randomChance = Math.random();

  const availableRanges = arr.filter((item) => item[0] <= randomChance);
  const randomElement = getRandomInteger(
    0,
    availableRanges.length ? availableRanges.length - 1 : arr.length - 1
  );
  const selectedRange = availableRanges.length ? availableRanges[randomElement] : arr[randomElement]

  // console.warn("getRandomByChanceRange", {
  //   randomChance,
  //   availableRanges,
  //   randomElement,
  //   selectedRange,
  // });

  return getRandomNumber(selectedRange[1][0], selectedRange[1][1]);
};

export const getRandomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
};
