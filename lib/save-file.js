'use strict'

const fs = require('fs')
const { logger } = require('@vtfk/logger')

module.exports = options => {
  fs.writeFileSync(options.filePath, JSON.stringify(options.data, null, 2), error => {
    if (error) {
      logger('error', ['save-file', options.filePath, 'error', JSON.stringify(error)])
    } else {
      logger('info', ['save-file', options.filePath, 'success'])
    }
  })
}
