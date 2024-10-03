<script lang="ts">
  import {emptyFunction} from "$lib/types";

  export let checked: boolean;
</script>

<style>
    .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 28px;
    }

    /* Hidden default checkbox */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* Toggle background */
    .slider {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--neutral-dark);
        border-radius: 28px;
        cursor: pointer;
        transition: 0.4s;
    }

    /* Slider circle */
    .slider::before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        border-radius: 50%;
        transition: 0.4s;
    }

    /* Checked state */
    input:checked + .slider {
        background-color: var(--accent-color);
    }

    input:checked + .slider::before {
        transform: translateX(22px);
    }
</style>

<!-- Toggle switch component -->
<label class="switch">
    <input type="checkbox" bind:checked={checked} on:click|stopPropagation>
    <span role="button" tabindex="0" on:keydown={emptyFunction}
          class="slider"
          on:click|stopPropagation></span>
</label>
