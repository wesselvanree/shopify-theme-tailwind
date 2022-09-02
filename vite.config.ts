import fg from 'fast-glob'
import { defineConfig } from 'vite'

export default defineConfig(({ command, mode, ssrBuild }) => ({
  build: {
    outDir: 'shopify/assets',
    assetsDir: '.',
    emptyOutDir: false,
    rollupOptions: {
      input: ['src/entries/*.{tsx,ts,jsx,js}', 'src/styles/*.css'],
      output: {
        dir: 'shopify/assets',
        entryFileNames: '[name].bundle.js',
        chunkFileNames: '[name].chunk.js',
        assetFileNames: '[name].min.[ext]',
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
