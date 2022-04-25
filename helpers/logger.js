const chalk = require('chalk')

const log = console.log

const logger = {
  error: e => log(chalk.red(e)),
  info: message => log(chalk.bold(chalk.cyan('info')) + `  - ${message}`),
}

module.exports = logger
