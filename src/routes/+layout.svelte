<script lang="ts">
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import "../app.css";

  import Navigation from "../components/common/Navigation.svelte";
  import Header from "../components/common/Header.svelte";
  import { currentPage } from "../stores/currentPage";

</script>

<div class="page">
  <Navigation/>
  <div class="contents">
    <Header title={ $currentPage?.name ?? ""}/>
    <slot/>
  </div>
</div>

<style lang="css">
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
