import fg from 'fast-glob'
import { defineConfig } from 'vite'

export default defineConfig(({ command, mode }) => ({
  build: {
    outDir: 'shopify/assets',
    assetsDir: '.',
    emptyOutDir: false,
    rollupOptions: {
      input: ['src/entries/*.{tsx,ts,jsx,js}'],
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
            const inputs = typeof options.input === 'string' ? [options.input] : options.input

            return Array.isArray(inputs)
              ? { ...options, input: inputs.flatMap((input) => fg.sync(input)) }
              : null
          },
        },
      ],
    },
  },
  plugins: [],
}))
