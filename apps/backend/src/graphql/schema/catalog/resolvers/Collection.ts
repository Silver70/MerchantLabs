import type { CollectionResolvers } from './../../../types.generated';

export const Collection: CollectionResolvers = {
  products: async (parent, _args, _ctx) => {
    // If products are already loaded from parent object, return them
    if (parent.products && Array.isArray(parent.products)) {
      return parent.products as any[];
    }
    return [];
  },
};