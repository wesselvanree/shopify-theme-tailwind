const clone = require('git-clone/promise')
const logger = require('../helpers/logger')
const {rm, renameIfExists, glob, mv} = require('../helpers/fs-utils')

const globAsync = function (pattern, options) {
  return new Promise((resolve, reject) => {
    glob(pattern, options, (err, files) =>
      err === null ? resolve(files) : reject(err),
    )
  })
}

/**
 * Tries to get the repo URL from the --repo command-line argument. It exits
 * the process if no --repo option has been found.
 *
 * @returns {false|string} false if no url has been found, the url of the repo otherwise
 */
function getRepoUrl() {
  const repo = process.argv
    .filter(arg => arg.startsWith('--repo='))?.[0]
    ?.substring(7)

  if (typeof repo !== 'string') {
    logger.error(
      'Error: could not find repo url in --repo command-line argument',
    )
    process.exitCode = 9
    return false
  }

  return repo
}

/**
 * Clone repo to shopify directory (replaces existing directory)
 */
async function installRepo() {
  const repo = getRepoUrl()

  if (!repo) return

  logger.info(`Cloning ${repo}`)
  await rm('shopify')
  await clone(repo, 'shopify')
    .then(async () => {
      glob('./shopify/{.github,.git,.vscode}').then(matches => {
        logger.info('Cleaning repo files')
        matches.forEach(rm)
      })

      glob('./shopify/.theme-check.yml').then(matches => {
        matches.forEach(async match => {
          logger.info(`Moving ${match} to project root`)
          await mv(match, match.slice(10))
        })
      })
    })
    .catch(logger.error)
}

/**
 * Rename .template files/directories
 */
async function moveTemplateFiles() {
  globAsync('*.template', {
    dot: true,
  }).then(matches => {
    if (matches.length > 0) {
      logger.info('Moving template files')
    }

    matches.forEach(async oldPath => {
      const newPath = oldPath.slice(0, -9)
      logger.info(`Renaming ${oldPath} to ${newPath}`)
      await renameIfExists(oldPath, newPath).catch(logger.error)
    })
  })
}

moveTemplateFiles()
installRepo()
