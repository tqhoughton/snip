import express from "express";
import { renderToStream } from "@kitajs/html/suspense";
import { Layout } from "src/common/Layout";
import { UnderConstruction } from "src/common/UnderConstruction";
import { requiresAuth } from "express-openid-connect";

const router = express.Router();

router.get("/", requiresAuth(), async (req, res) => {
  renderToStream(
    <Layout title="Under Construction" req={req}>
      <UnderConstruction />
    </Layout>,
  ).pipe(res);
});

export default router;
