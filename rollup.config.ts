import * as fg from 'fast-glob'
import {defineConfig, Plugin} from 'rollup'
import swc from 'rollup-plugin-swc'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'

function globInput(): Plugin {
  return {
    name: 'glob-input',
    options(options) {
      if (typeof options.input !== 'string')
        throw new Error('Please provide a glob string as input')

      return {...options, input: fg.sync(options.input)}
    },
  }
}

export default defineConfig([
  {
    input: 'src/entries/*.{tsx,ts,jsx,js}',
    output: {
      dir: 'shopify/assets',
      entryFileNames: '[name].bundle.js',
    },
    external: [],
    plugins: [globInput(), commonjs(), resolve(), swc()],
  },
  {
    input: 'src/styles/*.css',
    output: {
      dir: 'shopify/assets',
      entryFileNames: '[name].css',
    },
    plugins: [
      globInput(),
      postcss({
        extract: true,
      }),
    ],
  },
])
