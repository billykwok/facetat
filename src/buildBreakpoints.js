// @flow
import createMediaQuery from './createMediaQuery';

export default function buildBreakpoints<T: { [string]: number }>(
  breakpoints: T,
  unit: 'rem' | 'em' | 'px'
): [Array<string>, Array<string>] {
  const bpNames: Array<string> = [];
  const bpMediaQueries: Array<string> = [];
  [...Object.entries(breakpoints)]
    .sort((a, b) => a[1] - b[1])
    .forEach(([k, v]) => {
      bpNames.push(k);
      bpMediaQueries.push(createMediaQuery(v, unit));
    });
  return [bpNames, bpMediaQueries];
}
