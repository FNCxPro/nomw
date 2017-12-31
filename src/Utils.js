/**
 * nomw
 * 
 * File...................Utils.js
 * Created on.............Sunday, 31st December 2017 3:48:59 am
 * Created by.............Relative
 * 
 */
const { exec } = require('child_process')
const os = require('os')
const logger = require('./Logger')
const ms = require('ms')
let ffi
let user32
global.ffiInstalled = false
try {
  ffi = require('ffi')
  user32 = ffi.Library('user32', {
    MessageBoxW: ['int32', ['int32', 'string', 'string', 'int32']]
  })
  global.ffiInstalled = true
} catch(err) {
  if (os.platform() === 'win32') {
    global.ffiInstalled = false
    logger.error('FFI isn\'t installed and a lot of functionality will be missing!')
  }
}
class Utils {
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
    exec(command, {
      windowsHide: true
    }, (err, stdout, stderr) => {
      if (err) return logger.error(`Failed to execute "${command}"`, err)
      const onData = (data) => {
        logger.info(data.toString())
      }
      stdout.on('data', onData)
      stderr.on('data', onData)
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
   * Display a message box on windows using FFI
   * @param {String} message - Message to display
   * @param {String} caption - Message box title
   * @param {Boolean} [convert=true] - Convert the strings into binary
   */
  async messageBox(message, caption, convert = true) {
    if (os.platform() !== 'win32' || !global.ffiInstalled) return
    if (convert) {
      message = this.convert(message, 'binary')
      caption = this.convert(caption, 'binary')
    }
    user32.MessageBoxW(0, message, caption, 1)
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
