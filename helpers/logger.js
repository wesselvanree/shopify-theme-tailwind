const logger = {
  error: e => console.log('error - ' + e),
  info: message => console.log(`info  - ${message}`),
}

module.exports = logger
