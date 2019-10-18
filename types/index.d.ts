import { css, SerializedStyles } from '@emotion/core';
import * as CSS from 'csstype';

type CssPropertyValues = null | boolean | number | string;

type CssProperties = CSS.Properties<CssPropertyValues> | SerializedStyles;

type CssPropertyKeys = keyof CSS.Properties<CssPropertyValues>;

interface Mq {
  (
    compactStyles: Partial<Record<CssPropertyKeys, CssPropertyValues[]>>
  ): SerializedStyles;
  (...styles: CssProperties[]): SerializedStyles;
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
  Record<keyof T, typeof css> &
  Record<keyof T, (...styles: CssProperties[]) => SerializedStyles>;
