<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { type Character } from "$lib/types";
  import { crystalSum } from "$lib/utils";
  import ToggleSwitch from "../common/ToggleSwitch.svelte";
  import BossBadge from './BossBadge.svelte';

  export let character: Character;
  export let toggle: boolean;
  const dispatch = createEventDispatcher();

  function onClick() {
    dispatch("click");
  }
</script>

<div
  class="card"
  role="button"
  tabindex="0"
  on:keydown={ onClick }
  on:click={ onClick }
>
  <img class="character-image" src={ character.image } alt="Character"/>
  <h2 class="character-name">{ character.name }</h2>
  <div class="boss-list">
    {#each character.boss as boss}
      <BossBadge boss={ boss }/>
    {/each}
  </div>
  <div class="crystal-sum">
    <div class="crystal">
      <img src="./assets/images/crystal.png" alt="crystal"/>
      <span class="amount">{ character.boss.length }개</span>
    </div>
    <div class="meso">
      <img src="./assets/images/meso.png" alt="meso"/>
      <span class="amount">{ crystalSum(character).toLocaleString() } 메소</span>
    </div>
    <div class="toggle">
      <ToggleSwitch bind:checked={ toggle }/>
    </div>
  </div>
</div>

<style>
  .card {
    display: grid;
    grid-template-rows: 1fr 3fr;
    grid-template-columns: 100px 1fr;
    gap: 15px;
    background-color: var(--neutral-light);
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 550px;
    padding: 20px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .card {
      width: 100%;
    }
  }

  .character-image {
    height: 100%;
    width: 100%;
    object-fit: contain;
    object-position: center;
    grid-row: span 3;
  }

  .character-name {
    margin: 0;
    font-size: 1.25em;
    color: #333;
  }

  .boss-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(29px, 1fr));
    gap: 5px;
    min-height: 53px;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .crystal-sum {
    display: grid;
    justify-items: end;
    grid-template-columns: 1fr 80px;
    grid-template-rows: 1fr 1fr;
    justify-content: end;
    align-items: center;
  }

  .crystal-sum .crystal, .crystal-sum .meso {
    display: flex;
    align-items: center;
    font-size: small;
    font-weight: bold;
  }

  .crystal-sum .toggle {
    grid-row: 1 / span 2;
    grid-column: 2 / span 1;
  }

  .crystal-sum img {
    width: 15px;
    object-fit: contain;
    margin-right: 5px;
  }
</style>
