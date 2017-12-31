/**
 * nomw
 * 
 * File...................ffi.js
 * Created on.............Sunday, 31st December 2017 6:52:55 am
 * Created by.............Relative
 * 
 */
let ffi
try {
  ffi = require('ffi')
} catch(err) {
  return module.exports = undefined
}
module.exports = ffi