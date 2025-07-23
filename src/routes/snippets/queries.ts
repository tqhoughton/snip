import { and, eq } from "drizzle-orm";
import { getDrizzleClient } from "src/db/client";
import { snippet } from "src/db/schema";

export const createSnippet = async (input: typeof snippet.$inferInsert) => {
  const db = await getDrizzleClient();
  const [result] = await db.insert(snippet).values(input).returning();
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
