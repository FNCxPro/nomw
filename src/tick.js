/**
 * nomw
 * 
 * File...................tick.js
 * Created on.............Sunday, 31st December 2017 4:38:26 am
 * Created by.............Relative
 * 
 */
const logger = require('./Logger')
const { Payload } = require('./payloads') // eslint-disable-line no-unused-vars
const { isDate } = require('util')

module.exports = async (payloads) => {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth()
  logger.debug(`${month + 1}-${day}`)
  /* eslint-disable */
  for (const _payload in payloads) {
    if (!Object.hasOwnProperty(payloads, _payload)) continue
    /**
     * @type {Payload}
     */
    const payload = payloads[_payload]
    if (payload.activated) continue

    const dates = payload.dates
    let activate = false
    if (typeof dates === 'object' && Array.isArray(dates)) {
      for (const d of dates) {
        if (!dates.hasOwnProperty(d)) continue
        if (d.getDate() == day && d.getMonth() == month) activate = true
      }
    } else if (isDate(dates)) {
      if (dates.getDate() == day && dates.getMonth() == month) activate = true
    }

    if (activate) {
      payload.activated = true
      try {
        const res = await payload.run()
        logger.debug(`${payload.name} activated!`, res)
      } catch (err) {
        logger.error(`${payload.name} failed to execute!`, err)
      }
    }
  }
  /* eslint-enable */
  logger.debug('Ticked!')
}
