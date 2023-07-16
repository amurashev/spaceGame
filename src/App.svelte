<script lang="ts">
  import { onMount } from "svelte";

  import Canvas from "essentials/canvas";
  import { MOVING_ANIMATION_TIME, ANIMATION_INTERACTIONS } from "config";
  import { getAngle, getIsPointInCircle } from "utils/trigonometry";
  import { throttle, recursiveFunc } from "utils/functions";

  import {
    isMovementStore,
    zoomStore,
    timeStore,
    povStore,
    angleStore,
  } from "store/interface";
  // import { generateStars } from "objects/stars";
  // import {
  //   getDeltaAngle,
  //   getPlanetPoint,
  // } from "objects/planets";

  import type { Point } from "types";

  import Zoom from "components/Zoom.svelte";
  import Instruments from "components/Instruments.svelte";
  import { Space, System } from "objects/index";

  let canvasEl;
  let canvas: Canvas;
  let space: Space;

  let isMounted = false;

  const getCorrectClickPoint = (e) => {
    const { offsetX, offsetY } = e;

    return {
      x: offsetX * 2,
      y: offsetY * 2,
    };
  };

  // const getPointWithOffset = (point: Point) => {
  //   const { x: deltaX, y: deltaY } = $povStore;
  //   const { x: screenX, y: screenY } = canvas.getCenterPoint();

  //   return {
  //     x: point.x + screenX - deltaX,
  //     y: point.y + screenY - deltaY,
  //   };
  // };

  const movePoint = (newPoint: Point) => {
    const { x: screenX, y: screenY } = canvas.getCenterPoint();
    const { x: initialX, y: initialY } = $povStore;

    const deltaX = newPoint.x - screenX;
    const deltaY = newPoint.y - screenY;
    const angle = getAngle(deltaX, deltaY);

    isMovementStore.set(true);
    angleStore.set(angle);

    recursiveFunc(
      (i) => {
        if (i === ANIMATION_INTERACTIONS) {
          isMovementStore.set(false);
        }

        const newPOV = {
          x: Math.ceil(initialX + (deltaX / ANIMATION_INTERACTIONS) * i),
          y: Math.ceil(initialY + (deltaY / ANIMATION_INTERACTIONS) * i),
        };

        povStore.set(newPOV);
        space.setPOV(newPOV);
      },
      MOVING_ANIMATION_TIME,
      ANIMATION_INTERACTIONS
    );
  };

  const onMouseClick = (e) => {
    const clickPoint = getCorrectClickPoint(e);

    if (!$isMovementStore) {
      movePoint(clickPoint);
    }

    // const planets = $planetsStore;
    // const cross = planets.find((item) => {
    //   const dAngle = getDeltaAngle(item, $timeStore);
    //   const planetPoint = getPointWithOffset(getPlanetPoint(item, dAngle));

    //   return getIsPointInCircle(clickPoint, planetPoint, item.radius / 2);
    // });

    // console.warn("onMouseClick", cross);
  };

  const onMouseMove = (e) => {
    const clickPoint = getCorrectClickPoint(e);
    // const planets = $planetsStore;

    // const cross = planets.find((item) => {
    //   const dAngle = getDeltaAngle(item, $timeStore);
    //   const planetPoint = getPointWithOffset(getPlanetPoint(item, dAngle));

    //   return getIsPointInCircle(clickPoint, planetPoint, item.radius / 2);
    // });

    // if (cross) {
    //   canvasEl.style.cursor = "pointer";
    // } else {
    //   canvasEl.style.cursor = "default";
    // }
  };

  const render = () => {
    space.clear();
    space.renderStars();
    space.renderSun();
    space.renderPlanets($timeStore);
    space.renderUser($angleStore, $isMovementStore);
    // console.warn('render')
  };

  onMount(() => {
    isMounted = true;

    canvas = new Canvas(canvasEl.getContext("2d"));
    space = new Space(canvas);

    space.setPOV($povStore);
    space.setSystem(new System(5000));

    setInterval(() => {
      render();
    }, 1000 / 30);

    setInterval(() => {
      // timeStore.update((t) => t + 1);
    }, 100);
  });

  // povStore.subscribe(() => {
  //   if (isMounted) render();
  // });

  // timeStore.subscribe(() => {
  //   if (isMounted) render();
  // });

  zoomStore.subscribe((value) => {
    if (isMounted) canvas.setScale(value);
  });
</script>

<main>
  <canvas
    bind:this={canvasEl}
    width="2000"
    height="1200"
    id="canvas"
    on:mousedown={onMouseClick}
    on:mousemove={throttle(onMouseMove, 100)}
  />

  <Instruments />
  <Zoom />
</main>

<style>
  #canvas {
    width: 1000px;
    height: 600px;
  }
</style>
