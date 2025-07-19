import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as nodelambda from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";

export interface SchemaManagerLambdaProps {
  name: string;
  clusterArn: string;
  clusterIdentifier: string;
  entry: string;
  env?: Record<string, string>;
}

export class SchemaManagerLambda extends Construct {
  public readonly fn: nodelambda.NodejsFunction;

  constructor(scope: Construct, id: string, props: SchemaManagerLambdaProps) {
    super(scope, id);

    this.fn = new nodelambda.NodejsFunction(this, "SchemaManager", {
      functionName: props.name,
      environment: {
        ...props.env,
        DSQL_CLUSTER_ID: props.clusterIdentifier,
      },
      memorySize: 256,
      architecture: lambda.Architecture.ARM_64,
      runtime: lambda.Runtime.NODEJS_22_X,
      timeout: cdk.Duration.minutes(15),
      entry: props.entry,
      bundling: {
        bundleAwsSDK: true,
        commandHooks: {
          afterBundling: (inputDir: string, outputDir: string): string[] => [
            // bundle migration sql files so they can be read at runtime
            `cp -r ${inputDir}/src/migrations ${outputDir}`,
          ],
          beforeBundling: (): string[] => [],
          beforeInstall: (): string[] => [],
        },
      },
    });

    this.fn.addToRolePolicy(
      new cdk.aws_iam.PolicyStatement({
        actions: ["dsql:DbConnectAdmin"],
        resources: [props.clusterArn],
      }),
    );
  }
}
