import express from "express";
import { renderToStream } from "@kitajs/html/suspense";
import { Layout } from "src/common/Layout";
import { requiresAuth } from "express-openid-connect";
import { SnippetsPage } from "./SnippetsPage";
import { NewPage } from "./NewPage";

const router = express.Router();

router.use(requiresAuth())

router.get("/", async (req, res) => {
  renderToStream(
    <Layout title="Snips" req={req}>
      <SnippetsPage />
    </Layout>,
  ).pipe(res);
});

router.get("/new", async (req, res) => {
  renderToStream(
    <Layout title="Snips" req={req}>
      <NewPage />
    </Layout>,
  ).pipe(res);
});

router.post("/", async (req, res) => {
  // TODO: implement
  res.setHeader("HX-Redirect", "/snips").send();
})

export default router;
