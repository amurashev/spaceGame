import type { Point } from "core/essentials";

export const getVectorAngle = (x: number[], y: number[]) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

export const getVectorDistance = (x: number[], y: number[]) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

export const getAngle = (deltaX, deltaY) => {
  let angle = getVectorAngle([1, 0], [1, deltaX / deltaY])

  if (deltaX > 0 && deltaY < 0) angle = angle;
  if (deltaX > 0 && deltaY > 0) angle = Math.PI - angle;
  if (deltaX < 0 && deltaY > 0) angle = Math.PI + angle;
  if (deltaX < 0 && deltaY < 0) angle = 2 * Math.PI - angle;

  return angle;
};

/**
 * (x-centerX)^2 + (y - centerY)^2 < radius^2
 */
export const getIsPointInCircle = (
  point: Point,
  circleCenter: Point,
  rad: number
) => {
  return (
    Math.pow(point.x - circleCenter.x, 2) +
      Math.pow(point.y - circleCenter.y, 2) <
    Math.pow(rad, 2)
  );
};
