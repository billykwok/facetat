// @flow
import buildBreakpoints from './buildBreakpoints';
import createMediaQuery from './createMediaQuery';
import appendUnit from './appendUnit';
import mapPropShortcut from './mapPropShortcut';
import mergeProp from './mergeProp';
import buildSingleMedia from './buildSingleMedia';

import { css } from '@emotion/core';

type Css = (strings: Array<string>, ...expressions: Array<number>) => string;
type Options = { unit: 'em' | 'rem' | 'px' };
type MQ = { (Array<string>, Options): Css, [string]: Css };

export default function facetat<T: { [string]: number }>(
  breakpoints: T,
  options: Options
) {
  const { unit } = options;
  const [bpNames, mediaQueries] = buildBreakpoints(breakpoints, unit);

  function mq(first: mixed, ...rest: Array<mixed>): mixed {
    if (!first) return {};
    if (rest.length) {
      return css.apply(
        null,
        rest.slice(0, mediaQueries.length).map(function(v, i) {
          return i ? { [mediaQueries[i]]: v } : v;
        })
      );
    }
    return [null, ...mediaQueries].reduce(function(o, q, i) {
      const styles = Object.entries(first).reduce(function(a, [k, v]) {
        return i < v.length && v[i] ? mergeProp(a, k, v[i], unit) : a;
      }, {});
      return Object.assign(o, q ? { [q]: styles } : styles);
    }, {});
  }

  for (let i = 0; i < mediaQueries.length; ++i) {
    mq[bpNames[i]] = function(...args: Array<mixed>): mixed {
      return buildSingleMedia(mediaQueries[i], args);
    };
    mq[bpNames[i]].height = function(value: string | number): mixed {
      return function(...args: Array<mixed>) {
        const height = appendUnit(value, unit);
        const query = `${mediaQueries[i]} and (min-height:${height})`;
        return buildSingleMedia(query, args);
      };
    };
  }

  function createShortcut(props: Array<string>) {
    return function(...values: Array<number | string>) {
      return mq.apply(
        null,
        values.map(function(v) {
          return props.reduce(function(o, p) {
            return mergeProp(o, p, v, unit);
          }, {});
        })
      );
    };
  }

  const cache: { [string]: mixed } = {};

  return new Proxy(mq, {
    get(target: { [string]: mixed }, prop: string, receiver): mixed {
      if (prop in target) return Reflect.get(target, prop, receiver);
      if (prop in cache) return cache[prop];
      return (cache[prop] = createShortcut(mapPropShortcut(prop)));
    }
  });
}
