// rollup.config.mjs
import terser from '@rollup/plugin-terser';
import { babel } from '@rollup/plugin-babel';

export default [
   {
      input: 'src/main.js',
      output: [
         {
            file: 'dist/site-color-schemes.js',
            format: 'es',
         },
         {
            file: 'dist/index.js',
            format: 'cjs',
         },
      ],
   },
   {
      input: 'src/main.js',
      output: [
         {
            file: 'dist/site-color-schemes.min.js',
            format: 'iife',
            name: 'siteColorSchemes',
         },
      ],
      plugins: [
         babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: [
               [
                  '@babel/env',
                  {
                     targets: '> 0.25%, not dead',
                     modules: false,
                     loose: true,
                     forceAllTransforms: true,
                  },
               ],
            ],
         }),
         terser(),
      ],
   },
];
