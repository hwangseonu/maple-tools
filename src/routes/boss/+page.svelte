<script lang="ts">
  import type { Character } from "$lib/types";
  import { onMount } from "svelte";
  import CharacterList from "../../components/boss/CharacterList.svelte";
  import AddCharacterModal from "../../components/modal/AddCharacterModal.svelte";
  import CharacterAggregation from "../../components/boss/CharacterAggregation.svelte";
  import {getProfileImage, isMobileMedia} from "$lib/utils";
  import {characters} from "../../stores/characters";
  import {browser} from "$app/environment";

  // state
  let showModal: boolean = false;
  let currentCharacter: Character | undefined;

  let isMobile: boolean;

  // utils
  const openModal = (character: Character | undefined) => {
    showModal = true;
    currentCharacter = character;
  };
  const closeModal = () => {
    showModal = false;
    currentCharacter = undefined;
  };

  onMount(() => {
    isMobile = isMobileMedia();
  });

  // functions
  async function handleSubmit(event: CustomEvent) {
    const { name, selected } = event.detail;

    const image =
      (await getProfileImage(name)) ?? "./assets/images/character_default.png";

    let character = {
      id: name,
      name: name,
      image: image,
      boss: selected,
      toggle: false,
    };

    if (currentCharacter != undefined) {
      const index = $characters.findIndex(
        (value) => value.name === currentCharacter?.name,
      );
      characters.update(arr => {
        const copied = [...arr];
        copied[index] = character;
        return copied;
      })
    } else if ($characters.some((value) => value.name === name)) {
      // eslint-disable-next-line no-undef
      if (browser) alert("같은 이름의 캐릭터를 등록할 수 없습니다.");
    } else {
      characters.update((arr) => [...arr, character]);
    }
    closeModal();
  }

  function handleDelete(event: CustomEvent) {
    const { character } = event.detail;

    if (!character) return;

    const index = $characters.findIndex(
      (value) => value.name == character?.name,
    );

    if (index >= 0) {
      characters.update(arr => arr.splice(index, 1));
    }

    closeModal();
  }

  function handleClickItem(event: CustomEvent) {
    const { target } = event.detail;

    openModal(target as Character);
  }

  function handleDisableAll() {
    characters.update( arr => arr.map((character) => ({
      ...character,
      toggle: false,
    })));
  }
</script>

<div class="wrapper">
  <AddCharacterModal
    current={currentCharacter}
    name={currentCharacter?.name ?? ""}
    selected={currentCharacter?.boss ?? []}
    mode={currentCharacter ? "edit" : "add"}
    isOpen={showModal}
    onClose={closeModal}
    on:submit={handleSubmit}
    on:delete={handleDelete}
  />
  {#if isMobile}
    <CharacterAggregation characters={$characters} on:disableAll={handleDisableAll} />
  {/if}
  <div class="contents">
    <CharacterList bind:items={$characters} on:click={handleClickItem} />
    <button on:click={() => openModal(undefined)}>캐릭터 추가</button>
  </div>
  {#if !isMobile}
    <CharacterAggregation characters={$characters} on:disableAll={handleDisableAll} />
  {/if}
</div>

<style>
  .wrapper {
    width: 100%;
  }

  .contents {
    margin-right: 16px;
    float: left;
  }

  button {
    margin-top: 10px;
    width: 100%;
  }

  @media (max-width: 768px) {
    .contents {
      width: 100%;
      margin-left: 0;
    }
  }
</style>
