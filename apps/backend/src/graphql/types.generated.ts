import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date | string; output: Date | string; }
  Decimal: { input: any; output: any; }
  UUID: { input: string; output: string; }
};

export type AddMediaToProductInput = {
  isPrimary?: InputMaybe<Scalars['Boolean']['input']>;
  mediaId: Scalars['UUID']['input'];
  position: Scalars['Int']['input'];
};

export type AddMediaToProductVariantInput = {
  isPrimary?: InputMaybe<Scalars['Boolean']['input']>;
  mediaId: Scalars['UUID']['input'];
  position: Scalars['Int']['input'];
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customerId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  postalCode: Scalars['String']['output'];
  state: Scalars['String']['output'];
  type: AddressType;
  updatedAt: Scalars['DateTime']['output'];
};

export type AddressConnection = {
  __typename?: 'AddressConnection';
  edges: Array<AddressEdge>;
  pageInfo: PageInfo;
};

export type AddressEdge = {
  __typename?: 'AddressEdge';
  cursor: Scalars['String']['output'];
  node: Address;
};

export type AddressResponse = {
  __typename?: 'AddressResponse';
  data?: Maybe<Address>;
  error?: Maybe<ErrorResponse>;
  success: Scalars['Boolean']['output'];
};

export type AddressType =
  | 'BILLING'
  | 'SHIPPING';

export type Attribute = {
  __typename?: 'Attribute';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  values: Array<AttributeValue>;
};

export type AttributeResponse = {
  __typename?: 'AttributeResponse';
  data?: Maybe<Attribute>;
  error?: Maybe<ErrorResponse>;
  success: Scalars['Boolean']['output'];
};

export type AttributeValue = {
  __typename?: 'AttributeValue';
  attributeId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  value: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  children: Array<Category>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<Category>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  edges: Array<CategoryEdge>;
  pageInfo: PageInfo;
};

export type CategoryEdge = {
  __typename?: 'CategoryEdge';
  cursor: Scalars['String']['output'];
  node: Category;
};

export type CategoryResponse = {
  __typename?: 'CategoryResponse';
  data?: Maybe<Category>;
  error?: Maybe<ErrorResponse>;
  success: Scalars['Boolean']['output'];
};

