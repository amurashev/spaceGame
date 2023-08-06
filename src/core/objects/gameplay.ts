import { get, writable, type Writable } from "svelte/store";

import { Canvas, Point } from "core/essentials/index";

import type System from "./system";
import Player from "./player";
import { getIsPointInCircle } from "utils/trigonometry";

type Screen = "space" | "planet" | "porting";

class GamePlay {
  canvas: Canvas;
  povPoint: Point;
  system: System;
  player: Player;
  time: number;
  zoom: number;
  screen: Screen;
  screenStore: Writable<Screen>;

  constructor() {
    this.player = new Player();
    this.povPoint = new Point(300, 0);
    this.time = 0;
    this.zoom = 1;

    this.screen = "space";
    // this.screenStore = writable("space");
    // this.screenStore.subscribe((value) => {
    //     this.screen = value
    //     console.warn('test', value)
    // });
  }

  setCanvas = (canvas: Canvas) => (this.canvas = canvas);

  getPOV = () => this.povPoint;
  setPOV = (point: Point) => (this.povPoint = point);

  getSystem = () => this.system;
  setSystem = (system: System) => (this.system = system);

  getScreen = () => this.screen;
  setScreen = (screen: Screen) => {
    this.screen = screen
    return screen
  };
  // setScreen = (screen: Screen) => this.screenStore.set(screen);

  getZoom = () => this.zoom;
  updateZoom = (isPlus: boolean) => {

    const increment = 0.1;
    const round = (n: number) => Number(n.toFixed(3));
    const newZoom = isPlus ? round(this.zoom + increment) : round(this.zoom - increment) 
    this.zoom = newZoom

    this.canvas.setScale(newZoom); // TODO

    return newZoom
  };

  getPlayer = () => this.player;

  getTime = () => this.time;
  increaseTime = () => (this.time = this.time + 1);

  getOffsetToScreen = () =>
    Point.minus(this.canvas.getCenterPoint(), this.povPoint);

  getOffsetToWorld = () =>
    Point.minus(this.povPoint, this.canvas.getCenterPoint());

  getPointWithWorldOffset = (point: Point) =>
    Point.plus(point, this.getOffsetToWorld());

  getPointWithScreenOffset = (point: Point) =>
    Point.plus(point, this.getOffsetToScreen());

  render() {
    this.system.render(this.canvas, this);
    this.player.render(this.canvas, this);
  }

  getObjectForSelectedPoint(point: Point) {
    return this.system.getPlanets().find((planet) => {
      const planetPoint = planet.getPoint(this.getTime());
      const screenPoint = this.getPointWithWorldOffset(point);

      return getIsPointInCircle(screenPoint, planetPoint, planet.radius / 2);
    });
  }

  clear() {
    this.canvas.clearCanvas();
    const fillStyle = "#111";
    this.canvas.drawRect(fillStyle);

    // const { width, height } = canvas.getWH();
    // canvas.drawImage(bgImage, 0, 0, 0, width, height);
  }
}

export default GamePlay;
