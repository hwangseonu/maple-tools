<script lang="ts">
    import "@fortawesome/fontawesome-free/css/all.min.css";
    import "../app.css";
    import Navigation from "../components/common/Navigation.svelte";
    import Header from "../components/common/Header.svelte";
    import {onMount} from "svelte";
    import {currentPage} from "../stores/currentPage";
    import {browser} from "$app/environment";
    import {SITE_NAV_ITEMS} from "../stores/siteinfo";

    onMount(() => {
        if (browser) {
            // eslint-disable-next-line no-undef
            const pathname = "./" + window.location.pathname.split("/").pop()
            const item = SITE_NAV_ITEMS.find(item => item.link === pathname)

            if (item) currentPage.set(item)
        }
    })
</script>

<div class="page">
    <Navigation/>
    <div class="contents">
        <Header title={ $currentPage.name }/>
        <slot/>
    </div>
</div>

<style>
    .page {
        display: flex;
    }

    .contents {
        padding: 10px;
    }

    @media (max-width: 768px) {
        .contents {
            padding: 0;
        }
    }
</style>
