import { defineConfig } from 'vite'
import fg from 'fast-glob'
import { resolve } from 'path'

export default defineConfig(({ command, mode, ssrBuild }) => ({
  server: {
    host: false,
  },
  build: {
    outDir: 'shopify/assets',
    assetsDir: '.',
    cssCodeSplit: false,
    rollupOptions: {
      input: 'src/entries/*.{tsx,ts,jsx,js}',
      output: {
        dir: 'shopify/assets',
        entryFileNames: '[name].bundle.js',
      },
      plugins: [
        {
          name: 'glob-input',
          options(options) {
            if (typeof options.input !== 'string' && !Array.isArray(options.input))
              throw new Error(
                'Please provide a glob string or list of glob strings as input in your rollup config'
              )

            const inputs = typeof options.input === 'string' ? [options.input] : options.input

            return { ...options, input: inputs.flatMap((input) => fg.sync(input)) }
          },
        },
      ],
    },
  },
  plugins: [],
}))
