<script lang="ts">
    import {SITE_NAV_ITEMS} from "../../stores/siteinfo";
    import type {NavItem} from "$lib/types";
    import {currentPage} from "../../stores/currentPage";

    function setCurrentPage(page: NavItem) {
        currentPage.set(page)
    }
</script>

<nav>
    {#each SITE_NAV_ITEMS as item}
        <a on:click={() => setCurrentPage(item)} href="{item.link}">
            <div class="item" class:selected={$currentPage.link === item.link}>
                {#if item.image !== undefined}
                    <img src={item.image} alt={item.name}/>
                {/if}
                {item.name}
            </div>
            <hr/>
        </a>
    {/each}
</nav>

<style>
    nav {
        position: sticky;
        top: 0;
        left: 0;
        min-width: 300px;
        height: 100vh;
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
        border: 1px solid var(--neutral-dark);
    }

    @media (max-width: 768px) {
        nav {
            display: none;
        }
    }
</style>
