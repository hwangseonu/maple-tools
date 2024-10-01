export type BossName = "시그너스" | "힐라" | "핑크빈" | "자쿰" | "블러디퀸" | "반반" | "피에르" | "매그너스" | "벨룸" | "파풀라투스" | "스우" | "데미안" | "가디언 엔젤 슬라임" | "루시드" | "윌" | "더스크" | "듄켈" | "진 힐라" | "선택받은 세렌" | "감시자 칼로스" | "카링" | "림보";
export type BossDifficulty = 'easy' | 'normal' | 'hard' | 'chaos' | 'extreme';

// export type
export type BossType = {
  "difficulty": BossDifficulty,
  "name": BossName,
  "crystal": number
}

export const BossList: BossType[] = [
  {
    "difficulty": "easy",
    "name": "시그너스",
    "crystal": 5060000
  },
  {
    "difficulty": "hard",
    "name": "힐라",
    "crystal": 6390000
  },
  {
    "difficulty": "chaos",
    "name": "핑크빈",
    "crystal": 7310000
  },
  {
    "difficulty": "normal",
    "name": "시그너스",
    "crystal": 8330000
  },
  {
    "difficulty": "chaos",
    "name": "자쿰",
    "crystal": 8980000
  },
  {
    "difficulty": "chaos",
    "name": "블러디퀸",
    "crystal": 9040000
  },
  {
    "difficulty": "chaos",
    "name": "반반",
    "crystal": 9060000
  },
  {
    "difficulty": "chaos",
    "name": "피에르",
    "crystal": 9080000
  },
  {
    "difficulty": "hard",
    "name": "매그너스",
    "crystal": 10700000
  },
  {
    "difficulty": "chaos",
    "name": "벨룸",
    "crystal": 11600000
  },
  {
    "difficulty": "chaos",
    "name": "파풀라투스",
    "crystal": 24700000
  },
  {
    "difficulty": "normal",
    "name": "스우",
    "crystal": 31400000
  },
  {
    "difficulty": "normal",
    "name": "데미안",
    "crystal": 32900000
  },
  {
    "difficulty": "normal",
    "name": "가디언 엔젤 슬라임",
    "crystal": 47800000
  },
  {
    "difficulty": "easy",
    "name": "루시드",
    "crystal": 49000000
  },
  {
    "difficulty": "easy",
    "name": "윌",
    "crystal": 53100000
  },
  {
    "difficulty": "normal",
    "name": "루시드",
    "crystal": 58600000
  },
  {
    "difficulty": "normal",
    "name": "윌",
    "crystal": 67600000
  },
  {
    "difficulty": "normal",
    "name": "더스크",
    "crystal": 72400000
  },
  {
    "difficulty": "normal",
    "name": "듄켈",
    "crystal": 78100000
  },
  {
    "difficulty": "hard",
    "name": "데미안",
    "crystal": 113000000
  },
  {
    "difficulty": "hard",
    "name": "스우",
    "crystal": 119000000
  },
  {
    "difficulty": "hard",
    "name": "루시드",
    "crystal": 135000000
  },
  {
    "difficulty": "chaos",
    "name": "더스크",
    "crystal": 150000000
  },
  {
    "difficulty": "normal",
    "name": "진 힐라",
    "crystal": 153000000
  },
  {
    "difficulty": "chaos",
    "name": "가디언 엔젤 슬라임",
    "crystal": 161000000
  },
  {
    "difficulty": "hard",
    "name": "윌",
    "crystal": 165000000
  },
  {
    "difficulty": "hard",
    "name": "듄켈",
    "crystal": 177000000
  },
  {
    "difficulty": "hard",
    "name": "진 힐라",
    "crystal": 200000000
  },
  {
    "difficulty": "normal",
    "name": "선택받은 세렌",
    "crystal": 227000000
  },
  {
    "difficulty": "easy",
    "name": "감시자 칼로스",
    "crystal": 265000000
  },
  {
    "difficulty": "easy",
    "name": "카링",
    "crystal": 293000000
  },
  {
    "difficulty": "hard",
    "name": "선택받은 세렌",
    "crystal": 314000000
  },
  {
    "difficulty": "normal",
    "name": "감시자 칼로스",
    "crystal": 364000000
  },
  {
    "difficulty": "extreme",
    "name": "스우",
    "crystal": 392000000
  },
  {
    "difficulty": "normal",
    "name": "카링",
    "crystal": 425000000
  },
  {
    "difficulty": "normal",
    "name": "림보",
    "crystal": 600000000
  },
  {
    "difficulty": "chaos",
    "name": "감시자 칼로스",
    "crystal": 746000000
  },
  {
    "difficulty": "hard",
    "name": "카링",
    "crystal": 870000000
  },
  {
    "difficulty": "hard",
    "name": "림보",
    "crystal": 1070000000
  },
  {
    "difficulty": "extreme",
    "name": "선택받은 세렌",
    "crystal": 1340000000
  },
  {
    "difficulty": "extreme",
    "name": "감시자 칼로스",
    "crystal": 1500000000
  },
  {
    "difficulty": "extreme",
    "name": "카링",
    "crystal": 1750000000
  }
]

export default BossList;
