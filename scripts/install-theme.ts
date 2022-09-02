import fg from 'fast-glob'
import * as fs from 'fs/promises'
import shell from 'shelljs'

const logger = {
  error: (e: string) => console.log('error - ' + e),
  info: (message: string) => console.log(`info  - ${message}`),
}

Promise.all([installRepo(), moveTemplateFiles()])
  .then(() => logger.info('Installed theme!'))
  .catch(logger.error)

/**
 * Clone repo to shopify directory (replaces existing directory)
 */
async function installRepo() {
  const repo = getRepoUrlFromArgs()

  logger.info(`Cloning ${repo}`)

  return await rm('shopify')
    .then(() => shell.exec(`git clone ${repo}`))
    .then(() => {
      const cleanupPromise = fg('./shopify/{.github,.git,.vscode}').then((matches) => {
        logger.info('Cleaning repo files')
        matches.forEach(rm)
      })

      const mvPromise = fg('./shopify/.theme-check.yml').then((matches) => {
        matches.forEach(async (match) => {
          logger.info(`Moving ${match} to project root`)
          await fs.rename(match, match.slice(10))
        })
      })

      return Promise.all([cleanupPromise, mvPromise])
    })
}

/**
 * Tries to get the repo URL from the --repo command-line argument. It exits
 * the process if no --repo option has been found.
 *
 * @returns {false|string} false if no url has been found, the url of the repo otherwise
 */
function getRepoUrlFromArgs() {
  const repo = process.argv.filter((arg) => arg.startsWith('--repo='))?.[0]?.substring(7)

  if (typeof repo !== 'string') {
    logger.error('Error: could not find repo url in --repo command-line argument')
    shell.exit(9)
  }

  return repo
}

/**
 * Rename .template files/directories
 */
async function moveTemplateFiles() {
  return await fg('*.template', {
    dot: true,
  }).then((matches) => {
    if (matches.length > 0) {
      logger.info('Moving template files')
    }

    matches.forEach(async (oldPath) => {
      const newPath = oldPath.slice(0, -9)
      logger.info(`Renaming ${oldPath} to ${newPath}`)
      await mvIfExists(oldPath, newPath).catch(logger.error)
    })
  })
}

async function mvIfExists(oldPath: string, newPath: string) {
  return await fs
    .access(oldPath)
    .then(async () => await fs.rename(oldPath, newPath))
    .catch(logger.error)
}

if (!shell.which('git')) {
  logger.error('This script requires git to be installed')
  shell.exit(1)
}

async function rm(path: string) {
  return await fs.rm(path, {
    force: true,
    recursive: true,
  })
}
