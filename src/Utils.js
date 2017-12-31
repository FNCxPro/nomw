/**
 * nomw
 * 
 * File...................Utils.js
 * Created on.............Sunday, 31st December 2017 3:48:59 am
 * Created by.............Relative
 * 
 */

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
}
module.exports = new Utils()
