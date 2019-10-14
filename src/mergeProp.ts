import appendUnit from './appendUnit';
import Unit from './unit';

export default function mergeProp(
  style: { [prop: string]: number | string },
  k: string,
  v: number | string,
  unit: Unit
): { [prop: string]: number | string } {
  return Object.assign({}, style, { [k]: appendUnit(v, unit) });
}
