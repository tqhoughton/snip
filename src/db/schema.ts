import { text, pgTable, uuid } from "drizzle-orm/pg-core";

export const snippet = pgTable("snippet", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullPath: text("full_path").notNull(),
  content: text("content").notNull(),
  language: text("language").notNull(),
});
