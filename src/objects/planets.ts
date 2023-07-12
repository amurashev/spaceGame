import { getNumber } from "utils/bases";

export const starColor = "#eee";

export type Planet = {
  name: string;
  initialAngle: number;
  distanceFromSun: number;
  speed: number;
  size: number;
  type: number;
};

export const generatePlanets = () => {
  const count = getNumber(3, 6);
  const data: Planet[] = [];

  for (let i = 0; i < count; i++) {
    data.push({
      name: `Planet ${getNumber(0, 100000)}`,
      initialAngle: getNumber(0, 2 * Math.PI * 100) / 100,
      distanceFromSun: getNumber(50, 3000),
      speed: getNumber(1, 10),
      size: getNumber(40, 160),
      type: getNumber(1, 2),
    });
  }

  return data;
};
