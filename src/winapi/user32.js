/**
 * nomw
 * 
 * File...................user32.js
 * Created on.............Sunday, 31st December 2017 6:51:42 am
 * Created by.............Relative
 * 
 */
const ffi = require('./ffi')
const Flags = require('./flags')
const { promisify } = require('util')
if (typeof ffi.Library === 'null') module.exports = {}

class User32 {
  constructor(user32) {
    this.user32 = user32
    this.u32_messageBoxA = promisify(this.user32['MessageBoxA'].async)
  }

  /**
   * Show a message box (ANSI)
   * @param {Number} _ - I don't know
   * @param {String} message - Message
   * @param {String} caption - Caption
   * @param {Number} buttons - Buttons
   * @returns {Promise<Number>}
   */
  MessageBoxA(_, message, caption, buttons) {
    return this.u32_messageBoxA(_, message, caption, buttons)
  }
}
/**
 * @type {User32}
 */
module.exports = User32