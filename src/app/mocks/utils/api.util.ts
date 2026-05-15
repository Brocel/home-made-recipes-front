export function pickDailyIndex(length: number): number {
  const today = new Date().toDateString();

  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = today.charCodeAt(i) + ((hash << 5) - hash);
  }

  return Math.abs(hash) % length;
}

export function nextId<T extends { id: number }>(arr: T[]): number {
  return arr.length ? Math.max(...arr.map((i) => i.id)) + 1 : 1;
}

export function createFakeJwt(expInSeconds = 3600): string {
  const header = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));

  const payload = btoa(
    JSON.stringify({
      exp: Math.floor(Date.now() / 1000) + expInSeconds,
    }),
  );

  return `${header}.${payload}.signature`;
}
