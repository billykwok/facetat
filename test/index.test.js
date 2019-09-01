// @flow
import facetat from '../src';

import { css } from '@emotion/core';

const mq = facetat(
  { XS: 20, SM: 28, MD: 36, ML: 48, LG: 60, XL: 75 },
  { unit: 'rem' }
);

describe('Single-media form', () => {
  test('with tagged template literal', () => {
    const result = mq.XS`width: 18rem;`;
    expect(css(result)).toMatchSnapshot();
  });

  test('with multiple plain objects with a mixed of unit mode', () => {
    const result = mq.XS({ width: '240px' }, { fontSize: 16 });
    expect(css(result)).toMatchSnapshot();
  });

  test('with multiple plain objects with mixed units', () => {
    const result = mq.XS({ width: '240px' }, { fontSize: '1rem' });
    expect(css(result)).toMatchSnapshot();
  });

  test('with multiple plain objects', () => {
    const result = mq.XS({ width: 18 }, { fontSize: 16 });
    expect(css(result)).toMatchSnapshot();
  });

  test('with additional unitless height constraint', () => {
    const result = mq.XS.h(40)({ width: 18 });
    expect(css(result)).toMatchSnapshot();
  });

  test('with additional height constraint', () => {
    const result = mq.XS.h('640px')({ width: 18 });
    expect(css(result)).toMatchSnapshot();
  });
});

describe('Single-property form', () => {
  test('with number of argument more than that of breakpoints', () => {
    const result = mq.width('100%', 18, 24, 32, 44, 54, 72, 1000);
    expect(css(result)).toMatchSnapshot();
  });

  test('with number of argument fewer than that of breakpoints', () => {
    const result = mq.width('100%', 18, 24, 32, 44);
    expect(css(result)).toMatchSnapshot();
  });

  test('with single argument', () => {
    const result = mq.paddingBottom(4);
    expect(css(result)).toMatchSnapshot();
  });

  test('with paddingHorizontal', () => {
    const result = mq.paddingHorizontal(1, null, 2, null, null, 4);
    expect(css(result)).toMatchSnapshot();
  });

  test('with paddingVertical', () => {
    const result = mq.paddingVertical(1, null, 2, null, null, 4);
    expect(css(result)).toMatchSnapshot();
  });

  test('with marginHorizontal', () => {
    const result = mq.marginHorizontal(1, null, 2, null, null, 4);
    expect(css(result)).toMatchSnapshot();
  });

  test('with marginVertical', () => {
    const result = mq.marginVertical(1, null, 2, null, null, 4);
    expect(css(result)).toMatchSnapshot();
  });

  test('with square', () => {
    const result = mq.square(1, null, 2, null, null, 4);
    expect(css(result)).toMatchSnapshot();
  });
});

describe('Chaining form', () => {
  test('with css', () => {
    const result = mq(
      css`
        width: 100%;
      `,
      css`
        width: 18rem;
      `
    );
    expect(css(result)).toMatchSnapshot();
  });

  test('with plain object', () => {
    const result = mq({ width: '100%' }, { width: '18rem' });
    expect(css(result)).toMatchSnapshot();
  });
});

describe('Compact form', () => {
  test('with plain object', () => {
    const result = mq({
      width: ['100%', 18, 24, 32, 44, 54, 72],
      background: ['red', null, 'blue', null, null, 'green']
    });
    expect(css(result)).toMatchSnapshot();
  });
});

describe('Misc usage', () => {
  test('with customized unitless min-width', () => {
    const result = mq.w(40)({ width: '100%' });
    expect(css(result)).toMatchSnapshot();
  });

  test('with customized min-width', () => {
    const result = mq.w('640px')({ width: '100%' });
    expect(css(result)).toMatchSnapshot();
  });
  test('with customized unitless min-height', () => {
    const result = mq.h(40)({ width: '100%' });
    expect(css(result)).toMatchSnapshot();
  });

  test('with customized min-height', () => {
    const result = mq.h('640px')({ width: '100%' });
    expect(css(result)).toMatchSnapshot();
  });
});
