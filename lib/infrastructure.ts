import * as cdk from "aws-cdk-lib";
import assert from "assert";
import path from "path";
import { Construct } from "constructs";

import { HttpService } from "./constructs/HttpService";
import { DSQLDatabase } from "./constructs/DSQL";
import { SchemaManagerLambda } from "./constructs/SchemaManager";

export class SnipStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    assert(process.env.ISSUER_BASE_URL);
    assert(process.env.CLIENT_ID);
    assert(process.env.SECRET);

    const db = new DSQLDatabase(this, "SnipDatabase", {
      name: "snip-db",
    });

    // TODO: remove
    console.log(db.cluster.attrIdentifier);
    console.log(db.cluster.attrResourceArn);

    const schemaManager = new SchemaManagerLambda(this, "SchemaManager", {
      name: "snip-db-schema-manager",
      clusterArn: db.cluster.attrResourceArn,
      clusterIdentifier: db.cluster.attrIdentifier,
      entry: path.resolve(__dirname, "../src/schemaManager.ts"),
    });

    const service = new HttpService(this, "SnipService", {
      name: "snip-service",
      clusterArn: db.cluster.attrResourceArn,
      clusterIdentifier: db.cluster.attrIdentifier,
      entry: path.resolve(__dirname, "../src/app.tsx"),
      env: {
        ISSUER_BASE_URL: process.env.ISSUER_BASE_URL,
        CLIENT_ID: process.env.CLIENT_ID,
        SECRET: process.env.SECRET,
      },
    });

    new cdk.CfnOutput(this, "SnipServiceHttpUrl", {
      value: service.fnUrl.url,
    });

    new cdk.CfnOutput(this, "SnipDbArn", {
      value: db.cluster.attrResourceArn,
    });
  }
}
