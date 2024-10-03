<script lang="ts">
  import {onMount} from "svelte";
  import type {Setting} from "$lib/types";

  let setting: Setting = {
    NEXON_API_URL: "",
    NEXON_API_TOKEN: "",
  };

  onMount(() => {
    const saved = localStorage.getItem("setting") ?? "";
    setting = JSON.parse(saved)
  })

  function handleSubmit(event: SubmitEvent) {
    localStorage.setItem('setting', JSON.stringify(setting))
  }
</script>

<div class="setting-form">
    <form on:submit={handleSubmit}>
        <div>
            <h2>넥슨 OPEN API</h2>
            <div>
                <label for="nexon-api-url">URL: </label>
                <input id="nexon-api-url" bind:value={setting.NEXON_API_URL}/>
            </div>
            <div>
                <label for="nexon-api-token">API KEY: </label>
                <input id="nexon-api-token" bind:value={setting.NEXON_API_TOKEN}/>
            </div>
        </div>
        <button type="submit">저장</button>
    </form>
</div>

<style>

</style>