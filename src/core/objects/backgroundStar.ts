import { getRandomInteger, getRandomByChanceRange } from "utils/random";
import type { GamePlay } from ".";

class BackgroundStar {
  size: number;
  radius: number;
  angle: number;
  x: number
  y: number

  constructor(x: number, y: number, size: number) {
    this.x = x
    this.y = y
    this.size = size

    // this.size = getRandomInteger(1, 4);
    // this.radius = getRandomByChanceRange([
    //   [0.1, [solarRadius * 0, solarRadius * 0.1]],
    //   [0.1, [solarRadius * 0.11, solarRadius * 0.2]],
    //   [0.3, [solarRadius * 0.21, solarRadius * 0.5]],
    //   [0.6, [solarRadius * 0.51, solarRadius * 1]],
    // ]);
    // this.angle = getRandomInteger(0, 2 * Math.PI * 100) / 100;
  }

  getColor() {
    return "#ccc";
  }

  getPoint() {
    const { angle, radius, x, y } = this;

    return { x, y }

    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
  }

  render(canvas, gamePlay: GamePlay) {
    const { size } = this;
    const pointWithOffset = gamePlay.getPointWithScreenOffset(this.getPoint())

    canvas.drawCircleFill(pointWithOffset, size, this.getColor());
  }
}

export default BackgroundStar;
