export type BossName =
  "시그너스"
  | "힐라"
  | "핑크빈"
  | "자쿰"
  | "블러디퀸"
  | "반반"
  | "피에르"
  | "매그너스"
  | "벨룸"
  | "파풀라투스"
  | "스우"
  | "데미안"
  | "가디언 엔젤 슬라임"
  | "루시드"
  | "윌"
  | "더스크"
  | "듄켈"
  | "진 힐라"
  | "검은 마법사"
  | "선택받은 세렌"
  | "감시자 칼로스"
  | "카링"
  | "림보"
  | "발드릭스";
export type BossDifficulty = 'easy' | 'normal' | 'hard' | 'chaos' | 'extreme';

// export type
export type BossType = {
  "difficulty": BossDifficulty,
  "name": BossName,
  "crystal": number
}

export const Boss: BossType[] = [
  {"difficulty": "easy", "name": "시그너스", "crystal": 4550000},
  {"difficulty": "hard", "name": "힐라", "crystal": 5750000},
  {"difficulty": "chaos", "name": "핑크빈", "crystal": 6580000},
  {"difficulty": "normal", "name": "시그너스", "crystal": 7500000},
  {"difficulty": "chaos", "name": "자쿰", "crystal": 8080000},
  {"difficulty": "chaos", "name": "블러디퀸", "crystal": 8140000},
  {"difficulty": "chaos", "name": "반반", "crystal": 8150000},
  {"difficulty": "chaos", "name": "피에르", "crystal": 8170000},
  {"difficulty": "hard", "name": "매그너스", "crystal": 8560000},
  {"difficulty": "chaos", "name": "벨룸", "crystal": 9280000},
  {"difficulty": "chaos", "name": "파풀라투스", "crystal": 17300000},
  {"difficulty": "normal", "name": "스우", "crystal": 22000000},
  {"difficulty": "normal", "name": "데미안", "crystal": 23000000},
  {"difficulty": "normal", "name": "가디언 엔젤 슬라임", "crystal": 33500000},
  {"difficulty": "easy", "name": "루시드", "crystal": 39200000},
  {"difficulty": "easy", "name": "윌", "crystal": 42500000},
  {"difficulty": "normal", "name": "루시드", "crystal": 46900000},
  {"difficulty": "normal", "name": "윌", "crystal": 54100000},
  {"difficulty": "normal", "name": "더스크", "crystal": 57900000},
  {"difficulty": "normal", "name": "듄켈", "crystal": 62500000},
  {"difficulty": "hard", "name": "데미안", "crystal": 73500000},
  {"difficulty": "hard", "name": "스우", "crystal": 77400000},
  {"difficulty": "hard", "name": "루시드", "crystal": 94500000},
  {"difficulty": "chaos", "name": "더스크", "crystal": 105000000},
  {"difficulty": "normal", "name": "진 힐라", "crystal": 107000000},
  {"difficulty": "chaos", "name": "가디언 엔젤 슬라임", "crystal": 113000000},
  {"difficulty": "hard", "name": "윌", "crystal": 116000000},
  {"difficulty": "hard", "name": "듄켈", "crystal": 142000000},
  {"difficulty": "hard", "name": "진 힐라", "crystal": 160000000},
  {"difficulty": "normal", "name": "선택받은 세렌", "crystal": 295000000},
  {"difficulty": "easy", "name": "감시자 칼로스", "crystal": 345000000},
  {"difficulty": "easy", "name": "카링", "crystal": 381000000},
  {"difficulty": "hard", "name": "선택받은 세렌", "crystal": 440000000},
  {"difficulty": "normal", "name": "감시자 칼로스", "crystal": 510000000},
  {"difficulty": "extreme", "name": "스우", "crystal": 549000000},
  {"difficulty": "normal", "name": "카링", "crystal": 595000000},
  {"difficulty": "normal", "name": "림보", "crystal": 900000000},
  {"difficulty": "chaos", "name": "감시자 칼로스", "crystal": 1120000000},
  {"difficulty": "normal", "name": "발드릭스", "crystal": 1200000000},
  {"difficulty": "hard", "name": "카링", "crystal": 1310000000},
  {"difficulty": "hard", "name": "림보", "crystal": 1930000000},
  {"difficulty": "hard", "name": "발드릭스", "crystal": 2160000000},
  {"difficulty": "extreme", "name": "선택받은 세렌", "crystal": 2420000000},
  {"difficulty": "extreme", "name": "감시자 칼로스", "crystal": 2700000000},
  {"difficulty": "extreme", "name": "카링", "crystal": 3150000000},
  // {"difficulty": "hard", "name": "검은 마법사", "crystal": 1000000000},
  // {"difficulty": "extreme", "name": "검은 마법사", "crystal": 9200000000}
]

export function getIndex(target: { name: BossName, difficulty: BossDifficulty }): number {
  return Boss.findIndex((boss: BossType) => boss.name === target.name && boss.difficulty === target.difficulty);
}

export default Boss;
