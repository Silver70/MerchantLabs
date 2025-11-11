import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { productsTable } from "../../../../../db/schema/catalog";

export const deleteProduct: NonNullable<MutationResolvers['deleteProduct']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const deletedProductArray = await db
      .delete(productsTable)
      .where(eq(productsTable.id, args.id))
      .returning();

    const deletedProduct = Array.isArray(deletedProductArray) ? deletedProductArray[0] : null;

    return {
      success: !!deletedProduct,
      data: (deletedProduct || null) as any,
      error: deletedProduct ? null : { code: 'NOT_FOUND', message: 'Product not found' } as any,
    };
  } catch (error) {
    console.error('Error deleting product:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'PRODUCT_DELETE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to delete product',
      } as any,
    };
  }
};