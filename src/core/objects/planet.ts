import { getUuid } from "utils";
import {
  getChance,
  getRandomInteger,
  getRandomNumber,
  getRandomHexColorCode,
} from "utils/random";

import {
  planet1Image,
  planet2Image,
  planet3Image,
  planet5Image,
  planet6Image,
} from "config/images";
import { type Canvas } from "core/essentials";
import type System from "./system";
import type { GamePlay } from ".";

const IMAGE_BY_TYPE = {
  1: planet1Image,
  2: planet2Image,
  3: planet3Image,
  4: planet5Image,
  5: planet6Image,
};

class Planet {
  system: System;
  item: {
    id: string;
    name: string;
    initialAngle: number;
    distanceFromSun: number;
    speed: number;
    radius: number;
    type: number;
    color: string;
    isClockDirection: boolean;
  };

  constructor(system: System, order: number) {
    this.system = system;

    this.item = this.generate(order);
  }

  get id() {
    return this.item.id;
  }

  get radius() {
    return this.item.radius;
  }

  generate(order: number) {
    const newObject = {
      name: `Planet`,
      radius: getRandomInteger(40, 160),
      id: getUuid(),
      initialAngle: getRandomInteger(0, 2 * Math.PI * 100) / 100,
      speed: getRandomNumber(5, 50) / 10,
      type: getRandomInteger(1, 5),
      color: getRandomHexColorCode(),
      isClockDirection: getChance(0.8),
      distanceFromSun: getRandomNumber(
        600 + (order - 1) * 300,
        (order + 0) * 300
      ),
      system: null,
    };

    return newObject;
  }

  getActualAngle(time: number) {
    const { isClockDirection, speed } = this.item;

    return (
      2 * Math.PI * ((time % 3600) / 3600) * (isClockDirection ? speed : -speed)
    );
  }

  getPoint(time: number) {
    const { distanceFromSun, initialAngle } = this.item;

    const dAngle = this.getActualAngle(time);
    const planetX = distanceFromSun * Math.cos(initialAngle + dAngle);
    const planetY = distanceFromSun * Math.sin(initialAngle + dAngle);

    return {
      x: planetX,
      y: planetY,
    };
  }

  render(canvas: Canvas, gamePlay: GamePlay) {
    const { distanceFromSun, radius, type } = this.item;
    const planetPoint = this.getPoint(gamePlay.getTime());
    const sunPoint = this.system.getStar().getPoint()

    const screenSunPoint = gamePlay.getPointWithScreenOffset(sunPoint)
    const screenPlanetPoint = gamePlay.getPointWithScreenOffset(planetPoint)

    canvas.drawCircleWithDashLine(
      screenSunPoint,
      distanceFromSun,
      1,
      "#777",
      [10, 15]
    );
    canvas.drawImage(IMAGE_BY_TYPE[type], screenPlanetPoint, 0, radius, radius);
  }
}

export default Planet;
