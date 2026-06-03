/**
 * Convert positional args (["a","b"]) to named params.
 * Example output: { "0": "a", "1": "b" } or map to custom names if needed.
 */
export function positionalArgsToNamedParams(args?: string[]): Record<string, string> | undefined {
  if (!args || args.length === 0) return undefined;
  return args.reduce(
    (acc, v, i) => {
      acc[String(i)] = v;
      return acc;
    },
    {} as Record<string, string>,
  );
}
