import { and, eq } from "drizzle-orm";
import { getDrizzleClient } from "src/db/client";
import { snippet } from "src/db/schema";
import z from "zod";
import { logger } from "src/utils/logger";
import { ValidationError } from "src/utils/errors";

const ConstraintErrorSchema = z.object({
  cause: z.object({
    code: z.string(),
    constraint: z.string(),
    detail: z.string(),
  }),
});

function isUniqueConstraintError(
  error: unknown,
): error is z.infer<typeof ConstraintErrorSchema> {
  const result = ConstraintErrorSchema.safeParse(error);

  return result.success && result.data.cause.code === "23505"; // PostgreSQL unique violation code
}

const wrapWithDbErrors = async <T>(promise: Promise<T>): Promise<T> => {
  try {
    return await promise;
  } catch (error) {
    logger.error({ msg: "Database operation failed", error });
    if (isUniqueConstraintError(error)) {
      throw new ValidationError([
        { name: "fullPath", error: "Snippet with this path already exists." },
      ]);
    }
    throw error;
  }
};

export const createSnippet = async (input: typeof snippet.$inferInsert) => {
  const db = await getDrizzleClient();
  const [result] = await wrapWithDbErrors(
    db.insert(snippet).values(input).returning(),
  );
  return result;
};

export const getSnippetsByAuthor = async (
  author: string,
): Promise<(typeof snippet.$inferSelect)[]> => {
  const db = await getDrizzleClient();
  return db
    .select()
    .from(snippet)
    .where(eq(snippet.author, author))
    .orderBy(snippet.fullPath);
};

export const getSnippetById = async (author: string, snipId: string) => {
  const db = await getDrizzleClient();
  const [result] = await db
    .select()
    .from(snippet)
    .where(and(eq(snippet.id, snipId), eq(snippet.author, author)));
  return result || null;
};

export const getSnippetByPath = async (
  author: string,
  fullPath: string,
): Promise<typeof snippet.$inferSelect | null> => {
  const db = await getDrizzleClient();
  const [result] = await db
    .select()
    .from(snippet)
    .where(and(eq(snippet.fullPath, fullPath), eq(snippet.author, author)));
  return result || null;
};

export const deleteSnippet = async ({
  author,
  snipId,
}: {
  author: string;
  snipId: string;
}): Promise<void> => {
  const db = await getDrizzleClient();
  await db
    .delete(snippet)
    .where(and(eq(snippet.id, snipId), eq(snippet.author, author)));
};

type UpdateInput = Partial<typeof snippet.$inferInsert> & {
  id: string;
  author: string;
};

export const updateSnippet = async ({
  id: snipId,
  author,
  ...fields
}: UpdateInput) => {
  fields.updatedAt = new Date();

  const db = await getDrizzleClient();
  const [result] = await wrapWithDbErrors(
    db
      .update(snippet)
      .set(fields)
      .where(and(eq(snippet.id, snipId), eq(snippet.author, author)))
      .returning(),
  );

  return result;
};
