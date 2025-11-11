import type { ProductVariantResolvers } from './../../../types.generated';

export const ProductVariant: ProductVariantResolvers = {
  attributes: async (parent, _args, _ctx) => {
    // If attributes are already loaded from parent object, return them
    if (parent.attributes && Array.isArray(parent.attributes)) {
      return parent.attributes as any[];
    }
    return [];
  },
};