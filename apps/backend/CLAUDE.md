# MerchantLabs Backend Architecture

## Tech Stack

### Core
- **Runtime**: Bun (not Node.js)
- **Language**: TypeScript
- **API**: GraphQL Yoga (GraphQL server)
- **Database**: PostgreSQL with Drizzle ORM
- **Package Manager**: Bun

### Key Libraries
- `graphql-yoga` - GraphQL server
- `drizzle-orm` - Type-safe ORM for PostgreSQL
- `pg` - PostgreSQL client (via Drizzle)

## Project Structure

```
apps/backend/
├── src/
│   ├── db/
│   │   ├── index.ts                 # Drizzle DB instance
│   │   └── schema/
│   │       ├── index.ts             # Export all schema tables
│   │       ├── catalog.ts           # Product catalog tables
│   │       ├── regions-channels.ts  # Regions & channels
│   │       ├── customers.ts         # Customer & address tables
│   │       ├── orders.ts            # Order tables
│   │       ├── discounts.ts         # Discount tables
│   │       ├── media.ts             # Media/file tables
│   │       └── user.ts              # User tables
│   │
│   ├── graphql/
│   │   ├── server.ts                # GraphQL Yoga server setup
│   │   ├── types.generated.ts       # Auto-generated TypeScript types from schema
│   │   └── schema/
│   │       ├── common/              # Shared types & scalars
│   │       │   └── errorResponse.ts # Error response type
│   │       │
│   │       └── catalog/             # Catalog schema & resolvers
│   │           ├── schema.graphql   # GraphQL type definitions
│   │           └── resolvers/
│   │               ├── Query/       # Query resolvers (10 implemented)
│   │               │   ├── category.ts
│   │               │   ├── categories.ts
│   │               │   ├── product.ts
│   │               │   ├── productBySlug.ts
│   │               │   ├── products.ts
│   │               │   ├── attribute.ts
│   │               │   ├── attributes.ts
│   │               │   ├── collection.ts
│   │               │   ├── collections.ts
│   │               │   └── productVariant.ts
│   │               │
│   │               ├── Mutation/    # Mutation resolvers (20 implemented)
│   │               │   ├── createCategory.ts
│   │               │   ├── updateCategory.ts
│   │               │   ├── deleteCategory.ts
│   │               │   ├── createProduct.ts
│   │               │   ├── updateProduct.ts
│   │               │   ├── deleteProduct.ts
│   │               │   ├── createProductVariant.ts
│   │               │   ├── updateProductVariant.ts
│   │               │   ├── deleteProductVariant.ts
│   │               │   ├── addAttributeToVariant.ts
│   │               │   ├── removeAttributeFromVariant.ts
│   │               │   ├── createAttribute.ts
│   │               │   ├── deleteAttribute.ts
│   │               │   ├── createAttributeValue.ts
│   │               │   ├── deleteAttributeValue.ts
│   │               │   ├── createCollection.ts
│   │               │   ├── updateCollection.ts
│   │               │   ├── deleteCollection.ts
│   │               │   ├── addProductToCollection.ts
│   │               │   └── removeProductFromCollection.ts
│   │               │
│   │               └── [Type Resolvers]/ # Type field resolvers
│   │                   ├── Product.ts
│   │                   ├── Category.ts
│   │                   ├── ProductVariant.ts
│   │                   ├── Collection.ts
│   │                   ├── Attribute.ts
│   │                   └── [Other types...]
│   │
│   └── index.ts                    # Server entry point
│
├── CLAUDE.md                       # This file - context & architecture
└── package.json
```

## Database Schema

### Catalog Tables

**categories**
- `id` (UUID, PK)
- `name`, `slug` (text, unique)
- `parentId` (FK to categories, nullable)
- `createdAt`, `updatedAt` (timestamp)

**products**
- `id` (UUID, PK)
- `name`, `slug` (text, unique), `description` (nullable)
- `categoryId` (FK to categories)
- `isActive` (boolean, default: true)
- `createdAt`, `updatedAt` (timestamp)

**product_variants**
- `id` (UUID, PK)
- `productId` (FK to products)
- `sku` (text, unique)
- `quantityInStock` (integer, default: 0)
- `createdAt`, `updatedAt` (timestamp)

**attributes**
- `id` (UUID, PK)
- `name` (text, unique)

**attribute_values**
- `id` (UUID, PK)
- `attributeId` (FK to attributes, cascade delete)
- `value` (text)

**product_variant_attributes** (Junction)
- `productVariantId` (FK to product_variants, cascade delete)
- `attributeValueId` (FK to attribute_values, cascade delete)
- PK: (productVariantId, attributeValueId)

**collections**
- `id` (UUID, PK)
- `name`, `slug` (text, unique), `description` (nullable)
- `isActive` (boolean, default: true)
- `createdAt`, `updatedAt` (timestamp)

**collection_products** (Junction)
- `collectionId` (FK to collections, cascade delete)
- `productId` (FK to products, cascade delete)
- `position` (integer, for ordering)
- PK: (collectionId, productId)

## GraphQL Queries (Implemented)

### Category Queries
- `category(id: UUID!)` → Category | null
- `categories(first: Int, after: String)` → CategoryConnection!

### Product Queries
- `product(id: UUID!)` → Product | null
- `productBySlug(slug: String!)` → Product | null
- `products(first: Int, after: String, filter: ProductFilterInput)` → ProductConnection!
  - Filters: `categoryId`, `isActive`, `search`, `minPrice`, `maxPrice` (TODO)

