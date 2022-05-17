/**
 * Cache Redis
 */

'use strict'

const debug = require('debug')('app:redis')
const redis = require('redis')
const wrapper = require('co-redis')

const redisCfg = require('../config').redis
// const logger = require('../libs/logger.lib').getLogger()
const logger = require('../logger')
const instances = {}

/**
 * [RedisException]
 * @param {string} message
 */
function RedisException(message) {
  this.message = message
  this.name = 'RedisException'
  this.stack = new Error().stack
}

/**
 * [getClient]
 * @param  {string} server
 * @return {co-redis}
 */
exports.getClient = function getClient(server) {
  const cfg = redisCfg[server]
  if (!cfg) {
    throw new RedisException(`missing redis[${server}] config.`)
  }

  let instance = instances[server]
  if (!instance) {
    const client = redis.createClient(cfg)
    instance = wrapper(client)

    client.on('connect', () => {
      logger.info('redis[%s]: connected.', { server } )
    })

    client.on('error', err => {
      logger.error('redis[%s].error: ', { server , err })
    })

    instances[server] = instance
    debug('create redis[%s]: %j', server, cfg)
  }

  return instance
}

exports.disconnectAll = function disconnectAll() {
  Object.keys(instances).forEach(key => {
    const client = instances[key]
    client.quit()
    delete instances[key]
  })

  return Promise.resolve(true)
}
