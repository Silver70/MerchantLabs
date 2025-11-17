# GraphQL Queries and Mutations - Products and Catalog

## PRODUCTS

### Queries

#### Get All Products (Paginated)

```graphql
query GetProducts($first: Int, $after: String, $filter: ProductFilterInput) {
  products(first: $first, after: $after, filter: $filter) {
    edges {
      cursor
      node {
        id
        name
        slug
        description
        category {
          id
          name
          slug
        }
        variants {
          id
          sku
          quantityInStock
          attributes {
            id
            name
            value
          }
        }
        isActive
        createdAt
        updatedAt
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
      totalCount
    }
  }
}
```

Variables (all products):

```json
{
  "first": 20,
  "after": null,
  "filter": null
}
```

Variables (filter by category):

```json
{
  "first": 20,
  "after": null,
  "filter": {
    "categoryId": "category-uuid-here"
  }
}
```

Variables (filter by active status):

```json
{
  "first": 20,
  "after": null,
  "filter": {
    "isActive": true
  }
}
```

Variables (search by name):

```json
{
  "first": 20,
  "after": null,
  "filter": {
    "search": "headphones"
  }
}
```

Variables (combined filters):

```json
{
  "first": 20,
  "after": null,
  "filter": {
    "categoryId": "category-uuid-here",
    "isActive": true,
    "search": "wireless"
  }
}
```

---

#### Get Single Product

```graphql
query GetProduct($id: UUID!) {
  product(id: $id) {
    id
    name
    slug
    description
    category {
      id
      name
      slug
    }
    variants {
      id
      sku
      quantityInStock
      attributes {
        id
        name
        value
      }
    }
    isActive
    createdAt
    updatedAt
  }
}
```

Variables:

```json
{
  "id": "product-uuid-here"
}
```

---

#### Get Product by Slug

```graphql
query GetProductBySlug($slug: String!) {
  productBySlug(slug: $slug) {
    id
    name
    slug
    description
    category {
      id
      name
      slug
    }
    variants {
      id
      sku
      quantityInStock
      attributes {
        id
        name
        value
      }
    }
    isActive
    createdAt
    updatedAt
  }
}
```

Variables:

```json
{
  "slug": "wireless-headphones"
}
```

---

## CATALOG

### Mutations

#### Create Category

```graphql
mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
    success
    data {
      id
      name
      slug
      parentId
      createdAt
    }
    error {
      code
      message
    }
  }
}
```

Variables (top-level category - slug auto-generated):

```json
{
  "input": {
    "name": "Electronics",
    "parentId": null
  }
}
```

Variables (with custom slug):

```json
{
  "input": {
    "name": "Electronics",
    "slug": "electronics-custom",
    "parentId": null
  }
}
```

Variables (subcategory):

```json
{
  "input": {
    "name": "Headphones",
    "parentId": "parent-category-uuid-here"
  }
}
```

---

#### Create Product

```graphql
mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    success
    data {
      id
      name
      slug
      description
      category {
        id
        name
      }
      isActive
      createdAt
    }
    error {
      code
      message
      details
    }
  }
}
```

Variables:

```json
{
  "input": {
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones with noise cancellation",
    "categoryId": "category-uuid-here"
  }
}
```

---

#### Update Product

```graphql
mutation UpdateProduct($id: UUID!, $input: UpdateProductInput!) {
  updateProduct(id: $id, input: $input) {
    success
    data {
      id
      name
      slug
      description
      category {
        id
        name
      }
      isActive
      updatedAt
    }
    error {
      code
      message
      details
    }
  }
}
```

Variables:

```json
{
  "id": "product-uuid-here",
  "input": {
    "name": "Wireless Headphones Pro",
    "description": "Premium wireless headphones with advanced noise cancellation",
    "isActive": true
  }
}
```

---

#### Add Product to Collection

```graphql
mutation AddProductToCollection($collectionId: UUID!, $productId: UUID!) {
  addProductToCollection(collectionId: $collectionId, productId: $productId) {
    success
    data {
      id
      name
      description
      products {
        id
        name
        slug
        category {
          id
          name
        }
      }
      createdAt
    }
    error {
      code
      message
      details
    }
  }
}
```

