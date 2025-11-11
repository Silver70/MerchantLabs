import type { AttributeResolvers } from './../../../types.generated';

export const Attribute: AttributeResolvers = {
  values: async (parent, _args, _ctx) => {
    // If values are already loaded from parent object, return them
    if (parent.values && Array.isArray(parent.values)) {
      return parent.values as any[];
    }
    return [];
  },
};