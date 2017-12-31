/**
 * nomw
 * 
 * File...................config.js
 * Created on.............Sunday, 31st December 2017 2:38:12 am
 * Created by.............Relative
 * 
 */
const fs = require('fs')
const path = require('path')

try {
  module.exports = fs.existsSync(path.resolve(__dirname, 'debug.json')) ? require('./debug.json') : require('./default.json')
} catch (err) {
  module.exports = {
    debug: true,
    __defaulted: true
  }
}
