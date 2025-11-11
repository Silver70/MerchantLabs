import type { AddressResolvers } from "../../../types.generated";

export const Address: AddressResolvers = {
  type: (parent) => {
    // Convert database enum (lowercase) to GraphQL enum (uppercase)
    return (parent.type?.toUpperCase() || "SHIPPING") as any;
  },
};