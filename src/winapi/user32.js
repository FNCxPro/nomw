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

class MBFlags extends Flags {
  constructor() {
    super()
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
}

class User32 {
  constructor(user32) {
    this.user32 = user32
    this.u32_messageBoxA = promisify(this.user32['MessageBoxA'].async)
    flags = new MBFlags()
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
module.exports = new User32(ffi.Library('user32', {
  MessageBoxA: ['int32', ['int32', 'string', 'string', 'int32']]
}))