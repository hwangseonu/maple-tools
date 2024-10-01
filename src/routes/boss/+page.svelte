<script lang="ts">
  import CharacterCard from "../../components/boss/CharacterCard.svelte";
  import AddCharacterModal from "../../components/modal/AddCharacterModal.svelte";
  import type {Character} from "$lib/types";
  import {onMount} from "svelte";

  // state
  let showModal: boolean = false;

  let currentIndex: number = -1;
  let characters: Character[] = []
  $: currentCharacter = currentIndex >= 0 ? characters[currentIndex] : undefined;

  // utils
  const openModal = (index: number) => {
    showModal = true;
    currentIndex = index
  }
  const closeModal = () => {
    showModal = false;
    currentIndex = -1;
  }

  onMount(() => {
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
  async function getCharacterImage(characterName: string): Promise<string> {
    try {
      const response = await fetch("/api/character/image?character=" + characterName);
      console.log(response)
      return await response.text()
    } catch (e) {
      return ""
    }
  }

  async function handleSubmit(event: CustomEvent) {
    const {name, selected} = event.detail;

    const image = await getCharacterImage(name);

    let character = {
      name: name,
      image: image,
      boss: selected,
    }

    if (currentIndex >= 0) {
      characters[currentIndex] = character
    } else if (characters.some((value) => value.name === name)) {
      alert("같은 이름의 캐릭터를 등록할 수 없습니다.");
    } else {
      characters = [...characters, character]
    }
    console.log(characters)
    console.log("Submitted Data:", {name, selected});
    closeModal()
  }

  function handleDelete(event: CustomEvent) {
    const {index} = event.detail;

    console.log(index)

    characters.splice(index, 1);
    characters = characters

    console.log(characters)
    closeModal();
  }
</script>

<div>
    <AddCharacterModal
            name={currentCharacter?.name ?? ""}
            selected={currentCharacter?.boss ?? []}
            index={currentIndex}
            mode={currentCharacter ? "edit" : "add"}
            isOpen={showModal}
            onClose={closeModal}
            on:submit={handleSubmit}
            on:delete={handleDelete}
    />
    {#each characters as character, index}
        <CharacterCard character={character} on:click={() => openModal(index)}/>
    {/each}
    <button on:click={() => openModal(-1)}>캐릭터 추가</button>
</div>

<style>
</style>


