import type Point from "./point";

class Canvas {
  ctx: CanvasRenderingContext2D;
  scale = 1.0;
  offsetPoint = {
    x: 0,
    y: 0,
  };

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  setScale(scale: number) {
    this.scale = scale;
  }

  getScale() {
    return this.scale
  }

  getWH() {
    const { width, height } = this.ctx.canvas;

    return {
      width,
      height,
    };
  }

  getCenterPoint() {
    const { width, height } = this.ctx.canvas;

    return {
      x: width / 2 / this.getScale(),
      y: height / 2 / this.getScale(),
    };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawRect(color = "#000") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  createLinearGradient(x1, y1, x2, y2) {
    return this.ctx.createLinearGradient(x1, y1, x2, y2);
  }

  drawArc(point: Point, size: number) {
    this.ctx.arc(
      point.x * this.getScale(),
      point.y * this.getScale(),
      size * this.getScale(),
      0,
      2 * Math.PI,
      true
    );
  }

  private _drawCircle(point: Point, size: number) {
    this.ctx.beginPath();
    this.ctx.arc(
      point.x * this.getScale(),
      point.y * this.getScale(),
      size * this.getScale(),
      0,
      2 * Math.PI,
      true
    );
  }

  drawCircle(point: Point, size: number, width: number, color: string) {
    this._drawCircle(point, size);
    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  drawCircleWithDashLine(
    point: Point,
    size: number,
    width: number,
    color: string,
    line: number[]
  ) {
    this._drawCircle(point, size);
    this.ctx.setLineDash(line);
    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  drawCircleFill(point: Point, size: number, color: string) {
    this._drawCircle(point, size);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  drawLine(
    point1: Point,
    point2: Point,
    color: string,
    width: number,
    line: number[]
  ) {
    // Start a new Path
    this.ctx.beginPath();
    this.ctx.moveTo(point1.x, point1.y);
    this.ctx.lineTo(point2.x, point2.y);
    this.ctx.strokeStyle = color;
    if (line) {
      this.ctx.setLineDash(line);
    }

    this.ctx.lineWidth = width;

    // Draw the Path
    this.ctx.stroke();
  }

  drawImage(img, point: Point, angle = 0, width, height) {
    this.ctx.save();

    // if (angle !== 0) {
    this.ctx.translate(
      point.x * this.getScale(), // + (img.width * scale) / 2,
      point.y * this.getScale() // + (img.height * scale) / 2
    );
    this.ctx.rotate(angle);
    this.ctx.translate(
      -point.x * this.getScale() - (width * this.getScale()) / 2,
      -point.y * this.getScale() - (height * this.getScale()) / 2
    );
    // }
    this.ctx.drawImage(
      img,
      point.x * this.getScale(), // - (img.width * scale) / 2,
      point.y * this.getScale(), // - (img.height * scale) / 2,
      width * this.getScale(),
      height * this.getScale()
    );

    this.ctx.restore();
  }
}

export default Canvas;
