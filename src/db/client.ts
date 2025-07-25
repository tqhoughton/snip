import { DsqlSigner } from "@aws-sdk/dsql-signer";
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import assert from "assert";

// schema imports
import { snippet } from "./schema";

const initializeDbConnection = async () => {
  const endpoint = process.env.DSQL_CLUSTER_ID;
  const region = process.env.AWS_REGION;

  assert(endpoint, "DSQL_CLUSTER_ID is not set");
  assert(region, "AWS_REGION is not set");

  const clusterEndpoint = `${endpoint}.dsql.${region}.on.aws`;

  // The token expiration time is optional, and the default value 900 seconds
  const signer = new DsqlSigner({
    hostname: clusterEndpoint,
    region,
    expiresIn: 60 * 60, // 1hr
  });

  const token = await signer.getDbConnectAdminAuthToken();

  const client = new Client({
    host: clusterEndpoint,
    user: "admin",
    password: token,
    database: "postgres",
    port: 5432,
    ssl: true,
  });

  await client.connect();

  return drizzle(client, { schema: { snippet } });
};

const db = initializeDbConnection();

export const getDrizzleClient = async () => {
  return await db;
};
