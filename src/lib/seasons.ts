// src/lib/seasons.ts

export type Season = 'winter' | 'spring' | 'summer' | 'autumn';

export function getCurrentSeason(): Season {
  const month = new Date().getMonth() + 1; // getMonth() fängt bei 0 an
  
  // Dezember (12), Januar (1), Februar (2) -> Winter
  if ([12, 1, 2].includes(month)) return 'winter';
  
  // März (3), April (4), Mai (5) -> Frühling
  if ([3, 4, 5].includes(month)) return 'spring';
  
  // Juni (6), Juli (7), August (8) -> Sommer
  if ([6, 7, 8].includes(month)) return 'summer';
  
  // September (9), Oktober (10), November (11) -> Herbst
  return 'autumn';
}
