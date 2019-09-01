// @flow
export default function appendUnit(
  v: string | number,
  unit: 'rem' | 'em' | 'px' = 'rem'
): string {
  return typeof v === 'number' ? v + unit : v;
}
