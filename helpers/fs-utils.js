const fs = require('fs/promises')
const logger = require('./logger')
const {promisify} = require('util')
const globSync = require('glob')

const rm = async path =>
  await fs.rm(path, {
    force: true,
    recursive: true,
  })

const renameIfExists = async (oldPath, newPath) =>
  await fs
    .access(oldPath)
    .then(async () => await fs.rename(oldPath, newPath))
    .catch(logger.error)

const mv = promisify(fs.rename)

const glob = promisify(globSync)

module.exports = {
  rm,
  renameIfExists,
  mv,
  glob,
}
