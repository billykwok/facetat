// @flow
import appendUnit from './appendUnit';

export default function mergeProp(
  style: { [string]: number | string },
  k: string,
  v: number | string,
  unit: 'rem' | 'em' | 'px'
): { [string]: number | string } {
  return Object.assign({}, style, { [k]: appendUnit(v, unit) });
}
