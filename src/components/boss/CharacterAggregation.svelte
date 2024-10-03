<script lang="ts">
  import {createEventDispatcher} from "svelte";
  import type {Character} from "$lib/types";
  import {crystalSum} from "$lib/utils";

  export let characters: Character[];

  $: enabled = characters.filter((c) => c.toggle);
  $: aggregate = {
    crystal: {
      sum: enabled.reduce((prev, curr) => prev += crystalSum(curr), 0),
      count: enabled.reduce((prev, curr) => prev += curr.boss.length, 0),
      max: characters.reduce((prev, curr) => prev += curr.boss.length, 0),
    }
  }

  const dispatch = createEventDispatcher();

  function handleDisableAll() {
    dispatch('disableAll')
  }

</script>

<div class="wrapper">
    <div class="crystal">
        <img src="./assets/images/crystal.png" alt="crystal"/>
        <span>{aggregate.crystal.count} / {aggregate.crystal.max}</span>
    </div>
    <div class="meso">
        <img src="./assets/images/meso.png" alt="meso" />
        <span>{aggregate.crystal.sum.toLocaleString()} 메소</span>
    </div>
    <button type="button" on:click={handleDisableAll}>일괄 해제</button>
</div>

<style>
    .wrapper {
        background-color: var(--neutral-light);
        border-radius: 15px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        width: 180px;
        height: auto;
        display: flex;
        flex-direction: column;
        gap: 16px;
        float: left;
    }

    .crystal, .meso {
        display: flex;
        align-items: center;
        font-weight: bold;
    }

    .crystal img, .meso img {
        width: 24px;
        object-fit: contain;
        margin-right: 10px;
    }

</style>