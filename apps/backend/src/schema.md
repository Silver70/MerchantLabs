# E-Commerce Database Schema

## 🏬 1. Regions & Channels (Store Context)

### `regions`

| Column        | Type         | Description                             |
| ------------- | ------------ | --------------------------------------- |
| id            | uuid         | PK                                      |
| name          | text         | e.g., "United States", "European Union" |
| country_codes | text[]       | ISO country codes array                 |
| tax_rate      | numeric(5,2) | e.g., 7.5                               |
| tax_code      | text         | Optional for tax integration            |
| created_at    | timestamp    |                                         |
| updated_at    | timestamp    |                                         |

### `channels`

| Column           | Type      | Description                        |
| ---------------- | --------- | ---------------------------------- |
| id               | uuid      | PK                                 |
| name             | text      | e.g., "US Store"                   |
| slug             | text      | SEO-friendly identifier            |
| region_id        | uuid      | FK → regions                       |
| currency_code    | char(3)   | ISO currency code                  |
| tax_inclusive    | boolean   | Whether product prices include tax |
| default_language | text      | optional                           |
| is_active        | boolean   |                                    |
| created_at       | timestamp |                                    |
| updated_at       | timestamp |                                    |

### `channel_products`

| Column             | Type          | Description                   |
| ------------------ | ------------- | ----------------------------- |
| channel_id         | uuid          | FK → channels (PK)            |
| product_variant_id | uuid          | FK → product_variants (PK)    |
| price              | numeric(10,2) | Price in channel currency     |
| is_visible         | boolean       | Whether shown in this channel |

---

## 🛍️ 2. Catalog

### `categories`

| Column     | Type      | Description              |
| ---------- | --------- | ------------------------ |
| id         | uuid      | PK                       |
| name       | text      |                          |
| slug       | text      | SEO-friendly             |
| parent_id  | uuid      | nullable FK → categories |
| created_at | timestamp |                          |
| updated_at | timestamp |                          |

### `products`

| Column      | Type      | Description                    |
| ----------- | --------- | ------------------------------ |
| id          | uuid      | PK                             |
| name        | text      |                                |
| slug        | text      | SEO-friendly unique identifier |
| description | text      |                                |
| category_id | uuid      | FK → categories                |
| is_active   | boolean   |                                |
| created_at  | timestamp |                                |
| updated_at  | timestamp |                                |

### `product_variants`

| Column            | Type      | Description   |
| ----------------- | --------- | ------------- |
| id                | uuid      | PK            |
| product_id        | uuid      | FK → products |
| sku               | text      |               |
| quantity_in_stock | int       |               |
| created_at        | timestamp |               |
| updated_at        | timestamp |               |

### `attributes`

| Column | Type | Description           |
| ------ | ---- | --------------------- |
| id     | uuid | PK                    |
| name   | text | e.g., "Size", "Color" |

### `attribute_values`

| Column       | Type | Description       |
| ------------ | ---- | ----------------- |
| id           | uuid | PK                |
| attribute_id | uuid | FK → attributes   |
| value        | text | e.g., "Red", "XL" |

### `product_variant_attributes`

| Column             | Type | Description                |
| ------------------ | ---- | -------------------------- |
| product_variant_id | uuid | FK → product_variants (PK) |
| attribute_value_id | uuid | FK → attribute_values (PK) |

### `collections`

| Column      | Type      | Description  |
| ----------- | --------- | ------------ |
| id          | uuid      | PK           |
| name        | text      |              |
| slug        | text      | SEO-friendly |
| description | text      | optional     |
| is_active   | boolean   |              |
| created_at  | timestamp |              |
| updated_at  | timestamp |              |

### `collection_products`

| Column        | Type | Description           |
| ------------- | ---- | --------------------- |
| collection_id | uuid | FK → collections (PK) |
| product_id    | uuid | FK → products (PK)    |
| position      | int  | optional              |

---

## 🖼️ 3. Media

### `media`

| Column     | Type                     | Description          |
| ---------- | ------------------------ | -------------------- |
| id         | uuid                     | PK                   |
| url        | text                     | Full path or CDN URL |
| type       | enum(image, video, file) |                      |
| alt_text   | text                     | SEO/accessibility    |
| created_at | timestamp                |                      |
| updated_at | timestamp                |                      |

### `product_media`

| Column     | Type    | Description        |
| ---------- | ------- | ------------------ |
| product_id | uuid    | FK → products (PK) |
| media_id   | uuid    | FK → media (PK)    |
| position   | int     | display order      |
| is_primary | boolean | cover image flag   |

### `product_variant_media`

| Column             | Type    | Description                |
| ------------------ | ------- | -------------------------- |
| product_variant_id | uuid    | FK → product_variants (PK) |
| media_id           | uuid    | FK → media (PK)            |
| position           | int     |                            |
| is_primary         | boolean |                            |

---

## 👤 4. Customers & Addresses

### `customers`

| Column     | Type      | Description |
| ---------- | --------- | ----------- |
| id         | uuid      | PK          |
| first_name | text      |             |
| last_name  | text      |             |
| email      | text      | unique      |
| phone      | text      | optional    |
| created_at | timestamp |             |
| updated_at | timestamp |             |

### `addresses`

| Column      | Type                    | Description    |
| ----------- | ----------------------- | -------------- |
| id          | uuid                    | PK             |
| customer_id | uuid                    | FK → customers |
| type        | enum(shipping, billing) |                |
| line1       | text                    |                |
| line2       | text                    | optional       |
| city        | text                    |                |
| state       | text                    |                |
| postal_code | text                    |                |
| country     | text                    |                |
| created_at  | timestamp               |                |
| updated_at  | timestamp               |                |

---

## 🧾 5. Orders

### `orders`

| Column              | Type                                    | Description               |
| ------------------- | --------------------------------------- | ------------------------- |
| id                  | uuid                                    | PK                        |
| customer_id         | uuid                                    | FK → customers            |
| channel_id          | uuid                                    | FK → channels             |
| shipping_address_id | uuid                                    | FK → addresses            |
| billing_address_id  | uuid                                    | FK → addresses            |
| discount_id         | uuid                                    | FK → discounts (nullable) |
| currency_code       | char(3)                                 | denormalized from channel |
| region_id           | uuid                                    | FK → regions              |
| subtotal_amount     | numeric(10,2)                           | before tax/discount       |
| tax_amount          | numeric(10,2)                           |                           |
| total_amount        | numeric(10,2)                           | final total               |
| status              | enum(pending, paid, shipped, cancelled) |                           |
| created_at          | timestamp                               |                           |
| updated_at          | timestamp                               |                           |

### `order_items`

| Column              | Type          | Description           |
| ------------------- | ------------- | --------------------- |
| id                  | uuid          | PK                    |
| order_id            | uuid          | FK → orders           |
| product_variant_id  | uuid          | FK → product_variants |
| quantity            | int           |                       |
| price_at_order_time | numeric(10,2) | snapshot              |

---

## 💸 6. Discounts

### `discounts`

| Column              | Type                           | Description                |
| ------------------- | ------------------------------ | -------------------------- |
| id                  | uuid                           | PK                         |
| code                | text                           | nullable                   |
| type                | enum(percentage, fixed)        |                            |
| value               | numeric(10,2)                  |                            |
| start_date          | timestamp                      |                            |
| end_date            | timestamp                      |                            |
| is_active           | boolean                        |                            |
| applies_to          | enum(order, product, category) |                            |
| target_id           | uuid                           | FK depending on applies_to |
| min_order_amount    | numeric(10,2)                  | nullable                   |
| max_discount_amount | numeric(10,2)                  | nullable                   |
