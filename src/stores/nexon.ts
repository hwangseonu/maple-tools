import { type Writable, writable } from 'svelte/store';
import type { NexonOption } from '$lib/types';
import { browser } from '$app/environment';

export function createNexonOptionStore(): Writable<NexonOption> {
  if (!browser) return writable({ NEXON_API_URL: "", NEXON_API_TOKEN: "" });
  const storedValue = localStorage.getItem("nexon-option");
  const store = writable<NexonOption>(storedValue ? JSON.parse(storedValue) : { NEXON_API_URL: "", NEXON_API_TOKEN: "" });

  store.subscribe(value => {
    localStorage.setItem("nexon-option", JSON.stringify(value));
  })

  return store;
}

export const nexon = createNexonOptionStore();