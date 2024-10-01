<script lang="ts">
  import {createEventDispatcher} from "svelte";
  import bossList, {type BossDifficulty, type BossName} from "$lib/boss";
  import type {Character} from "$lib/types";

  export let character: Character;

  const dispatch = createEventDispatcher();

  $: boss = character.boss.map((b) => {
    return ({
      name: b.name,
      difficulty: b.difficulty,
      members: b.members,
      crystal: bossList.find(({name, difficulty}) => name == b.name && difficulty == b.difficulty)?.crystal ?? 0
    })
  })

  function onClick() {
    dispatch("click")
  }

</script>

<div role="button" tabindex="0" on:keydown={null} class="card" on:click={onClick}>
    <img src={character.image} alt="Character" class="card-image"/>
    <div class="card-content">
        <h2>{character.name}</h2>
        <div class="boss-list">
            {#each character.boss as boss}
                <div class="card-boss">
                    <img class="{boss.difficulty}" src="/assets/images/boss/{boss.name}.png" alt="Boss"/>
                    <p class="badge {boss.difficulty}">
                        {boss.difficulty[0].toUpperCase()}
                    </p>
                </div>
            {/each}
        </div>
        <div class="sum">
            <div class="crystal">
                <img src="/assets/images/crystal.png" alt="crystal"/>
                <span class="amount">{character.boss.length}개</span>
            </div>
            <div class="meso">
                <img src="/assets/images/meso.png" alt="meso"/>
                <span class="amount">{boss.reduce((acc, prev) => acc + prev.crystal / prev.members, 0).toLocaleString()} 메소</span>
            </div>
        </div>
    </div>
</div>

<style>
    .card {
        display: flex;
        align-items: center;
        background-color: var(--neutral-light);
        border-radius: 15px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        overflow: hidden;
        width: 500px; /* 가로 배열로 넓이가 넉넉하도록 설정 */
        padding: 20px;
        cursor: pointer;
    }

    .card-image {
        min-width: 80px; /* 이미지의 크기를 작게 조정 */
        min-height: 80px;
        max-width: 80px; /* 이미지의 크기를 작게 조정 */
        max-height: 80px;
        border-radius: 8px;
        margin-right: 15px; /* 이미지와 타이틀 사이 간격 */
        object-fit: cover; /* 이미지가 비율을 유지하며 잘리도록 설정 */
    }

    .card h2 {
        margin: 0;
        font-size: 1.25em;
        color: #333;
    }

    .card-content {
        padding: 10px 0;
        text-align: left;
        width: 100%;
    }

    .boss-list {
        display: flex;
        gap: 5px;
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
        height: 15px;
        line-height: 15px;
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

    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .sum {
        margin-top: 15px;
        display: flex;
        justify-content: end;
        gap:15px;
    }

    .sum .crystal, .sum .meso {
        display: flex;
        font-size: small;
        font-weight: bold;
    }

    .crystal img, .meso img {
        width: 15px;
        margin-right: 5px;
    }

    .crystal .amount, .meso .amount {
        margin-top: 2px;
    }
</style>
