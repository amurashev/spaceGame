<script lang="ts">
  import { zoomStore } from "store/interface";

  const increment = 0.1;
  const round = (n: number) => Number(n.toFixed(3));

  const zoomIn = () => {
    zoomStore.update((n) => round(n + increment));
  };
  const zoomOut = () => {
    zoomStore.update((n) => round(n - increment));
  };
</script>

<button on:click={zoomIn}> + </button>

<button on:click={zoomOut}> - </button>
