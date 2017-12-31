/**
 * nomw
 * 
 * File...................flags.js
 * Created on.............Sunday, 31st December 2017 7:11:12 am
 * Created by.............Relative
 * 
 */
class Flags {
  constructor() {
    this.MB_ABORTRETRYIGNORE = this.pi('0x00000002L')
    this.MB_CANCELTRYCONTINUE = this.pi('0x00000006L')
    this.MB_HELP = this.pi('0x00004000L')
    this.MB_OK = this.pi('0x00000000L')
    this.MB_OKCANCEL = this.pi('0x00000001L')
    this.MB_RETRYCANCEL = this.pi('0x00000005L')
    this.MB_YESNO = this.pi('0x00000004L')
    this.MB_YESNOCANCEL = this.pi('0x00000003L')

    this.MB_ICONEXCLAMATION = this.pi('0x00000030L')
    this.MB_ICONWARNING = this.pi('0x00000030L')
    this.MB_ICONINFORMATION = this.pi('0x00000040L')
    this.MB_ICONASTERISK = this.pi('0x00000040L')
    this.MB_ICONQUESTION = this.pi('0x00000020L')
    this.MB_ICONSTOP = this.pi('0x00000010L')
    this.MB_ICONERROR = this.pi('0x00000010L')
    this.MB_ICONHAND = this.pi('0x00000010L')

    this.MB_APPLMODAL = this.pi('0x00000000L')
    this.MB_SYSTEMMODAL = this.pi('0x00001000L')
    this.MB_TASKMODAL = this.pi('0x00002000L')

    this.MB_DEFAULT_DESKTOP_ONLY = this.pi('0x00020000L')
    this.MB_RIGHT = this.pi('0x00080000L')
    this.MB_RTLREADING = this.pi('0x00100000L')
    this.MB_SETFOREGROUND = this.pi('0x00010000L')
    this.MB_TOPMOST = this.pi('0x00040000L')
    this.MB_SERVICE_NOTIFICATION = this.pi('0x00200000L')

    this.MB_BTN_ABORT = 3
    this.MB_BTN_CANCEL = 2
    this.MB_BTN_CONTINUE = 11
    this.MB_BTN_IGNORE = 5
    this.MB_BNT_NO = 7
    this.MB_BTN_OK = 1
    this.MB_BTN_RETRY = 4
    this.MB_BTN_TRY_AGAIN = 10
    this.MB_BTN_YES = 6
  }
  /**
   * Parses a flag val into an int
   * @param {String} flagVal
   */
  pi(flagVal) {
    return parseInt(flagVal)
  }
  
  /**
   * Combine some flags
   * @param {Number[]} args - Flags to combine
   */
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
module.exports = new Flags()