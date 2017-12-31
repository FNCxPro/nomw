/**
 * nomw
 * 
 * File...................Payload.js
 * Created on.............Sunday, 31st December 2017 1:52:52 am
 * Created by.............Relative
 * 
 */
const logger = require('../Logger')

module.exports = class Payload {
  /**
   * Construct a new Payload
   * @param {String} name - Payload name
   * @param {String} description - Payload description
   * @param {Date[]|Date} dates - Dates, or singular date to activate the payload on
   */
  constructor(name, description, dates) {
    /**
     * Name of the payload
     * @type {String}
     */
    this.name = name

    /**
     * Description of the payload
     * @type {String}
     */
    this.description = description

    /**
     * Date(s) the payload should activate on
     * @type {Date[]|Date}
     */
    this.dates = dates

    /**
     * Whether the payload has activated yet this run or not
     * @type {Boolean}
     */
    this.activated = false
  }

  async run() {
    logger.warn(`No run function defined for payload ${this.name}`)
  }
}