Variables:

```json
{
  "collectionId": "collection-uuid-here",
  "productId": "product-uuid-here"
}
```

Error codes:

- `COLLECTION_NOT_FOUND` - Collection does not exist
- `PRODUCT_NOT_FOUND` - Product does not exist
- `PRODUCT_ALREADY_IN_COLLECTION` - Product is already in this collection
- `PRODUCT_ADD_FAILED` - Failed to add product to collection

---

#### Remove Product from Collection

```graphql
mutation RemoveProductFromCollection($collectionId: UUID!, $productId: UUID!) {
  removeProductFromCollection(
    collectionId: $collectionId,
    productId: $productId
  ) {
    success
    data {
      id
      name
      description
      products {
        id
        name
        slug
        category {
          id
          name
        }
      }
      updatedAt
    }
    error {
      code
      message
      details
    }
  }
}
```

Variables:

```json
{
  "collectionId": "collection-uuid-here",
  "productId": "product-uuid-here"
}
```

Error codes:

- `COLLECTION_NOT_FOUND` - Collection does not exist
- `PRODUCT_NOT_IN_COLLECTION` - Product is not in this collection
- `PRODUCT_REMOVE_FAILED` - Failed to remove product from collection

---

#### Set Channel Product Price

```graphql
mutation SetChannelProductPrice(
  $channelId: UUID!
  $input: SetChannelProductPriceInput!
) {
  setChannelProductPrice(channelId: $channelId, input: $input) {
    success
    data {
      id
      name
      slug
      regionId
      currencyCode
      taxInclusive
      defaultLanguage
      isActive
      createdAt
    }
    error {
      code
      message
      details
    }
  }
}
```

Variables (set new price):

```json
{
  "channelId": "channel-uuid-here",
  "input": {
    "productVariantId": "product-variant-uuid-here",
    "price": "99.99",
    "isVisible": true
  }
}
```

Variables (update existing price):

```json
{
  "channelId": "channel-uuid-here",
  "input": {
    "productVariantId": "product-variant-uuid-here",
    "price": "79.99",
    "isVisible": true
  }
}
```

Variables (hide product in channel):

```json
{
  "channelId": "channel-uuid-here",
  "input": {
    "productVariantId": "product-variant-uuid-here",
    "price": "99.99",
    "isVisible": false
  }
}
```

Error codes:

- `CHANNEL_NOT_FOUND` - Channel does not exist
- `PRODUCT_VARIANT_NOT_FOUND` - Product variant does not exist
- `INVALID_PRICE` - Price must be a positive number
- `PRICE_SET_FAILED` - Failed to set channel product price
- `PRICE_UPDATE_FAILED` - Failed to update channel product price

---

#### Query Channel Products

**Note:** Currently there is no dedicated query to retrieve channel products. Channel products are stored in the database but not exposed through GraphQL queries. To fetch products for a specific channel, you would need to:

1. Query the products separately
2. Filter them on the client side based on channel availability
3. Or implement a new query resolver if needed

The channel-product relationship includes pricing information stored in the `channel_products` table with the following fields:
- `channelId` (UUID)
- `productVariantId` (UUID)
- `price` (Decimal)
- `isVisible` (Boolean)

---

## Common Patterns

### Pagination

All paginated queries support cursor-based pagination:

```graphql
query GetNextPage($first: Int, $after: String) {
  products(first: $first, after: $after) {
    edges {
      cursor
      node {
        id
        name
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

To get the next page, use the `endCursor` from the previous response:

```json
{
  "first": 20,
  "after": "base64-encoded-cursor-from-previous-response"
}
```

### Decimal Values

For monetary amounts (prices, totals), use strings to preserve precision:

```json
{
  "price": "99.99"
}
```

### DateTime Values

Use ISO 8601 format for date/time values:

```json
{
  "createdAfter": "2024-01-01T00:00:00Z",
  "createdBefore": "2024-12-31T23:59:59Z"
}
```
