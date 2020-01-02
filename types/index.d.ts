import { css, SerializedStyles } from '@emotion/core';
import { Properties } from 'csstype';

type CssPropertyValues = null | boolean | number | string;

type CssProperties = Properties<CssPropertyValues> | SerializedStyles;

type CssPropertyKeys = keyof Properties<CssPropertyValues>;

type Style = typeof css & ((...styles: CssProperties[]) => SerializedStyles);

interface Mq {
  (
    compactStyles: Partial<Record<CssPropertyKeys, CssPropertyValues[]>>
  ): SerializedStyles;
  (...styles: CssProperties[]): SerializedStyles;
  [k: string]: Style;
}

export {};

interface Custom {
  w: (value: number | string) => Style;
  h: (value: number | string) => Style;
}

export default function facetat<
  T extends { [prop: string]: number; [prop: number]: number } = {}
>(
  breakpoints: T,
  options: { unit: 'em' | 'rem' | 'px' }
): Mq &
  Custom &
  Record<
    CssPropertyKeys,
    (...values: CssPropertyValues[]) => SerializedStyles
  > &
  Record<
    keyof T,
    typeof css & {
      h: (value: number | string) => Style;
    } & ((...styles: CssProperties[]) => SerializedStyles)
  >;
