import { pgEnum, uuid, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
export const rolesEnum = pgEnum("roles", ["admin", "staff"]);

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  role: rolesEnum("role").notNull().default("admin"),
  auth_provider_id: varchar("auth_provider_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
