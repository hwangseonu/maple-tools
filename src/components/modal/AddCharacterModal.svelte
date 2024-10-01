<script lang="ts">
  import SelectableList from "./BossSelector.svelte";
  import type {BossDifficulty, BossName} from "$lib/bossList";

  type SelectedBoss = {
      name: BossName,
      difficulty: BossDifficulty,
      members: number
  }

  let name: string = '';
  let selected: SelectedBoss[] = [];

  export let isOpen: boolean = false; // 모달 열림 상태
  $: if (!isOpen) { // 모달이 닫히면 값을 초기화
    name = "";
    selected = [];
  }

  export let onClose: () => void;

  function handleSubmit() {
    onClose(); // 모달 닫기
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key == "Escape") {
      onClose();
      return;
    }
  }
</script>

{#if isOpen}
    <div class="modal-overlay" on:click={onClose} role="button" tabindex="0" on:keydown={onKeydown}>
        <div class="modal" on:click|stopPropagation role="button" tabindex="0" on:keydown={null}>
            <form on:submit|preventDefault={handleSubmit}>
                <div class="form-group">
                    <input type="text" id="name" bind:value={name} placeholder="캐릭터 이름" required/>
                </div>
                <SelectableList bind:selected={selected}/>
                <div class="modal-actions">
                    <button type="button" class="cancel" on:click={onClose}>취소</button>
                    <button type="submit" class="submit">추가</button>
                </div>
            </form>
        </div>
    </div>
{/if}


<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000; /* 모달을 다른 요소 위에 표시 */
    }

    .modal {
        background: white;
        border-radius: 8px;
        padding: 20px;
        box-sizing: border-box;
        width: 600px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .form-group {
        margin-bottom: 15px;
    }

    input {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .modal-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .cancel {
        background: var(--complementary-pink);
    }

    .cancel:hover {
        background: var(--complementary-pink-darker);
    }
</style>
