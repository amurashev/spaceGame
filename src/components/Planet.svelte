<script lang="ts">

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

function leavePlanet() {
  dispatch('message');
}
  
</script>

<div>
  <h1>Planet</h1>

  <button on:click={leavePlanet}>Leave Planet</button>
</div>
