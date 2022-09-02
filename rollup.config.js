import * as fg from 'fast-glob'
import {defineConfig} from 'rollup'
import swc from 'rollup-plugin-swc'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

export default defineConfig({
  input: 'src/entries/*.{tsx,ts,jsx,js}',
  output: {
    dir: 'shopify/assets',
    entryFileNames: '[name].bundle.js',
  },
  external: [],
  plugins: [
    // keep the console output minimal
    {
      name: 'glob-input',
      options(options) {
        return {...options, input: fg.sync(options.input)}
      },
    },
    commonjs(),
    resolve(),
    swc(),
  ],
})
