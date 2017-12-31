/**
 * nomw
 * 
 * File...................flags.js
 * Created on.............Sunday, 31st December 2017 7:11:12 am
 * Created by.............Relative
 * 
 */
module.exports = class Flags {
  /**
   * Parses a flag val into an int
   * @param {String} flagVal
   */
  pi(flagVal) {
    return parseInt(flagVal)
  }
  combine(...args) {
    let li
    for (const flag in args) {
      if (!args.hasOwnProperty(flag)) continue
      const f = args[flag]
      if (flag == 0) {
        li = f
        continue
      } else {
        li = li | f
        continue
      }
    }
    return li
  }
}