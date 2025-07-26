import express from "express";
import assert from "assert";
import { renderToStream } from "@kitajs/html/suspense";
import { Layout } from "src/common/Layout";
import { SettingsPage } from "./SettingsPage";

import { deleteAccount } from "./queries";

const router = express.Router();

router.get("/", async (req, res) => {
  renderToStream((rid) => (
    <Layout rid={rid} title="Settings" req={req}>
      <SettingsPage />
    </Layout>
  )).pipe(res);
});

router.delete("/account", async (req, res) => {
  assert(req.oidc.user);
  await deleteAccount(req.oidc.user.sub);
  res.setHeader("HX-Redirect", "/logout").status(204).end();
});

export default router;
