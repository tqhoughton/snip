import { timestamp } from "drizzle-orm/pg-core";
import { text, pgTable, uuid } from "drizzle-orm/pg-core";

export const snippet = pgTable("snippet", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullPath: text("full_path").notNull(),
  content: text("content").notNull(),
  language: text("language").notNull(),
  author: text("author").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});
