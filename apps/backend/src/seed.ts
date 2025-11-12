//@ts-nocheck
import { db } from "./db/index";
import {
  usersTable,
  regionsTable,
  channelsTable,
  categoriesTable,
  productsTable,
  productVariantsTable,
  attributesTable,
  attributeValuesTable,
  collectionsTable,
  collectionProductsTable,
  customersTable,
  addressesTable,
  ordersTable,
  orderItemsTable,
  mediaTable,
  productMediaTable,
  discountsTable,
  channelProductsTable,
  productVariantAttributesTable,
} from "./db/schema";

async function main() {
  console.log("🌱 Seeding database with consistent test data...\n");

  try {
    // Run diagnostics on existing data
    console.log("📊 Running diagnostics on existing data...");
    const existingUsers = await db.select().from(usersTable);
    const existingRegions = await db.select().from(regionsTable);
    const existingChannels = await db.select().from(channelsTable);
    const existingCategories = await db.select().from(categoriesTable);
    const existingProducts = await db.select().from(productsTable);
    const existingProductVariants = await db
      .select()
      .from(productVariantsTable);
    const existingCustomers = await db.select().from(customersTable);
    const existingAddresses = await db.select().from(addressesTable);
    const existingOrders = await db.select().from(ordersTable);
    const existingDiscounts = await db.select().from(discountsTable);

    console.log("📈 Current database state:");
    console.log(`   • Users: ${existingUsers.length}`);
    console.log(`   • Regions: ${existingRegions.length}`);
    console.log(`   • Channels: ${existingChannels.length}`);
    console.log(`   • Categories: ${existingCategories.length}`);
    console.log(`   • Products: ${existingProducts.length}`);
    console.log(`   • Product Variants: ${existingProductVariants.length}`);
    console.log(`   • Customers: ${existingCustomers.length}`);
    console.log(`   • Addresses: ${existingAddresses.length}`);
    console.log(`   • Orders: ${existingOrders.length}`);
    console.log(`   • Discounts: ${existingDiscounts.length}\n`);

    // Validate relationships
    console.log("🔍 Validating data relationships...");
    let relationshipIssues = 0;

    // Check customers with missing addresses
    for (const customer of existingCustomers) {
      const customerAddresses = existingAddresses.filter(
        (addr) => addr.customerId === customer.id
      );
      const shippingAddrs = customerAddresses.filter(
        (addr) => addr.type === "shipping"
      );
      const billingAddrs = customerAddresses.filter(
        (addr) => addr.type === "billing"
      );

      if (shippingAddrs.length === 0 || billingAddrs.length === 0) {
        console.log(
          `   ⚠️  Customer "${customer.firstName} ${customer.lastName}" missing addresses (shipping: ${shippingAddrs.length}, billing: ${billingAddrs.length})`
        );
        relationshipIssues++;
      }
    }

    // Check orders with valid references
    for (const order of existingOrders) {
      const customer = existingCustomers.find((c) => c.id === order.customerId);
      const channel = existingChannels.find((ch) => ch.id === order.channelId);
      const shippingAddr = existingAddresses.find(
        (addr) => addr.id === order.shippingAddressId
      );
      const billingAddr = existingAddresses.find(
        (addr) => addr.id === order.billingAddressId
      );

      if (!customer || !channel || !shippingAddr || !billingAddr) {
        console.log(
          `   ⚠️  Order has missing references (customer: ${!!customer}, channel: ${!!channel}, shipping: ${!!shippingAddr}, billing: ${!!billingAddr})`
        );
        relationshipIssues++;
      }
    }

    // Check products with categories
    for (const product of existingProducts) {
      const category = existingCategories.find(
        (cat) => cat.id === product.categoryId
      );
      if (!category) {
        console.log(`   ⚠️  Product "${product.name}" has no valid category`);
        relationshipIssues++;
      }
    }

    if (relationshipIssues === 0) {
      console.log("   ✅ All relationships are valid!\n");
    } else {
      console.log(`   ⚠️  Found ${relationshipIssues} relationship issues\n`);
    }

    console.log("📝 Creating users...");
    const users = await db
      .insert(usersTable)
      .values([
        {
          name: "Alice Johnson",
          email: "alice@merchantlabs.com",
          role: "admin",
          auth_provider_id: "auth-001",
        },
        {
          name: "Bob Smith",
          email: "bob@merchantlabs.com",
          role: "staff",
          auth_provider_id: "auth-002",
        },
        {
          name: "Carol White",
          email: "carol@merchantlabs.com",
          role: "staff",
          auth_provider_id: "auth-003",
        },
      ])
      .returning();

    console.log("📝 Creating regions...");
    const regions = await db
      .insert(regionsTable)
      .values([
        {
          name: "North America",
          countryCodes: ["US", "CA", "MX"],
          taxRate: "10.00",
          taxCode: "STANDARD",
        },
        {
          name: "Europe",
          countryCodes: ["GB", "IE", "FR", "DE"],
          taxRate: "20.00",
          taxCode: "STANDARD",
        },
        {
          name: "Oceania",
          countryCodes: ["AU", "NZ"],
          taxRate: "10.00",
          taxCode: "STANDARD",
        },
      ])
      .returning();

    console.log("📝 Creating channels...");
    const channels = await db
      .insert(channelsTable)
      .values([
        {
          name: "Web Store",
          slug: "web-store",
          regionId: regions[0].id,
          currencyCode: "USD",
          taxInclusive: true,
          defaultLanguage: "en",
          isActive: true,
        },
        {
          name: "Mobile App",
          slug: "mobile-app",
          regionId: regions[0].id,
          currencyCode: "USD",
          taxInclusive: true,
          defaultLanguage: "en",
          isActive: true,
        },
        {
          name: "EU Store",
          slug: "eu-store",
          regionId: regions[1].id,
          currencyCode: "EUR",
          taxInclusive: true,
          defaultLanguage: "en",
          isActive: true,
        },
        {
          name: "AU Store",
          slug: "au-store",
          regionId: regions[2].id,
          currencyCode: "AUD",
          taxInclusive: false,
          defaultLanguage: "en",
          isActive: true,
        },
      ])
      .returning();

    console.log("📝 Creating categories...");
    const categories = await db
      .insert(categoriesTable)
      .values([
        { name: "Electronics", slug: "electronics" },
        { name: "Clothing", slug: "clothing" },
        { name: "Books", slug: "books" },
        { name: "Home & Garden", slug: "home-garden" },
        { name: "Sports", slug: "sports" },
        { name: "Toys", slug: "toys" },
        { name: "Beauty", slug: "beauty" },
        { name: "Food & Beverage", slug: "food-beverage" },
      ])
      .returning();

    console.log("📝 Creating attributes...");
    const attributes = await db
      .insert(attributesTable)
      .values([
        { name: "Size" },
        { name: "Color" },
        { name: "Material" },
        { name: "Brand" },
        { name: "Style" },
      ])
      .returning();

    console.log("📝 Creating attribute values...");
    const sizeAttrValues = await db
      .insert(attributeValuesTable)
      .values([
        { attributeId: attributes[0].id, value: "XS" },
        { attributeId: attributes[0].id, value: "S" },
        { attributeId: attributes[0].id, value: "M" },
        { attributeId: attributes[0].id, value: "L" },
        { attributeId: attributes[0].id, value: "XL" },
      ])
      .returning();

    const colorAttrValues = await db
      .insert(attributeValuesTable)
      .values([
        { attributeId: attributes[1].id, value: "Red" },
        { attributeId: attributes[1].id, value: "Blue" },
        { attributeId: attributes[1].id, value: "Black" },
        { attributeId: attributes[1].id, value: "White" },
        { attributeId: attributes[1].id, value: "Green" },
      ])
      .returning();

    const materialAttrValues = await db
      .insert(attributeValuesTable)
      .values([
        { attributeId: attributes[2].id, value: "Cotton" },
        { attributeId: attributes[2].id, value: "Polyester" },
        { attributeId: attributes[2].id, value: "Wool" },
        { attributeId: attributes[2].id, value: "Leather" },
      ])
      .returning();

    console.log("📝 Creating products...");
    const products = await db
      .insert(productsTable)
      .values([
        {
          name: "Classic T-Shirt",
          slug: "classic-t-shirt",
          description:
            "A comfortable, high-quality cotton t-shirt for everyday wear.",
          categoryId: categories[1].id,
          isActive: true,
        },
        {
          name: "Blue Jeans",
          slug: "blue-jeans",
          description: "Durable and stylish denim jeans for all occasions.",
          categoryId: categories[1].id,
          isActive: true,
        },
        {
          name: "Wireless Headphones",
          slug: "wireless-headphones",
          description:
            "Premium noise-cancelling wireless headphones with long battery life.",
          categoryId: categories[0].id,
          isActive: true,
        },
        {
          name: "Garden Shovel",
          slug: "garden-shovel",
          description: "Sturdy garden shovel for all your gardening needs.",
          categoryId: categories[3].id,
          isActive: true,
        },
        {
          name: "Running Shoes",
          slug: "running-shoes",
          description:
            "Lightweight and comfortable running shoes with excellent grip.",
          categoryId: categories[4].id,
          isActive: true,
        },
        {
          name: "Yoga Mat",
          slug: "yoga-mat",
          description: "Non-slip yoga mat perfect for all fitness levels.",
          categoryId: categories[4].id,
          isActive: true,
        },
        {
          name: "Cookbook: Italian Recipes",
          slug: "cookbook-italian",
          description:
            "Traditional Italian recipes passed down through generations.",
          categoryId: categories[2].id,
          isActive: true,
        },
        {
          name: "Organic Face Cream",
          slug: "organic-face-cream",
          description: "Natural ingredients for radiant and healthy skin.",
          categoryId: categories[6].id,
          isActive: true,
        },
      ])
      .returning();

    console.log("📝 Creating product variants...");
    const productVariants = await db
      .insert(productVariantsTable)
      .values([
        // Classic T-Shirt variants
        { productId: products[0].id, sku: "TSH-RED-S", quantityInStock: 50 },
        { productId: products[0].id, sku: "TSH-RED-M", quantityInStock: 75 },
        { productId: products[0].id, sku: "TSH-RED-L", quantityInStock: 60 },
        { productId: products[0].id, sku: "TSH-BLU-S", quantityInStock: 45 },
        { productId: products[0].id, sku: "TSH-BLU-M", quantityInStock: 80 },
        // Blue Jeans variants
        { productId: products[1].id, sku: "JNS-BLU-30", quantityInStock: 30 },
        { productId: products[1].id, sku: "JNS-BLU-32", quantityInStock: 35 },
        { productId: products[1].id, sku: "JNS-BLU-34", quantityInStock: 40 },
        // Wireless Headphones variants
        { productId: products[2].id, sku: "HDP-BLK-001", quantityInStock: 25 },
        { productId: products[2].id, sku: "HDP-WHT-001", quantityInStock: 20 },
        // Garden Shovel
        { productId: products[3].id, sku: "SHL-001", quantityInStock: 15 },
        // Running Shoes variants
        { productId: products[4].id, sku: "RUN-BLK-8", quantityInStock: 22 },
        { productId: products[4].id, sku: "RUN-BLK-9", quantityInStock: 18 },
        { productId: products[4].id, sku: "RUN-BLK-10", quantityInStock: 20 },
        // Yoga Mat
        { productId: products[5].id, sku: "YGM-001", quantityInStock: 40 },
        // Cookbook
        { productId: products[6].id, sku: "CKB-ITA-001", quantityInStock: 100 },
        // Face Cream
        { productId: products[7].id, sku: "FCM-ORG-001", quantityInStock: 55 },
      ])
      .returning();

    console.log("📝 Linking product variants to attributes...");
    // T-Shirt variants with Size and Color
    await db.insert(productVariantAttributesTable).values([
      {
        productVariantId: productVariants[0].id,
        attributeValueId: colorAttrValues[0].id,
      }, // Red
      {
        productVariantId: productVariants[0].id,
        attributeValueId: sizeAttrValues[1].id,
      }, // S
      {
        productVariantId: productVariants[1].id,
        attributeValueId: colorAttrValues[0].id,
      }, // Red
      {
        productVariantId: productVariants[1].id,
        attributeValueId: sizeAttrValues[2].id,
      }, // M
      {
        productVariantId: productVariants[2].id,
        attributeValueId: colorAttrValues[0].id,
      }, // Red
      {
        productVariantId: productVariants[2].id,
        attributeValueId: sizeAttrValues[3].id,
      }, // L
      {
        productVariantId: productVariants[3].id,
        attributeValueId: colorAttrValues[1].id,
      }, // Blue
      {
        productVariantId: productVariants[3].id,
        attributeValueId: sizeAttrValues[1].id,
      }, // S
      {
        productVariantId: productVariants[4].id,
        attributeValueId: colorAttrValues[1].id,
      }, // Blue
      {
        productVariantId: productVariants[4].id,
        attributeValueId: sizeAttrValues[2].id,
      }, // M
    ]);

    console.log("📝 Creating media...");
    const media = await db
      .insert(mediaTable)
      .values([
        {
          url: "https://images.example.com/tshirt-1.jpg",
          type: "image",
          altText: "Red classic t-shirt front view",
        },
        {
          url: "https://images.example.com/tshirt-2.jpg",
          type: "image",
          altText: "Red classic t-shirt back view",
        },
        {
          url: "https://images.example.com/jeans-1.jpg",
          type: "image",
          altText: "Blue jeans front view",
        },
        {
          url: "https://images.example.com/headphones-1.jpg",
          type: "image",
          altText: "Wireless headphones product view",
        },
        {
          url: "https://images.example.com/headphones-2.jpg",
          type: "image",
          altText: "Wireless headphones side view",
        },
      ])
      .returning();

    console.log("📝 Linking media to products...");
    await db.insert(productMediaTable).values([
      {
        productId: products[0].id,
        mediaId: media[0].id,
        position: 1,
        isPrimary: true,
      },
      {
        productId: products[0].id,
        mediaId: media[1].id,
        position: 2,
        isPrimary: false,
      },
      {
        productId: products[1].id,
        mediaId: media[2].id,
        position: 1,
        isPrimary: true,
      },
      {
        productId: products[2].id,
        mediaId: media[3].id,
        position: 1,
        isPrimary: true,
      },
      {
        productId: products[2].id,
        mediaId: media[4].id,
        position: 2,
        isPrimary: false,
      },
    ]);

    console.log("📝 Creating collections...");
    const collections = await db
      .insert(collectionsTable)
      .values([
        {
          name: "Summer Essentials",
          slug: "summer-essentials",
          description: "Perfect items for the summer season",
          isActive: true,
        },
        {
          name: "Best Sellers",
          slug: "best-sellers",
          description: "Our most popular products",
          isActive: true,
        },
        {
          name: "New Arrivals",
          slug: "new-arrivals",
          description: "Recently added products",
          isActive: true,
        },
      ])
      .returning();

    console.log("📝 Linking products to collections...");
    await db.insert(collectionProductsTable).values([
      {
        collectionId: collections[0].id,
        productId: products[0].id,
        position: 1,
      },
      {
        collectionId: collections[0].id,
        productId: products[4].id,
        position: 2,
      },
      {
        collectionId: collections[1].id,
        productId: products[2].id,
        position: 1,
      },
      {
        collectionId: collections[1].id,
        productId: products[0].id,
        position: 2,
      },
      {
        collectionId: collections[2].id,
        productId: products[7].id,
        position: 1,
      },
    ]);

    console.log("📝 Linking product variants to channels...");
    // Create channel pricing for variants
    const channelPrices = [
      {
        productVariantId: productVariants[0]!.id,
        channelId: channels[0]!.id,
        price: "29.99",
      },
      {
        productVariantId: productVariants[0]!.id,
        channelId: channels[1]!.id,
        price: "29.99",
      },
      {
        productVariantId: productVariants[1]!.id,
        channelId: channels[0]!.id,
        price: "29.99",
      },
      {
        productVariantId: productVariants[2]!.id,
        channelId: channels[0]!.id,
        price: "29.99",
      },
      {
        productVariantId: productVariants[3]!.id,
        channelId: channels[0]!.id,
        price: "29.99",
      },
      {
        productVariantId: productVariants[4]!.id,
        channelId: channels[0]!.id,
        price: "29.99",
      },
      {
        productVariantId: productVariants[5]!.id,
        channelId: channels[0]!.id,
        price: "69.99",
      },
      {
        productVariantId: productVariants[5]!.id,
        channelId: channels[2]!.id,
        price: "64.99",
      }, // EUR price
      {
        productVariantId: productVariants[6]!.id,
        channelId: channels[0]!.id,
        price: "69.99",
      },
      {
        productVariantId: productVariants[7]!.id,
        channelId: channels[0]!.id,
        price: "69.99",
      },
      {
        productVariantId: productVariants[8]!.id,
        channelId: channels[0]!.id,
        price: "199.99",
      },
      {
        productVariantId: productVariants[9]!.id,
        channelId: channels[0]!.id,
        price: "199.99",
      },
      {
        productVariantId: productVariants[10]!.id,
        channelId: channels[0]!.id,
        price: "49.99",
      },
      {
        productVariantId: productVariants[11]!.id,
        channelId: channels[0]!.id,
        price: "120.00",
      },
      {
        productVariantId: productVariants[12]!.id,
        channelId: channels[0]!.id,
        price: "120.00",
      },
      {
        productVariantId: productVariants[13]!.id,
        channelId: channels[0]!.id,
        price: "120.00",
      },
      {
        productVariantId: productVariants[14]!.id,
        channelId: channels[0]!.id,
        price: "59.99",
      },
      {
        productVariantId: productVariants[15]!.id,
        channelId: channels[0]!.id,
        price: "24.99",
      },
      {
        productVariantId: productVariants[16]!.id,
        channelId: channels[0]!.id,
        price: "89.99",
      },
    ];

    await db.insert(channelProductsTable).values(channelPrices);

    console.log("📝 Creating customers with complete addresses...");
    const customers = await db
      .insert(customersTable)
      .values([
        {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "+1-555-0101",
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          email: "jane.smith@example.com",
          phone: "+1-555-0102",
        },
        {
          firstName: "Michael",
          lastName: "Johnson",
          email: "michael.j@example.com",
          phone: "+1-555-0103",
        },
        {
          firstName: "Sarah",
          lastName: "Williams",
          email: "sarah.w@example.com",
          phone: "+1-555-0104",
        },
        {
          firstName: "David",
          lastName: "Brown",
          email: "david.brown@example.com",
          phone: "+1-555-0105",
        },
        {
          firstName: "Emily",
          lastName: "Davis",
          email: "emily.d@example.com",
          phone: "+1-555-0106",
        },
      ])
      .returning();

    console.log("📝 Creating customer addresses (shipping and billing)...");
    const addresses = await db
      .insert(addressesTable)
      .values([
        // John Doe
        {
          customerId: customers[0]!.id,
          type: "shipping" as const,
          line1: "123 Main St",
          line2: "Apt 4B",
          city: "New York",
          state: "NY",
          postalCode: "10001",
          country: "United States",
        },
        {
          customerId: customers[0]!.id,
          type: "billing" as const,
          line1: "123 Main St",
          line2: "Apt 4B",
          city: "New York",
          state: "NY",
          postalCode: "10001",
          country: "United States",
        },
        // Jane Smith
        {
          customerId: customers[1]!.id,
          type: "shipping" as const,
          line1: "456 Oak Ave",
          city: "Los Angeles",
          state: "CA",
          postalCode: "90001",
          country: "United States",
        },
        {
          customerId: customers[1]!.id,
          type: "billing" as const,
          line1: "456 Oak Ave",
          city: "Los Angeles",
          state: "CA",
          postalCode: "90001",
          country: "United States",
        },
        // Michael Johnson
        {
          customerId: customers[2]!.id,
          type: "shipping" as const,
          line1: "789 Pine Rd",
          city: "Chicago",
          state: "IL",
          postalCode: "60601",
          country: "United States",
        },
        {
          customerId: customers[2]!.id,
          type: "billing" as const,
          line1: "789 Pine Rd",
          city: "Chicago",
          state: "IL",
          postalCode: "60601",
          country: "United States",
        },
        // Sarah Williams
        {
          customerId: customers[3]!.id,
          type: "shipping" as const,
          line1: "321 Elm St",
          city: "Houston",
          state: "TX",
          postalCode: "77001",
          country: "United States",
        },
        {
          customerId: customers[3]!.id,
          type: "billing" as const,
          line1: "654 Maple Dr",
          line2: "Suite 100",
          city: "Houston",
          state: "TX",
          postalCode: "77002",
          country: "United States",
        },
        // David Brown
        {
          customerId: customers[4]!.id,
          type: "shipping" as const,
          line1: "999 Cedar Ln",
          city: "Phoenix",
          state: "AZ",
          postalCode: "85001",
          country: "United States",
        },
        {
          customerId: customers[4]!.id,
          type: "billing" as const,
          line1: "999 Cedar Ln",
          city: "Phoenix",
          state: "AZ",
          postalCode: "85001",
          country: "United States",
        },
        // Emily Davis
        {
          customerId: customers[5]!.id,
          type: "shipping" as const,
          line1: "555 Birch Way",
          city: "Seattle",
          state: "WA",
          postalCode: "98101",
          country: "United States",
        },
        {
          customerId: customers[5]!.id,
          type: "billing" as const,
          line1: "555 Birch Way",
          city: "Seattle",
          state: "WA",
          postalCode: "98101",
          country: "United States",
        },
      ])
      .returning();

    console.log("📝 Creating discounts...");
    const discounts = await db
      .insert(discountsTable)
      .values([
        {
          code: "SAVE10",
          type: "percentage",
          value: "10.00",
          startDate: new Date("2024-01-01"),
          endDate: new Date("2025-12-31"),
          isActive: true,
          appliesTo: "order",
          minOrderAmount: "50.00",
        },
        {
          code: "SAVE20",
          type: "percentage",
          value: "20.00",
          startDate: new Date("2024-01-01"),
          endDate: new Date("2025-12-31"),
          isActive: true,
          appliesTo: "product",
          targetId: products[0]!.id,
        },
        {
          code: "FLAT5",
          type: "fixed",
          value: "5.00",
          startDate: new Date("2024-01-01"),
          endDate: new Date("2025-12-31"),
          isActive: true,
          appliesTo: "order",
          minOrderAmount: "25.00",
          maxDiscountAmount: "10.00",
        },
      ])
      .returning();

    console.log("📝 Creating orders with items...");
    const orders = await db
      .insert(ordersTable)
      .values([
        {
          customerId: customers[0]!.id,
          channelId: channels[0]!.id,
          regionId: regions[0]!.id,
          shippingAddressId: addresses[0]!.id,
          billingAddressId: addresses[1]!.id,
          currencyCode: "USD",
          subtotalAmount: "99.97",
          taxAmount: "10.00",
          totalAmount: "109.97",
          status: "paid",
        },
        {
          customerId: customers[1]!.id,
          channelId: channels[0]!.id,
          regionId: regions[0]!.id,
          shippingAddressId: addresses[2]!.id,
          billingAddressId: addresses[3]!.id,
          currencyCode: "USD",
          subtotalAmount: "199.99",
          taxAmount: "20.00",
          totalAmount: "219.99",
          status: "shipped",
        },
        {
          customerId: customers[2]!.id,
          channelId: channels[0]!.id,
          regionId: regions[0]!.id,
          shippingAddressId: addresses[4]!.id,
          billingAddressId: addresses[5]!.id,
          currencyCode: "USD",
          subtotalAmount: "149.98",
          taxAmount: "15.00",
          totalAmount: "164.98",
          status: "pending",
        },
        {
          customerId: customers[3]!.id,
          channelId: channels[0]!.id,
          regionId: regions[0]!.id,
          shippingAddressId: addresses[6]!.id,
          billingAddressId: addresses[7]!.id,
          currencyCode: "USD",
          subtotalAmount: "59.98",
          taxAmount: "6.00",
          totalAmount: "65.98",
          status: "paid",
        },
        {
          customerId: customers[4]!.id,
          channelId: channels[0]!.id,
          regionId: regions[0]!.id,
          shippingAddressId: addresses[8]!.id,
          billingAddressId: addresses[9]!.id,
          currencyCode: "USD",
          subtotalAmount: "299.99",
          taxAmount: "30.00",
          totalAmount: "329.99",
          status: "cancelled",
        },
        {
          customerId: customers[5]!.id,
          channelId: channels[0]!.id,
          regionId: regions[0]!.id,
          shippingAddressId: addresses[10]!.id,
          billingAddressId: addresses[11]!.id,
          currencyCode: "USD",
          subtotalAmount: "89.97",
          taxAmount: "9.00",
          totalAmount: "98.97",
          status: "paid",
          discountId: discounts[0]!.id,
        },
      ])
      .returning();

    console.log("📝 Creating order items...");
    await db.insert(orderItemsTable).values([
      // Order 1: John's order
      {
        orderId: orders[0]!.id,
        productVariantId: productVariants[0]!.id,
        quantity: 2,
        priceAtOrderTime: "29.99",
      },
      {
        orderId: orders[0]!.id,
        productVariantId: productVariants[4]!.id,
        quantity: 1,
        priceAtOrderTime: "29.99",
      },
      // Order 2: Jane's order
      {
        orderId: orders[1]!.id,
        productVariantId: productVariants[8]!.id,
        quantity: 1,
        priceAtOrderTime: "199.99",
      },
      // Order 3: Michael's order
      {
        orderId: orders[2]!.id,
        productVariantId: productVariants[5]!.id,
        quantity: 1,
        priceAtOrderTime: "69.99",
      },
      {
        orderId: orders[2]!.id,
        productVariantId: productVariants[11]!.id,
        quantity: 1,
        priceAtOrderTime: "79.99",
      },
      // Order 4: Sarah's order
      {
        orderId: orders[3]!.id,
        productVariantId: productVariants[10]!.id,
        quantity: 2,
        priceAtOrderTime: "29.99",
      },
      // Order 5: David's order
      {
        orderId: orders[4]!.id,
        productVariantId: productVariants[9]!.id,
        quantity: 1,
        priceAtOrderTime: "199.99",
      },
      {
        orderId: orders[4]!.id,
        productVariantId: productVariants[2]!.id,
        quantity: 1,
        priceAtOrderTime: "29.99",
      },
      {
        orderId: orders[4]!.id,
        productVariantId: productVariants[14]!.id,
        quantity: 1,
        priceAtOrderTime: "59.99",
      },
      // Order 6: Emily's order
      {
        orderId: orders[5]!.id,
        productVariantId: productVariants[1]!.id,
        quantity: 3,
        priceAtOrderTime: "29.99",
      },
    ]);

    console.log("✅ Database seeded successfully with test data!");
    console.log("📊 Summary:");
    console.log(`   ✓ ${Array.isArray(users) ? users.length : 3} users`);
    console.log(`   ✓ ${Array.isArray(regions) ? regions.length : 3} regions`);
    console.log(
      `   ✓ ${Array.isArray(channels) ? channels.length : 4} channels`
    );
    console.log(
      `   ✓ ${Array.isArray(categories) ? categories.length : 8} categories`
    );
    console.log(
      `   ✓ ${Array.isArray(products) ? products.length : 8} products`
    );
    console.log(
      `   ✓ ${Array.isArray(productVariants) ? productVariants.length : 17} product variants`
    );
    console.log(
      `   ✓ ${Array.isArray(attributes) ? attributes.length : 5} attributes`
    );
    console.log(
      `   ✓ ${Array.isArray(customers) ? customers.length : 6} customers`
    );
    console.log(
      `   ✓ ${Array.isArray(addresses) ? addresses.length : 12} addresses (shipping & billing pairs)`
    );
    console.log(`   ✓ ${Array.isArray(orders) ? orders.length : 6} orders`);
    console.log(
      `   ✓ ${Array.isArray(discounts) ? discounts.length : 3} discounts`
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

main();
