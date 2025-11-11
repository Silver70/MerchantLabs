import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { productsTable } from "../../../../../db/schema/catalog";

export const createProduct: NonNullable<MutationResolvers['createProduct']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const newProductArray = await db
      .insert(productsTable)
      .values({
        name: args.input.name,
        slug: args.input.slug,
        description: args.input.description || null,
        categoryId: args.input.categoryId,
        isActive: true,
      })
      .returning();

    const newProduct = Array.isArray(newProductArray) ? newProductArray[0] : null;

    return {
      success: !!newProduct,
      data: (newProduct || null) as any,
      error: null,
    };
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'PRODUCT_CREATE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to create product',
      } as any,
    };
  }
};