/** Embaralhamento determinístico (mesma ordem no servidor e no cliente). */
export function embaralhar<T>(lista: readonly T[], semente = 7): T[] {
  const out = [...lista];
  let s = semente >>> 0 || 1;
  const rnd = () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 0xffffffff;
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

/** Intercala listas (round-robin) para não agrupar jogos do mesmo tipo. */
export function intercalar<T>(...listas: T[][]): T[] {
  const out: T[] = [];
  const max = Math.max(0, ...listas.map((l) => l.length));
  for (let i = 0; i < max; i++) {
    for (const l of listas) if (l[i] !== undefined) out.push(l[i]!);
  }
  return out;
}
