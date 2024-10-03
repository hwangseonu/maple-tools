import type {BossCrystal, Character} from "$lib/types";
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