<script>
  import { povStore, timeStore, zoomStore } from "store/interface";
</script>

<div>
  <div>
    {#if $povStore}
      <strong>POV: {$povStore.x}:{$povStore.y}</strong>
    {/if}
  </div>
  <div>
    {#if $timeStore}
      <strong>Time: {$timeStore}</strong>
    {/if}
  </div>
  <div>
    {#if $zoomStore}
      <strong>Zoom: {$zoomStore}</strong>
    {/if}
  </div>
</div>
