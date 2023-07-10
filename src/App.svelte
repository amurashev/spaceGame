<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { throttle } from "./utils";

  import { initialPositionStore } from "./store/point";
  import { starsStore } from "./store/stars";
  import { generateStars, starColor } from "./objects/stars";

  import type { Point } from "./types";

  let canvas;
  let ctx: CanvasRenderingContext2D;

  let isMounted = false;

  const MOVING_ANIMATION_TIME = 500;

  const getCanvasParams = () => {
    const { width, height } = ctx.canvas;

    return {
      width,
      height,
    };
  };

  const getScreenCenter = () => {
    const { width, height } = ctx.canvas;

    return {
      x: width / 2,
      y: height / 2,
    };
  };

  const getPointWithOffset = (point: Point) => {
    const { x: deltaX, y: deltaY } = $initialPositionStore;
    const { x: screenX, y: screenY } = getScreenCenter();

    const newX = point.x + screenX - deltaX;
    const newY = point.y + screenY - deltaY;

    return {
      x: newX,
      y: newY,
    };
  };

  const movePoint = (newPoint: Point) => {
    const iteractions = 50;
    let iteraction = 0;
  
    const { x, y } = newPoint;
    const { x: screenX, y: screenY } = getScreenCenter();
    const { x: initialX, y: initialY } = $initialPositionStore;

    const destinationPoint = {
      x: x * 2,
      y: y * 2,
    };

    const deltaX =  destinationPoint.x - screenX;
    const deltaY =  destinationPoint.y - screenY;

    function recursiveFunc() {
      initialPositionStore.set({
        x: initialX + (deltaX / iteractions) * iteraction,
        y: initialY + (deltaY / iteractions) * iteraction,
      });

      iteraction++;

      if (iteraction <= iteractions) {
        setTimeout(recursiveFunc, MOVING_ANIMATION_TIME / iteractions);
      }
    }

    recursiveFunc();
  };

  const onMouseClick = (e) => {
    const { offsetX, offsetY } = e;

    movePoint({ x: offsetX, y: offsetY });
  };

  // const onMouseMove = (e) => {
  //   const { offsetX, offsetY } = e;
  // };

  const clearCanvas = () => {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const renderUser = () => {
    const lightColor = "#3a86ff";
    const pixelRadius = 12;
    const { x, y } = getScreenCenter();

    // ctx.fillStyle = darkColor;
    // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, pixelRadius, 0, 2 * Math.PI, true);
    ctx.fillStyle = lightColor;
    ctx.fill();
  };

  const renderStars = () => {
    const stars = $starsStore;

    stars.forEach((item) => {
      const { size, point } = item;
      const { x, y } = getPointWithOffset(point);

      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI, true);
      ctx.fillStyle = starColor;
      ctx.fill();
    });
  };

  const render = () => {
    clearCanvas();
    renderUser();
    renderStars();
  };

  onMount(() => {
    isMounted = true;

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    starsStore.set(generateStars());

    initialPositionStore.set({
      x: 0,
      y: 0,
    });
  });

  initialPositionStore.subscribe(() => {
    if (isMounted) render();
  });
</script>

<main>
  <canvas
    bind:this={canvas}
    width="2000"
    height="1200"
    id="canvas"
    on:mousedown={onMouseClick}
  />
</main>

<style>
  #canvas {
    width: 1000px;
    height: 600px;
    background-color: #222;
  }
</style>
