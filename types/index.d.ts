import { css, SerializedStyles } from '@emotion/core';
import { Properties } from 'csstype';

type CssPropertyValues = null | boolean | number | string;

type CssProperties = Properties<CssPropertyValues> | SerializedStyles;

type CssPropertyKeys = keyof Properties<CssPropertyValues>;

interface Mq {
  (
    compactStyles: Partial<Record<CssPropertyKeys, CssPropertyValues[]>>
  ): SerializedStyles;
  (...styles: CssProperties[]): SerializedStyles;
  [k: string]: typeof css & ((...styles: CssProperties[]) => SerializedStyles);
}

export {};

export default function facetat<
  T extends { [prop: string]: number; [prop: number]: number } = {}
>(
  breakpoints: T,
  options: { unit: 'em' | 'rem' | 'px' }
): Mq &
  Record<
    CssPropertyKeys,
    (...values: CssPropertyValues[]) => SerializedStyles
  > &
  Record<
    keyof T,
    typeof css & {
      h: (
        height: number | string
      ) => (...styles: CssProperties[]) => SerializedStyles;
    } & ((...styles: CssProperties[]) => SerializedStyles)
  >;
