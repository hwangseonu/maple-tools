<script lang="ts">
  import MobileNavigation from "./MobileNavigation.svelte";
  import {onMount} from "svelte";

  export let title: string;
  export let items: { name: string, path: string, image: string | undefined }[] = [];

  let showMenu: boolean = false;
  let isMobile: boolean = false;

  onMount(() => {
    isMobile = window.matchMedia("(max-width: 768px)").matches;
  })

  const openMenu = () => showMenu = true;
  const closeMenu = () => showMenu = false;
</script>

<header>
    <h1>{title}</h1>
    <button class="menu-button nostyle" on:click={openMenu}>
        <i class="fas fa-bars"></i>
    </button>
    {#if isMobile}
        <MobileNavigation show={showMenu} items={items} close={closeMenu}/>
    {/if}
</header>

<style>
    header {
        width: 100%;
        padding: 12px;
        margin-bottom: 24px;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
    }

    h1 {
        margin: 0;
        color: var(--text-secondary);
    }

    @media (max-width: 768px) {
        header {
            width: 100vw;
            background: var(--primary-color);
            margin-bottom: 0;
        }

        .menu-button {
            display: block;
        }
    }
</style>