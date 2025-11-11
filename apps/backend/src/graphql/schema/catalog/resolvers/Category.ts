import type { CategoryResolvers } from './../../../types.generated';

export const Category: CategoryResolvers = {
  parent: async (parent, _args, _ctx) => {
    // If parent is already loaded from parent object, return it
    if (parent.parent) {
      return parent.parent as any;
    }
    return null;
  },

  children: async (parent, _args, _ctx) => {
    // If children are already loaded from parent object, return them
    if (parent.children && Array.isArray(parent.children)) {
      return parent.children as any[];
    }
    return [];
  },
};