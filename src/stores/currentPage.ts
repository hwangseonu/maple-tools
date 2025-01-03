import { writable } from 'svelte/store';
import type {NavItem} from "$lib/types";

export const currentPage = writable<NavItem>({
    name: "",
    link: "",
    image: "",
});