import type { CustomerResolvers } from "../../../types.generated";

export const Customer: CustomerResolvers = {
  addresses: (parent) => {
    return parent.addresses || [];
  },
};