# facetat

[![npm version](https://badge.fury.io/js/facetat.svg)](https://badge.fury.io/js/facetat) [![download](https://badgen.net/npm/dm/facetat)](https://badgen.net/npm/dm/facetat) [![minified size](https://badgen.net/bundlephobia/min/facetat)](https://badgen.net/bundlephobia/min/facetat) [![GZip size](https://badgen.net/bundlephobia/minzip/facetat)](https://badgen.net/bundlephobia/minzip/facetat) [![Greenkeeper badge](https://badges.greenkeeper.io/billykwok/facetat.svg)](https://greenkeeper.io/) [![CircleCI](https://circleci.com/gh/billykwok/facetat/tree/master.svg?style=svg)](https://circleci.com/gh/billykwok/facetat/tree/master)

Like [facepaint](https://github.com/emotion-js/facepaint), but even more powerful.

## Usage

### Initialization

```javascript
import facetat from 'facetat';

// Initialize
const mq = facetat(
  // A map from string to number
  // { mobile: 1, phablet: 2, tablet: 3, laptop: 5, desktop: 6 }
  { XS: 1, SM: 2, MD: 3, LG: 5, XL: 6 },
  // The default unit when a unitless number is specified
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

### Compact form

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
