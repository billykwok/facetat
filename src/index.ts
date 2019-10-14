import buildBreakpoints from './buildBreakpoints';
import appendUnit from './appendUnit';
import mapPropShortcut from './mapPropShortcut';
import mergeProp from './mergeProp';
import buildSingleMedia from './buildSingleMedia';

import { css } from '@emotion/core';
import createMediaQuery from './createMediaQuery';
import Unit from './unit';

export default function facetat<T extends { [prop: string]: number }>(
  breakpoints: T,
  options: { unit: Unit }
) {
  const { unit = Unit.rem } = options;
  const [bpNames, mediaQueries] = buildBreakpoints(breakpoints, unit);

  function mq(
    first: { [prop: string]: any },
    ...rest: { [prop: string]: any }[]
  ): { [prop: string]: any } {
    if (!first) return {};
    if (rest.length) {
      return css.apply(
        null,
        [first, ...rest.slice(0, mediaQueries.length)].map(function(v, i) {
          if (Object.keys(v).length) {
            return i ? { [mediaQueries[i - 1]]: v } : v;
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
    mq[bpNames[i]] = function(...args: any[]): any {
      return buildSingleMedia(mediaQueries[i], args);
    };
    mq[bpNames[i]].h = function(value: string | number) {
      const height = appendUnit(value, unit);
      const query = `${mediaQueries[i]} and (min-height:${height})`;
      return function(...args: any[]) {
        return buildSingleMedia(query, args);
      };
    };
  }
  mq.w = function(value: string | number) {
    const query = createMediaQuery(value, unit);
    return function(...args: any[]): any {
      return buildSingleMedia(query, args);
    };
  };
  mq.h = function(value: string | number) {
    const query = `@media(min-height:${appendUnit(value, unit)})`;
    return function(...args: any[]): any {
      return buildSingleMedia(query, args);
    };
  };

  function createShortcut(props: string[]) {
    return function(...values: (number | string)[]) {
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

  const cache: { [prop: string]: any } = {};

  return new Proxy<{
    (...props: { [prop: string]: any }[]): { [prop: string]: any };
    [prop: string]: any;
  }>(mq, {
    get(target: { [prop: string]: any }, prop: string, receiver): any {
      if (prop in target) return Reflect.get(target, prop, receiver);
      if (prop in cache) return cache[prop];
      return (cache[prop] = createShortcut(mapPropShortcut(prop)));
    }
  });
}
