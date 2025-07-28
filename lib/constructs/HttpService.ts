import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as nodelambda from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";

export interface HttpServiceProps {
  name: string;
  entry: string;
  env?: Record<string, string>;
  clusterArn: string;
  clusterIdentifier: string;
}

export class HttpService extends Construct {
  public readonly fnUrl: lambda.IFunctionUrl;

  constructor(scope: Construct, id: string, props: HttpServiceProps) {
    super(scope, id);

    const httpService = new nodelambda.NodejsFunction(this, "HttpService", {
      functionName: props.name,
      environment: {
        ...props.env,
        DSQL_CLUSTER_ID: props.clusterIdentifier,
        RUST_LOG: "info",
        AWS_LAMBDA_EXEC_WRAPPER: "/opt/bootstrap",
        AWS_LWA_INVOKE_MODE: "response_stream",
      },
      memorySize: 256,
      architecture: lambda.Architecture.ARM_64,
      runtime: lambda.Runtime.NODEJS_22_X,
      timeout: cdk.Duration.seconds(29),
      entry: props.entry,
      handler: "run.sh",
      layers: [
        lambda.LayerVersion.fromLayerVersionArn(
          this,
          "LambdaWebAdapterLayer",
          `arn:aws:lambda:${cdk.Aws.REGION}:753240598075:layer:LambdaAdapterLayerArm64:22`,
        ),
      ],
      bundling: {
        nodeModules: ["jsdom"],
        // needed for dsql adapter
        bundleAwsSDK: true,
        commandHooks: {
          afterBundling: (inputDir: string, outputDir: string): string[] => [
            `cp ${inputDir}/src/run.sh ${outputDir}`,
            `cp -r ${inputDir}/public ${outputDir}`,
          ],
          beforeBundling: (): string[] => [],
          beforeInstall: (): string[] => [],
        },
        esbuildArgs: {
          "--log-override:ignored-bare-import": "silent",
        }
      },
    });

    httpService.addToRolePolicy(
      new cdk.aws_iam.PolicyStatement({
        actions: ["dsql:DbConnectAdmin"],
        resources: [props.clusterArn],
      }),
    );

    this.fnUrl = httpService.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      invokeMode: lambda.InvokeMode.RESPONSE_STREAM,
    });
  }
}
