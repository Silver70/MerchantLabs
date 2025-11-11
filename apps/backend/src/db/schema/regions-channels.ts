import {
  pgTable,
  uuid,
  text,
  timestamp,
  numeric,
  boolean,
  char,
  primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const regionsTable = pgTable("regions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  countryCodes: text("country_codes").array().notNull(),
  taxRate: numeric("tax_rate", { precision: 5, scale: 2 }).notNull(),
  taxCode: text("tax_code"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const channelsTable = pgTable("channels", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  regionId: uuid("region_id")
    .notNull()
    .references(() => regionsTable.id),
  currencyCode: char("currency_code", { length: 3 }).notNull(),
  taxInclusive: boolean("tax_inclusive").notNull().default(false),
  defaultLanguage: text("default_language"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const channelProductsTable = pgTable(
  "channel_products",
  {
    channelId: uuid("channel_id")
      .notNull()
      .references(() => channelsTable.id),
    productVariantId: uuid("product_variant_id").notNull(), // Will reference product_variants after table creation
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    isVisible: boolean("is_visible").notNull().default(true),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.channelId, table.productVariantId] }),
  })
);