export type Channel = {
  __typename?: 'Channel';
  createdAt: Scalars['DateTime']['output'];
  currencyCode: Scalars['String']['output'];
  defaultLanguage?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  region: Region;
  slug: Scalars['String']['output'];
  taxInclusive: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ChannelConnection = {
  __typename?: 'ChannelConnection';
  edges: Array<ChannelEdge>;
  pageInfo: PageInfo;
};

export type ChannelEdge = {
  __typename?: 'ChannelEdge';
  cursor: Scalars['String']['output'];
  node: Channel;
};

export type ChannelProduct = {
  __typename?: 'ChannelProduct';
  channelId: Scalars['UUID']['output'];
  isVisible: Scalars['Boolean']['output'];
  price: Scalars['Decimal']['output'];
  productVariantId: Scalars['UUID']['output'];
};

export type ChannelProductPriceInput = {
  isVisible?: InputMaybe<Scalars['Boolean']['input']>;
  price: Scalars['Decimal']['input'];
  productVariantId: Scalars['UUID']['input'];
};

export type ChannelResponse = {
  __typename?: 'ChannelResponse';
  data?: Maybe<Channel>;
  error?: Maybe<ErrorResponse>;
  success: Scalars['Boolean']['output'];
};

export type Collection = {
  __typename?: 'Collection';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CollectionConnection = {
  __typename?: 'CollectionConnection';
  edges: Array<CollectionEdge>;
  pageInfo: PageInfo;
};

export type CollectionEdge = {
  __typename?: 'CollectionEdge';
  cursor: Scalars['String']['output'];
  node: Collection;
};

export type CollectionResponse = {
  __typename?: 'CollectionResponse';
  data?: Maybe<Collection>;
  error?: Maybe<ErrorResponse>;
  success: Scalars['Boolean']['output'];
};

export type CreateAddressInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  customerId: Scalars['UUID']['input'];
  line1: Scalars['String']['input'];
  line2?: InputMaybe<Scalars['String']['input']>;
  postalCode: Scalars['String']['input'];
  state: Scalars['String']['input'];
  type: AddressType;
};

export type CreateAttributeInput = {
  name: Scalars['String']['input'];
};

export type CreateAttributeValueInput = {
  attributeId: Scalars['UUID']['input'];
  value: Scalars['String']['input'];
};

export type CreateCategoryInput = {
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['UUID']['input']>;
  slug: Scalars['String']['input'];
};

export type CreateChannelInput = {
  currencyCode: Scalars['String']['input'];
  defaultLanguage?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  regionId: Scalars['UUID']['input'];
  slug: Scalars['String']['input'];
  taxInclusive?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateCollectionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type CreateCustomerInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDiscountInput = {
  appliesTo: DiscountAppliesToType;
  code?: InputMaybe<Scalars['String']['input']>;
  endDate: Scalars['DateTime']['input'];
  maxDiscountAmount?: InputMaybe<Scalars['Decimal']['input']>;
  minOrderAmount?: InputMaybe<Scalars['Decimal']['input']>;
  startDate: Scalars['DateTime']['input'];
  targetId?: InputMaybe<Scalars['UUID']['input']>;
  type: DiscountType;
  value: Scalars['Decimal']['input'];
};

export type CreateOrderInput = {
  billingAddressId: Scalars['UUID']['input'];
  channelId: Scalars['UUID']['input'];
  customerId: Scalars['UUID']['input'];
  discountId?: InputMaybe<Scalars['UUID']['input']>;
  items: Array<OrderItemInput>;
  shippingAddressId: Scalars['UUID']['input'];
};

export type CreateProductInput = {
  categoryId: Scalars['UUID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type CreateProductVariantInput = {
  productId: Scalars['UUID']['input'];
  quantityInStock?: InputMaybe<Scalars['Int']['input']>;
  sku: Scalars['String']['input'];
};

export type CreateRegionInput = {
  countryCodes: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  taxCode?: InputMaybe<Scalars['String']['input']>;
  taxRate: Scalars['Decimal']['input'];
};

export type Customer = {
  __typename?: 'Customer';
  addresses: Array<Address>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CustomerConnection = {
  __typename?: 'CustomerConnection';
  edges: Array<CustomerEdge>;
  pageInfo: PageInfo;
};

export type CustomerEdge = {
  __typename?: 'CustomerEdge';
  cursor: Scalars['String']['output'];
  node: Customer;
};

export type CustomerResponse = {
  __typename?: 'CustomerResponse';
  data?: Maybe<Customer>;
  error?: Maybe<ErrorResponse>;
  success: Scalars['Boolean']['output'];
};

export type Discount = {
  __typename?: 'Discount';
  appliesTo: DiscountAppliesToType;
  code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  endDate: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  maxDiscountAmount?: Maybe<Scalars['Decimal']['output']>;
  minOrderAmount?: Maybe<Scalars['Decimal']['output']>;
  startDate: Scalars['DateTime']['output'];
  targetId?: Maybe<Scalars['UUID']['output']>;
  type: DiscountType;
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['Decimal']['output'];
};

export type DiscountAppliesToType =
  | 'CATEGORY'
  | 'ORDER'
  | 'PRODUCT';

export type DiscountConnection = {
  __typename?: 'DiscountConnection';
  edges: Array<DiscountEdge>;
  pageInfo: PageInfo;
};

export type DiscountEdge = {
  __typename?: 'DiscountEdge';
  cursor: Scalars['String']['output'];
  node: Discount;
};

export type DiscountResponse = {
  __typename?: 'DiscountResponse';
  data?: Maybe<Discount>;
  error?: Maybe<ErrorResponse>;
  success: Scalars['Boolean']['output'];
};

export type DiscountType =
  | 'FIXED'
  | 'PERCENTAGE';

export type Error = {
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type ErrorResponse = Error & {
  __typename?: 'ErrorResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Media = {
  __typename?: 'Media';
  altText?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  type: MediaType;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type MediaConnection = {
  __typename?: 'MediaConnection';
  edges: Array<MediaEdge>;
  pageInfo: PageInfo;
};

export type MediaEdge = {
  __typename?: 'MediaEdge';
  cursor: Scalars['String']['output'];
  node: Media;
};

export type MediaResponse = {
  __typename?: 'MediaResponse';
  data?: Maybe<Media>;
  error?: Maybe<ErrorResponse>;
  success: Scalars['Boolean']['output'];
};

export type MediaType =
  | 'FILE'
  | 'IMAGE'
  | 'VIDEO';

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  addAttributeToVariant: ProductVariantResponse;
  addMediaToProduct: ProductMediaResponse;
  addMediaToProductVariant: ProductVariantMediaResponse;
  addProductToCollection: CollectionResponse;
  createAddress: AddressResponse;
  createAttribute: AttributeResponse;
  createAttributeValue: AttributeResponse;
  createCategory: CategoryResponse;
  createChannel: ChannelResponse;
  createCollection: CollectionResponse;
  createCustomer: CustomerResponse;
  createDiscount: DiscountResponse;
  createOrder: OrderResponse;
  createProduct: ProductResponse;
  createProductVariant: ProductVariantResponse;
  createRegion: RegionResponse;
  deleteAddress: AddressResponse;
  deleteAttribute: AttributeResponse;
  deleteAttributeValue: AttributeResponse;
  deleteCategory: CategoryResponse;
  deleteChannel: ChannelResponse;
  deleteCollection: CollectionResponse;
  deleteCustomer: CustomerResponse;
  deleteDiscount: DiscountResponse;
  deleteMedia: MediaResponse;
  deleteOrder: OrderResponse;
  deleteProduct: ProductResponse;
  deleteProductVariant: ProductVariantResponse;
  deleteRegion: RegionResponse;
  removeAttributeFromVariant: ProductVariantResponse;
  removeMediaFromProduct: ProductMediaResponse;
  removeMediaFromProductVariant: ProductVariantMediaResponse;
  removeProductFromCollection: CollectionResponse;
  setChannelProductPrice: ChannelResponse;
  updateAddress: AddressResponse;
  updateCategory: CategoryResponse;
  updateChannel: ChannelResponse;
  updateCollection: CollectionResponse;
  updateCustomer: CustomerResponse;
  updateDiscount: DiscountResponse;
  updateMedia: MediaResponse;
  updateOrderStatus: OrderResponse;
  updateProduct: ProductResponse;
  updateProductVariant: ProductVariantResponse;
  updateRegion: RegionResponse;
  uploadMedia: MediaResponse;
};


export type MutationaddAttributeToVariantArgs = {
  attributeValueId: Scalars['UUID']['input'];
  variantId: Scalars['UUID']['input'];
};


export type MutationaddMediaToProductArgs = {
  input: AddMediaToProductInput;
  productId: Scalars['UUID']['input'];
};


export type MutationaddMediaToProductVariantArgs = {
  input: AddMediaToProductVariantInput;
  productVariantId: Scalars['UUID']['input'];
};


export type MutationaddProductToCollectionArgs = {
  collectionId: Scalars['UUID']['input'];
  productId: Scalars['UUID']['input'];
};


export type MutationcreateAddressArgs = {
  input: CreateAddressInput;
};


export type MutationcreateAttributeArgs = {
  input: CreateAttributeInput;
};


export type MutationcreateAttributeValueArgs = {
  input: CreateAttributeValueInput;
};


export type MutationcreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationcreateChannelArgs = {
  input: CreateChannelInput;
};


export type MutationcreateCollectionArgs = {
  input: CreateCollectionInput;
};


export type MutationcreateCustomerArgs = {
  input: CreateCustomerInput;
};


export type MutationcreateDiscountArgs = {
  input: CreateDiscountInput;
};


export type MutationcreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationcreateProductArgs = {
  input: CreateProductInput;
};


export type MutationcreateProductVariantArgs = {
  input: CreateProductVariantInput;
};


export type MutationcreateRegionArgs = {
  input: CreateRegionInput;
};


export type MutationdeleteAddressArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationdeleteAttributeArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationdeleteAttributeValueArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationdeleteCategoryArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationdeleteChannelArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationdeleteCollectionArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationdeleteCustomerArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationdeleteDiscountArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationdeleteMediaArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationdeleteOrderArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationdeleteProductArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationdeleteProductVariantArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationdeleteRegionArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationremoveAttributeFromVariantArgs = {
  attributeValueId: Scalars['UUID']['input'];
  variantId: Scalars['UUID']['input'];
};


export type MutationremoveMediaFromProductArgs = {
  mediaId: Scalars['UUID']['input'];
  productId: Scalars['UUID']['input'];
};


export type MutationremoveMediaFromProductVariantArgs = {
  mediaId: Scalars['UUID']['input'];
  productVariantId: Scalars['UUID']['input'];
};


export type MutationremoveProductFromCollectionArgs = {
  collectionId: Scalars['UUID']['input'];
  productId: Scalars['UUID']['input'];
};


export type MutationsetChannelProductPriceArgs = {
  channelId: Scalars['UUID']['input'];
  input: ChannelProductPriceInput;
};


export type MutationupdateAddressArgs = {
  id: Scalars['UUID']['input'];
  input: UpdateAddressInput;
};


export type MutationupdateCategoryArgs = {
  id: Scalars['UUID']['input'];
  input: UpdateCategoryInput;
};


export type MutationupdateChannelArgs = {
  id: Scalars['UUID']['input'];
  input: UpdateChannelInput;
};


export type MutationupdateCollectionArgs = {
  id: Scalars['UUID']['input'];
  input: UpdateCollectionInput;
};


export type MutationupdateCustomerArgs = {
  id: Scalars['UUID']['input'];
  input: UpdateCustomerInput;
};


export type MutationupdateDiscountArgs = {
  id: Scalars['UUID']['input'];
  input: UpdateDiscountInput;
};


export type MutationupdateMediaArgs = {
  id: Scalars['UUID']['input'];
  input: UpdateMediaInput;
};


export type MutationupdateOrderStatusArgs = {
  id: Scalars['UUID']['input'];
  input: UpdateOrderStatusInput;
};


export type MutationupdateProductArgs = {
  id: Scalars['UUID']['input'];
  input: UpdateProductInput;
};


export type MutationupdateProductVariantArgs = {
  id: Scalars['UUID']['input'];
  input: UpdateProductVariantInput;
};


export type MutationupdateRegionArgs = {
  id: Scalars['UUID']['input'];
  input: UpdateRegionInput;
};


export type MutationuploadMediaArgs = {
  input: UploadMediaInput;
};

export type Order = {
  __typename?: 'Order';
  billingAddress: Address;
  channel: Channel;
  createdAt: Scalars['DateTime']['output'];
  currencyCode: Scalars['String']['output'];
  customer: Customer;
  discount?: Maybe<Discount>;
  id: Scalars['UUID']['output'];
  items: Array<OrderItem>;
  region: Region;
  shippingAddress: Address;
  status: OrderStatus;
  subtotalAmount: Scalars['Decimal']['output'];
  taxAmount: Scalars['Decimal']['output'];
  totalAmount: Scalars['Decimal']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderConnection = {
  __typename?: 'OrderConnection';
  edges: Array<OrderEdge>;
  pageInfo: PageInfo;
};

export type OrderEdge = {
  __typename?: 'OrderEdge';
  cursor: Scalars['String']['output'];
  node: Order;
};

export type OrderFilterInput = {
  channelId?: InputMaybe<Scalars['UUID']['input']>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  maxAmount?: InputMaybe<Scalars['Decimal']['input']>;
  minAmount?: InputMaybe<Scalars['Decimal']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<OrderStatus>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['UUID']['output'];
  orderId: Scalars['UUID']['output'];
  priceAtOrderTime: Scalars['Decimal']['output'];
  productVariant: ProductVariant;
  quantity: Scalars['Int']['output'];
};

export type OrderItemConnection = {
  __typename?: 'OrderItemConnection';
  edges: Array<OrderItemEdge>;
  pageInfo: PageInfo;
};

export type OrderItemEdge = {
  __typename?: 'OrderItemEdge';
  cursor: Scalars['String']['output'];
  node: OrderItem;
};

export type OrderItemInput = {
  priceAtOrderTime: Scalars['Decimal']['input'];
  productVariantId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
};

export type OrderResponse = {
  __typename?: 'OrderResponse';
  data?: Maybe<Order>;
  error?: Maybe<ErrorResponse>;
  success: Scalars['Boolean']['output'];
};

export type OrderStatus =
  | 'CANCELLED'
  | 'PAID'
  | 'PENDING'
  | 'SHIPPED';

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
  totalCount: Scalars['Int']['output'];
};

export type Product = {
  __typename?: 'Product';
  category: Category;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  variants: Array<ProductVariant>;
};

export type ProductConnection = {
  __typename?: 'ProductConnection';
  edges: Array<ProductEdge>;
  pageInfo: PageInfo;
};

export type ProductEdge = {
  __typename?: 'ProductEdge';
  cursor: Scalars['String']['output'];
  node: Product;
};

export type ProductFilterInput = {
  categoryId?: InputMaybe<Scalars['UUID']['input']>;
  collectionId?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxPrice?: InputMaybe<Scalars['Decimal']['input']>;
  minPrice?: InputMaybe<Scalars['Decimal']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ProductMedia = {
  __typename?: 'ProductMedia';
  isPrimary: Scalars['Boolean']['output'];
  media: Media;
  mediaId: Scalars['UUID']['output'];
  position: Scalars['Int']['output'];
  productId: Scalars['UUID']['output'];
};

export type ProductMediaResponse = {
  __typename?: 'ProductMediaResponse';
  data?: Maybe<ProductMedia>;
  error?: Maybe<ErrorResponse>;
  success: Scalars['Boolean']['output'];
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
  data?: Maybe<Product>;
  error?: Maybe<ErrorResponse>;
  success: Scalars['Boolean']['output'];
};

export type ProductVariant = {
  __typename?: 'ProductVariant';
  attributes: Array<AttributeValue>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  productId: Scalars['UUID']['output'];
  quantityInStock: Scalars['Int']['output'];
  sku: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductVariantAttributeInput = {
  attributeValueId: Scalars['UUID']['input'];
};

export type ProductVariantMedia = {
  __typename?: 'ProductVariantMedia';
  isPrimary: Scalars['Boolean']['output'];
  media: Media;
  mediaId: Scalars['UUID']['output'];
  position: Scalars['Int']['output'];
  productVariantId: Scalars['UUID']['output'];
};

export type ProductVariantMediaResponse = {
  __typename?: 'ProductVariantMediaResponse';
  data?: Maybe<ProductVariantMedia>;
  error?: Maybe<ErrorResponse>;
  success: Scalars['Boolean']['output'];
};

export type ProductVariantResponse = {
  __typename?: 'ProductVariantResponse';
  data?: Maybe<ProductVariant>;
  error?: Maybe<ErrorResponse>;
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Address>;
  addresses: AddressConnection;
  attribute?: Maybe<Attribute>;
  attributes: Array<Attribute>;
  categories: CategoryConnection;
  category?: Maybe<Category>;
  channel?: Maybe<Channel>;
  channels: ChannelConnection;
  collection?: Maybe<Collection>;
  collections: CollectionConnection;
  customer?: Maybe<Customer>;
  customers: CustomerConnection;
  discount?: Maybe<Discount>;
  discountByCode?: Maybe<Discount>;
  discounts: DiscountConnection;
  media?: Maybe<Media>;
  mediaList: MediaConnection;
  order?: Maybe<Order>;
  orders: OrderConnection;
  product?: Maybe<Product>;
  productBySlug?: Maybe<Product>;
  productVariant?: Maybe<ProductVariant>;
  products: ProductConnection;
  region?: Maybe<Region>;
  regions: RegionConnection;
};


export type QueryaddressArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryaddressesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<AddressType>;
};


export type QueryattributeArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryattributesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerycategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerycategoryArgs = {
  id: Scalars['UUID']['input'];
};


export type QuerychannelArgs = {
  id: Scalars['UUID']['input'];
};


export type QuerychannelsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerycollectionArgs = {
  id: Scalars['UUID']['input'];
};


export type QuerycollectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerycustomerArgs = {
  id: Scalars['UUID']['input'];
};


export type QuerycustomersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerydiscountArgs = {
  id: Scalars['UUID']['input'];
};


export type QuerydiscountByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QuerydiscountsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerymediaArgs = {
  id: Scalars['UUID']['input'];
};


export type QuerymediaListArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<MediaType>;
};


export type QueryorderArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryordersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  filter?: InputMaybe<OrderFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<OrderStatus>;
};


export type QueryproductArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryproductBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryproductVariantArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryproductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['UUID']['input']>;
  collectionId?: InputMaybe<Scalars['UUID']['input']>;
  filter?: InputMaybe<ProductFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryregionArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryregionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type Region = {
  __typename?: 'Region';
  countryCodes: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  taxCode?: Maybe<Scalars['String']['output']>;
  taxRate: Scalars['Decimal']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type RegionConnection = {
  __typename?: 'RegionConnection';
  edges: Array<RegionEdge>;
  pageInfo: PageInfo;
};

export type RegionEdge = {
  __typename?: 'RegionEdge';
  cursor: Scalars['String']['output'];
  node: Region;
};

export type RegionResponse = {
  __typename?: 'RegionResponse';
  data?: Maybe<Region>;
  error?: Maybe<ErrorResponse>;
  success: Scalars['Boolean']['output'];
};

export type Role =
  | 'ADMIN'
  | 'STAFF';

export type UpdateAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  line1?: InputMaybe<Scalars['String']['input']>;
  line2?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AddressType>;
};

export type UpdateCategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['UUID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateChannelInput = {
  currencyCode?: InputMaybe<Scalars['String']['input']>;
  defaultLanguage?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  regionId?: InputMaybe<Scalars['UUID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  taxInclusive?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateCollectionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerInput = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDiscountInput = {
  appliesTo?: InputMaybe<DiscountAppliesToType>;
  code?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxDiscountAmount?: InputMaybe<Scalars['Decimal']['input']>;
  minOrderAmount?: InputMaybe<Scalars['Decimal']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  targetId?: InputMaybe<Scalars['UUID']['input']>;
  type?: InputMaybe<DiscountType>;
  value?: InputMaybe<Scalars['Decimal']['input']>;
};

export type UpdateMediaInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrderStatusInput = {
  status: OrderStatus;
};

export type UpdateProductInput = {
  categoryId?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductVariantInput = {
  quantityInStock?: InputMaybe<Scalars['Int']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRegionInput = {
  countryCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  taxCode?: InputMaybe<Scalars['String']['input']>;
  taxRate?: InputMaybe<Scalars['Decimal']['input']>;
};

export type UploadMediaInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  type: MediaType;
  url: Scalars['String']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;




/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  Error: ( ErrorResponse & { __typename: 'ErrorResponse' } );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddMediaToProductInput: AddMediaToProductInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  AddMediaToProductVariantInput: AddMediaToProductVariantInput;
  Address: ResolverTypeWrapper<Omit<Address, 'type'> & { type: ResolversTypes['AddressType'] }>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  AddressConnection: ResolverTypeWrapper<Omit<AddressConnection, 'edges'> & { edges: Array<ResolversTypes['AddressEdge']> }>;
  AddressEdge: ResolverTypeWrapper<Omit<AddressEdge, 'node'> & { node: ResolversTypes['Address'] }>;
  AddressResponse: ResolverTypeWrapper<Omit<AddressResponse, 'data'> & { data?: Maybe<ResolversTypes['Address']> }>;
  AddressType: ResolverTypeWrapper<'SHIPPING' | 'BILLING'>;
  Attribute: ResolverTypeWrapper<Attribute>;
  AttributeResponse: ResolverTypeWrapper<AttributeResponse>;
  AttributeValue: ResolverTypeWrapper<AttributeValue>;
  Category: ResolverTypeWrapper<Category>;
  CategoryConnection: ResolverTypeWrapper<CategoryConnection>;
  CategoryEdge: ResolverTypeWrapper<CategoryEdge>;
  CategoryResponse: ResolverTypeWrapper<CategoryResponse>;
  Channel: ResolverTypeWrapper<Channel>;
  ChannelConnection: ResolverTypeWrapper<ChannelConnection>;
  ChannelEdge: ResolverTypeWrapper<ChannelEdge>;
  ChannelProduct: ResolverTypeWrapper<ChannelProduct>;
  ChannelProductPriceInput: ChannelProductPriceInput;
  ChannelResponse: ResolverTypeWrapper<ChannelResponse>;
  Collection: ResolverTypeWrapper<Collection>;
  CollectionConnection: ResolverTypeWrapper<CollectionConnection>;
  CollectionEdge: ResolverTypeWrapper<CollectionEdge>;
  CollectionResponse: ResolverTypeWrapper<CollectionResponse>;
  CreateAddressInput: CreateAddressInput;
  CreateAttributeInput: CreateAttributeInput;
  CreateAttributeValueInput: CreateAttributeValueInput;
  CreateCategoryInput: CreateCategoryInput;
  CreateChannelInput: CreateChannelInput;
  CreateCollectionInput: CreateCollectionInput;
  CreateCustomerInput: CreateCustomerInput;
  CreateDiscountInput: CreateDiscountInput;
  CreateOrderInput: CreateOrderInput;
  CreateProductInput: CreateProductInput;
  CreateProductVariantInput: CreateProductVariantInput;
  CreateRegionInput: CreateRegionInput;
  Customer: ResolverTypeWrapper<Omit<Customer, 'addresses'> & { addresses: Array<ResolversTypes['Address']> }>;
  CustomerConnection: ResolverTypeWrapper<Omit<CustomerConnection, 'edges'> & { edges: Array<ResolversTypes['CustomerEdge']> }>;
  CustomerEdge: ResolverTypeWrapper<Omit<CustomerEdge, 'node'> & { node: ResolversTypes['Customer'] }>;
  CustomerResponse: ResolverTypeWrapper<Omit<CustomerResponse, 'data'> & { data?: Maybe<ResolversTypes['Customer']> }>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Decimal: ResolverTypeWrapper<Scalars['Decimal']['output']>;
  Discount: ResolverTypeWrapper<Omit<Discount, 'appliesTo' | 'type'> & { appliesTo: ResolversTypes['DiscountAppliesToType'], type: ResolversTypes['DiscountType'] }>;
  DiscountAppliesToType: ResolverTypeWrapper<'ORDER' | 'PRODUCT' | 'CATEGORY'>;
  DiscountConnection: ResolverTypeWrapper<Omit<DiscountConnection, 'edges'> & { edges: Array<ResolversTypes['DiscountEdge']> }>;
  DiscountEdge: ResolverTypeWrapper<Omit<DiscountEdge, 'node'> & { node: ResolversTypes['Discount'] }>;
  DiscountResponse: ResolverTypeWrapper<Omit<DiscountResponse, 'data'> & { data?: Maybe<ResolversTypes['Discount']> }>;
  DiscountType: ResolverTypeWrapper<'PERCENTAGE' | 'FIXED'>;
  Error: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Error']>;
  ErrorResponse: ResolverTypeWrapper<ErrorResponse>;
  Media: ResolverTypeWrapper<Omit<Media, 'type'> & { type: ResolversTypes['MediaType'] }>;
  MediaConnection: ResolverTypeWrapper<Omit<MediaConnection, 'edges'> & { edges: Array<ResolversTypes['MediaEdge']> }>;
  MediaEdge: ResolverTypeWrapper<Omit<MediaEdge, 'node'> & { node: ResolversTypes['Media'] }>;
  MediaResponse: ResolverTypeWrapper<Omit<MediaResponse, 'data'> & { data?: Maybe<ResolversTypes['Media']> }>;
  MediaType: ResolverTypeWrapper<'IMAGE' | 'VIDEO' | 'FILE'>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Order: ResolverTypeWrapper<Omit<Order, 'billingAddress' | 'customer' | 'discount' | 'shippingAddress' | 'status'> & { billingAddress: ResolversTypes['Address'], customer: ResolversTypes['Customer'], discount?: Maybe<ResolversTypes['Discount']>, shippingAddress: ResolversTypes['Address'], status: ResolversTypes['OrderStatus'] }>;
  OrderConnection: ResolverTypeWrapper<Omit<OrderConnection, 'edges'> & { edges: Array<ResolversTypes['OrderEdge']> }>;
  OrderEdge: ResolverTypeWrapper<Omit<OrderEdge, 'node'> & { node: ResolversTypes['Order'] }>;
  OrderFilterInput: OrderFilterInput;
  OrderItem: ResolverTypeWrapper<OrderItem>;
  OrderItemConnection: ResolverTypeWrapper<OrderItemConnection>;
  OrderItemEdge: ResolverTypeWrapper<OrderItemEdge>;
  OrderItemInput: OrderItemInput;
  OrderResponse: ResolverTypeWrapper<Omit<OrderResponse, 'data'> & { data?: Maybe<ResolversTypes['Order']> }>;
  OrderStatus: ResolverTypeWrapper<'PENDING' | 'PAID' | 'SHIPPED' | 'CANCELLED'>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Product: ResolverTypeWrapper<Product>;
  ProductConnection: ResolverTypeWrapper<ProductConnection>;
  ProductEdge: ResolverTypeWrapper<ProductEdge>;
  ProductFilterInput: ProductFilterInput;
  ProductMedia: ResolverTypeWrapper<Omit<ProductMedia, 'media'> & { media: ResolversTypes['Media'] }>;
  ProductMediaResponse: ResolverTypeWrapper<Omit<ProductMediaResponse, 'data'> & { data?: Maybe<ResolversTypes['ProductMedia']> }>;
  ProductResponse: ResolverTypeWrapper<ProductResponse>;
  ProductVariant: ResolverTypeWrapper<ProductVariant>;
  ProductVariantAttributeInput: ProductVariantAttributeInput;
  ProductVariantMedia: ResolverTypeWrapper<Omit<ProductVariantMedia, 'media'> & { media: ResolversTypes['Media'] }>;
  ProductVariantMediaResponse: ResolverTypeWrapper<Omit<ProductVariantMediaResponse, 'data'> & { data?: Maybe<ResolversTypes['ProductVariantMedia']> }>;
  ProductVariantResponse: ResolverTypeWrapper<ProductVariantResponse>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Region: ResolverTypeWrapper<Region>;
  RegionConnection: ResolverTypeWrapper<RegionConnection>;
  RegionEdge: ResolverTypeWrapper<RegionEdge>;
  RegionResponse: ResolverTypeWrapper<RegionResponse>;
  Role: ResolverTypeWrapper<'ADMIN' | 'STAFF'>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  UpdateAddressInput: UpdateAddressInput;
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateChannelInput: UpdateChannelInput;
  UpdateCollectionInput: UpdateCollectionInput;
  UpdateCustomerInput: UpdateCustomerInput;
  UpdateDiscountInput: UpdateDiscountInput;
  UpdateMediaInput: UpdateMediaInput;
  UpdateOrderStatusInput: UpdateOrderStatusInput;
  UpdateProductInput: UpdateProductInput;
  UpdateProductVariantInput: UpdateProductVariantInput;
  UpdateRegionInput: UpdateRegionInput;
  UploadMediaInput: UploadMediaInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddMediaToProductInput: AddMediaToProductInput;
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  AddMediaToProductVariantInput: AddMediaToProductVariantInput;
  Address: Address;
  String: Scalars['String']['output'];
  AddressConnection: Omit<AddressConnection, 'edges'> & { edges: Array<ResolversParentTypes['AddressEdge']> };
  AddressEdge: Omit<AddressEdge, 'node'> & { node: ResolversParentTypes['Address'] };
  AddressResponse: Omit<AddressResponse, 'data'> & { data?: Maybe<ResolversParentTypes['Address']> };
  Attribute: Attribute;
  AttributeResponse: AttributeResponse;
  AttributeValue: AttributeValue;
  Category: Category;
  CategoryConnection: CategoryConnection;
  CategoryEdge: CategoryEdge;
  CategoryResponse: CategoryResponse;
  Channel: Channel;
  ChannelConnection: ChannelConnection;
  ChannelEdge: ChannelEdge;
  ChannelProduct: ChannelProduct;
  ChannelProductPriceInput: ChannelProductPriceInput;
  ChannelResponse: ChannelResponse;
  Collection: Collection;
  CollectionConnection: CollectionConnection;
  CollectionEdge: CollectionEdge;
  CollectionResponse: CollectionResponse;
  CreateAddressInput: CreateAddressInput;
  CreateAttributeInput: CreateAttributeInput;
  CreateAttributeValueInput: CreateAttributeValueInput;
  CreateCategoryInput: CreateCategoryInput;
  CreateChannelInput: CreateChannelInput;
  CreateCollectionInput: CreateCollectionInput;
  CreateCustomerInput: CreateCustomerInput;
  CreateDiscountInput: CreateDiscountInput;
  CreateOrderInput: CreateOrderInput;
  CreateProductInput: CreateProductInput;
  CreateProductVariantInput: CreateProductVariantInput;
  CreateRegionInput: CreateRegionInput;
  Customer: Omit<Customer, 'addresses'> & { addresses: Array<ResolversParentTypes['Address']> };
  CustomerConnection: Omit<CustomerConnection, 'edges'> & { edges: Array<ResolversParentTypes['CustomerEdge']> };
  CustomerEdge: Omit<CustomerEdge, 'node'> & { node: ResolversParentTypes['Customer'] };
  CustomerResponse: Omit<CustomerResponse, 'data'> & { data?: Maybe<ResolversParentTypes['Customer']> };
  DateTime: Scalars['DateTime']['output'];
  Decimal: Scalars['Decimal']['output'];
  Discount: Discount;
  DiscountConnection: Omit<DiscountConnection, 'edges'> & { edges: Array<ResolversParentTypes['DiscountEdge']> };
  DiscountEdge: Omit<DiscountEdge, 'node'> & { node: ResolversParentTypes['Discount'] };
  DiscountResponse: Omit<DiscountResponse, 'data'> & { data?: Maybe<ResolversParentTypes['Discount']> };
  Error: ResolversInterfaceTypes<ResolversParentTypes>['Error'];
  ErrorResponse: ErrorResponse;
  Media: Media;
  MediaConnection: Omit<MediaConnection, 'edges'> & { edges: Array<ResolversParentTypes['MediaEdge']> };
  MediaEdge: Omit<MediaEdge, 'node'> & { node: ResolversParentTypes['Media'] };
  MediaResponse: Omit<MediaResponse, 'data'> & { data?: Maybe<ResolversParentTypes['Media']> };
  Mutation: Record<PropertyKey, never>;
  Order: Omit<Order, 'billingAddress' | 'customer' | 'discount' | 'shippingAddress'> & { billingAddress: ResolversParentTypes['Address'], customer: ResolversParentTypes['Customer'], discount?: Maybe<ResolversParentTypes['Discount']>, shippingAddress: ResolversParentTypes['Address'] };
  OrderConnection: Omit<OrderConnection, 'edges'> & { edges: Array<ResolversParentTypes['OrderEdge']> };
  OrderEdge: Omit<OrderEdge, 'node'> & { node: ResolversParentTypes['Order'] };
  OrderFilterInput: OrderFilterInput;
  OrderItem: OrderItem;
  OrderItemConnection: OrderItemConnection;
  OrderItemEdge: OrderItemEdge;
  OrderItemInput: OrderItemInput;
  OrderResponse: Omit<OrderResponse, 'data'> & { data?: Maybe<ResolversParentTypes['Order']> };
  PageInfo: PageInfo;
  Product: Product;
  ProductConnection: ProductConnection;
  ProductEdge: ProductEdge;
  ProductFilterInput: ProductFilterInput;
  ProductMedia: Omit<ProductMedia, 'media'> & { media: ResolversParentTypes['Media'] };
  ProductMediaResponse: Omit<ProductMediaResponse, 'data'> & { data?: Maybe<ResolversParentTypes['ProductMedia']> };
  ProductResponse: ProductResponse;
  ProductVariant: ProductVariant;
  ProductVariantAttributeInput: ProductVariantAttributeInput;
  ProductVariantMedia: Omit<ProductVariantMedia, 'media'> & { media: ResolversParentTypes['Media'] };
  ProductVariantMediaResponse: Omit<ProductVariantMediaResponse, 'data'> & { data?: Maybe<ResolversParentTypes['ProductVariantMedia']> };
  ProductVariantResponse: ProductVariantResponse;
  Query: Record<PropertyKey, never>;
  Region: Region;
  RegionConnection: RegionConnection;
  RegionEdge: RegionEdge;
  RegionResponse: RegionResponse;
  UUID: Scalars['UUID']['output'];
  UpdateAddressInput: UpdateAddressInput;
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateChannelInput: UpdateChannelInput;
  UpdateCollectionInput: UpdateCollectionInput;
  UpdateCustomerInput: UpdateCustomerInput;
  UpdateDiscountInput: UpdateDiscountInput;
  UpdateMediaInput: UpdateMediaInput;
  UpdateOrderStatusInput: UpdateOrderStatusInput;
  UpdateProductInput: UpdateProductInput;
  UpdateProductVariantInput: UpdateProductVariantInput;
  UpdateRegionInput: UpdateRegionInput;
  UploadMediaInput: UploadMediaInput;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  line1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  line2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AddressType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type AddressConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressConnection'] = ResolversParentTypes['AddressConnection']> = {
  edges?: Resolver<Array<ResolversTypes['AddressEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type AddressEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressEdge'] = ResolversParentTypes['AddressEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
};

export type AddressResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressResponse'] = ResolversParentTypes['AddressResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type AddressTypeResolvers = EnumResolverSignature<{ BILLING?: any, SHIPPING?: any }, ResolversTypes['AddressType']>;

export type AttributeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Attribute'] = ResolversParentTypes['Attribute']> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values?: Resolver<Array<ResolversTypes['AttributeValue']>, ParentType, ContextType>;
};

export type AttributeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttributeResponse'] = ResolversParentTypes['AttributeResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Attribute']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type AttributeValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttributeValue'] = ResolversParentTypes['AttributeValue']> = {
  attributeId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  children?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type CategoryConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryConnection'] = ResolversParentTypes['CategoryConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CategoryEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type CategoryEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryEdge'] = ResolversParentTypes['CategoryEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
};

export type CategoryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryResponse'] = ResolversParentTypes['CategoryResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type ChannelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  currencyCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  defaultLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  region?: Resolver<ResolversTypes['Region'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  taxInclusive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type ChannelConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelConnection'] = ResolversParentTypes['ChannelConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ChannelEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type ChannelEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelEdge'] = ResolversParentTypes['ChannelEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
};

export type ChannelProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelProduct'] = ResolversParentTypes['ChannelProduct']> = {
  channelId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isVisible?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  productVariantId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
};

export type ChannelResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelResponse'] = ResolversParentTypes['ChannelResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type CollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type CollectionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionConnection'] = ResolversParentTypes['CollectionConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CollectionEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type CollectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionEdge'] = ResolversParentTypes['CollectionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Collection'], ParentType, ContextType>;
};

export type CollectionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionResponse'] = ResolversParentTypes['CollectionResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  addresses?: Resolver<Array<ResolversTypes['Address']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type CustomerConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerConnection'] = ResolversParentTypes['CustomerConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CustomerEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type CustomerEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerEdge'] = ResolversParentTypes['CustomerEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
};

export type CustomerResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerResponse'] = ResolversParentTypes['CustomerResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface DecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Decimal'], any> {
  name: 'Decimal';
}

export type DiscountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Discount'] = ResolversParentTypes['Discount']> = {
  appliesTo?: Resolver<ResolversTypes['DiscountAppliesToType'], ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  maxDiscountAmount?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  minOrderAmount?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  targetId?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['DiscountType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
};

export type DiscountAppliesToTypeResolvers = EnumResolverSignature<{ CATEGORY?: any, ORDER?: any, PRODUCT?: any }, ResolversTypes['DiscountAppliesToType']>;

export type DiscountConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscountConnection'] = ResolversParentTypes['DiscountConnection']> = {
  edges?: Resolver<Array<ResolversTypes['DiscountEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type DiscountEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscountEdge'] = ResolversParentTypes['DiscountEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Discount'], ParentType, ContextType>;
};

