/**
 * 微信服务
 */

'use strict'

const { stringify } = require('querystring')
const constants = require('constants')
const fetch = require('isomorphic-fetch')
const wechatConfig = require('../config').wechat
const logger = require('../logger')
/**
 * isWeChat user agent
 * @param  {string} ua
 * @return {boolean}
 */
exports.isWeChat = function isWeChat(ua) {
  return /MicroMessenger/.test(ua)
}

/**
 * 微信用户授权回调地址
 * @param  {number} source
 * @return {string}
 */
function getExUserAuthRedirectUrl(source) {
  return `http://${wechatConfig.domain}/api/user/external/webauth/callback/${source}/`
}

/**
 * 微信用户授权回调地址 - 显示授权
 * @param  {number} source
 * @param  {string} state
 * @return {string}
 */
exports.getUserAuthUrl = function getUserAuthUrl(source, state) {
  const query = stringify({
    appid: wechatConfig.appId,
    redirect_uri: getExUserAuthRedirectUrl(source),
    response_type: 'code',
    scope: 'snsapi_userinfo',
    state: state || ''
  })

  return `${wechatConfig.authBaseUrl}?${query}#wechat_redirect`
}

/**
 * 微信用户授权回调地址 - 匿名
 * @param  {string} redirectUri
 * @param  {string} state
 * @return {string}
 */
exports.getAuthUrl = function getAuthUrl(redirectUri, state) {
  const query = stringify({
    appid: wechatConfig.appId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'snsapi_base',
    state: state || ''
  })
  return `${wechatConfig.authBaseUrl}?${query}#wechat_redirect`
}

/**
 * 获取微信授权信息
 * @param  {string} code
 * @yield {Object}
 */
exports.getAuthToken = async function getAuthToken(code) {
  const query = stringify({
    appid: wechatConfig.appId,
    secret: wechatConfig.appSecret,
    code,
    grant_type: 'authorization_code'
  })
  const uri = `${wechatConfig.tokenBaseUrl}?${query}`
  const res = await fetch(uri, {method: 'POST'})

  return res.text() || null
}
