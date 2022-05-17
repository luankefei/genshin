/* eslint consistent-return: 0 */
const next = require("next");
const express = require("express");
const fs = require("fs");
const { join } = require("path");
const { parse } = require("url");
const proxy = require("express-http-proxy");
const cookieParser = require("cookie-parser");
const mime = require("mime-types");

// monitor
// const easyMonitor = require('easy-monitor')
// easyMonitor('sign-v3')
// const heapdump = require('heapdump')

const logger = require("./logger");
const wechat = require("./routes/wechat.route");
const argv = require("./argv");
const port = require("./port");
const authorizeMW = require("./middlewares/authorize.mw");

const isDev = process.env.MODE === "dev" && process.env.NODE_ENV === "development";
const isProxy = process.env.MODE === "proxy";

// const buildId = isProxy ?
//   null :
//   fs.readFileSync('./.next/BUILD_ID', 'utf8').toString();
// let number = 0

// heapdump.writeSnapshot('./snapshot/' + number + '.heapsnapshot');

// setInterval(function() {
//   number += 1

//   let filename = Date.now() + '.heapsnapshot';

//   heapdump.writeSnapshot('./snapshot/' + number + '.heapsnapshot');
//   // heapdump.writeSnapshot(path.join(__dirname, filename));
// }, 30 * 1000);

// heapdump.writeSnapshot('./snapshot/' + Date.now() + '.heapsnapshot');
// heapdump.writeSnapshot('./snapshot/' + Date.now() + '.heapsnapshot');

const app = next({
  dir: ".", // base directory where everything is, could move to src later
  dev: process.env.NODE_ENV === "development",
});

const handle = app.getRequestHandler();
let server;
app
  .prepare()
  .then(() => {
    server = express();
    server.use(cookieParser());

    logger.info("env: ", { mode: process.env.MODE, env: process.env.NODE_ENV });

    // dev:prod
    if (isDev || isProxy) {
      const proxyUri = !isDev || isProxy ? "tocpre.laiye.com" : "test.laiye.com";
      const mockUri = "http://rap2.laiye.com:38080"; // sign-v3 mock仓库地址
      // const proxyUri = 'test.a.laiye.com'
      // const proxyUri = '172.17.201.106:10046'  东勇的机器

      logger.info("proxy to: ", { proxyUri });

      server.use(
        /^\/image/,
        proxy("192.168.1.34:3001", {
          proxyReqPathResolver: (req) => require("url").parse(req.originalUrl).path,
        })
      );
      server.use(
        /^\/(api|group)/,
        proxy(proxyUri, {
          https: true,
          proxyReqPathResolver: (req) => require("url").parse(req.originalUrl).path,
        })
      );
      server.use(
        /^\/mock/,
        proxy(mockUri, {
          proxyReqPathResolver: (req) => "/app/mock/18" + require("url").parse(req.originalUrl).path,
        })
      );
    }

    // 微信回调获取 token
    // server.get("/sign-v3/wx/token", (req, res) => {
    //   logger.info("server wxtoken", { query: req.query });
    //   wechat.token(req, res);
    // });

    // If you need a backend, e.g. an API, add your custom backend-specific middleware here
    // app.use('/api', myApi);
    // server.use('/static', express.static('/static'))

    // In production we need to pass these values in instead of relying on webpack
    // setup(app, {
    //   outputPath: resolve(process.cwd(), 'build'),
    //   publicPath: '/'
    // })

    // get the intended host and port number, use localhost and port 3000 if not provided
    const customHost = argv.host || process.env.HOST;
    const host = customHost || null; // Let http.Server use its default IPv6/4 host

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all("*", async (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname, query = {} } = parsedUrl;

      let fileName = pathname.replace("/sign-v3", "");

      if (!isProxy && !isDev) {
        if (fileName.indexOf("sw.js") !== -1) {
          const filePath = join(__dirname, "..", ".next", "/sw.js");
          logger.info("find " + pathname);
          logger.info("find filePath " + filePath);
          return app.serveStatic(req, res, filePath);
        } else {
          await authorizeMW.wechat(req, res);
        }
      }

      // logger.info('server route default', { pathname, query })
      return app.render(req, res, fileName, query);
    });

    // Start your app.
    server.listen(port, host, (err) => {
      const prettyHost = customHost || "localhost";

      if (err) {
        return logger.error(err.error_detail);
      }

      logger.appStarted(port, prettyHost);
    });
  })
  .catch((err) => {
    console.log("An error occurred, unable to start the server");
    console.log(err);
  });
