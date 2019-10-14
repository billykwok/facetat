import appendUnit from './appendUnit';
import Unit from './unit';

export default function createMediaQuery(value: string | number, unit: Unit) {
  return '@media(min-width:' + appendUnit(value, unit) + ')';
}
