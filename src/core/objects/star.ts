import { getRandomInteger } from "utils/random";
import { planet4Image } from "config/images";

import type { GamePlay } from ".";

class Star {
  radius: number;

  constructor() {
    this.radius = getRandomInteger(80, 120);
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

  render(canvas, gamePlay: GamePlay) {
    const { radius } = this;
    const sunPoint = this.getPoint();
    const screenSunPoint = gamePlay.getPointWithScreenOffset(sunPoint);
    const size = radius * 4;

    canvas.drawImage(planet4Image, screenSunPoint, 0, size, size);
  }
}

export default Star;

// const linear = canvas.createLinearGradient(
//   sunPoint.x - radius,
//   sunPoint.y + radius,
//   sunPoint.x + radius * 2,
//   sunPoint.y + radius
// );
// linear.addColorStop(0, "#b02e03");
// linear.addColorStop(1, "#fd9000");

// this.canvas.drawCircleFill(sunPoint, radius * 2, getColor());
