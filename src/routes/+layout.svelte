<script lang="ts">
    import "@fortawesome/fontawesome-free/css/all.min.css";
    import "../app.css";
    import Navigation from "../components/common/Navigation.svelte";
    import Header from "../components/common/Header.svelte";
    import { onMount } from "svelte";
    import { base } from "$app/paths";

    let currentPath = "/";
    $: title = items.find((value) => value.path === currentPath)?.name ?? "";

    let items = [
        {
            name: "주간보스 결정",
            path: "/boss",
            image: "./assets/images/navigation/crystal.png",
        },
        {
            name: "룰렛",
            path: "/roulette",
            image: "./assets/images/navigation/crystal.png",
        },
        {
            name: "메이플지지",
            path: "https://maple.gg/",
            image: "./assets/images/navigation/maplegg.png",
        },
        {
            name: "환산주스탯",
            path: "https://maplescouter.com/",
            image: "./assets/images/navigation/maplescouter.png",
        },
        {
            name: "설정",
            path: "/setting",
            image: "./assets/images/navigation/setting.png",
        },
    ];

    onMount(() => {
        currentPath = window.location.pathname.replace(base, "/")
    })
</script>

<div class="page">
    <Navigation {items} {currentPath}/>
    <div class="contents">
        <Header {title} {items} />
        <slot />
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
