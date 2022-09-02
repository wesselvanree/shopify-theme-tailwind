import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import * as fg from 'fast-glob'
import {defineConfig, Plugin} from 'rollup'
import swc from 'rollup-plugin-swc'

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
])

function globInput(): Plugin {
  return {
    name: 'glob-input',
    options(options) {
      if (typeof options.input !== 'string' && !Array.isArray(options.input))
        throw new Error(
          'Please provide a glob string or list of glob strings as input in your rollup config',
        )

      const inputs =
        typeof options.input === 'string' ? [options.input] : options.input

      return {...options, input: inputs.flatMap(input => fg.sync(input))}
    },
  }
}
