import express from "express";
import { renderToStream } from "@kitajs/html/suspense";
import { Layout } from "src/common/Layout";
import { UnderConstruction } from "src/common/UnderConstruction";

const router = express.Router();

router.get("/", async (req, res) => {
  renderToStream(
    <Layout title="Under Construction" req={req}>
      <UnderConstruction />
    </Layout>,
  ).pipe(res);
});

export default router;
