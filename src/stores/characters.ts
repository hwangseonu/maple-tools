import { type Writable, writable } from "svelte/store";
import type { Character } from "$lib/types";
import { browser } from "$app/environment";

export function createCharactersStore(): Writable<Character[]> {
  if (!browser) return writable([]);
  const storedValue = localStorage.getItem("characters");
  const store = writable(storedValue ? JSON.parse(storedValue) : []);

  store.subscribe(value => {
    localStorage.setItem("characters", JSON.stringify(value))
  });

  return store;
}

export const characters = createCharactersStore();