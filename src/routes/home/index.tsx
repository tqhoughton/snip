import express from "express";
import { renderToStream } from "@kitajs/html/suspense";
import { Layout } from "src/common/Layout";
import { Home } from "./Home";

const router = express.Router();

router.get("/", async (req, res) => {
  renderToStream((rid) =>
    <Layout rid={rid} title="Snip" req={req}>
      <Home />
    </Layout>,
  ).pipe(res);
});

export default router;
