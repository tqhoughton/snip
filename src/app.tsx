import "dotenv/config";
import "@kitajs/html";
import express from "express";
import { renderToStream } from "@kitajs/html/suspense";
import { auth } from "express-openid-connect";
import bodyParser from "body-parser";

import { logger } from "src/common/logger";

const app = express();
const port = process.env["PORT"] || 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // for some reason https not detected in LWA apps
  // x-custom-domain-name is a custom header forwarded by cloudfront
  const baseURL = `${process.env.LAMBDA_TASK_ROOT ? "https" : req.protocol}://${req.header("x-custom-domain-name") || req.header("x-forwarded-host") || req.get("host")}`;
  logger.info({ baseUrl: baseURL });
  return auth({
    authRequired: false,
    baseURL,
  })(req, res, next);
});

app.use("/public", express.static("public"));

app.use((_req, res, next) => {
  // ⚠️ Charset utf8 is important to avoid old browsers utf7 xss attacks
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.type("text/html; charset=utf-8");

  return next();
});

app.get("/", async (req, res) => {
  renderToStream(<div>Hello World!</div>).pipe(res);
});

app.listen(port, () => {
  logger.info(`Example app listening at http://localhost:${port}`);
});

// SIGTERM Handler
process.on("SIGTERM", async () => {
  logger.info("[express] SIGTERM received");
  logger.info("[express] cleaning up");
  // Add any necessary cleanup here
  logger.info("[express] exiting");
  process.exit(0);
});
