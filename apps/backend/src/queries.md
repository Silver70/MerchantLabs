# GraphQL Queries and Mutations - Orders and Customers

## CUSTOMERS

### Queries

#### Get Single Customer

```graphql
query GetCustomer($id: UUID!) {
  customer(id: $id) {
    id
    firstName
    lastName
    email
    phone
    addresses {
      id
      type
      line1
      line2
      city
      state
      postalCode
      country
    }
    createdAt
    updatedAt
  }
}
```

Variables:

```json
{
  "id": "customer-uuid-here"
}
```

---

#### Get All Customers (Paginated)

```graphql
query GetCustomers($first: Int, $after: String, $filter: CustomerFilterInput) {
  customers(first: $first, after: $after, filter: $filter) {
    edges {
      cursor
      node {
        id
        firstName
        lastName
        email
        phone
        createdAt
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

Variables:

```json
{
  "first": 10,
  "after": null,
  "filter": {
    "search": null,
    "email": null,
    "firstName": null,
    "lastName": null,
    "createdAfter": null,
    "createdBefore": null
  }
}
```

Filter example (search by email):

```json
{
  "first": 10,
  "after": null,
  "filter": {
    "email": "customer@example.com"
  }
}
```

Filter example (search by name):

```json
{
  "first": 10,
  "after": null,
  "filter": {
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

Filter example (search by date range):

```json
{
  "first": 10,
  "after": null,
  "filter": {
    "createdAfter": "2024-01-01T00:00:00Z",
    "createdBefore": "2024-12-31T23:59:59Z"
  }
}
```

---

#### Search Customers

```graphql
query SearchCustomers($query: String!, $first: Int, $after: String) {
  searchCustomers(query: $query, first: $first, after: $after) {
    edges {
      cursor
      node {
        id
        firstName
        lastName
        email
        phone
        createdAt
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

Variables:

```json
{
  "query": "john",
  "first": 10,
  "after": null
}
```

---

#### Get Single Address

```graphql
query GetAddress($id: UUID!) {
  address(id: $id) {
    id
    customerId
    type
    line1
    line2
    city
    state
    postalCode
    country
    createdAt
    updatedAt
  }
}
```

Variables:

```json
{
  "id": "address-uuid-here"
}
```

---

#### Get Customer Addresses

```graphql
query GetAddresses(
  $customerId: UUID
  $type: AddressType
  $first: Int
  $after: String
) {
  addresses(
    customerId: $customerId
    type: $type
    first: $first
    after: $after
  ) {
    edges {
      cursor
      node {
        id
        customerId
        type
        line1
        line2
        city
        state
        postalCode
        country
        createdAt
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

Variables (all addresses for customer):

```json
{
  "customerId": "customer-uuid-here",
  "type": null,
  "first": 10,
  "after": null
}
```

Variables (only shipping addresses):

```json
{
  "customerId": "customer-uuid-here",
  "type": "SHIPPING",
  "first": 10,
  "after": null
}
```

---

### Mutations

#### Create Customer

```graphql
mutation CreateCustomer($input: CreateCustomerInput!) {
  createCustomer(input: $input) {
    success
    data {
      id
      firstName
      lastName
      email
      phone
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
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890"
  }
}
```

---

#### Update Customer

```graphql
mutation UpdateCustomer($id: UUID!, $input: UpdateCustomerInput!) {
  updateCustomer(id: $id, input: $input) {
    success
    data {
      id
      firstName
      lastName
      email
      phone
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
  "id": "customer-uuid-here",
  "input": {
    "firstName": "Jane",
    "lastName": "Smith",
    "phone": "+0987654321"
  }
}
```

---

#### Delete Customer

```graphql
mutation DeleteCustomer($id: UUID!) {
  deleteCustomer(id: $id) {
    success
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
  "id": "customer-uuid-here"
}
```

---

#### Create Address

```graphql
mutation CreateAddress($input: CreateAddressInput!) {
  createAddress(input: $input) {
    success
    data {
      id
      customerId
      type
      line1
      line2
      city
      state
      postalCode
      country
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

Variables (Shipping Address):

```json
{
  "input": {
    "customerId": "customer-uuid-here",
    "type": "SHIPPING",
    "line1": "123 Main Street",
    "line2": "Apt 4B",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "United States"
  }
}
```

Variables (Billing Address):

```json
{
  "input": {
    "customerId": "customer-uuid-here",
    "type": "BILLING",
    "line1": "456 Oak Avenue",
    "line2": null,
    "city": "Los Angeles",
    "state": "CA",
    "postalCode": "90001",
    "country": "United States"
  }
}
```

---

#### Update Address

```graphql
mutation UpdateAddress($id: UUID!, $input: UpdateAddressInput!) {
  updateAddress(id: $id, input: $input) {
    success
    data {
      id
      customerId
      type
      line1
      line2
      city
      state
      postalCode
      country
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
  "id": "address-uuid-here",
  "input": {
    "line1": "789 Elm Street",
    "city": "Chicago",
    "state": "IL",
    "postalCode": "60601"
  }
}
```

---

#### Delete Address

```graphql
mutation DeleteAddress($id: UUID!) {
  deleteAddress(id: $id) {
    success
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
  "id": "address-uuid-here"
}
```

---

## ORDERS

### Queries

#### Get Single Order

```graphql
query GetOrder($id: UUID!) {
  order(id: $id) {
    id
    customer {
      id
      firstName
      lastName
      email
    }
    channel {
      id
      name
      code
    }
    shippingAddress {
      id
      line1
      line2
      city
      state
      postalCode
      country
    }
    billingAddress {
      id
      line1
      line2
      city
      state
      postalCode
      country
    }
    discount {
      id
      code
      type
      value
    }
    currencyCode
    region {
      id
      name
    }
    items {
      id
      orderId
      productVariant {
        id
        sku
        quantityInStock
      }
      quantity
      priceAtOrderTime
    }
    subtotalAmount
    taxAmount
    totalAmount
    status
    createdAt
    updatedAt
  }
}
```

Variables:

```json
{
  "id": "order-uuid-here"
}
```

---

#### Get All Orders (Paginated)

```graphql
query GetOrders($first: Int, $after: String, $filter: OrderFilterInput) {
  orders(first: $first, after: $after, filter: $filter) {
    edges {
      cursor
      node {
        id
        customer {
          id
          firstName
          lastName
          email
        }
        channel {
          id
          name
        }
        currencyCode
        status
        subtotalAmount
        taxAmount
        totalAmount
        createdAt
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

Variables (all orders):

```json
{
  "first": 10,
  "after": null,
  "filter": null
}
```

Variables (filter by customer):

```json
{
  "first": 10,
  "after": null,
  "filter": {
    "customerId": "customer-uuid-here"
  }
}
```

Variables (filter by status):

```json
{
  "first": 10,
  "after": null,
  "filter": {
    "status": "PAID"
  }
}
```

Variables (filter by date range):

```json
{
  "first": 10,
  "after": null,
  "filter": {
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-12-31T23:59:59Z"
  }
}
```

Variables (filter by amount range):

```json
{
  "first": 10,
  "after": null,
  "filter": {
    "minAmount": "100.00",
    "maxAmount": "1000.00"
  }
}
```

---

### Mutations

#### Create Order

```graphql
mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    success
    data {
      id
      customer {
        id
        firstName
        lastName
      }
      items {
        id
        productVariant {
          id
          sku
        }
        quantity
        priceAtOrderTime
      }
      subtotalAmount
      taxAmount
      totalAmount
      status
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

Variables (basic order):

```json
{
  "input": {
    "customerId": "customer-uuid-here",
    "channelId": "channel-uuid-here",
    "shippingAddressId": "shipping-address-uuid-here",
    "billingAddressId": "billing-address-uuid-here",
    "discountId": null,
    "items": [
      {
        "productVariantId": "variant-uuid-1",
        "quantity": 2,
        "priceAtOrderTime": "49.99"
      },
      {
        "productVariantId": "variant-uuid-2",
        "quantity": 1,
        "priceAtOrderTime": "99.99"
      }
    ]
  }
}
```

Variables (order with discount):

```json
{
  "input": {
    "customerId": "customer-uuid-here",
    "channelId": "channel-uuid-here",
    "shippingAddressId": "shipping-address-uuid-here",
    "billingAddressId": "billing-address-uuid-here",
    "discountId": "discount-uuid-here",
    "items": [
      {
        "productVariantId": "variant-uuid-1",
        "quantity": 1,
        "priceAtOrderTime": "99.99"
      }
    ]
  }
}
```

---

#### Update Order Status

```graphql
mutation UpdateOrderStatus($id: UUID!, $input: UpdateOrderStatusInput!) {
  updateOrderStatus(id: $id, input: $input) {
    success
    data {
      id
      status
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

Variables (mark as paid):

```json
{
  "id": "order-uuid-here",
  "input": {
    "status": "PAID"
  }
}
```

Variables (mark as shipped):

```json
{
  "id": "order-uuid-here",
  "input": {
    "status": "SHIPPED"
  }
}
```

Variables (cancel order):

```json
{
  "id": "order-uuid-here",
  "input": {
    "status": "CANCELLED"
  }
}
```

---

#### Delete Order

```graphql
mutation DeleteOrder($id: UUID!) {
  deleteOrder(id: $id) {
    success
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
  "id": "order-uuid-here"
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
    collectionId: $collectionId
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

## Common Patterns

### Pagination

All paginated queries support cursor-based pagination:

```graphql
query GetNextPage($first: Int, $after: String) {
  customers(first: $first, after: $after) {
    edges {
      cursor
      node {
        id
        firstName
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
  "first": 10,
  "after": "base64-encoded-cursor-from-previous-response"
}
```

### Address Types

Two types of addresses are supported:

- `SHIPPING` - For delivery addresses
- `BILLING` - For billing/payment addresses

### Order Status

Possible order statuses:

- `PENDING` - Order created but not yet paid
- `PAID` - Payment received
- `SHIPPED` - Order shipped
- `CANCELLED` - Order cancelled

### Decimal Values

For monetary amounts (prices, totals), use strings to preserve precision:

```json
{
  "priceAtOrderTime": "49.99",
  "subtotalAmount": "149.97"
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
