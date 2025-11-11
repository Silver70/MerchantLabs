import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
  boolean,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

export const mediaTypeEnum = pgEnum("media_type", ["image", "video", "file"]);

export const mediaTable = pgTable("media", {
  id: uuid("id").defaultRandom().primaryKey(),
  url: text("url").notNull(),
  type: mediaTypeEnum("type").notNull().default("image"),
  altText: text("alt_text"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const productMediaTable = pgTable(
  "product_media",
  {
    productId: uuid("product_id")
      .notNull()
      .references(() => require("./catalog").productsTable.id, {
        onDelete: "cascade",
      }),
    mediaId: uuid("media_id")
      .notNull()
      .references(() => mediaTable.id, { onDelete: "cascade" }),
    position: integer("position").notNull(),
    isPrimary: boolean("is_primary").notNull().default(false),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.productId, table.mediaId] }),
  })
);

export const productVariantMediaTable = pgTable(
  "product_variant_media",
  {
    productVariantId: uuid("product_variant_id")
      .notNull()
      .references(() => require("./catalog").productVariantsTable.id, {
        onDelete: "cascade",
      }),
    mediaId: uuid("media_id")
      .notNull()
      .references(() => mediaTable.id, { onDelete: "cascade" }),
    position: integer("position").notNull(),
    isPrimary: boolean("is_primary").notNull().default(false),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.productVariantId, table.mediaId] }),
  })
);
