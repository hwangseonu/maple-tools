<script lang="ts">
  import { mapleJobs } from "$lib/jobs";
  import { onMount } from "svelte";
    import Wheel from "../../components/roulette/Wheel.svelte";

  let count: { [key: string]: number } = {};
  $: items = Object.fromEntries(Object.entries(count).filter(([key, value]) => value > 0));

  onMount(() => {
    mapleJobs.forEach((item) => count[item] = 0);
  });
</script>

<div class="wrapper">
  <div class="roulette-container">
    {#each mapleJobs as job}
      <div class="roulette-item">
        {job}
        <div class="count-container">
          <button class="minus-button" on:click={() => count[job] > 0 ? count[job]-- : undefined}>-</button>
          <input type="number" class="count-input" bind:value={count[job]} />
          <button class="plus-button" on:click={() => count[job]++}>+</button>
        </div>
      </div>
    {/each}
  </div>
  <Wheel items={items} />
</div>

<style>
  .roulette-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    column-gap: 32px;
    row-gap: 12px;
  }

  .roulette-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .count-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 12px;
  }

  .count-input {
    width: 50px;
    text-align: center;
  }

  .minus-button {
    background-color: var(--hard-background);
    color: var(--neutral-light)
  }
</style>
