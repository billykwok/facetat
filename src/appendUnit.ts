import Unit from './unit';

export default function appendUnit(
  v: string | number,
  unit: Unit = Unit.rem
): string {
  return typeof v === 'number' ? v + unit : v;
}