### Attribute Queries
- `attribute(id: UUID!)` → Attribute | null
- `attributes(first: Int, after: String)` → [Attribute!]!

### Collection Queries
- `collection(id: UUID!)` → Collection | null
- `collections(first: Int, after: String)` → CollectionConnection!

### Other Queries
- `productVariant(id: UUID!)` → ProductVariant | null

## GraphQL Mutations (Implemented)

### Category Mutations (3)
- `createCategory(input: CreateCategoryInput!)` → CategoryResponse!
- `updateCategory(id: UUID!, input: UpdateCategoryInput!)` → CategoryResponse!
- `deleteCategory(id: UUID!)` → CategoryResponse!

### Product Mutations (3)
- `createProduct(input: CreateProductInput!)` → ProductResponse!
- `updateProduct(id: UUID!, input: UpdateProductInput!)` → ProductResponse!
- `deleteProduct(id: UUID!)` → ProductResponse!

### ProductVariant Mutations (5)
- `createProductVariant(input: CreateProductVariantInput!)` → ProductVariantResponse!
- `updateProductVariant(id: UUID!, input: UpdateProductVariantInput!)` → ProductVariantResponse!
- `deleteProductVariant(id: UUID!)` → ProductVariantResponse!
- `addAttributeToVariant(variantId: UUID!, attributeValueId: UUID!)` → ProductVariantResponse!
- `removeAttributeFromVariant(variantId: UUID!, attributeValueId: UUID!)` → ProductVariantResponse!

### Attribute Mutations (4)
- `createAttribute(input: CreateAttributeInput!)` → AttributeResponse!
- `deleteAttribute(id: UUID!)` → AttributeResponse!
- `createAttributeValue(input: CreateAttributeValueInput!)` → AttributeResponse!
- `deleteAttributeValue(id: UUID!)` → AttributeResponse!

### Collection Mutations (5)
- `createCollection(input: CreateCollectionInput!)` → CollectionResponse!
- `updateCollection(id: UUID!, input: UpdateCollectionInput!)` → CollectionResponse!
- `deleteCollection(id: UUID!)` → CollectionResponse!
- `addProductToCollection(collectionId: UUID!, productId: UUID!)` → CollectionResponse!
- `removeProductFromCollection(collectionId: UUID!, productId: UUID!)` → CollectionResponse!

## Development

### Running the Server
```bash
bun run dev  # Start development server
bun run build  # Build for production
```

### Database Commands
```bash
bun run db:push  # Push schema changes to database
bun run db:studio  # Open Drizzle Studio UI
```

### Code Generation
```bash
bun run codegen  # Generate TypeScript types from GraphQL schema
```

## Key Implementation Details

### Pagination
- **Storefront**: Cursor-based pagination using base64-encoded IDs
- **Admin**: Can use offset-based pagination (to be implemented)
- Default page size: 20, Max page size: 100

### Response Structure
All mutations return consistent response objects:
```typescript
{
  success: boolean
  data: T | null
  error: { code: string, message: string } | null
}
```

### Type Safety
- Drizzle ORM provides type-safe queries
- GraphQL Yoga generates TypeScript resolvers with proper type signatures
- Auto-generated `types.generated.ts` keeps types in sync with schema

### Error Handling
- Try-catch blocks in all resolvers
- Consistent error codes (e.g., `CATEGORY_CREATE_ERROR`, `NOT_FOUND`)
- Console logging for debugging

### Nested Data Loading
Type resolvers automatically load related data:
- `Product.category` → Load category with parent & children
- `Product.variants` → Load variants with attributes
- `Category.parent`, `Category.children` → Load hierarchy
- `Collection.products` → Load all products in collection

## TODO / Future Work

1. **Pricing**: Add `price` field to `product_variants` table with channel-specific overrides
2. **Price Filtering**: Implement `minPrice`/`maxPrice` filtering in products query
3. **Admin Pagination**: Implement offset-based pagination for admin endpoints
4. **Advanced Pagination**: Implement true keyset/cursor pagination (currently uses ID slicing)
5. **Media Management**: Implement product media queries/mutations
6. **Inventory Management**: Add inventory tracking per variant
7. **Search**: Implement full-text search for products
8. **Caching**: Add Redis caching for frequently accessed data
9. **DataLoader**: Implement batch loading to prevent N+1 queries
10. **Validation**: Add input validation for mutations

## Common Patterns

### Creating a Resolver
```typescript
import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { tableName } from "../../../../../db/schema/catalog";

export const mutationName: NonNullable<MutationResolvers['mutationName']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    // Database operation
    const result = await db.insert(tableName).values({ /* ... */ }).returning();
    const item = Array.isArray(result) ? result[0] : null;

    return {
      success: !!item,
      data: item as any,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: {
        code: 'ERROR_CODE',
        message: error instanceof Error ? error.message : 'Error message',
      } as any,
    };
  }
};
```

### Running Tests
```bash
bun test
```

## Environment Variables
See `.env` file (loaded automatically by Bun):
- `DATABASE_URL` - PostgreSQL connection string
- Other service configs as needed

## Useful Commands

```bash
# Development
bun run dev              # Start server
bun run build            # Build production
bun test                 # Run tests

# Database
bun run db:push          # Apply schema changes
bun run db:studio        # Open Drizzle Studio
bun run db:generate      # Generate migration
bun run db:migrate       # Run migrations

# Code Generation
bun run codegen          # Generate GraphQL types
```

## References
- GraphQL Yoga: https://the-guild.dev/graphql/yoga-server
- Drizzle ORM: https://orm.drizzle.team/docs/overview
- PostgreSQL: https://www.postgresql.org/docs/
