import "dotenv/config";
import "@kitajs/html";
import express, { ErrorRequestHandler } from "express";
import { auth } from "express-openid-connect";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { logger } from "src/utils/logger";
import homeRouter from "src/routes/home";
import settingsRouter from "src/routes/settings";
import snippetsRouter from "src/routes/snippets";
import { Layout } from "./common/Layout";
import { ErrorPage } from "./common/ErrorPage";
import { renderToStream } from "@kitajs/html/suspense";
import { NotFoundPage } from "./common/NotFoundPage";
import { isHttpError } from "http-errors";
import { ValidationError } from "./utils/errors";
import { closeDbConnection } from "./db/client";

const app = express();
const port = process.env["PORT"] || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  // for some reason https not detected in LWA apps
  // x-custom-domain-name is a custom header forwarded by cloudfront
  const protocol = process.env.LAMBDA_TASK_ROOT ? "https" : req.protocol;
  const host =
    req.header("x-custom-domain-name") ||
    req.header("x-forwarded-host") ||
    req.get("host");
  const baseURL = `${protocol}://${host}`;

  return auth({
    authRequired: false,
    baseURL,
  })(req, res, next);
});

app.use("/public", express.static("public"));

app.use((_req, res, next) => {
  // ⚠️ charset utf8 is important to avoid old browsers utf7 xss attacks
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.type("text/html; charset=utf-8");

  return next();
});

app.use("/", homeRouter);
app.use("/settings", settingsRouter);
app.use("/snips", snippetsRouter);

// catch-all route for 404 errors
app.use((req, res) => {
  const component = (rid: string | number) => (
    <Layout
      rid={rid}
      req={req}
      title="Not Found"
      children={<NotFoundPage />}
    />
  );

  renderToStream(component).pipe(res);
});

const errorHandler: () => ErrorRequestHandler =
  () => (error: Error, req, res, _next) => {
    logger.error({ error, msg: "encountered error in error handler" });

    // do not expose internal errors to the user
    if (!isHttpError(error) || !(error instanceof ValidationError)) {
      error = new Error("Internal Server Error");
    }

    const component = (rid: string | number) =>
      req.method === "GET" ? (
        <Layout
          rid={rid}
          req={req}
          title="Oops!"
          children={<ErrorPage error={error} />}
        />
      ) : (
        <ErrorPage error={error} />
      );

    renderToStream(component).pipe(res);
  };

app.use(errorHandler());

app.listen(port, () => {
  logger.debug(`Example app listening at http://localhost:${port}`);
});

// SIGTERM Handler
process.on("SIGTERM", async () => {
  logger.debug("[express] SIGTERM received");
  logger.debug("[express] cleaning up");
  // add any necessary cleanup here
  await closeDbConnection();

  logger.debug("[express] exiting");
  process.exit(0);
});
