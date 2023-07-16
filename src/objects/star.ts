import { getRandomInteger } from "utils/random";

class Star {
  radius: number;

  constructor() {
    this.radius = getRandomInteger(50, 70);
  }

  getColor() {
    return "#fd9000";
  }

  getPoint() {
    return {
      x: 0,
      y: 0,
    };
  }
}

export default Star;
