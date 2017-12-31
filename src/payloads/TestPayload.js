/**
 * nomw
 * 
 * File...................TestPayload.js
 * Created on.............Sunday, 31st December 2017 3:46:08 am
 * Created by.............Relative
 * 
 */
const Payload = require('./Payload')

const logger = require('../Logger')
const utils = require('../Utils')

module.exports = class TestPayload extends Payload {
  constructor() {
    super('Test', 'A test payload', utils.makeDate(12, 31))
  }
  async run() {
    logger.debug('TestPayload ran')
  }
}
