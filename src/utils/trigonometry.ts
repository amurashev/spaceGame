export const getAngleBetweenVectors = (pointA: Point, pointB: Point) => {
  let angle = 0;

  if (pointB.y !== 0) {
    const cosF =
      (pointA.x * pointB.x + pointA.y * pointB.y) /
      (Math.sqrt(pointA.x * pointA.x + pointA.y * pointA.y) *
        Math.sqrt(pointB.x * pointB.x + pointB.y * pointB.y));

    angle = Math.acos(cosF);
  }

  return angle;
};

export const getAngle = (deltaX, deltaY) => {
  let angle = getAngleBetweenVectors(
    { x: 1, y: 0 },
    { x: 1, y: deltaX / deltaY }
  );

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