export type DiscountResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscountResponse'] = ResolversParentTypes['DiscountResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Discount']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type DiscountTypeResolvers = EnumResolverSignature<{ FIXED?: any, PERCENTAGE?: any }, ResolversTypes['DiscountType']>;

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  __resolveType?: TypeResolveFn<'ErrorResponse', ParentType, ContextType>;
};

export type ErrorResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ErrorResponse'] = ResolversParentTypes['ErrorResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Media'] = ResolversParentTypes['Media']> = {
  altText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MediaType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MediaConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaConnection'] = ResolversParentTypes['MediaConnection']> = {
  edges?: Resolver<Array<ResolversTypes['MediaEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type MediaEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaEdge'] = ResolversParentTypes['MediaEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Media'], ParentType, ContextType>;
};

export type MediaResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaResponse'] = ResolversParentTypes['MediaResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type MediaTypeResolvers = EnumResolverSignature<{ FILE?: any, IMAGE?: any, VIDEO?: any }, ResolversTypes['MediaType']>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addAttributeToVariant?: Resolver<ResolversTypes['ProductVariantResponse'], ParentType, ContextType, RequireFields<MutationaddAttributeToVariantArgs, 'attributeValueId' | 'variantId'>>;
  addMediaToProduct?: Resolver<ResolversTypes['ProductMediaResponse'], ParentType, ContextType, RequireFields<MutationaddMediaToProductArgs, 'input' | 'productId'>>;
  addMediaToProductVariant?: Resolver<ResolversTypes['ProductVariantMediaResponse'], ParentType, ContextType, RequireFields<MutationaddMediaToProductVariantArgs, 'input' | 'productVariantId'>>;
  addProductToCollection?: Resolver<ResolversTypes['CollectionResponse'], ParentType, ContextType, RequireFields<MutationaddProductToCollectionArgs, 'collectionId' | 'productId'>>;
  createAddress?: Resolver<ResolversTypes['AddressResponse'], ParentType, ContextType, RequireFields<MutationcreateAddressArgs, 'input'>>;
  createAttribute?: Resolver<ResolversTypes['AttributeResponse'], ParentType, ContextType, RequireFields<MutationcreateAttributeArgs, 'input'>>;
  createAttributeValue?: Resolver<ResolversTypes['AttributeResponse'], ParentType, ContextType, RequireFields<MutationcreateAttributeValueArgs, 'input'>>;
  createCategory?: Resolver<ResolversTypes['CategoryResponse'], ParentType, ContextType, RequireFields<MutationcreateCategoryArgs, 'input'>>;
  createChannel?: Resolver<ResolversTypes['ChannelResponse'], ParentType, ContextType, RequireFields<MutationcreateChannelArgs, 'input'>>;
  createCollection?: Resolver<ResolversTypes['CollectionResponse'], ParentType, ContextType, RequireFields<MutationcreateCollectionArgs, 'input'>>;
  createCustomer?: Resolver<ResolversTypes['CustomerResponse'], ParentType, ContextType, RequireFields<MutationcreateCustomerArgs, 'input'>>;
  createDiscount?: Resolver<ResolversTypes['DiscountResponse'], ParentType, ContextType, RequireFields<MutationcreateDiscountArgs, 'input'>>;
  createOrder?: Resolver<ResolversTypes['OrderResponse'], ParentType, ContextType, RequireFields<MutationcreateOrderArgs, 'input'>>;
  createProduct?: Resolver<ResolversTypes['ProductResponse'], ParentType, ContextType, RequireFields<MutationcreateProductArgs, 'input'>>;
  createProductVariant?: Resolver<ResolversTypes['ProductVariantResponse'], ParentType, ContextType, RequireFields<MutationcreateProductVariantArgs, 'input'>>;
  createRegion?: Resolver<ResolversTypes['RegionResponse'], ParentType, ContextType, RequireFields<MutationcreateRegionArgs, 'input'>>;
  deleteAddress?: Resolver<ResolversTypes['AddressResponse'], ParentType, ContextType, RequireFields<MutationdeleteAddressArgs, 'id'>>;
  deleteAttribute?: Resolver<ResolversTypes['AttributeResponse'], ParentType, ContextType, RequireFields<MutationdeleteAttributeArgs, 'id'>>;
  deleteAttributeValue?: Resolver<ResolversTypes['AttributeResponse'], ParentType, ContextType, RequireFields<MutationdeleteAttributeValueArgs, 'id'>>;
  deleteCategory?: Resolver<ResolversTypes['CategoryResponse'], ParentType, ContextType, RequireFields<MutationdeleteCategoryArgs, 'id'>>;
  deleteChannel?: Resolver<ResolversTypes['ChannelResponse'], ParentType, ContextType, RequireFields<MutationdeleteChannelArgs, 'id'>>;
  deleteCollection?: Resolver<ResolversTypes['CollectionResponse'], ParentType, ContextType, RequireFields<MutationdeleteCollectionArgs, 'id'>>;
  deleteCustomer?: Resolver<ResolversTypes['CustomerResponse'], ParentType, ContextType, RequireFields<MutationdeleteCustomerArgs, 'id'>>;
  deleteDiscount?: Resolver<ResolversTypes['DiscountResponse'], ParentType, ContextType, RequireFields<MutationdeleteDiscountArgs, 'id'>>;
  deleteMedia?: Resolver<ResolversTypes['MediaResponse'], ParentType, ContextType, RequireFields<MutationdeleteMediaArgs, 'id'>>;
  deleteOrder?: Resolver<ResolversTypes['OrderResponse'], ParentType, ContextType, RequireFields<MutationdeleteOrderArgs, 'id'>>;
  deleteProduct?: Resolver<ResolversTypes['ProductResponse'], ParentType, ContextType, RequireFields<MutationdeleteProductArgs, 'id'>>;
  deleteProductVariant?: Resolver<ResolversTypes['ProductVariantResponse'], ParentType, ContextType, RequireFields<MutationdeleteProductVariantArgs, 'id'>>;
  deleteRegion?: Resolver<ResolversTypes['RegionResponse'], ParentType, ContextType, RequireFields<MutationdeleteRegionArgs, 'id'>>;
  removeAttributeFromVariant?: Resolver<ResolversTypes['ProductVariantResponse'], ParentType, ContextType, RequireFields<MutationremoveAttributeFromVariantArgs, 'attributeValueId' | 'variantId'>>;
  removeMediaFromProduct?: Resolver<ResolversTypes['ProductMediaResponse'], ParentType, ContextType, RequireFields<MutationremoveMediaFromProductArgs, 'mediaId' | 'productId'>>;
  removeMediaFromProductVariant?: Resolver<ResolversTypes['ProductVariantMediaResponse'], ParentType, ContextType, RequireFields<MutationremoveMediaFromProductVariantArgs, 'mediaId' | 'productVariantId'>>;
  removeProductFromCollection?: Resolver<ResolversTypes['CollectionResponse'], ParentType, ContextType, RequireFields<MutationremoveProductFromCollectionArgs, 'collectionId' | 'productId'>>;
  setChannelProductPrice?: Resolver<ResolversTypes['ChannelResponse'], ParentType, ContextType, RequireFields<MutationsetChannelProductPriceArgs, 'channelId' | 'input'>>;
  updateAddress?: Resolver<ResolversTypes['AddressResponse'], ParentType, ContextType, RequireFields<MutationupdateAddressArgs, 'id' | 'input'>>;
  updateCategory?: Resolver<ResolversTypes['CategoryResponse'], ParentType, ContextType, RequireFields<MutationupdateCategoryArgs, 'id' | 'input'>>;
  updateChannel?: Resolver<ResolversTypes['ChannelResponse'], ParentType, ContextType, RequireFields<MutationupdateChannelArgs, 'id' | 'input'>>;
  updateCollection?: Resolver<ResolversTypes['CollectionResponse'], ParentType, ContextType, RequireFields<MutationupdateCollectionArgs, 'id' | 'input'>>;
  updateCustomer?: Resolver<ResolversTypes['CustomerResponse'], ParentType, ContextType, RequireFields<MutationupdateCustomerArgs, 'id' | 'input'>>;
  updateDiscount?: Resolver<ResolversTypes['DiscountResponse'], ParentType, ContextType, RequireFields<MutationupdateDiscountArgs, 'id' | 'input'>>;
  updateMedia?: Resolver<ResolversTypes['MediaResponse'], ParentType, ContextType, RequireFields<MutationupdateMediaArgs, 'id' | 'input'>>;
  updateOrderStatus?: Resolver<ResolversTypes['OrderResponse'], ParentType, ContextType, RequireFields<MutationupdateOrderStatusArgs, 'id' | 'input'>>;
  updateProduct?: Resolver<ResolversTypes['ProductResponse'], ParentType, ContextType, RequireFields<MutationupdateProductArgs, 'id' | 'input'>>;
  updateProductVariant?: Resolver<ResolversTypes['ProductVariantResponse'], ParentType, ContextType, RequireFields<MutationupdateProductVariantArgs, 'id' | 'input'>>;
  updateRegion?: Resolver<ResolversTypes['RegionResponse'], ParentType, ContextType, RequireFields<MutationupdateRegionArgs, 'id' | 'input'>>;
  uploadMedia?: Resolver<ResolversTypes['MediaResponse'], ParentType, ContextType, RequireFields<MutationuploadMediaArgs, 'input'>>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  billingAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  currencyCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  discount?: Resolver<Maybe<ResolversTypes['Discount']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['OrderItem']>, ParentType, ContextType>;
  region?: Resolver<ResolversTypes['Region'], ParentType, ContextType>;
  shippingAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['OrderStatus'], ParentType, ContextType>;
  subtotalAmount?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  taxAmount?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type OrderConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderConnection'] = ResolversParentTypes['OrderConnection']> = {
  edges?: Resolver<Array<ResolversTypes['OrderEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type OrderEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderEdge'] = ResolversParentTypes['OrderEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
};

