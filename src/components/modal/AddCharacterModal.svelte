<script lang="ts">
  import {createEventDispatcher} from 'svelte';
  import SelectableList from "./BossSelector.svelte";
  import {type BossCrystal, type Character, emptyFunction} from "$lib/types";

  // props
  export let onClose: () => void;
  export let isOpen: boolean = false; // 모달 열림 상태
  $: if (!isOpen) { // 모달이 닫히면 값을 초기화
    name = "";
    selected = [];
  }

  // state
  export let current: Character | undefined;
  export let name: string;
  export let selected: BossCrystal[];
  export let mode: 'edit' | 'add';

  // utils
  const dispatch = createEventDispatcher();

  // functions
  function handleSubmit() {
    dispatch('submit', {name, selected})
  }

  function handleDelete() {
    dispatch('delete', { character: current })
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key == "Escape") {
      onClose();
      return;
    }
  }
</script>

{#if isOpen}
    <div class="overlay" on:click={onClose} role="button" tabindex="0" on:keydown={onKeydown}>
        <div class="modal" on:click|stopPropagation role="button" tabindex="0" on:keydown={emptyFunction}>
            <form on:submit|preventDefault={handleSubmit}>
                <div class="form-header">
                    <input type="text" bind:value={name} placeholder="캐릭터 이름" required/>
                    <div class="buttons">
                        <button type="button" class="delete-button" on:click={handleDelete}>
                            <i class="fas fa-trash"/>
                        </button>
                        <button type="button" class="close-button" on:click={onClose}>
                            <i class="fas fa-times"/>
                        </button>
                    </div>
                </div>
                <SelectableList bind:selected={selected}/>
                <div class="modal-actions">
                    <button type="button" class="cancel" on:click={onClose}>취소</button>
                    <button type="submit" class="submit">{ mode === "edit" ? "저장" : "추가" }</button>
                </div>
            </form>
        </div>
    </div>
{/if}


<style>
    .overlay {
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

    .form-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
    }

    .form-header .buttons {
        margin-left: 10px;
        display: flex;
        gap: 10px;
    }

    .form-header button {
        background: none;
        box-shadow: none;
        font-size: 30px;
    }

    .form-header .delete-button {
        color: var(--complementary-pink);
    }

    .form-header .delete-button:hover {
        color: var(--complementary-pink-darker);
    }

    .form-header button:hover {
        background: var(--neutral-dark);
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
