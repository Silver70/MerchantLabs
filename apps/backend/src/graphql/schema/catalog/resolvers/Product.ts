import type { ProductResolvers } from './../../../types.generated';

export const Product: ProductResolvers = {
  category: async (parent, _args, _ctx) => {
    // If category is already loaded from parent, return it
    if (parent.category) {
      return parent.category as any;
    }
    return null;
  },

  variants: async (parent, _args, _ctx) => {
    // If variants are already loaded from parent, return them
    if (parent.variants && Array.isArray(parent.variants)) {
      return parent.variants as any[];
    }
    return [];
  },
};