import * as fs from 'fs/promises'
import shell from 'shelljs'

const logger = {
  error: (e: string) => console.log('error - ' + e),
  info: (message: string) => console.log(`info  - ${message}`),
}

if (!shell.which('git')) {
  logger.error('This script requires git to be installed')
  shell.exit(1)
}

Promise.all([installRepo(), moveTemplateFiles()]).catch(logger.error)

async function mv(oldPath: string, newPath: string) {
  return await fs
    .access(oldPath)
    .then(() => fs.rename(oldPath, newPath))
    .then(() => logger.info(`Renamed ${oldPath} to ${newPath}`))
}

async function rm(path: string) {
  return await fs
    .rm(path, {
      force: true,
      recursive: true,
    })
    .then(() => logger.info(`Removed ${path}`))
}

/**
 * Clone repo to shopify directory (replaces existing directory)
 */
async function installRepo() {
  const repo = process.argv.filter((arg) => arg.startsWith('--repo='))?.[0]?.substring(7)

  if (typeof repo !== 'string') {
    logger.error('Error: could not find repo url in --repo command-line argument')
    shell.exit(9)
  }

  return await rm('shopify')
    .then(() => shell.exec(`git clone ${repo} shopify`))
    .then(() =>
      ['.github', '.git', '.vscode', '.theme-check.yml'].map((path) => rm(`./shopify/${path}`))
    )
    .catch(() => {})
}

/**
 * Rename .template files/directories
 */
async function moveTemplateFiles() {
  logger.info('Moving template files...')
  return ['_github'].map((oldPath) => mv(oldPath, oldPath.replace('_', '.')).catch(() => {}))
}
