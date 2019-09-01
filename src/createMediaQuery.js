// @flow
import appendUnit from './appendUnit';

export default function createMediaQuery(
  value: number,
  unit: 'rem' | 'em' | 'px',
  direction: 'width' | 'height' = 'width'
) {
  return '@media(min-' + direction + ':' + appendUnit(value, unit) + ')';
}
