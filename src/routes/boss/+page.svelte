<script lang="ts">
  import CharacterCard from "../../components/boss/CharacterCard.svelte";
  import AddCharacterModal from "../../components/modal/AddCharacterModal.svelte";

  let showModal: boolean = false;
  const openModal = () => showModal = true;
  const closeModal = () => showModal = false;

  function handleSubmit(event: CustomEvent) {
    const { name, email } = event.detail;
    console.log("Submitted Data:", { name, email });
  }
</script>

<div>
    <AddCharacterModal isOpen={showModal} onClose={closeModal} on:submit={handleSubmit} />
    <CharacterCard />
    <CharacterCard />
    <CharacterCard />
    <button on:click={openModal}>캐릭터 추가</button>
</div>

<style>
</style>


