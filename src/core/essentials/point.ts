class Point {
  x: number;
  y: number;

  static plus(p1: Point, p2: Point) {
    return {
      x: Number((p1.x + p2.x).toFixed(3)),
      y: Number((p1.y + p2.y).toFixed(3)),
    };
  }

  static minus(p1: Point, p2: Point) {
    return {
      x: Number((p1.x - p2.x).toFixed(3)),
      y: Number((p1.y - p2.y).toFixed(3)),
    };
  }

  static getAveragePoint(p1: Point, p2: Point) {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    }
  }

  static make(point: Point, operation: (x: number) => number) {
    return {
      x: operation(point.x),
      y: operation(point.y),
    };
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  // plus(p: Point) {
  //   return new Point(this.x + p.x, this.y + p.y);
  // }
  // minus(p: Point) {
  //   return new Point(this.x - p.x, this.y - p.y);
  // }
}

export default Point;
