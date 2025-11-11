import type { OrderResolvers } from "../../../types.generated";

export const Order: OrderResolvers = {
  status: (parent) => {
    // Convert database enum (lowercase) to GraphQL enum (uppercase)
    return (parent.status?.toUpperCase() || "PENDING") as any;
  },
  items: (parent) => {
    return parent.items || [];
  },
};