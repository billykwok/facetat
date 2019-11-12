# facetat

[![npm version](https://badgen.net/npm/v/facetat)](https://www.npmjs.com/package/facetat)
[![download](https://badgen.net/npm/dm/facetat)](https://www.npmjs.com/package/facetat)
[![minified size](https://badgen.net/bundlephobia/min/facetat)](https://bundlephobia.com/result)
[![GZip size](https://badgen.net/bundlephobia/minzip/facetat)](https://bundlephobia.com/result)
[![Greenkeeper badge](https://badges.greenkeeper.io/billykwok/facetat.svg)](https://github.com/billykwok/facetat)
[![codecov](https://codecov.io/gh/billykwok/facetat/branch/master/graph/badge.svg)](https://codecov.io/gh/billykwok/facetat)
[![License](https://badgen.net/npm/license/facetat)](https://github.com/billykwok/facetat/blob/master/LICENSE)
[![CircleCI](https://circleci.com/gh/billykwok/facetat/tree/master.svg?style=svg)](https://circleci.com/gh/billykwok/facetat/tree/master)

A neat and efficient way to write responsive styles for CSS-in-Js libraries.

Like [facepaint](https://github.com/emotion-js/facepaint), but even more powerful.

## Usage

### Initialization

```javascript
import facetat from 'facetat';

// Initialize
const mq = facetat(
  // A breakpoint map from string to number that can be of any size.
  // You can name them anything as your want.
  // e.g. { mobile: 1, phablet: 2, tablet: 3, laptop: 5, desktop: 6 }
  { XS: 1, SM: 2, MD: 3, LG: 5, XL: 6 },
  // The default unit when a unitless number is specified.
  // Accept rem, em, px, or other valid css units
  { unit: 'rem' }
);
```

### Single-media Form

```javascript
// Expected Result:
//
// @media (min-width: 1rem) {
//   [className] {
//     width: 100rem;
//   }
// }

// Usage:
//
// CSS function from any CSS-in-Js libraries, for example, emotion
import { css } from '@emotion/core';

const style = mq.XS(
  css`
    width: 100rem;
  `
);

// Shortcut of the above
const style = mq.XS`width: 100rem;`;

// Plain Javascript object
const style = mq.XS({ width: 100 });
```

### Single-property Form

```javascript
// Expected Result:
//
// @media (min-width: 1rem) {
//   [className] {
//     width: 100rem;
//   }
// }
// @media (min-width: 1rem) and (max-width: 2rem) {
//   [className] {
//     width: 200rem;
//   }
// }

// Usage:
//
// Plain Javascript object
const style = mq.width(null, 100, '200rem');
```

### Chaining Form

```javascript
// Expected Result:
//
// [className] {
//   width: 50px;
// }
// @media (min-width: 1rem) {
//   [className] {
//     width: 100rem;
//   }
// }
// @media (min-width: 1rem) and (max-width: 2rem) {
//   [className] {
//     width: 200rem;
//   }
// }

// Usage:
//
// Emotion css object
const style = mq(
  css`
    width: 50px;
  `,
  css`
    width: 100rem;
  `,
  css`
    width: 200rem;
  `
);

// Plain Javascript object
const style = mq({ width: '50px' }, { width: 100 }, { width: '200rem' });
```

### Compact Form

```javascript
// Expected Result:
//
// [className] {
//   width: 50px;
// }
// @media (min-width: 1rem) {
//   [className] {
//     width: 100rem;
//   }
// }
// @media (min-width: 1rem) and (max-width: 2rem) {
//   [className] {
//     width: 200rem;
//   }
// }

// Usage:
//
const style = mq({ width: ['50px', 100, '200rem'] });
```

## Editor Support

### VSCode

When used with [typescript-styled-plugin](https://github.com/Microsoft/typescript-styled-plugin#configuration), please add `mq` to the list of formatting-eligible tagged template literals.

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "typescript-styled-plugin",
        "tags": ["styled", "css", "mq"]
      }
    ]
  }
}
```

## Support

This library has been continuously used in many of my personal projects, and is regarded as production-ready. In the foreseeable future, I will continuously maintain and support this library.

## Issues and Feedback

Please voice your opinion and report bugs in the [issues](https://github.com/billykwok/facetat/issues) sections of this GitHub project.

## Contributing

You are more than welcome to add more functionalities, improve documentation, fix bugs, and anything you think is needed. The build step is pretty self-explanatory. Please refer to [CONTRIBUTING.md](https://github.com/billykwok/facetat/blob/master/CONTRIBUTING.md) for more details.

## License

MIT
