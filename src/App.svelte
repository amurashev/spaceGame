<script lang="ts">
  import { onMount } from "svelte";

  import Canvas from "essentials/canvas";
  import { MOVING_ANIMATION_TIME } from "config";

  import { initialPositionStore } from "./store/point";
  import { starsStore, planetsStore } from "./store/objects";
  import { angleStore } from "./store/angle";
  import { isMovementStore, zoomStore, timeStore } from "./store/interface";
  import { generateStars, starColor } from "./objects/stars";

  import type { Point } from "./types";
  import { getAngleBetweenVectors } from "utils/trigonometry";
  import { recursiveFunc } from "utils/bases";

  import Zoom from "Zoom.svelte";
  import { generatePlanets } from "objects/planets";

  let canvasEl;
  let canvas: Canvas;

  let isMounted = false;

  const shuttleImage = new Image();
  const planetImage = new Image();
  const bgImage = new Image();

  shuttleImage.src = "/space-shuttle.svg";
  planetImage.src = "/planet2.svg";
  bgImage.src = "/space2.jpg";

  planetImage.onload = function () {
    // render();
  };

  shuttleImage.onload = function () {
    // render();
  };

  bgImage.onload = function () {
    // render();
  };

  const getPointWithOffset = (point: Point) => {
    const { x: deltaX, y: deltaY } = $initialPositionStore;
    const { x: screenX, y: screenY } = canvas.getCenterPoint();

    return {
      x: point.x + screenX - deltaX,
      y: point.y + screenY - deltaY,
    };
  };

  const movePoint = (newPoint: Point) => {
    const AIMATION_INTERACTIONS = 50;

    const { x, y } = newPoint;
    const { x: screenX, y: screenY } = canvas.getCenterPoint();
    const { x: initialX, y: initialY } = $initialPositionStore;

    const destinationPoint = {
      x: x * 2,
      y: y * 2,
    };

    const deltaX = destinationPoint.x - screenX;
    const deltaY = destinationPoint.y - screenY;

    let angle = getAngleBetweenVectors(1, 0, 1, deltaX / deltaY);

    if (deltaX > 0 && deltaY < 0) angle = angle;
    if (deltaX > 0 && deltaY > 0) angle = Math.PI - angle;
    if (deltaX < 0 && deltaY > 0) angle = Math.PI + angle;
    if (deltaX < 0 && deltaY < 0) angle = 2 * Math.PI - angle;

    isMovementStore.set(true);
    angleStore.set(angle);

    recursiveFunc(
      (i) => {
        if (i === AIMATION_INTERACTIONS) {
          isMovementStore.set(false);
        }

        initialPositionStore.set({
          x: Math.ceil(initialX + (deltaX / AIMATION_INTERACTIONS) * i),
          y: Math.ceil(initialY + (deltaY / AIMATION_INTERACTIONS) * i),
        });
      },
      MOVING_ANIMATION_TIME,
      AIMATION_INTERACTIONS
    );
  };

  const onMouseClick = (e) => {
    const { offsetX, offsetY } = e;

    if (!$isMovementStore) {
      movePoint({ x: offsetX, y: offsetY });
    }
  };

  const renderUser = () => {
    const { x, y } = canvas.getCenterPoint();
    const size = 56;
    canvas.drawImage(shuttleImage, x, y, $angleStore, size, size);

    if ($isMovementStore) {
      canvas.drawCircle(x, y, 60, 3, starColor);
    }
  };

  const renderSun = () => {
    const sunPoint = getPointWithOffset({ x: 0, y: 0 });
    const radius = 60;
    const linear = canvas.createLinearGradient(
      sunPoint.x - radius,
      sunPoint.y + radius,
      sunPoint.x + radius * 2,
      sunPoint.y + radius
    );
    linear.addColorStop(0, "#b02e03");
    linear.addColorStop(1, "#fd9000");

    canvas.drawCircleFill(
      sunPoint.x,
      sunPoint.y,
      radius * 2,
      linear
    );
  };

  const renderPlanets = () => {
    const planets = $planetsStore;

    planets.forEach((item) => {
      const { distanceFromSun, speed, size, type, initialAngle } = item
      const rad = 1420; // Math.PI / (180 * 8)
      const dAngle = 2 * Math.PI / (360 * speed) * $timeStore
      const planetX = distanceFromSun * Math.cos(initialAngle + dAngle);
      const planetY = distanceFromSun * Math.sin(initialAngle + dAngle);
      const sunPoint = getPointWithOffset({ x: 0, y: 0 });

      const planetPoint = getPointWithOffset({ x: planetX, y: planetY });
      canvas.drawCircleFill(
        planetPoint.x,
        planetPoint.y,
        size / 2,
        "#222"
      );
      canvas.drawCircle(sunPoint.x, sunPoint.y, distanceFromSun, 1, "#555");
      canvas.drawImage(
        planetImage,
        planetPoint.x,
        planetPoint.y,
        0,
        size,
        size
      );
    });
  };

  const renderStars = () => {
    const stars = $starsStore;

    stars.forEach((item) => {
      const { size, point } = item;
      const { x, y } = getPointWithOffset(point);

      canvas.drawCircleFill(x, y, size, starColor);
    });
  };

  const render = () => {
    canvas.clearCanvas();
    const fillStyle = "#111";
    canvas.drawRect(fillStyle);

    const { width, height } = canvas.getWH()

    // canvas.drawImage(bgImage, 0, 0, 0, width, height);

    renderStars();
    renderSun();
    renderPlanets();
    renderUser();

    // console.warn('render')
  };

  onMount(() => {
    isMounted = true;

    canvas = new Canvas(canvasEl.getContext("2d"));

    starsStore.set(generateStars());
    planetsStore.set(generatePlanets());

    console.warn("generatePlanets()", generatePlanets());

    initialPositionStore.set({
      x: 0,
      y: 0,
    });

    setInterval(() => {
      timeStore.update((t) => t + 1);
    }, 100);
  });

  initialPositionStore.subscribe(() => {
    if (isMounted) render();
  });

  timeStore.subscribe(() => {
    if (isMounted) render();
  });

  zoomStore.subscribe((value) => {
    if (isMounted) canvas.setScale(value)
  });
</script>

<main>
  <canvas
    bind:this={canvasEl}
    width="2000"
    height="1200"
    id="canvas"
    on:mousedown={onMouseClick}
  />
  <div>
    <div>
      {#if $initialPositionStore}
        <strong>{$initialPositionStore.x}:{$initialPositionStore.y}</strong>
      {/if}
    </div>
    <div>
      {#if $timeStore}
        <strong>{$timeStore}</strong>
      {/if}
    </div>
  </div>

  <Zoom />
</main>

<style>
  #canvas {
    width: 1000px;
    height: 600px;
  }
</style>
