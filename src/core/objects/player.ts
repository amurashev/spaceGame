import { shuttleImage, shuttleImageMove } from "config/images";
import { type Canvas } from "core/essentials";
import { getAngle } from "utils/trigonometry";
import type Destination from "./destination";
import type { GamePlay } from ".";

class Player {
  size: number;
  lastAngle: number = 0;
  destinations: Destination[] = [];
  hostObject: string
  speed: number;

  constructor() {
    this.size = 60;
    this.speed = 100;
  }

  getFirstDestinationPoint = () => this.destinations[0];

  addDestination(point: Destination) {
    this.destinations = [...this.destinations, point];
  }

  removeFirstDestination() {
    this.destinations = this.destinations.slice(1);
  }

  setPoints(points: Destination[]) {
    this.destinations = [...points];
  }

  getHostObject = () => this.hostObject;
  setHostObject = (hostObject?: string) => (this.hostObject = hostObject);

  renderPath(canvas: Canvas, gamePlay: GamePlay) {
    const centerPoint = canvas.getCenterPoint();

    this.destinations.forEach((item, i) => {
      const itemPoint = item.getPoint();
      const pointWithOffset = gamePlay.getPointWithScreenOffset(itemPoint);

      let p1;
      let p2;

      if (i === 0) {
        const firstPointWithOffset = gamePlay.getPointWithScreenOffset(
          this.destinations[0].getPoint()
        );
        p1 = firstPointWithOffset;
        p2 = centerPoint;
      } else {
        const prevPointWithOffset = gamePlay.getPointWithScreenOffset(
          this.destinations[i - 1].getPoint()
        );
        p1 = pointWithOffset;
        p2 = prevPointWithOffset;
      }

      canvas.drawLine(p1, p2, "#fff", 4, [10, 30]);

      if (item.getType() === "space") {
        canvas.drawCircleFill(pointWithOffset, 8, "#4361ee");
      } else {
        canvas.drawCircleFill(pointWithOffset, 16, "#2a9d8f");
      }
    });
  }

  render(canvas: Canvas, gamePlay: GamePlay) {
    const { size } = this;
    const centerPoint = canvas.getCenterPoint();
    const fixAngle = Math.PI / 4;

    this.renderPath(canvas, gamePlay);
    const firstPoint = this.destinations[0];

    let isMoving = false;

    if (firstPoint) {
      isMoving = true;
      const destinationPointWithOffset = gamePlay.getPointWithScreenOffset(
        firstPoint.getPoint()
      );

      const angle = getAngle(
        destinationPointWithOffset.x - centerPoint.x,
        destinationPointWithOffset.y - centerPoint.y
      );

      if (!isNaN(angle)) {
        this.lastAngle = angle;
      }
    }

    canvas.drawImage(
      isMoving ? shuttleImageMove : shuttleImage,
      centerPoint,
      this.lastAngle - fixAngle,
      size,
      size
    );
  }
}

export default Player;
