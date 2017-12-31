/**
 * nomw
 * 
 * File...................entry.js
 * Created on.............Sunday, 31st December 2017 4:07:51 am
 * Created by.............Relative
 * 
 */
try {
  global.config = require('./config') // eslint-disable-line
} catch (err) { process.exit(5) }

try {
  require('./index') // eslint-disable-line
} catch (err) {
  if (global.config.debug) {
    console.error('ENTRY POINT ERROR!!!!!!!!!!!!!!')
    console.error('Error loading NOMW')
    console.error(err)
    console.error('The above messages will not display in production, this binary was built in debug mode')
  }
  process.exit(1)
}
