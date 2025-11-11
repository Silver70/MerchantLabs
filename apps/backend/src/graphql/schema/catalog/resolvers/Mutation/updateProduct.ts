import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { productsTable } from "../../../../../db/schema/catalog";

export const updateProduct: NonNullable<MutationResolvers['updateProduct']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const updateData: Record<string, any> = {};
    if (args.input.name !== undefined) updateData.name = args.input.name;
    if (args.input.slug !== undefined) updateData.slug = args.input.slug;
    if (args.input.description !== undefined) updateData.description = args.input.description;
    if (args.input.categoryId !== undefined) updateData.categoryId = args.input.categoryId;
    if (args.input.isActive !== undefined) updateData.isActive = args.input.isActive;

    const updatedProductArray = await db
      .update(productsTable)
      .set(updateData)
      .where(eq(productsTable.id, args.id))
      .returning();

    const updatedProduct = Array.isArray(updatedProductArray) ? updatedProductArray[0] : null;

    return {
      success: !!updatedProduct,
      data: (updatedProduct || null) as any,
      error: updatedProduct ? null : { code: 'NOT_FOUND', message: 'Product not found' } as any,
    };
  } catch (error) {
    console.error('Error updating product:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'PRODUCT_UPDATE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to update product',
      } as any,
    };
  }
};