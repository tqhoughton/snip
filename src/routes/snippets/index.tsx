import express from "express";
import { renderToStream } from "@kitajs/html/suspense";
import { Layout } from "src/common/Layout";
import { requiresAuth } from "express-openid-connect";
import { SnippetsPage } from "./SnippetsPage";
import { NewPage } from "./NewPage";
import z from "zod";
import assert from "assert";
import { createSnippet } from "./queries";

const router = express.Router();

const snippetInput = z.object({
  fullPath: z.string().min(1, "Full path is required"),
  content: z.string().min(1, "Content is required"),
});

router.use(requiresAuth());

router.get("/new", async (req, res) => {
  renderToStream(
    <Layout title="Snips" req={req}>
      <NewPage req={req} />
    </Layout>,
  ).pipe(res);
});

router.get("/", async (req, res) => {
  renderToStream(
    <Layout title="Snips" req={req}>
      <SnippetsPage req={req} />
    </Layout>,
  ).pipe(res);
});

router.get("/*fullPath", async (req, res) => {
  // express does not type greedy params by default
  assert('fullPath' in req.params && req.params.fullPath instanceof Array);
  renderToStream(
    <Layout title="Snips" req={req}>
      <SnippetsPage req={req} path={req.params.fullPath.join('/')} />
    </Layout>,
  ).pipe(res);
});

router.post("/", async (req, res) => {
  assert(req.oidc.user);
  const input = snippetInput.parse(req.body);

  const snippet = await createSnippet({
    ...input,
    language: "markdown",
    author: req.oidc.user.sub,
  });

  // TODO: implement
  res.setHeader("HX-Redirect", `/snips/${snippet.fullPath}`).send();
});

export default router;
