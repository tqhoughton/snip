#!/usr/bin/env node
import "dotenv/config";
import * as cdk from "aws-cdk-lib";
import { SnipStack } from "../lib/infrastructure";

const app = new cdk.App();
new SnipStack(app, "SnipStack", {
  stackName: "snip-infra"
});
