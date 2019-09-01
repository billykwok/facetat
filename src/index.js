// @flow
import buildBreakpoints from './buildBreakpoints';
import appendUnit from './appendUnit';
import mapPropShortcut from './mapPropShortcut';
import mergeProp from './mergeProp';
import buildSingleMedia from './buildSingleMedia';

import { css } from '@emotion/core';
import createMediaQuery from './createMediaQuery';

type Css = (strings: Array<string>, ...expressions: Array<number>) => string;
type Options = { unit: 'em' | 'rem' | 'px' };
type MQ = { (Array<string>, Options): Css, [string]: Css };

export default function facetat<T: { [string]: number }>(
  breakpoints: T,
  options: Options
) {
  const { unit = 'rem' } = options;
  const [bpNames, mediaQueries] = buildBreakpoints(breakpoints, unit);

  function mq(first: mixed, ...rest: Array<mixed>): mixed {
    if (!first) return {};
    if (rest.length) {
      return css.apply(
        null,
        [first, ...rest.slice(0, mediaQueries.length)].map(function(v, i) {
          if (Object.keys(v).length) {
            return i ? { [mediaQueries[i]]: v } : v;
          }
          return {};
        })
      );
    }
    return [null, ...mediaQueries].reduce(function(o, q, i) {
      const styles = Object.entries(first).reduce(function(a, [k, v]) {
        if (Array.isArray(v)) {
          return i < v.length && v[i] ? mergeProp(a, k, v[i], unit) : a;
        }
        if (i || !v) return a;
        return mergeProp(a, k, v, unit);
      }, {});
      return Object.keys(styles).length
        ? Object.assign({}, o, q ? { [q]: styles } : styles)
        : o;
    }, {});
  }

  for (let i = 0; i < mediaQueries.length; ++i) {
    mq[bpNames[i]] = function(...args: Array<mixed>): mixed {
      return buildSingleMedia(mediaQueries[i], args);
    };
    mq[bpNames[i]].h = function(value: string | number) {
      const height = appendUnit(value, unit);
      const query = `${mediaQueries[i]} and (min-height:${height})`;
      return function(...args: Array<mixed>) {
        return buildSingleMedia(query, args);
      };
    };
  }
  mq.w = function(value: string | number) {
    const query = createMediaQuery(value, unit);
    return function(...args: Array<mixed>): mixed {
      return buildSingleMedia(query, args);
    };
  };
  mq.h = function(value: string | number) {
    const query = `@media(min-height:${appendUnit(value, unit)})`;
    return function(...args: Array<mixed>): mixed {
      return buildSingleMedia(query, args);
    };
  };

  function createShortcut(props: Array<string>) {
    return function(...values: Array<number | string>) {
      return mq.apply(
        null,
        values.map(function(v) {
          return v
            ? props.reduce(function(o, p) {
                return mergeProp(o, p, v, unit);
              }, {})
            : {};
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
