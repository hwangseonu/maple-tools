import type {BossDifficulty, BossName} from "$lib/boss";

export type Character = {
  name: string,
  image: string,
  boss: BossCrystal[],
}

export type BossCrystal = {
  name: BossName,
  difficulty: BossDifficulty,
  members: number,
}