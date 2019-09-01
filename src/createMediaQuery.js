// @flow
import appendUnit from './appendUnit';

export default function createMediaQuery(
  value: string | number,
  unit: 'rem' | 'em' | 'px'
) {
  return '@media(min-width:' + appendUnit(value, unit) + ')';
}
