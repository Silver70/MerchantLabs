/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { _empty as Query__empty } from './schema/base/resolvers/Query/_empty';
import    { address as Query_address } from './schema/customers/resolvers/Query/address';
import    { addresses as Query_addresses } from './schema/customers/resolvers/Query/addresses';
import    { attribute as Query_attribute } from './schema/catalog/resolvers/Query/attribute';
import    { attributes as Query_attributes } from './schema/catalog/resolvers/Query/attributes';
import    { categories as Query_categories } from './schema/catalog/resolvers/Query/categories';
import    { category as Query_category } from './schema/catalog/resolvers/Query/category';
import    { channel as Query_channel } from './schema/regions-channels/resolvers/Query/channel';
import    { channels as Query_channels } from './schema/regions-channels/resolvers/Query/channels';
import    { collection as Query_collection } from './schema/catalog/resolvers/Query/collection';
import    { collections as Query_collections } from './schema/catalog/resolvers/Query/collections';
import    { customer as Query_customer } from './schema/customers/resolvers/Query/customer';
import    { customers as Query_customers } from './schema/customers/resolvers/Query/customers';
import    { discount as Query_discount } from './schema/discounts/resolvers/Query/discount';
import    { discountByCode as Query_discountByCode } from './schema/discounts/resolvers/Query/discountByCode';
import    { discounts as Query_discounts } from './schema/discounts/resolvers/Query/discounts';
import    { media as Query_media } from './schema/media/resolvers/Query/media';
import    { mediaList as Query_mediaList } from './schema/media/resolvers/Query/mediaList';
import    { order as Query_order } from './schema/orders/resolvers/Query/order';
import    { orders as Query_orders } from './schema/orders/resolvers/Query/orders';
import    { product as Query_product } from './schema/catalog/resolvers/Query/product';
import    { productBySlug as Query_productBySlug } from './schema/catalog/resolvers/Query/productBySlug';
import    { productVariant as Query_productVariant } from './schema/catalog/resolvers/Query/productVariant';
import    { products as Query_products } from './schema/catalog/resolvers/Query/products';
import    { region as Query_region } from './schema/regions-channels/resolvers/Query/region';
import    { regions as Query_regions } from './schema/regions-channels/resolvers/Query/regions';
import    { searchCustomers as Query_searchCustomers } from './schema/customers/resolvers/Query/searchCustomers';
import    { _empty as Mutation__empty } from './schema/base/resolvers/Mutation/_empty';
import    { addAttributeToVariant as Mutation_addAttributeToVariant } from './schema/catalog/resolvers/Mutation/addAttributeToVariant';
import    { addMediaToProduct as Mutation_addMediaToProduct } from './schema/media/resolvers/Mutation/addMediaToProduct';
import    { addMediaToProductVariant as Mutation_addMediaToProductVariant } from './schema/media/resolvers/Mutation/addMediaToProductVariant';
import    { addProductToCollection as Mutation_addProductToCollection } from './schema/catalog/resolvers/Mutation/addProductToCollection';
import    { createAddress as Mutation_createAddress } from './schema/customers/resolvers/Mutation/createAddress';
import    { createAttribute as Mutation_createAttribute } from './schema/catalog/resolvers/Mutation/createAttribute';
import    { createAttributeValue as Mutation_createAttributeValue } from './schema/catalog/resolvers/Mutation/createAttributeValue';
import    { createCategory as Mutation_createCategory } from './schema/catalog/resolvers/Mutation/createCategory';
import    { createChannel as Mutation_createChannel } from './schema/regions-channels/resolvers/Mutation/createChannel';
import    { createCollection as Mutation_createCollection } from './schema/catalog/resolvers/Mutation/createCollection';
import    { createCustomer as Mutation_createCustomer } from './schema/customers/resolvers/Mutation/createCustomer';
import    { createDiscount as Mutation_createDiscount } from './schema/discounts/resolvers/Mutation/createDiscount';
import    { createOrder as Mutation_createOrder } from './schema/orders/resolvers/Mutation/createOrder';
import    { createProduct as Mutation_createProduct } from './schema/catalog/resolvers/Mutation/createProduct';
import    { createProductVariant as Mutation_createProductVariant } from './schema/catalog/resolvers/Mutation/createProductVariant';
import    { createRegion as Mutation_createRegion } from './schema/regions-channels/resolvers/Mutation/createRegion';
import    { deleteAddress as Mutation_deleteAddress } from './schema/customers/resolvers/Mutation/deleteAddress';
import    { deleteAttribute as Mutation_deleteAttribute } from './schema/catalog/resolvers/Mutation/deleteAttribute';
import    { deleteAttributeValue as Mutation_deleteAttributeValue } from './schema/catalog/resolvers/Mutation/deleteAttributeValue';
import    { deleteCategory as Mutation_deleteCategory } from './schema/catalog/resolvers/Mutation/deleteCategory';
import    { deleteChannel as Mutation_deleteChannel } from './schema/regions-channels/resolvers/Mutation/deleteChannel';
import    { deleteCollection as Mutation_deleteCollection } from './schema/catalog/resolvers/Mutation/deleteCollection';
import    { deleteCustomer as Mutation_deleteCustomer } from './schema/customers/resolvers/Mutation/deleteCustomer';
import    { deleteDiscount as Mutation_deleteDiscount } from './schema/discounts/resolvers/Mutation/deleteDiscount';
import    { deleteMedia as Mutation_deleteMedia } from './schema/media/resolvers/Mutation/deleteMedia';
import    { deleteOrder as Mutation_deleteOrder } from './schema/orders/resolvers/Mutation/deleteOrder';
import    { deleteProduct as Mutation_deleteProduct } from './schema/catalog/resolvers/Mutation/deleteProduct';
import    { deleteProductVariant as Mutation_deleteProductVariant } from './schema/catalog/resolvers/Mutation/deleteProductVariant';
import    { deleteRegion as Mutation_deleteRegion } from './schema/regions-channels/resolvers/Mutation/deleteRegion';
import    { removeAttributeFromVariant as Mutation_removeAttributeFromVariant } from './schema/catalog/resolvers/Mutation/removeAttributeFromVariant';
import    { removeMediaFromProduct as Mutation_removeMediaFromProduct } from './schema/media/resolvers/Mutation/removeMediaFromProduct';
import    { removeMediaFromProductVariant as Mutation_removeMediaFromProductVariant } from './schema/media/resolvers/Mutation/removeMediaFromProductVariant';
import    { removeProductFromCollection as Mutation_removeProductFromCollection } from './schema/catalog/resolvers/Mutation/removeProductFromCollection';
import    { setChannelProductPrice as Mutation_setChannelProductPrice } from './schema/regions-channels/resolvers/Mutation/setChannelProductPrice';
import    { updateAddress as Mutation_updateAddress } from './schema/customers/resolvers/Mutation/updateAddress';
import    { updateCategory as Mutation_updateCategory } from './schema/catalog/resolvers/Mutation/updateCategory';
import    { updateChannel as Mutation_updateChannel } from './schema/regions-channels/resolvers/Mutation/updateChannel';
import    { updateCollection as Mutation_updateCollection } from './schema/catalog/resolvers/Mutation/updateCollection';
import    { updateCustomer as Mutation_updateCustomer } from './schema/customers/resolvers/Mutation/updateCustomer';
import    { updateDiscount as Mutation_updateDiscount } from './schema/discounts/resolvers/Mutation/updateDiscount';
import    { updateMedia as Mutation_updateMedia } from './schema/media/resolvers/Mutation/updateMedia';
import    { updateOrderStatus as Mutation_updateOrderStatus } from './schema/orders/resolvers/Mutation/updateOrderStatus';
import    { updateProduct as Mutation_updateProduct } from './schema/catalog/resolvers/Mutation/updateProduct';
import    { updateProductVariant as Mutation_updateProductVariant } from './schema/catalog/resolvers/Mutation/updateProductVariant';
import    { updateRegion as Mutation_updateRegion } from './schema/regions-channels/resolvers/Mutation/updateRegion';
import    { uploadMedia as Mutation_uploadMedia } from './schema/media/resolvers/Mutation/uploadMedia';
import    { Address } from './schema/customers/resolvers/Address';
import    { AddressConnection } from './schema/customers/resolvers/AddressConnection';
import    { AddressEdge } from './schema/customers/resolvers/AddressEdge';
import    { AddressResponse } from './schema/customers/resolvers/AddressResponse';
import    { Attribute } from './schema/catalog/resolvers/Attribute';
import    { AttributeResponse } from './schema/catalog/resolvers/AttributeResponse';
import    { AttributeValue } from './schema/catalog/resolvers/AttributeValue';
import    { Category } from './schema/catalog/resolvers/Category';
import    { CategoryConnection } from './schema/catalog/resolvers/CategoryConnection';
import    { CategoryEdge } from './schema/catalog/resolvers/CategoryEdge';
import    { CategoryResponse } from './schema/catalog/resolvers/CategoryResponse';
import    { Channel } from './schema/regions-channels/resolvers/Channel';
import    { ChannelConnection } from './schema/regions-channels/resolvers/ChannelConnection';
import    { ChannelEdge } from './schema/regions-channels/resolvers/ChannelEdge';
import    { ChannelProduct } from './schema/regions-channels/resolvers/ChannelProduct';
import    { ChannelResponse } from './schema/regions-channels/resolvers/ChannelResponse';
import    { Collection } from './schema/catalog/resolvers/Collection';
import    { CollectionConnection } from './schema/catalog/resolvers/CollectionConnection';
import    { CollectionEdge } from './schema/catalog/resolvers/CollectionEdge';
import    { CollectionResponse } from './schema/catalog/resolvers/CollectionResponse';
import    { Customer } from './schema/customers/resolvers/Customer';
import    { CustomerConnection } from './schema/customers/resolvers/CustomerConnection';
import    { CustomerEdge } from './schema/customers/resolvers/CustomerEdge';
import    { CustomerResponse } from './schema/customers/resolvers/CustomerResponse';
import    { DeleteResponse } from './schema/customers/resolvers/DeleteResponse';
import    { Discount } from './schema/discounts/resolvers/Discount';
import    { DiscountConnection } from './schema/discounts/resolvers/DiscountConnection';
import    { DiscountEdge } from './schema/discounts/resolvers/DiscountEdge';
import    { DiscountResponse } from './schema/discounts/resolvers/DiscountResponse';
import    { ErrorResponse } from './schema/base/resolvers/ErrorResponse';
import    { Media } from './schema/media/resolvers/Media';
import    { MediaConnection } from './schema/media/resolvers/MediaConnection';
import    { MediaEdge } from './schema/media/resolvers/MediaEdge';
import    { MediaResponse } from './schema/media/resolvers/MediaResponse';
import    { Order } from './schema/orders/resolvers/Order';
import    { OrderConnection } from './schema/orders/resolvers/OrderConnection';
import    { OrderEdge } from './schema/orders/resolvers/OrderEdge';
import    { OrderItem } from './schema/orders/resolvers/OrderItem';
import    { OrderItemConnection } from './schema/orders/resolvers/OrderItemConnection';
import    { OrderItemEdge } from './schema/orders/resolvers/OrderItemEdge';
import    { OrderResponse } from './schema/orders/resolvers/OrderResponse';
import    { PageInfo } from './schema/base/resolvers/PageInfo';
import    { Product } from './schema/catalog/resolvers/Product';
import    { ProductConnection } from './schema/catalog/resolvers/ProductConnection';
import    { ProductEdge } from './schema/catalog/resolvers/ProductEdge';
import    { ProductMedia } from './schema/media/resolvers/ProductMedia';
import    { ProductMediaResponse } from './schema/media/resolvers/ProductMediaResponse';
import    { ProductResponse } from './schema/catalog/resolvers/ProductResponse';
import    { ProductVariant } from './schema/catalog/resolvers/ProductVariant';
import    { ProductVariantMedia } from './schema/media/resolvers/ProductVariantMedia';
import    { ProductVariantMediaResponse } from './schema/media/resolvers/ProductVariantMediaResponse';
import    { ProductVariantResponse } from './schema/catalog/resolvers/ProductVariantResponse';
import    { Region } from './schema/regions-channels/resolvers/Region';
import    { RegionConnection } from './schema/regions-channels/resolvers/RegionConnection';
import    { RegionEdge } from './schema/regions-channels/resolvers/RegionEdge';
import    { RegionResponse } from './schema/regions-channels/resolvers/RegionResponse';
import    { DateTime } from './schema/base/resolvers/DateTime';
import    { Decimal } from './schema/base/resolvers/Decimal';
import    { UUID } from './schema/base/resolvers/UUID';
    export const resolvers: Resolvers = {
      Query: { _empty: Query__empty,address: Query_address,addresses: Query_addresses,attribute: Query_attribute,attributes: Query_attributes,categories: Query_categories,category: Query_category,channel: Query_channel,channels: Query_channels,collection: Query_collection,collections: Query_collections,customer: Query_customer,customers: Query_customers,discount: Query_discount,discountByCode: Query_discountByCode,discounts: Query_discounts,media: Query_media,mediaList: Query_mediaList,order: Query_order,orders: Query_orders,product: Query_product,productBySlug: Query_productBySlug,productVariant: Query_productVariant,products: Query_products,region: Query_region,regions: Query_regions,searchCustomers: Query_searchCustomers },
      Mutation: { _empty: Mutation__empty,addAttributeToVariant: Mutation_addAttributeToVariant,addMediaToProduct: Mutation_addMediaToProduct,addMediaToProductVariant: Mutation_addMediaToProductVariant,addProductToCollection: Mutation_addProductToCollection,createAddress: Mutation_createAddress,createAttribute: Mutation_createAttribute,createAttributeValue: Mutation_createAttributeValue,createCategory: Mutation_createCategory,createChannel: Mutation_createChannel,createCollection: Mutation_createCollection,createCustomer: Mutation_createCustomer,createDiscount: Mutation_createDiscount,createOrder: Mutation_createOrder,createProduct: Mutation_createProduct,createProductVariant: Mutation_createProductVariant,createRegion: Mutation_createRegion,deleteAddress: Mutation_deleteAddress,deleteAttribute: Mutation_deleteAttribute,deleteAttributeValue: Mutation_deleteAttributeValue,deleteCategory: Mutation_deleteCategory,deleteChannel: Mutation_deleteChannel,deleteCollection: Mutation_deleteCollection,deleteCustomer: Mutation_deleteCustomer,deleteDiscount: Mutation_deleteDiscount,deleteMedia: Mutation_deleteMedia,deleteOrder: Mutation_deleteOrder,deleteProduct: Mutation_deleteProduct,deleteProductVariant: Mutation_deleteProductVariant,deleteRegion: Mutation_deleteRegion,removeAttributeFromVariant: Mutation_removeAttributeFromVariant,removeMediaFromProduct: Mutation_removeMediaFromProduct,removeMediaFromProductVariant: Mutation_removeMediaFromProductVariant,removeProductFromCollection: Mutation_removeProductFromCollection,setChannelProductPrice: Mutation_setChannelProductPrice,updateAddress: Mutation_updateAddress,updateCategory: Mutation_updateCategory,updateChannel: Mutation_updateChannel,updateCollection: Mutation_updateCollection,updateCustomer: Mutation_updateCustomer,updateDiscount: Mutation_updateDiscount,updateMedia: Mutation_updateMedia,updateOrderStatus: Mutation_updateOrderStatus,updateProduct: Mutation_updateProduct,updateProductVariant: Mutation_updateProductVariant,updateRegion: Mutation_updateRegion,uploadMedia: Mutation_uploadMedia },
      
      Address: Address,
AddressConnection: AddressConnection,
AddressEdge: AddressEdge,
AddressResponse: AddressResponse,
Attribute: Attribute,
AttributeResponse: AttributeResponse,
AttributeValue: AttributeValue,
Category: Category,
CategoryConnection: CategoryConnection,
CategoryEdge: CategoryEdge,
CategoryResponse: CategoryResponse,
Channel: Channel,
ChannelConnection: ChannelConnection,
ChannelEdge: ChannelEdge,
ChannelProduct: ChannelProduct,
ChannelResponse: ChannelResponse,
Collection: Collection,
CollectionConnection: CollectionConnection,
CollectionEdge: CollectionEdge,
CollectionResponse: CollectionResponse,
Customer: Customer,
CustomerConnection: CustomerConnection,
CustomerEdge: CustomerEdge,
CustomerResponse: CustomerResponse,
DeleteResponse: DeleteResponse,
Discount: Discount,
DiscountConnection: DiscountConnection,
DiscountEdge: DiscountEdge,
DiscountResponse: DiscountResponse,
ErrorResponse: ErrorResponse,
Media: Media,
MediaConnection: MediaConnection,
MediaEdge: MediaEdge,
MediaResponse: MediaResponse,
Order: Order,
OrderConnection: OrderConnection,
OrderEdge: OrderEdge,
OrderItem: OrderItem,
OrderItemConnection: OrderItemConnection,
OrderItemEdge: OrderItemEdge,
OrderResponse: OrderResponse,
PageInfo: PageInfo,
Product: Product,
ProductConnection: ProductConnection,
ProductEdge: ProductEdge,
ProductMedia: ProductMedia,
ProductMediaResponse: ProductMediaResponse,
ProductResponse: ProductResponse,
ProductVariant: ProductVariant,
ProductVariantMedia: ProductVariantMedia,
ProductVariantMediaResponse: ProductVariantMediaResponse,
ProductVariantResponse: ProductVariantResponse,
Region: Region,
RegionConnection: RegionConnection,
RegionEdge: RegionEdge,
RegionResponse: RegionResponse,
DateTime: DateTime,
Decimal: Decimal,
UUID: UUID
    }