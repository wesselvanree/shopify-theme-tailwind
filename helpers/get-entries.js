const glob = require('glob')

/**
 * Get js,jsx,ts,tsx Webpack entries from the entriesRoot directory. If an index.{js,jsx,ts,tsx}
 * file is located in a subdirectory of entriesRoot, the parent directory path will be used for the
 * target bundle filename.
 *
 * @param {string} entriesRoot root directory for Webpack entries
 * @param {string} sep directory name separator
 * @returns {Record<string, string>} entries to bundle to the assets directory
 */
const getEntries = (entriesRoot = './src/entries', sep = '_') => {
  const removeExtension = filename => filename.replace(/.[^/.]+$/, '')
  const nestedIndexEnd = `${sep}index`

  return glob
    .sync(`${entriesRoot}/**/*.{js,jsx,ts,tsx}`)
    .reduce((prev, file) => {
      let name = removeExtension(file)
        .replace(`${entriesRoot}/`, '')
        .split('/')
        .join(sep)

      if (name.endsWith(nestedIndexEnd)) {
        // use parent directory name if filename is index.{js,jsx,ts,tsx} in child directory
        name = name.slice(0, -nestedIndexEnd.length)
      }

      return {...prev, [name]: file}
    }, {})
}

module.exports = getEntries
