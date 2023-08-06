<script lang="ts">
  import { onMount } from "svelte";

  import { Canvas, Point } from "core/essentials/index";
  import { System, GamePlay } from "core/objects/index";
  import { MOVING_ANIMATION_TIME, ANIMATION_INTERACTIONS } from "config";
  import { throttle, recursiveFunc } from "utils/functions";

  import Instruments from "components/Instruments.svelte";
  import PlanetView from "components/Planet.svelte";
  import Destination from "core/objects/destination";
  import { getIsPointInCircle } from "utils/trigonometry";

  let canvasEl;
  let gamePlay: GamePlay;

  let isMounted = false;
  let isMovement = false;

  gamePlay = new GamePlay();
  gamePlay.setSystem(new System(5000));

  /**
   * Dynamic vars
   */
  $: screen = gamePlay.getScreen();
  $: zoom = gamePlay.getZoom();

  const getCorrectClickPoint = (e) => {
    const { offsetX, offsetY } = e;

    return {
      x: offsetX * 2,
      y: offsetY * 2,
    };
  };

  const playerMovement = (destination: Destination) => {
    const deltaPoint = Point.minus(destination.getPoint(), gamePlay.getPOV());

    recursiveFunc(
      (i) => {
        const deltaOfAnimation = Point.make(
          deltaPoint,
          (n) => (n / ANIMATION_INTERACTIONS) * 1
        );

        const newPOV = Point.plus(gamePlay.getPOV(), deltaOfAnimation);

        if (i === ANIMATION_INTERACTIONS) {
          gamePlay.getPlayer().removeFirstDestination();
          const nextPoint = gamePlay.getPlayer().getFirstDestinationPoint();

          if (nextPoint) {
            playerMovement(nextPoint);
          } else {
            isMovement = false;
          }

          if (destination.data) {
            // selectedObjectIdStore.set(destination.data.id);
            gamePlay.getPlayer().setHostObject(destination.data.id);
            screen = gamePlay.setScreen("planet");
          }
        } else {
          gamePlay.setPOV(newPOV);
        }
      },
      MOVING_ANIMATION_TIME,
      ANIMATION_INTERACTIONS
    );
  };

  const onMouseClick = (e) => {
    const clickPoint = getCorrectClickPoint(e);

    const crossObjects = gamePlay.getObjectForSelectedPoint(clickPoint);
    const destinationPoint = gamePlay.getPointWithWorldOffset(clickPoint);

    let newDestination;

    if (crossObjects) {
      newDestination = new Destination(gamePlay, "planet", {
        data: crossObjects,
      });
    } else {
      newDestination = new Destination(gamePlay, "space", {
        point: destinationPoint,
      });
    }

    const sunPoint = gamePlay.getSystem().getStar().getPoint();

    const isIncluded = getIsPointInCircle(
      destinationPoint,
      sunPoint,
      gamePlay.getSystem().getRadius()
    );

    if (isIncluded) {
      gamePlay.getPlayer().addDestination(newDestination);

      if (!isMovement && newDestination) {
        isMovement = true;

        playerMovement(newDestination);
      }
    }
  };

  const onMouseMove = (e) => {
    const clickPoint = getCorrectClickPoint(e);
    const crossObjects = gamePlay.getObjectForSelectedPoint(clickPoint);

    if (crossObjects) {
      canvasEl.style.cursor = "pointer";
    } else {
      canvasEl.style.cursor = "default";
    }
  };

  const render = () => {
    gamePlay.clear();
    gamePlay.render();

    // console.warn('render', isMounted, canvas, space)
  };

  onMount(() => {
    isMounted = true;

    gamePlay.setCanvas(new Canvas(canvasEl.getContext("2d")));

    setInterval(() => {
      render();
    }, 1000 / 30);

    setInterval(() => {
      gamePlay.increaseTime();
      // render();
    }, 100);
  });

  const onPlanetLeave = () => {
    const hostObjectId = gamePlay.getPlayer().getHostObject();
    const planets = gamePlay.getSystem().getPlanets();

    const hostObject = planets.find((item) => item.id === hostObjectId);
    if (hostObject) {
      const hostObjectPoint = hostObject.getPoint(gamePlay.getTime());
      gamePlay.getPlayer().setHostObject()
      gamePlay.setPOV(hostObjectPoint);
    }
  
    screen = gamePlay.setScreen("space");

    setTimeout(() => {
      gamePlay.setCanvas(new Canvas(canvasEl.getContext("2d")));
    }, 50);
  };

  const onZoonUpdate = (data) => {
    zoom = gamePlay.updateZoom(data.detail.isPlus);
  };
</script>

<main>
  <div>
    <!-- <div>{screen} {zoom}</div> -->
    {#if screen === "space"}
      <canvas
        bind:this={canvasEl}
        width="2000"
        height="1200"
        id="canvas"
        on:mousedown={onMouseClick}
        on:mousemove={throttle(onMouseMove, 100)}
      />
      <Instruments on:updateZoom={onZoonUpdate} />
    {/if}

    {#if screen === "planet"}
      <PlanetView on:message={onPlanetLeave} />
    {/if}
  </div>
</main>

<style>
  #canvas {
    width: 1000px;
    height: 600px;
  }
</style>
