import type { ProductVariantResolvers } from './../../../types.generated';

export const ProductVariant: ProductVariantResolvers = {
  attributes: async (parent, _args, _ctx) => {
    // If attributes are already loaded from parent object, return them
    if (parent.attributes && Array.isArray(parent.attributes)) {
      // Map junction table data to AttributeValue format
      return parent.attributes.map((attr: any) => {
        if (attr.attributeValue) {
          return attr.attributeValue;
        }
        return attr;
      }) as any[];
    }
    return [];
  },
};