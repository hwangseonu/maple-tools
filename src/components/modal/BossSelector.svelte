<script lang="ts">
  import Boss, {type BossDifficulty, type BossName} from "$lib/boss";
  import {type BossCrystal, emptyFunction} from "$lib/types";

  export let selected: BossCrystal[];
  const max = 12;

  type BossType = { name: BossName, difficulty: BossDifficulty }

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

    if (index !== -1) {
      let element = event.target as HTMLSelectElement;
      selected[index].members = Number(element.value);
    }
  }

  $: isSelectable = (boss: BossType): boolean => {
    if (isSelected(boss)) return true;
    if (selected.some((v) => v.name === boss.name)) return false;
    return selected.length < max;
  }

  $: isSelected = (boss: BossType): boolean => {
    return selected.some((value) => value.name === boss.name && value.difficulty === boss.difficulty);
  }

  $: getMembers = (boss:BossType): number => {
    return selected.find((value) => value.name === boss.name && value.difficulty === boss.difficulty)?.members ?? 1;
  }
</script>

<!-- 리스트 렌더링 -->
<div class="selectable-list">
    <p>{selected.length}/{max}</p>
    <ul class="list">
        {#each Boss as boss}
            <li class:selected={isSelected(boss)} class:unselectable={!isSelectable(boss)}>
                <div class="item"
                     role="button"
                     tabindex="0"
                     on:keydown={emptyFunction}
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
                            <select class="members"
                                    disabled={!isSelected(boss)}
                                    on:click|stopPropagation
                                    on:change={(event) => onChangeMembers(boss, event)}>
                                {#each Array(6).fill(0).map((_, i) => i + 1) as number}
                                    <option value={number} selected={getMembers(boss) === number}>{number}</option>
                                {/each}
                            </select>
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

    .list::-webkit-scrollbar-thumb {
        background-color: var(--accent-color); /* 스크롤바 색상 */
        border-radius: 10px; /* 모서리 둥글게 */
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
        justify-content: space-between;
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
        text-align: center;
        border: 2px solid var(--primary-color);
        border-radius: 5px;
        transition: border-color 0.3s;
    }

    .boss-crystal .members:focus {
        border-color: var(--secondary-color);
        outline: none;
    }
</style>
