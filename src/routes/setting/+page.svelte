<script lang="ts">
  import { nexon } from '../../stores/nexon';

  let options = {
    nexon: {
      apiUrl: $nexon.NEXON_API_URL,
      apiKey: $nexon.NEXON_API_TOKEN,
    }
  }

  function handleSubmit() {
    nexon.set({
      NEXON_API_URL: options.nexon.apiUrl,
      NEXON_API_TOKEN: options.nexon.apiKey
    })
  }

</script>

<div class="setting-form">
  <form on:submit={handleSubmit}>
    <div class="form-wrapper">
      <h2>넥슨 OPEN API</h2>
      <div class="form-input">
        <label for="nexon-api-url">URL: </label>
        <input id="nexon-api-url" bind:value={options.nexon.apiUrl}/>
      </div>
      <div class="form-input">
        <label for="nexon-api-token">API KEY: </label>
        <input id="nexon-api-token" bind:value={options.nexon.apiKey}/>
      </div>
    </div>
    <button type="submit">저장</button>
  </form>
</div>

<style lang="css">
  h2 {
    margin: 0;
  }

  .form-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  button[type="submit"] {
    margin-top: 16px;
  }
</style>