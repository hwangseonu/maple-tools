<script lang="ts">
  import BossList, {type BossDifficulty, type BossName, type BossType} from "$lib/bossList";

  type SelectedBoss = {
    name: BossName,
    difficulty: BossDifficulty,
    members: number
  }
  export let selected: SelectedBoss[];

  const max = 12;

  function toggleSelect(boss: BossType): void {
    if (!isSelectable(boss)) return;

    if (isSelected(boss)) {
      selected = selected.filter((value) => value.name !== boss.name || value.difficulty !== boss.difficulty)
    } else {
      selected = [...selected, {name: boss.name, difficulty: boss.difficulty, members: 1}];
    }
  }

  function onChangeMembers(boss: BossType, event: Event) {
    let index = selected.findIndex((value) => value.name === boss.name && value.difficulty === boss.difficulty);

    if(index !== -1) {
      let element = event.target as HTMLInputElement;
      selected[index].members = element.valueAsNumber;
    }
  }

  $: isSelectable = (boss: BossType): boolean => {
    if (isSelected(boss)) return true;
    if (selected.some((v) => v.name === boss.name)) return false;
    return selected.length < max;
  }

  $: isSelected = (boss: { name: BossName, difficulty: BossDifficulty }): boolean => {
    return selected.some((value) => value.name === boss.name && value.difficulty === boss.difficulty);
  }

  $: getMembers = (boss: { name: BossName, difficulty: BossDifficulty }): number => {
    return selected.find((value) => value.name === boss.name && value.difficulty === boss.difficulty)?.members ?? 1;
  }
</script>

<!-- 리스트 렌더링 -->
<div class="selectable-list">
    <p>{selected.length}/{max}</p>
    <ul class="list">
        {#each BossList as boss}
            <li class:selected={isSelected(boss)} class:unselectable={!isSelectable(boss)}>
                <div class="item"
                     role="button"
                     tabindex="0"
                     on:keydown={null}
                     on:click={() => toggleSelect(boss)}>

                    <div class="boss-type">
                        <img class="{boss.difficulty}" src="/assets/images/boss/{boss.name}.png" alt="boss"/>
                        <p class="boss-name">
                            {boss.name}
                        </p>
                    </div>

                    <div class="boss-difficult">
                        <p class="badge {boss.difficulty}">
                            {boss.difficulty.toUpperCase()}
                        </p>
                    </div>

                    <div class="boss-crystal">
                        <div class="crystal">
                            <img src="/assets/images/crystal.png" alt="crystal"/>
                            <input class="members" type="number" value={getMembers(boss)}
                                   on:input={(event) => onChangeMembers(boss, event)}/>
                        </div>
                        <p class="meso">{boss.crystal.toLocaleString()} 메소</p>
                    </div>

                </div>
            </li>
        {/each}
    </ul>
</div>

<style>
    .list {
        color: var(--text-secondary);
        overflow-y: scroll;
        height: 500px;
    }

    .item {
        display: flex;
        justify-content: space-between;
    }

    .selected {
        background-color: var(--primary-color);
    }

    .unselectable {
        opacity: 50%;
    }

    li.selected:hover {
        background-color: var(--secondary-color);
    }

    li:not(.selected):hover {
        background: var(--neutral-dark);
    }

    .boss-type {
        display: flex;
        width: 180px;
    }

    .boss-name {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;
    }

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
        width: 75px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: small;
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

    .boss-crystal {
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: small;
        font-weight: bold;
        width: 180px;
    }

    .boss-crystal img {
        width: 15px;
        margin-right: 5px;
    }

    .boss-crystal .crystal {
        display: flex;
    }

    .boss-crystal .members {
        width: 20px;
        text-align: center;
    }
</style>
