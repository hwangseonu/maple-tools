<script lang="ts">
  import type { BossCrystal } from '$lib/types';

  export let boss: BossCrystal;
</script>

<div class="card-boss">
  <img
    class={ boss.difficulty }
    src="./assets/images/boss/{ boss.name }.png"
    alt="Boss"
  />
  <p class="badge { boss.difficulty }">
    { boss.difficulty[0].toUpperCase() }
  </p>
</div>

<style lang="css">
  img.easy {
    border: 2px solid var(--easy-border);
  }

  img.normal {
    border: 2px solid var(--normal-border);
  }

  img.hard {
    border: 2px solid var(--hard-border);
  }

  img.chaos {
    border: 2px solid var(--chaos-border);
  }

  img.extreme {
    border: 2px solid var(--extreme-border);
  }

  .badge {
    width: 29px;
    box-sizing: border-box;
    padding-top: 1px;
    font-size: xx-small;
    font-weight: bold;
    text-align: center;
  }

  .badge.easy {
    border: 2px solid var(--easy-border);
    background: var(--easy-background);
    color: var(--neutral-light);
  }

  .badge.normal {
    border: 2px solid var(--normal-border);
    background: var(--normal-background);
    color: var(--neutral-light);
  }

  .badge.hard {
    border: 2px solid var(--hard-border);
    background: var(--hard-background);
    color: var(--neutral-light);
  }

  .badge.chaos {
    border: 2px solid var(--chaos-border);
    background: var(--chaos-background);
    color: var(--chaos-border);
  }

  .badge.extreme {
    border: 2px solid var(--extreme-border);
    background: var(--extreme-background);
    color: var(--extreme-border);
  }
</style>