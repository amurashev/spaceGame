export const getAngleBetweenVectors = (
  aX: number,
  aY: number,
  bX: number,
  bY: number
) => {
  let angle = 0;

  if (bY !== 0) {
    const cosF =
      (aX * bX + aY * bY) /
      (Math.sqrt(aX * aX + aY * aY) * Math.sqrt(bX * bX + bY * bY));

    angle = Math.acos(cosF);
  }

  return angle;
};
