import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as dsql from "aws-cdk-lib/aws-dsql";

export interface DSQLDatabaseProps {
  name: string;
}

export class DSQLDatabase extends Construct {
  public readonly cluster: dsql.CfnCluster;
  constructor(scope: Construct, id: string, props: DSQLDatabaseProps) {
    super(scope, id);

    this.cluster = new dsql.CfnCluster(this, "DSQLCluster", {
      deletionProtectionEnabled: false,
      tags: [{ key: "Name", value: props.name }],
    });
  }
}