export type OrderItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderItem'] = ResolversParentTypes['OrderItem']> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  orderId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  priceAtOrderTime?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  productVariant?: Resolver<ResolversTypes['ProductVariant'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type OrderItemConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderItemConnection'] = ResolversParentTypes['OrderItemConnection']> = {
  edges?: Resolver<Array<ResolversTypes['OrderItemEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type OrderItemEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderItemEdge'] = ResolversParentTypes['OrderItemEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['OrderItem'], ParentType, ContextType>;
};

export type OrderResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderResponse'] = ResolversParentTypes['OrderResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type OrderStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, PAID?: any, PENDING?: any, SHIPPED?: any }, ResolversTypes['OrderStatus']>;

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  variants?: Resolver<Array<ResolversTypes['ProductVariant']>, ParentType, ContextType>;
};

export type ProductConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductConnection'] = ResolversParentTypes['ProductConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ProductEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type ProductEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductEdge'] = ResolversParentTypes['ProductEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
};

export type ProductMediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductMedia'] = ResolversParentTypes['ProductMedia']> = {
  isPrimary?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  media?: Resolver<ResolversTypes['Media'], ParentType, ContextType>;
  mediaId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
};

export type ProductMediaResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductMediaResponse'] = ResolversParentTypes['ProductMediaResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['ProductMedia']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type ProductResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductResponse'] = ResolversParentTypes['ProductResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type ProductVariantResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductVariant'] = ResolversParentTypes['ProductVariant']> = {
  attributes?: Resolver<Array<ResolversTypes['AttributeValue']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  quantityInStock?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sku?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type ProductVariantMediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductVariantMedia'] = ResolversParentTypes['ProductVariantMedia']> = {
  isPrimary?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  media?: Resolver<ResolversTypes['Media'], ParentType, ContextType>;
  mediaId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  productVariantId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
};

