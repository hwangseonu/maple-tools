<script lang="ts">
  import { flip } from 'svelte/animate';
  import {dragHandleZone, dragHandle, type DndEvent} from 'svelte-dnd-action';
  import type {Character} from "$lib/types";
  import CharacterCard from "./CharacterCard.svelte";
  import {createEventDispatcher} from "svelte";
  export let items: Character[];

  const flipDurationMs = 300;

  const dispatch = createEventDispatcher();

  function handleDndConsider(event: CustomEvent) {
    items = event.detail.items;
  }
  function handleDndFinalize(event: CustomEvent) {
    items = event.detail.items;
  }

  function handleClick(item: Character) {
    dispatch("click", { target: item })
  }
</script>

<style>
    .list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .list-item {
        display: flex;
    }

    .list-item {
        outline: none;
    }

    .handle {
        display: flex;
        align-items: center;
        padding: 10px;
        color: var(--text-primary);
    }
    
    @media (max-width: 768px) {
        .handle {
            display: none;
        }
    }
</style>

<div class="list"
         use:dragHandleZone={{items, flipDurationMs, dropTargetStyle: { outline: 'none' }}}
         on:consider={handleDndConsider}
         on:finalize={handleDndFinalize}>
    {#each items as item(item.id)}
        <div class="list-item" animate:flip="{{duration: flipDurationMs}}">
            <div class="handle" use:dragHandle>
                <i class="fas fa-bars"></i>
            </div>
            <CharacterCard character={item} bind:toggle={item.toggle} on:click={() => handleClick(item)}/>
        </div>
    {/each}
</div>