import { getNumber } from "../utils";

import { systems } from "./systems";

import type { Star } from "../store/stars";

export const starColor = "#eee";

export const generateStars = () => {
  const starsNumber = getNumber(200, 400);
  const stars: Star[] = [];

  for (let i = 0; i < starsNumber; i++) {
    stars.push({
      size: getNumber(1, 5),
      point: {
        x: getNumber(0, systems.solar.width),
        y: getNumber(0, systems.solar.height),
      },
    });
  }

  return stars;
};
