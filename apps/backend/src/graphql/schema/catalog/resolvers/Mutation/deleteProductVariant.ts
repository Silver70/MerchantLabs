import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { productVariantsTable } from "../../../../../db/schema/catalog";

export const deleteProductVariant: NonNullable<MutationResolvers['deleteProductVariant']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const deletedVariantArray = await db
      .delete(productVariantsTable)
      .where(eq(productVariantsTable.id, args.id))
      .returning();

    const deletedVariant = Array.isArray(deletedVariantArray) ? deletedVariantArray[0] : null;

    return {
      success: !!deletedVariant,
      data: (deletedVariant || null) as any,
      error: deletedVariant ? null : { code: 'NOT_FOUND', message: 'Product variant not found' } as any,
    };
  } catch (error) {
    console.error('Error deleting product variant:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'VARIANT_DELETE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to delete product variant',
      } as any,
    };
  }
};