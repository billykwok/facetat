// @flow
import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: { file: 'lib/index.js', format: 'cjs', sourcemap: false },
  external: ['@emotion/core', '@emotion/css'],
  plugins: [
    peerDepsExternal(),
    commonjs({ include: 'node_modules/**', extensions: ['.js'] }),
    resolve({ extensions: ['.js'] }),
    babel({
      externalHelpers: true,
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    }),
    replace({
      ENVIRONMENT: JSON.stringify('production'),
      'process.env.NODE_ENV': () => JSON.stringify('production')
    }),
    terser({
      sourcemap: false,
      toplevel: true,
      compress: {
        arguments: true,
        booleans_as_integers: true,
        hoist_funs: true,
        passes: 3,
        toplevel: true
      }
    })
  ]
};
