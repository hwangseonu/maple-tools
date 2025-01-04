import { get } from 'svelte/store';
import { browser } from '$app/environment';
import type { BossCrystal, Character } from "$lib/types";
import { Boss } from "$lib/boss";
import { nexon } from '../stores/nexon';


export function isMobileMedia(): boolean {
  if (browser)
    return window.matchMedia('(max-width: 768px)').matches;
  else
    return false;
}

export const getBossCrystal = (boss: BossCrystal): number => {
  return Boss.find(({ name, difficulty }) => name == boss.name && difficulty == boss.difficulty)?.crystal ?? 0
}

export const crystalSum = (character: Character): number => {
  return character.boss.reduce((prev, curr) => {
    const crystal = getBossCrystal(curr);
    return prev + Math.floor(crystal / curr.members);
  }, 0)
}

export async function getProfileImage(characterName: string): Promise<string> {
  const {
    NEXON_API_URL,
    NEXON_API_TOKEN,
  } = get(nexon);

  if (!NEXON_API_TOKEN || !NEXON_API_URL) return "./assets/images/character_default.png";

  const ocId = await (await fetch(`${NEXON_API_URL}/maplestory/v1/id?character_name=${characterName}`, {
    method: 'GET',
    headers: { "x-nxopen-api-key": NEXON_API_TOKEN }
  })).json();

  const profile = await (await fetch(`${NEXON_API_URL}/maplestory/v1/character/basic?ocid=${ocId.ocid}`, {
    method: 'GET',
    headers: { "x-nxopen-api-key": NEXON_API_TOKEN }
  })).json();

  return profile.character_image;
}