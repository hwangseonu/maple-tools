<script lang="ts">
    import '@fortawesome/fontawesome-free/css/all.min.css'
    import "../app.css";
    import Navigation from "../components/common/Navigation.svelte";
    import Header from "../components/common/Header.svelte";
    import {onMount} from "svelte";

    let currentPath = "./";
    $: title = items.find((value) => value.path === currentPath)?.name ?? ""

    let items = [
      {name: "주간보스 결정", path: "./boss", image: "./assets/images/crystal.png"},
      {name: "설정", path: "./setting", image: undefined}
    ]

    onMount(() => {
      currentPath = "." + window.location.pathname;
    });
</script>

<div class="page">
    <Navigation items={items} bind:currentPath={currentPath}/>
    <div class="contents">
        <Header title={title}/>
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
</style>