/**
 * nomw
 * 
 * File...................Logger.js
 * Created on.............Sunday, 31st December 2017 3:06:02 am
 * Created by.............Relative
 * 
 */
const DEBUG = require('./config').debug

const chalk = require('chalk')

function NOOP() {}
class Logger {
  /**
   * Construct a new Logger
   * @param {Boolean} [debug=false] - Is the app running in debug mode?
   */
  constructor(debug) {
    this.isDebug = debug || DEBUG || false
    // backup console log functions
    console._log = console.log
    console._info = console.info
    console._warn = console.warn
    console._error = console.error
    if (!this.isDebug) { // replace console log functions with NOOP function
      console.log = console.info = console.warn = console.error = NOOP
    }
  }

  /**
   * Log a message to console
   * @param {String|Object} message - Message to log
   * @param {*} args 
   */
  log(message, ...args) {
    if (!this.isDebug) return
    console._log(`${chalk.blue('info:')}\t${chalk.white(message)}`, ...args)
  }

  /**
   * Log a debug message to console
   * @param {String|Object} message - Message to log
   * @param {*} args 
   */
  debug(message, ...args) {
    if (!this.isDebug) return
    console._log(`${chalk.magenta('debug:')}\t${chalk.white(message)}`, ...args)
  }

  /**
   * Log an info message to console
   * @param {String|Object} message - Message to log
   * @param {*} args 
   */
  info(message, ...args) {
    return this.log(message, ...args)
  }

  /**
   * Log a warning message to console
   * @param {String|Object} message - Message to log
   * @param {*} args 
   */
  warn(message, ...args) {
    if (!this.isDebug) return
    console._warn(`${chalk.yellow('warn:')}\t${chalk.white(message)}`, ...args)
  }

  /**
   * Log an error message to console
   * @param {String|Object} message - Message to log
   * @param {*} args 
   */
  error(message, ...args) {
    if (!this.isDebug) return
    console.error(`${chalk.bold.red('error:')}\t${chalk.white(message)}`, ...args)
  }
}

module.exports = new Logger(DEBUG)
