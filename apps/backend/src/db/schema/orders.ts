import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
  numeric,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "shipped",
  "cancelled",
]);

export const ordersTable = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: uuid("customer_id")
    .notNull()
    .references(() => require("./customers").customersTable.id, {
      onDelete: "restrict",
    }),
  channelId: uuid("channel_id")
    .notNull()
    .references(() => require("./regions-channels").channelsTable.id, {
      onDelete: "restrict",
    }),
  shippingAddressId: uuid("shipping_address_id")
    .notNull()
    .references(() => require("./customers").addressesTable.id, {
      onDelete: "restrict",
    }),
  billingAddressId: uuid("billing_address_id")
    .notNull()
    .references(() => require("./customers").addressesTable.id, {
      onDelete: "restrict",
    }),
  discountId: uuid("discount_id"), // Will be set with the discounts table reference
  currencyCode: text("currency_code").notNull(),
  regionId: uuid("region_id")
    .notNull()
    .references(() => require("./regions-channels").regionsTable.id, {
      onDelete: "restrict",
    }),
  subtotalAmount: numeric("subtotal_amount", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  taxAmount: numeric("tax_amount", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  status: orderStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const orderItemsTable = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => ordersTable.id, { onDelete: "cascade" }),
  productVariantId: uuid("product_variant_id")
    .notNull()
    .references(() => require("./catalog").productVariantsTable.id, {
      onDelete: "restrict",
    }),
  quantity: integer("quantity").notNull().default(1),
  priceAtOrderTime: numeric("price_at_order_time", {
    precision: 10,
    scale: 2,
  }).notNull(),
});

// Relations
export const ordersRelations = relations(ordersTable, ({ many }) => ({
  items: many(orderItemsTable),
}));

export const orderItemsRelations = relations(orderItemsTable, ({ one }) => ({
  order: one(ordersTable, {
    fields: [orderItemsTable.orderId],
    references: [ordersTable.id],
  }),
  productVariant: one(require("./catalog").productVariantsTable, {
    fields: [orderItemsTable.productVariantId],
    references: [require("./catalog").productVariantsTable.id],
  }),
}));
