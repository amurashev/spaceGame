import { getRandomInteger, getRandomByChanceRange } from "utils/random";

class BackgroundStar {
  size: number;
  radius: number;
  angle: number;

  constructor(solarRadius: number) {
    this.size = getRandomInteger(1, 4);
    this.radius = getRandomByChanceRange([
      [0.9, [solarRadius * 0, solarRadius * 0.1]],
      [0.9, [solarRadius * 0.11, solarRadius * 0.2]],
      [0.1, [solarRadius * 0.21, solarRadius * 0.5]],
      [0.1, [solarRadius * 0.51, solarRadius * 1]],
    ]);
    this.angle = getRandomInteger(0, 2 * Math.PI * 100) / 100;
  }

  getColor() {
    return "#ccc";
  }

  getPoint() {
    const { angle, radius } = this;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
  }
}

export default BackgroundStar;
