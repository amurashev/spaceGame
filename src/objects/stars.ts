import { systems } from "objects/systems";
import { getNumber } from "utils/bases";

export const starColor = "#eee";

export type Star = {
  size: number;
  point: Point;
};

export const generateStars = () => {
  const starsNumber = getNumber(200, 400);
  const stars: Star[] = [];

  for (let i = 0; i < starsNumber; i++) {
    stars.push({
      size: getNumber(1, 5),
      point: {
        x: getNumber(-systems.solar.width / 2, systems.solar.width / 2),
        y: getNumber(-systems.solar.height / 2, systems.solar.height / 2),
      },
    });
  }

  return stars;
};
