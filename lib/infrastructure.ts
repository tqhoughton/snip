import * as cdk from "aws-cdk-lib";
import assert from "assert";
import path from "path";
import { Construct } from "constructs";
import { HttpService } from "./constructs/HttpService";

export class SnipStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    assert(process.env.ISSUER_BASE_URL);
    assert(process.env.CLIENT_ID);
    assert(process.env.SECRET);

    const service = new HttpService(this, "SnipService", {
      name: "snip-service",
      entry: path.resolve(__dirname, "../src/index.tsx"),
      env: {
        ISSUER_BASE_URL: process.env.ISSUER_BASE_URL,
        CLIENT_ID: process.env.CLIENT_ID,
        SECRET: process.env.SECRET,
      },
    });

    new cdk.CfnOutput(this, "SnipServiceHttpUrl", {
      value: service.fnUrl.url,
    });
  }
}
