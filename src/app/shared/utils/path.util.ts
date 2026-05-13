/**
 * Compares if two paths are equals
 * @param pathA first path string[]
 * @param pathB second path string[]
 * @returns boolean
 */
export function pathsEqual(pathA: string[], pathB: string[]): boolean {
  if (pathA.length !== pathB.length) return false;

  let x = pathA.join('|');
  let y = pathB.join('|');

  return x === y;
}

export function pathsContains(pathA: string[], pathB: string[]): boolean {
  if (pathB.length === 0) return true;
  if (pathB.length > pathA.length) return false;

  for (let i = 0; i <= pathA.length - pathB.length; i++) {
    let match = true;

    for (let j = 0; j < pathB.length; j++) {
      if (pathA[i + j] !== pathB[j]) {
        match = false;
        break;
      }
    }

    if (match) return true;
  }

  return false;
}
