<script lang="ts">
  import BossList from "$lib/bossList";

  const max = 12;
  let selectedItems: number[] = [];

  function toggleSelect(index: number): void {
    if (selectedItems.includes(index)) {
      selectedItems = selectedItems.filter(i => i !== index); // 선택 해제
    } else if (selectedItems.length < max) {
      selectedItems = [...selectedItems, index]; // 선택 추가
    } else {
      // ignore
    }
  }
</script>

<!-- 리스트 렌더링 -->
<div class="selectable-list">
    <p>{selectedItems.length}/{max}</p>
    <ul class="list">
        {#each BossList as item, index}
            <li class:selected={selectedItems.includes(index)}>
                <div class="item"
                     role="button"
                     tabindex="0"
                     on:keydown={null}
                     on:click={() => toggleSelect(index)}>

                    <div class="boss-type">
                        <img class="{item.difficulty}" src="/assets/images/boss/{item.name}.png" alt="boss"/>
                        <p class="boss-name">
                            {item.name}
                        </p>
                    </div>

                    <div class="boss-difficult">
                        <p class="badge {item.difficulty}">
                            {item.difficulty.toUpperCase()}
                        </p>
                    </div>

                    <div class="boss-crystal">
                        <img src="/assets/images/crystal.png" alt="crystal"/>
                        <p class="meso">{item.crystal.toLocaleString()} 메소</p>
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
        justify-content: center;
        align-items: center;
        font-size: small;
        font-weight: bold;
        width: 150px;
    }

    .boss-crystal img {
        width: 15px;
        margin-right: 5px;
    }

    .boss-crystal p {
        margin-top: 2px;
    }
</style>
