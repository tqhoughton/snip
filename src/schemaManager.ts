import "dotenv/config";
import { Client } from "pg";
import { eq } from "drizzle-orm";
import { logger } from "src/common/logger";
import { snippet } from "./db/schema";
import { getDrizzleClient } from "./db/client";
import fs from "fs/promises";
import path from "path";

const getAllMigrations = async function () {
  const migrationsDir = path.join(__dirname, "./migrations");
  const files = await fs.readdir(migrationsDir);

  const migrations = files
    .filter((file) => file.endsWith(".sql"))
    .map(async (file) => fs.readFile(path.join(migrationsDir, file), "utf-8"));

  return Promise.all(migrations);
};

export const handler = async () => {
  let client: Client | undefined;

  try {
    const db = await getDrizzleClient();
    client = db.$client;

    // extremely primitive migration system since there are no
    // migration or schema management tools for DSQL (yet)
    const migrations = await getAllMigrations();
    for (const migration of migrations) {
      logger.info("Running migration: ", migration);
      await db.execute(migration);
    }

    // test snippet schema insertion and deletion
    await db.insert(snippet).values({
      content: "# Hello World!" + "\n" + "this is cool!",
      fullPath: "test/text.md",
      language: "markdown",
    });

    const snippets = await db.select().from(snippet);

    await db.delete(snippet).where(eq(snippet.fullPath, "test/text.md"));

    return snippets;
  } catch (error) {
    logger.error(error);
    return error;
  } finally {
    client?.end();
  }
};

if (require.main === module) {
  handler()
    .then((result) => {
      logger.info("Migrations completed successfully", result);
      process.exit(0);
    })
    .catch((error) => {
      logger.error(
        "Error encountered while attempting to run migrations",
        error,
      );
      process.exit(1);
    });
}
