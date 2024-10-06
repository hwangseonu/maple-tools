<script lang="ts">
  import {emptyFunction} from "$lib/types";

  export let items: { name: string, path: string, image: string | undefined }[] = [];
  export let currentPath = "/";

  export let show: boolean
  export let close: () => void

  function setCurrentPath(path: string) {
    currentPath = path;
  }
</script>

<div class="mobile-navigation" class:show={show} on:click={close} role="button" tabindex="0" on:keydown={emptyFunction}>
    <div class="nav" on:click|stopPropagation role="button" tabindex="0" on:keydown={emptyFunction}>
        {#each items as item, index}
            <a on:click={() => setCurrentPath(item.path)} href={item.path}>
                <div class="item" class:selected={currentPath === item.path}>
                    {#if item.image !== undefined}
                        <img src={item.image} alt={item.name}/>
                    {/if}
                    {item.name}

                </div>
                <hr/>
            </a>
        {/each}
    </div>
</div>

<style>
    .mobile-navigation {
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        display: none;
    }

    .show {
        display: block;
    }

    .nav {
        width: 100vw;
        padding: 16px;
        box-sizing: border-box;
        background: var(--neutral-light);
    }

    a {
        text-decoration: none;
        color: var(--text-primary);
    }

    .item {
        height: 62px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px;
        box-sizing: border-box;
        border-radius: 15px;
        transition: background-color 0.3s ease;
        font-weight: bold;
    }

    .item img {
        width: 30px;
        height: 30px;
        object-fit: cover;
        margin-right: 10px;
    }

    .item:hover {
        background: var(--neutral-dark);
    }

    .selected {
        background: var(--neutral-dark);
        color: var(--text-secondary);
    }

    hr {
        border: 1px solid var(--neutral-dark)
    }
</style>