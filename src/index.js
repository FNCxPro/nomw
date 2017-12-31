/**
 * nomw
 * 
 * File...................index.js
 * Created on.............Sunday, 31st December 2017 1:46:36 am
 * Created by.............Relative
 * 
 */
const chalk = require('chalk')
const logger = require('./Logger')
const ms = require('ms')
const tick = require('./tick')
const _payloads = require('./payloads')

logger.debug(`Running in ${chalk.bold.magenta('debug')} mode`)

const payloads = []
for (const payload in _payloads) {
  if (!_payloads.hasOwnProperty(payload)) continue
  if (payload === 'Payload') continue
  const _payload = _payloads[payload]
  const pl = new _payload()

  payloads.push(pl)
  logger.debug(`Loaded payload ${chalk.bold.magenta(pl.name)} successfully`)
}

tick(payloads)
const timer = setInterval(
  tick, 
  ms('30s'), 
  payloads
)
logger.info('NOMW started successfully')
