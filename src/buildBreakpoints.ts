import createMediaQuery from './createMediaQuery';
import Unit from './unit';

export default function buildBreakpoints<T extends { [prop: string]: number }>(
  breakpoints: T,
  unit: Unit
): [string[], string[]] {
  const bpNames = [];
  const bpMediaQueries = [];
  [...Object.entries(breakpoints)]
    .sort((a, b) => a[1] - b[1])
    .forEach(([k, v]) => {
      bpNames.push(k);
      bpMediaQueries.push(createMediaQuery(v, unit));
    });
  return [bpNames, bpMediaQueries];
}
