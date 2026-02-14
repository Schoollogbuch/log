// src/lib/seasons.ts
export type Season = 'winter' | 'spring' | 'summer' | 'autumn';

export function getCurrentSeason(): Season {
  const month = new Date().getMonth() + 1; // 1 = Januar, 2 = Februar...
  
  if ([12, 1, 2].includes(month)) return 'winter';
  if ([3, 4, 5].includes(month)) return 'spring';
  if ([6, 7, 8].includes(month)) return 'summer';
  return 'autumn';
}
