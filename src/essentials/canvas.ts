import type { Point } from "types";

class Canvas {
  ctx: CanvasRenderingContext2D;
  scale = 1.0;
  offsetPoint = {
    x: 0,
    y: 0,
  }

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  setScale(scale: number) {
    this.scale = scale;
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
      x: width / 2 / this.scale,
      y: height / 2 / this.scale,
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

  drawCircle(point: Point, size, width, color) {
    this.ctx.beginPath();
    this.ctx.arc(
      point.x * this.scale,
      point.y * this.scale,
      size * this.scale,
      0,
      2 * Math.PI,
      true
    );
    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  drawCircleFill(point: Point, size, color) {
    this.ctx.beginPath();
    this.ctx.arc(
      point.x * this.scale,
      point.y * this.scale,
      size * this.scale,
      0,
      2 * Math.PI,
      true
    );
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  drawImage(img, point: Point, angle = 0, width, height) {
    this.ctx.save();

    // if (angle !== 0) {
    this.ctx.translate(
      point.x * this.scale, // + (img.width * scale) / 2,
      point.y * this.scale // + (img.height * scale) / 2
    );
    this.ctx.rotate(angle);
    this.ctx.translate(
      -point.x * this.scale - (width * this.scale) / 2,
      -point.y * this.scale - (height * this.scale) / 2
    );
    // }
    this.ctx.drawImage(
      img,
      point.x * this.scale, // - (img.width * scale) / 2,
      point.y * this.scale, // - (img.height * scale) / 2,
      width * this.scale,
      height * this.scale
    );

    this.ctx.restore();
  }
}

export default Canvas;
