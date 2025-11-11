import { seed } from "drizzle-seed";
import { db } from "./db/index";
import * as schema from "./db/schema";

async function main() {
  console.log("🌱 Seeding database...");

  try {
    await seed(db, schema).refine((f) => ({
      usersTable: {
        count: 5,
        columns: {
          name: f.fullName(),
          email: f.email(),
          role: f.valuesFromArray({
            values: ["admin", "admin", "staff", "staff", "staff"],
          }),
          auth_provider_id: f.uuid(),
        },
      },

      regionsTable: {
        count: 3,
        columns: {
          name: f.country(),
          country_codes: f.weightedRandom([
            {
              weight: 0.33,
              value: f.default({ defaultValue: ["US", "CA", "MX"] }),
            },
            {
              weight: 0.33,
              value: f.default({ defaultValue: ["GB", "IE", "FR"] }),
            },
            {
              weight: 0.34,
              value: f.default({ defaultValue: ["AU", "NZ"] }),
            },
          ]),
          tax_rate: f.valuesFromArray({
            values: ["10.00", "20.00", "5.00"],
          }),
          tax_code: f.valuesFromArray({
            values: ["STANDARD", "REDUCED"],
          }),
        },
      },

      channelsTable: {
        count: 4,
        columns: {
          name: f.valuesFromArray({
            values: ["Web Store", "Mobile App", "Wholesale", "Marketplace"],
          }),
          slug: f.valuesFromArray({
            values: ["web-store", "mobile-app", "wholesale", "marketplace"],
          }),
          currency_code: f.weightedRandom([
            { weight: 0.5, value: f.default({ defaultValue: "USD" }) },
            { weight: 0.2, value: f.default({ defaultValue: "GBP" }) },
            { weight: 0.2, value: f.default({ defaultValue: "EUR" }) },
            { weight: 0.1, value: f.default({ defaultValue: "AUD" }) },
          ]),
          tax_inclusive: f.weightedRandom([
            { weight: 0.5, value: f.default({ defaultValue: true }) },
            { weight: 0.5, value: f.default({ defaultValue: false }) },
          ]),
          default_language: f.valuesFromArray({
            values: ["en", "es", "fr"],
          }),
          is_active: f.default({ defaultValue: true }),
        },
      },

      categoriesTable: {
        count: 8,
        columns: {
          name: f.valuesFromArray({
            values: [
              "Electronics",
              "Clothing",
              "Books",
              "Home & Garden",
              "Sports",
              "Toys",
              "Beauty",
              "Food & Beverage",
            ],
          }),
          slug: f.valuesFromArray({
            values: [
              "electronics",
              "clothing",
              "books",
              "home-garden",
              "sports",
              "toys",
              "beauty",
              "food-beverage",
            ],
          }),
        },
      },

      productsTable: {
        count: 20,
        columns: {
          name: f.firstName(),
          slug: f.firstName(),
          description: f.loremIpsum(),
          is_active: f.weightedRandom([
            { weight: 0.75, value: f.default({ defaultValue: true }) },
            { weight: 0.25, value: f.default({ defaultValue: false }) },
          ]),
        },
      },

      productVariantsTable: {
        count: 40,
        columns: {
          sku: f.uuid(),
          quantity_in_stock: f.int({ minValue: 0, maxValue: 1000 }),
        },
      },

      attributesTable: {
        count: 5,
        columns: {
          name: f.valuesFromArray({
            values: ["Size", "Color", "Material", "Brand", "Style"],
          }),
        },
      },

      attributeValuesTable: {
        count: 20,
        columns: {
          value: f.valuesFromArray({
            values: [
              "Small",
              "Medium",
              "Large",
              "Red",
              "Blue",
              "Black",
              "Cotton",
              "Polyester",
              "Wool",
              "Leather",
            ],
          }),
        },
      },

      collectionsTable: {
        count: 5,
        columns: {
          name: f.valuesFromArray({
            values: [
              "Summer Collection",
              "Winter Essentials",
              "Best Sellers",
              "New Arrivals",
              "On Sale",
            ],
          }),
          slug: f.valuesFromArray({
            values: [
              "summer-collection",
              "winter-essentials",
              "best-sellers",
              "new-arrivals",
              "on-sale",
            ],
          }),
          description: f.loremIpsum(),
          is_active: f.default({ defaultValue: true }),
        },
      },

      customersTable: {
        count: 15,
        columns: {
          first_name: f.firstName(),
          last_name: f.lastName(),
          email: f.email(),
          phone: f.phoneNumber(),
        },
      },

      addressesTable: {
        count: 30,
        columns: {
          type: f.valuesFromArray({
            values: ["shipping", "billing"],
          }),
          line1: f.streetAddress(),
          line2: f.weightedRandom([
            { weight: 0.67, value: f.default({ defaultValue: null }) },
            { weight: 0.33, value: f.loremIpsum() },
          ]) as any,
          city: f.city(),
          state: f.state(),
          postal_code: f.postcode(),
          country: f.country(),
        },
      },

      ordersTable: {
        count: 20,
        columns: {
          currency_code: f.valuesFromArray({
            values: ["USD", "USD", "GBP", "EUR"],
          }),
          subtotal_amount: f.number({
            minValue: 10,
            maxValue: 5000,
          }),
          tax_amount: f.number({
            minValue: 1,
            maxValue: 500,
          }),
          total_amount: f.number({
            minValue: 11,
            maxValue: 5500,
          }),
          status: f.valuesFromArray({
            values: [
              "pending",
              "paid",
              "paid",
              "shipped",
              "shipped",
              "cancelled",
            ],
          }),
        },
      },

      orderItemsTable: {
        count: 40,
        columns: {
          quantity: f.int({ minValue: 1, maxValue: 10 }),
          price_at_order_time: f.number({
            minValue: 5,
            maxValue: 2000,
          }),
        },
      },

      mediaTable: {
        count: 25,
        columns: {
          url: f.loremIpsum(),
          type: f.valuesFromArray({
            values: ["image", "image", "image", "video"],
          }),
          alt_text: f.loremIpsum(),
        },
      },

      discountsTable: {
        count: 8,
        columns: {
          code: f.firstName(),
          type: f.valuesFromArray({
            values: ["percentage", "fixed"],
          }),
          value: f.number({
            minValue: 5,
            maxValue: 100,
          }),
          is_active: f.default({ defaultValue: true }),
          applies_to: f.valuesFromArray({
            values: ["order", "product", "category"],
          }),
          min_order_amount: f.number({
            minValue: 50,
            maxValue: 500,
          }),
          max_discount_amount: f.number({
            minValue: 10,
            maxValue: 200,
          }),
        },
      },
    }));

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

main();