export type ProductVariantMediaResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductVariantMediaResponse'] = ResolversParentTypes['ProductVariantMediaResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['ProductVariantMedia']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type ProductVariantResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductVariantResponse'] = ResolversParentTypes['ProductVariantResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['ProductVariant']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<QueryaddressArgs, 'id'>>;
  addresses?: Resolver<ResolversTypes['AddressConnection'], ParentType, ContextType, Partial<QueryaddressesArgs>>;
  attribute?: Resolver<Maybe<ResolversTypes['Attribute']>, ParentType, ContextType, RequireFields<QueryattributeArgs, 'id'>>;
  attributes?: Resolver<Array<ResolversTypes['Attribute']>, ParentType, ContextType, Partial<QueryattributesArgs>>;
  categories?: Resolver<ResolversTypes['CategoryConnection'], ParentType, ContextType, Partial<QuerycategoriesArgs>>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QuerycategoryArgs, 'id'>>;
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType, RequireFields<QuerychannelArgs, 'id'>>;
  channels?: Resolver<ResolversTypes['ChannelConnection'], ParentType, ContextType, Partial<QuerychannelsArgs>>;
  collection?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType, RequireFields<QuerycollectionArgs, 'id'>>;
  collections?: Resolver<ResolversTypes['CollectionConnection'], ParentType, ContextType, Partial<QuerycollectionsArgs>>;
  customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<QuerycustomerArgs, 'id'>>;
  customers?: Resolver<ResolversTypes['CustomerConnection'], ParentType, ContextType, Partial<QuerycustomersArgs>>;
  discount?: Resolver<Maybe<ResolversTypes['Discount']>, ParentType, ContextType, RequireFields<QuerydiscountArgs, 'id'>>;
  discountByCode?: Resolver<Maybe<ResolversTypes['Discount']>, ParentType, ContextType, RequireFields<QuerydiscountByCodeArgs, 'code'>>;
  discounts?: Resolver<ResolversTypes['DiscountConnection'], ParentType, ContextType, Partial<QuerydiscountsArgs>>;
  media?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType, RequireFields<QuerymediaArgs, 'id'>>;
  mediaList?: Resolver<ResolversTypes['MediaConnection'], ParentType, ContextType, Partial<QuerymediaListArgs>>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryorderArgs, 'id'>>;
  orders?: Resolver<ResolversTypes['OrderConnection'], ParentType, ContextType, Partial<QueryordersArgs>>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryproductArgs, 'id'>>;
  productBySlug?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryproductBySlugArgs, 'slug'>>;
  productVariant?: Resolver<Maybe<ResolversTypes['ProductVariant']>, ParentType, ContextType, RequireFields<QueryproductVariantArgs, 'id'>>;
  products?: Resolver<ResolversTypes['ProductConnection'], ParentType, ContextType, Partial<QueryproductsArgs>>;
  region?: Resolver<Maybe<ResolversTypes['Region']>, ParentType, ContextType, RequireFields<QueryregionArgs, 'id'>>;
  regions?: Resolver<ResolversTypes['RegionConnection'], ParentType, ContextType, Partial<QueryregionsArgs>>;
};

