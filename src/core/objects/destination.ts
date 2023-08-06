import type { Point } from "core/essentials";
import type Planet from "./planet";
import type { GamePlay } from ".";

class Destination {
  type: "space" | "planet";
  data?: Planet;
  gamePlay: GamePlay;
  point?: Point;

  constructor(
    gamePlay: GamePlay,
    type: Destination["type"],
    props: {
      data?: Destination["data"];
      point?: Destination["point"];
    }
  ) {
    const { data, point } = props;
    this.gamePlay = gamePlay;
    this.type = type;
    this.data = data;
    this.point = point;
  }

  getType() {
    return this.type
  }

  getPoint() {
    if (this.type === "space") {
      return this.point;
    }

    if (this.type === "planet") {
      const time = this.gamePlay.getTime();
      return this.data.getPoint(time);
    }
  }
}

export default Destination;
