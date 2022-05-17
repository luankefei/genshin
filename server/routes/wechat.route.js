/**
 * 微信
 */

'use strict'

const wechatService = require('../services/wechat.service')
const logger = require('../logger')

// 1 month
const MAX_AGE = 1000 * 3600 * 24 * 31

/**
 * 获取微信 token
 * @yield {*}
 */
exports.token = async function token(req, res) {
  const query = req.query
  if (!query.code && !query.state) {
    // logger.error('wechat.token missing required parameters.')
    throw(403, 'Missing required parameters.')
    return
  }

  // 获取微信 token
  let result = await wechatService.getAuthToken(query.code)
  result = JSON.parse(result)

  logger.info('getAuthToken res', { result })

  if (result && result.openid) {
    const cookieOpt = {
      httpOnly: false,
      maxAge: MAX_AGE,
      path: '/'
    }
    logger.info('set wechat_openid', { openid: result.openid })
    res.cookie('wechat_openid', result.openid, cookieOpt)
    res.redirect(query.state)
  }
}

