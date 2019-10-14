import { css } from '@emotion/core';

export default function buildSingleMedia(query: string, args: any[]) {
  if (!args.length) return {};
  return { [query]: css.apply(null, args) };
}
