/**
 * nomw
 * 
 * File...................index.js
 * Created on.............Sunday, 31st December 2017 7:47:37 am
 * Created by.............Relative
 * 
 */
const ffi = require('./ffi')
const Flags = require('./flags')
const { promisify } = require('util')
if (typeof ffi.Library === 'null') module.exports = {}
const ffi_user32 = ffi.Library('user32', {
  MessageBoxA: ['int32', ['int32', 'string', 'string', 'int32']]
})
const User32 = require('./user32')

/**
 * @typedef {Object} WinAPI
 * @prop {User32} User32
 */

/**
 * @type {WinAPI}
 */
module.exports = {
  User32: new User32(ffi_user32)
}