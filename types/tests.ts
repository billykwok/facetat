import facetat from 'facetat';
import { css } from '@emotion/core';

const mq = facetat(
  { XS: 20, SM: 28, MD: 36, ML: 48, LG: 60, XL: 75 },
  { unit: 'rem' }
);

mq.XS`width: 100rem;`;

mq.XS(
  css`
    width: 100rem;
  `,
  { width: 100 }
);

mq.width(null, 100, '200rem');

mq(
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

mq({ width: '50px' }, { width: 100 }, { width: '200rem' });

mq({ width: ['50px', 100, '200rem'] });

mq.ajrlarajkw({ width: ['50px', 100, '200rem'] });
