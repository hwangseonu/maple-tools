import type {BossDifficulty, BossName} from "$lib/boss";

export const emptyFunction = () => {};

export type Character = {
  id: string,
  name: string,
  image: string,
  boss: BossCrystal[],
  toggle: boolean,
}

export type BossCrystal = {
  name: BossName,
  difficulty: BossDifficulty,
  members: number,
}