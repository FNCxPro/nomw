/**
 * nomw
 * 
 * File...................MarijuanaPayload.js
 * Created on.............Sunday, 31st December 2017 3:46:08 am
 * Created by.............Relative
 * 
 */
const Payload = require('./Payload')

const logger = require('../Logger')
const utils = require('../Utils')

module.exports = class MarijuanaPayload extends Payload {
  constructor() {
    super('Marijuana', 'Shutsdown computer if you say you won\'t smoke the weeds', utils.makeDate(12, 31))
  }
  async run() {
    const res = utils.messageBox('Test message', 'Test caption')
    logger.debug(res)
    //utils.shutdown('Please don\'t turn your computer back on until you smoke the dank weeds', '260s')
  }
}
