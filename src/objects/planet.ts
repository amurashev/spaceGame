import {
  getChance,
  getRandomInteger,
  getRandomNumber,
  getRandomHexColorCode,
} from "utils/random";

class Planet {
  name: string;
  initialAngle: number;
  distanceFromSun: number;
  speed: number;
  radius: number;
  type: number;
  color: string;
  isClockDirection: boolean;

  constructor() {
    this.name = `Planet`;
    this.initialAngle = getRandomInteger(0, 2 * Math.PI * 100) / 100;
    this.distanceFromSun = getRandomNumber(400, 700);
    this.speed = getRandomNumber(5, 50) / 10;
    this.radius = getRandomInteger(40, 160);
    this.type = 1;
    this.color = getRandomHexColorCode();
    this.isClockDirection = getChance(0.8);
  }

  getActualAngle(time: number) {
    const { isClockDirection, speed } = this;

    return (
      2 * Math.PI * ((time % 3600) / 3600) * (isClockDirection ? speed : -speed)
    );
  }

  getPoint(time: number) {
    const { distanceFromSun, initialAngle } = this;

    const dAngle = this.getActualAngle(time)
    const planetX = distanceFromSun * Math.cos(initialAngle + dAngle);
    const planetY = distanceFromSun * Math.sin(initialAngle + dAngle);

    return {
      x: planetX,
      y: planetY,
    };
  }
}

export default Planet;