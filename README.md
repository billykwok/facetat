# facetat

[![npm version](https://badge.fury.io/js/facetat.svg)](https://www.npmjs.com/package/facetat) [![download](https://badgen.net/npm/dm/facetat)](https://www.npmjs.com/package/facetat) [![minified size](https://badgen.net/bundlephobia/min/facetat)](https://bundlephobia.com/result?p=facetat@1.1.4) [![GZip size](https://badgen.net/bundlephobia/minzip/facetat)](https://bundlephobia.com/result?p=facetat@1.1.4) [![Greenkeeper badge](https://badges.greenkeeper.io/billykwok/facetat.svg)](https://github.com/billykwok/facetat) [![CircleCI](https://circleci.com/gh/billykwok/facetat/tree/master.svg?style=svg)](https://circleci.com/gh/billykwok/facetat/tree/master)

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
// Emotion css object
import { css } from '@emotion/core';
const style = mq.XS(css`width: 100px;`);

// Shortcut of the above
const style = mq.XS`width: 100px;`;

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
const style = mq.width(null, 100, 200);
```

### Chaining Form

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
// Emotion css object
const style = mq(
  css`width: 100px;`,
  css`width: 200px;`
);

// Plain Javascript object
const style = mq(
  { width: 100 },
  { width: 200 }
);
```

### Compact Form

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
const style = mq({ width: [100, 200] });
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

You are more than welcome to add more functionalities, improve documentation, fix bugs, and anything you think is needed. The build step is pretty self-explanatory. Please refer to [`package.json`](https://github.com/billykwok/facetat/blob/master/package.json).

## License

MIT
