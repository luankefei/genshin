/**
 * 配置项
 */

'use strict'

const debug = require('debug')('app:config')
const path = require('path')
const extend = require('lodash/extend')
const each = require('lodash/each')
const pkg = require('../package.json')

// 环境变量
const NODE_ENV = process.env.NODE_ENV || 'development'
const MODE = process.env.MODE || 'qa'

// START 微信相关
// 来也
const LAIYE = {
  appId: 'wx345f785a912f5d3d',
  appSecret: '21310e03c61daf7202d9e0e0e21d2828',
  domain: 'm.laiye.com'
}

// END 微信相关
// [redis:]//[user][:password@][host][:port][/db-number]
// [?db=db-number[&password=bar[&option=value]]]

const REDIS_CFG = {
  api: {
    // laiye-redis-1
    development: {
      host: 'r-2ze77c80f6864c64.redis.rds.aliyuncs.com',
      password: 'd0pCJ0FdY3BK818E8XWJhLn7',
      reconnect: true
    },
    // laiye-redis-1
    production: {
      host: 'r-2ze77c80f6864c64.redis.rds.aliyuncs.com',
      password: 'd0pCJ0FdY3BK818E8XWJhLn7',
      reconnect: true
    }
  }
}

const config = {
  version: pkg.version,
  name: pkg.name,
  root: path.resolve(__dirname, '../'),
  env: NODE_ENV,
  mode: MODE,
  debug: NODE_ENV === 'development' || MODE === 'qa',

  redis: {},
  wechat: {
    authBaseUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize',
    tokenBaseUrl: 'https://api.weixin.qq.com/sns/oauth2/access_token',
    appId: 'wx345f785a912f5d3d',
    appSecret: '21310e03c61daf7202d9e0e0e21d2828',
    domain: 'm.laiye.com'
  },
  userSource: {
    wechat: 1
  }
}

// merge redis
each(REDIS_CFG, (cfg, server) => {
  config.redis[server] = cfg[NODE_ENV] || cfg.development
})

module.exports = config
