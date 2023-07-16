import type Canvas from "essentials/canvas";
import type System from "./system";

import { shuttleImage, shuttleImageMove } from "images";

class Space {
  canvas: Canvas;
  povPoint: Point;
  system: System;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  setPOV(point: Point) {
    this.povPoint = point;
  }

  setSystem(system: System) {
    this.system = system;
  }

  getPointWithOffset(point: Point) {
    const { x: deltaX, y: deltaY } = this.povPoint;
    const { x: screenX, y: screenY } = this.canvas.getCenterPoint();

    return {
      x: point.x + screenX - deltaX,
      y: point.y + screenY - deltaY,
    };
  }

  renderSun = () => {
    const { radius, getPoint, getColor } = this.system.getStar();
    const sunPoint = this.getPointWithOffset(getPoint());
    // const linear = canvas.createLinearGradient(
    //   sunPoint.x - radius,
    //   sunPoint.y + radius,
    //   sunPoint.x + radius * 2,
    //   sunPoint.y + radius
    // );
    // linear.addColorStop(0, "#b02e03");
    // linear.addColorStop(1, "#fd9000");

    this.canvas.drawCircleFill(sunPoint, radius * 2, getColor());
  };

  renderStars() {
    this.system.getBackgroundStars().forEach((star) => {
      const { size } = star;
      const point = this.getPointWithOffset(star.getPoint());

      this.canvas.drawCircleFill(point, size, star.getColor());
    });
  }

  renderPlanets = (time) => {
    const planets = this.system.getPlanets();
    planets.forEach((planet) => {
      const { distanceFromSun, radius, color } = planet;

      const sunPoint = this.getPointWithOffset({ x: 0, y: 0 });
      const planetPoint = this.getPointWithOffset(planet.getPoint(time));

      this.canvas.drawCircle(sunPoint, distanceFromSun, 1, "#555");
      this.canvas.drawCircleFill(planetPoint, radius / 2, color);
      // canvas.drawImage(planetImage, planetPoint, 0, radius, radius);
    });
  };

  renderUser(angle: number, isMovement: boolean) {
    const centerPoint = this.canvas.getCenterPoint();
    const size = 100;
    // this.canvas.drawImage(shuttleImage, centerPoint, angle - 0.9, size, size);

    if (isMovement) {
      this.canvas.drawImage(
        shuttleImageMove,
        centerPoint,
        angle - 0.9,
        size,
        size
      );
    } else {
      this.canvas.drawImage(shuttleImage, centerPoint, angle - 0.9, size, size);
    }
  }

  clear() {
    this.canvas.clearCanvas();
    const fillStyle = "#111";
    this.canvas.drawRect(fillStyle);

    // const { width, height } = canvas.getWH();
    // canvas.drawImage(bgImage, 0, 0, 0, width, height);
  }
}

export default Space;
