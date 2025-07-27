import express from "express";
import { renderToStream } from "@kitajs/html/suspense";
import { requiresAuth } from "express-openid-connect";
import z from "zod";
import assert from "assert";

import { ValidationError } from "src/utils/errors";
import { Layout } from "src/common/Layout";

import { EditPage } from "./EditPage";
import { SnippetsPage } from "./SnippetPage";
import { NewPage } from "./NewPage";

import {
  createSnippet,
  deleteSnippet,
  getSnippetById,
  updateSnippet,
} from "./queries";

const router = express.Router();

const snippetInput = z.object({
  fullPath: z.string().min(1, "Full path is required"),
  content: z.string().min(1, "Content is required"),
});

router.use(requiresAuth());

router.get("/new", async (req, res) => {
  renderToStream((rid) => (
    <Layout rid={rid} title="Create Snip" req={req}>
      <NewPage req={req} />
    </Layout>
  )).pipe(res);
});

router.get("/", async (req, res) => {
  renderToStream((rid) => (
    <Layout rid={rid} title="My Snips" req={req}>
      <SnippetsPage req={req} />
    </Layout>
  )).pipe(res);
});

router.get(
  "/*fullPath",
  async (req: express.Request<{ fullPath: string[] }>, res) => {
    const fullPath = req.params.fullPath.join("/");
    const isEditMode = req.query.mode === "edit";
    const component = isEditMode ? (
      <EditPage req={req} fullPath={fullPath} />
    ) : (
      <SnippetsPage req={req} fullPath={fullPath} />
    );

    renderToStream((rid) => (
      <Layout rid={rid} title="My Snips" req={req}>
        {component}
      </Layout>
    )).pipe(res);
  },
);

router.delete("/:snipId", async (req, res) => {
  assert(req.oidc.user);
  await deleteSnippet({ author: req.oidc.user.sub, snipId: req.params.snipId });

  res.setHeader("Hx-Redirect", `/snips`).send();
});

router.post("/", async (req, res) => {
  assert(req.oidc.user);
  const input = snippetInput.parse(req.body);

  try {
    const snippet = await createSnippet({
      ...input,
      language: "markdown",
      author: req.oidc.user.sub,
    });

    res.setHeader("HX-Redirect", `/snips/${snippet.fullPath}`).send();
  } catch (err) {
    if (!(err instanceof ValidationError)) throw err;

    renderToStream(() => (
      <NewPage req={req} init={{ error: err, values: input }} />
    )).pipe(res);
  }
});

router.put("/:snipId", async (req, res) => {
  assert(req.oidc.user);
  const input = snippetInput.parse(req.body);

  try {
    const snippet = await updateSnippet({
      id: req.params.snipId,
      author: req.oidc.user.sub,
      ...input,
    });

    res.setHeader("HX-Redirect", `/snips/${snippet.fullPath}`).send();
  } catch (err) {
    assert(req.oidc.user);
    if (!(err instanceof ValidationError)) throw err;
    const snippet = await getSnippetById(req.oidc.user.sub, req.params.snipId);

    renderToStream(() => (
      <EditPage
        fullPath={snippet.fullPath}
        req={req}
        init={{ error: err, values: input }}
      />
    )).pipe(res);
  }
});

export default router;
