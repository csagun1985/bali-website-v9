import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
export const siteContent = sqliteTable("site_content", {
  id: integer("id").primaryKey(), content: text("content").notNull(), updatedBy: text("updated_by"), updatedAt: text("updated_at").notNull(),
});