export type RegionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Region'] = ResolversParentTypes['Region']> = {
  countryCodes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  taxCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  taxRate?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type RegionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegionConnection'] = ResolversParentTypes['RegionConnection']> = {
  edges?: Resolver<Array<ResolversTypes['RegionEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type RegionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegionEdge'] = ResolversParentTypes['RegionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Region'], ParentType, ContextType>;
};

export type RegionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegionResponse'] = ResolversParentTypes['RegionResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Region']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type RoleResolvers = EnumResolverSignature<{ ADMIN?: any, STAFF?: any }, ResolversTypes['Role']>;

export interface UUIDScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  AddressConnection?: AddressConnectionResolvers<ContextType>;
  AddressEdge?: AddressEdgeResolvers<ContextType>;
  AddressResponse?: AddressResponseResolvers<ContextType>;
  AddressType?: AddressTypeResolvers;
  Attribute?: AttributeResolvers<ContextType>;
  AttributeResponse?: AttributeResponseResolvers<ContextType>;
  AttributeValue?: AttributeValueResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  CategoryConnection?: CategoryConnectionResolvers<ContextType>;
  CategoryEdge?: CategoryEdgeResolvers<ContextType>;
  CategoryResponse?: CategoryResponseResolvers<ContextType>;
  Channel?: ChannelResolvers<ContextType>;
  ChannelConnection?: ChannelConnectionResolvers<ContextType>;
  ChannelEdge?: ChannelEdgeResolvers<ContextType>;
  ChannelProduct?: ChannelProductResolvers<ContextType>;
  ChannelResponse?: ChannelResponseResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  CollectionConnection?: CollectionConnectionResolvers<ContextType>;
  CollectionEdge?: CollectionEdgeResolvers<ContextType>;
  CollectionResponse?: CollectionResponseResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  CustomerConnection?: CustomerConnectionResolvers<ContextType>;
  CustomerEdge?: CustomerEdgeResolvers<ContextType>;
  CustomerResponse?: CustomerResponseResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Decimal?: GraphQLScalarType;
  Discount?: DiscountResolvers<ContextType>;
  DiscountAppliesToType?: DiscountAppliesToTypeResolvers;
  DiscountConnection?: DiscountConnectionResolvers<ContextType>;
  DiscountEdge?: DiscountEdgeResolvers<ContextType>;
  DiscountResponse?: DiscountResponseResolvers<ContextType>;
  DiscountType?: DiscountTypeResolvers;
  Error?: ErrorResolvers<ContextType>;
  ErrorResponse?: ErrorResponseResolvers<ContextType>;
  Media?: MediaResolvers<ContextType>;
  MediaConnection?: MediaConnectionResolvers<ContextType>;
  MediaEdge?: MediaEdgeResolvers<ContextType>;
  MediaResponse?: MediaResponseResolvers<ContextType>;
  MediaType?: MediaTypeResolvers;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderConnection?: OrderConnectionResolvers<ContextType>;
  OrderEdge?: OrderEdgeResolvers<ContextType>;
  OrderItem?: OrderItemResolvers<ContextType>;
  OrderItemConnection?: OrderItemConnectionResolvers<ContextType>;
  OrderItemEdge?: OrderItemEdgeResolvers<ContextType>;
  OrderResponse?: OrderResponseResolvers<ContextType>;
  OrderStatus?: OrderStatusResolvers;
  PageInfo?: PageInfoResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductConnection?: ProductConnectionResolvers<ContextType>;
  ProductEdge?: ProductEdgeResolvers<ContextType>;
  ProductMedia?: ProductMediaResolvers<ContextType>;
  ProductMediaResponse?: ProductMediaResponseResolvers<ContextType>;
  ProductResponse?: ProductResponseResolvers<ContextType>;
  ProductVariant?: ProductVariantResolvers<ContextType>;
  ProductVariantMedia?: ProductVariantMediaResolvers<ContextType>;
  ProductVariantMediaResponse?: ProductVariantMediaResponseResolvers<ContextType>;
  ProductVariantResponse?: ProductVariantResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Region?: RegionResolvers<ContextType>;
  RegionConnection?: RegionConnectionResolvers<ContextType>;
  RegionEdge?: RegionEdgeResolvers<ContextType>;
  RegionResponse?: RegionResponseResolvers<ContextType>;
  Role?: RoleResolvers;
  UUID?: GraphQLScalarType;
};

