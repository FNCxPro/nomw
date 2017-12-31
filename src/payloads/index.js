/**
 * nomw
 * 
 * File...................index.js
 * Created on.............Sunday, 31st December 2017 3:46:33 am
 * Created by.............Relative
 * 
 */
const klaw = require('klaw-sync')
const os = require('os')
const path = require('path')

const paths = klaw(path.resolve(__dirname))
const Payload = require('./Payload')

/**
 * Payloads
 * @typedef {Object} Payloads
 * @prop {Payload} Payload
 * @prop {Payload} TestPayload
 */

const delim = os.platform() === 'win32' ? '\\' : '\/'

/**
 * Payloads
 * @type {Payloads}
 */
const payloads = {}
for (const path of paths) {
  const p = require(path.path)
  const spl = path.path.split(delim)
  const last = spl[spl.length - 1]
  const name = last.slice(0, -3)

  if (last === 'index.js') continue
  
  if (last === 'Payload.js') {
    payloads.Payload = p
    continue
  } else {
    payloads[name] = p
  }
}

/**
 * Payloads
 * @type {Payloads}
 */
module.exports = payloads
