import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { productVariantsTable } from "../../../../../db/schema/catalog";

export const updateProductVariant: NonNullable<MutationResolvers['updateProductVariant']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const updateData: Record<string, any> = {};
    if (args.input.sku !== undefined) updateData.sku = args.input.sku;
    if (args.input.quantityInStock !== undefined) updateData.quantityInStock = args.input.quantityInStock;

    const updatedVariantArray = await db
      .update(productVariantsTable)
      .set(updateData)
      .where(eq(productVariantsTable.id, args.id))
      .returning();

    const updatedVariant = Array.isArray(updatedVariantArray) ? updatedVariantArray[0] : null;

    return {
      success: !!updatedVariant,
      data: (updatedVariant || null) as any,
      error: updatedVariant ? null : { code: 'NOT_FOUND', message: 'Product variant not found' } as any,
    };
  } catch (error) {
    console.error('Error updating product variant:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'VARIANT_UPDATE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to update product variant',
      } as any,
    };
  }
};