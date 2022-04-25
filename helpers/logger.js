const chalk = require('chalk')

const log = console.log

const logger = {
  error: e => log(chalk.red(e)),
  info: message =>
    log(chalk.cyan(chalk.cyan('info') + chalk.gray(`     ${message}`))),
  success: message =>
    log(chalk.cyan(chalk.green('success') + chalk.gray(`  ${message}`))),
}

module.exports = logger
