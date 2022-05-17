// const path = require('path')
// const express = require('express')
// const proxy = require('express-http-proxy')
// const compression = require('compression')
// const isDev = process.env.NODE_ENV !== 'production'
// const isProxy = process.env.MODE === 'proxy'

// module.exports = function addProdMiddlewares(app, options) {
//   const publicPath = options.publicPath || '/'
//   const outputPath = options.outputPath || path.resolve(process.cwd(), 'build')

//   // compression middleware compresses your server responses which makes them
//   // smaller (applies also to assets). You can read more about that technique
//   // and other good practices on official Express.js docs http://mxs.is/googmy
//   app.use(compression())
//   app.use(publicPath, express.static(outputPath))

//   // dev:prod
//   // if (isDev || isProxy) {
//   const proxyUri = isProxy ? 'm.laiye.com' : 'test.laiye.com'
//   // const proxyUri = '101.200.177.95addProdMiddlewares'
//   // const proxyUri = 'm.laiye.com'

//   console.log('proxy to: ', proxyUri)

//   app.use(/^\/(api|group)/, proxy(proxyUri, {
//     https: true,
//     proxyReqPathResolver: function(req) {
//       // console.log('proxy: ', req, require('url').parse(req.originalUrl).path)
//       return require('url').parse(req.originalUrl).path
//     }
//   }))
//   // }

//   app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')))
// }
