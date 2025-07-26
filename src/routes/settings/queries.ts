import { eq } from "drizzle-orm";
import { getDrizzleClient } from "src/db/client";
import { snippet } from "src/db/schema";

export const deleteAccount = async (userId: string) => {
  const db = await getDrizzleClient();

  await db.delete(snippet).where(eq(snippet.author, userId));
};
