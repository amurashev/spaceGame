<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function updateZoom(isPlus: boolean) {
    dispatch("updateZoom", {
      isPlus,
    });
  }

  // const zoomIn = () => {
  //   zoomStore.update((n) => round(n + increment));
  // };
  // const zoomOut = () => {
  //   zoomStore.update((n) => round(n - increment));
  // }
</script>

<div>
  <div>
    <!-- {#if $zoomStore}
      <strong>Zoom: {$zoomStore}</strong>
    {/if} -->

    <button on:click={() => updateZoom(true)}> + </button>

    <button on:click={() => updateZoom(false)}> - </button>
  </div>
</div>
