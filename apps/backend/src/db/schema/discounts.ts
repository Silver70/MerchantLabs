import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
  numeric,
  boolean,
} from "drizzle-orm/pg-core";

export const discountTypeEnum = pgEnum("discount_type", [
  "percentage",
  "fixed",
]);

export const discountAppliesToEnum = pgEnum("discount_applies_to", [
  "order",
  "product",
  "category",
]);

export const discountsTable = pgTable("discounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").unique(),
  type: discountTypeEnum("type").notNull(),
  value: numeric("value", { precision: 10, scale: 2 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  appliesTo: discountAppliesToEnum("applies_to").notNull(),
  targetId: uuid("target_id"), // FK depending on applies_to
  minOrderAmount: numeric("min_order_amount", { precision: 10, scale: 2 }),
  maxDiscountAmount: numeric("max_discount_amount", {
    precision: 10,
    scale: 2,
  }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
