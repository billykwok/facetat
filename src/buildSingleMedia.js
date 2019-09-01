// @flow
import { css } from '@emotion/core';
import appendUnit from './appendUnit';

export default function buildSingleMedia(query: string, args: Array<mixed>) {
  if (!args.length) return {};
  return { [query]: css.apply(null, args) };
}
