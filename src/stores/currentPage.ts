import { type Writable, writable } from 'svelte/store';
import type { NavItem } from "$lib/types";
import { browser } from '$app/environment';
import { SITE_NAV_ITEMS } from './siteinfo';

export function createCurrentPageStore(): Writable<NavItem> {
  if (!browser) return writable<NavItem>({
    name: "",
    link: "",
    image: "",
  });

  const pathname = "./" + window.location.pathname.split("/").pop()
  const item = SITE_NAV_ITEMS.find(item => item.link === pathname)

  return writable<NavItem>(item);
}

export const currentPage = createCurrentPageStore();