import type {BossCrystal, Character, Setting} from "$lib/types";
import {Boss} from "$lib/boss";


export const getBossCrystal = (boss: BossCrystal): number => {
  return Boss.find(({name, difficulty}) => name == boss.name && difficulty == boss.difficulty)?.crystal ?? 0
}

export const crystalSum = (character: Character): number => {
  return character.boss.reduce((prev, curr) => {
    const crystal = getBossCrystal(curr);
    return prev + Math.floor(crystal / curr.members);
  }, 0)
}

export async function getProfileImage(characterName: string) {
  const setting = localStorage.getItem('setting');

  if (!setting) return "";

  const {
    NEXON_API_URL,
    NEXON_API_TOKEN,
  } = JSON.parse(setting) as Setting;

  const ocId = await (await fetch(`${NEXON_API_URL}/maplestory/v1/id?character_name=${characterName}`, {
    method: 'GET',
    headers: {"x-nxopen-api-key": NEXON_API_TOKEN}
  })).json();

  const profile = await (await fetch(`${NEXON_API_URL}/maplestory/v1/character/basic?ocid=${ocId.ocid}`, {
    method: 'GET',
    headers: {"x-nxopen-api-key": NEXON_API_TOKEN}
  })).json();

  return profile.character_image;
}