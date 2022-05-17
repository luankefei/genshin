/**
 * 中间件 - 用户验证
 */

'use strict'

const lodash = require('lodash')
const querystring = require('querystring')

const wechatService = require('../services/wechat.service')
const logger = require('../logger')
const ROOT_PATH = 'sign-v3'

/**
 * 通过微信 openid 验证用户
 * @param  {string} routePath
 * @param {boolean} checkUserToken
 * @return {Generator}
 */
exports.wechat = function wechat(req, res) {
  const openid = req.cookies.wechat_openid
  const query = req.query
  const origin = 'https://' + req.headers.host
  const path = req.path

  if (!openid) {
    const newQuery = lodash.assign(
      {
        wx: 1
      },
      query
    )
    // state /sign-v3?wx=1#/me?a='success'
    const state = `${path}?${querystring.stringify(newQuery)}`

    // tokenRedirectUrl http://localhost:8173/sign-v3/wx/token
    const tokenRedirectUrl = `${origin}/${ROOT_PATH}/wx/token`
    logger.info('mw.authorize.wechat:', { state, tokenRedirectUrl })
    // 2.2 匿名跳转微信
    let req = null
    try {
      logger.info('before redirect')
      req = res.redirect(wechatService.getAuthUrl(tokenRedirectUrl, state))
    } catch (e) {
      logger.error('mw.authorize.wechat:', { state, tokenRedirectUrl })
    }
    return req
  }
}
