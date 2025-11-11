import type { OrderItemResolvers } from "../../../types.generated";

export const OrderItem: OrderItemResolvers = {
  productVariant: (parent) => {
    return parent.productVariant as any;
  },
};