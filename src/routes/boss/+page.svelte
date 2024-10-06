<script lang="ts">
  import type {Character} from "$lib/types";
  import {onMount} from "svelte";
  import CharacterList from "../../components/boss/CharacterList.svelte";
  import AddCharacterModal from "../../components/modal/AddCharacterModal.svelte";
  import CharacterAggregation from "../../components/boss/CharacterAggregation.svelte";
  import {getProfileImage} from "$lib/utils";

  // state
  let showModal: boolean = false;

  let characters: Character[] = [];
  let currentCharacter: Character | undefined;

  let isMobile: boolean

  // utils
  const openModal = (character: Character | undefined) => {
    showModal = true;
    currentCharacter = character
  }
  const closeModal = () => {
    showModal = false;
    currentCharacter = undefined;
  }

  onMount(() => {
    isMobile = window.matchMedia("(max-width: 768px)").matches;
    const saved = localStorage.getItem("boss-list")
    if (saved) {
      characters = JSON.parse(saved);
    }
  })

  $: if (characters.length != 0) {
    if (typeof localStorage !== "undefined")
      localStorage.setItem("boss-list", JSON.stringify(characters))
  }

  // functions
  async function handleSubmit(event: CustomEvent) {
    const {name, selected} = event.detail;

    const image = await getProfileImage(name) ?? "./assets/images/character_default.png";

    let character = {
      id: name,
      name: name,
      image: image,
      boss: selected,
      toggle: false,
    }

    if (currentCharacter != undefined) {
      const index = characters.findIndex((value) => value.name === currentCharacter?.name);
      characters[index] = character;
    } else if (characters.some((value) => value.name === name)) {
      alert("같은 이름의 캐릭터를 등록할 수 없습니다.");
    } else {
      characters = [...characters, character]
    }
    closeModal()
  }

  function handleDelete(event: CustomEvent) {
    const {character} = event.detail;

    if (!character) return;

    const index = characters.findIndex((value) => value.name == character?.name);

    if (index >= 0) {
      characters.splice(index, 1);
      characters = characters
    }

    closeModal();
  }

  function handleClickItem(event: CustomEvent) {
    const {target} = event.detail;

    openModal(target as Character);
  }

  function handleDisableAll(event: CustomEvent) {
    characters = characters.map((character) => ({
      ...character,
      toggle: false
    }))
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
        <CharacterAggregation characters={characters} on:disableAll={handleDisableAll}/>
    {/if}
    <div class="contents">
        <CharacterList bind:items={characters} on:click={handleClickItem}/>
        <button on:click={() => openModal(undefined)}>캐릭터 추가</button>
    </div>
    {#if !isMobile}
        <CharacterAggregation characters={characters} on:disableAll={handleDisableAll}/>
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


