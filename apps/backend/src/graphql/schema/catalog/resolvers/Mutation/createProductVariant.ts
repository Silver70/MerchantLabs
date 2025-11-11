import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { productVariantsTable } from "../../../../../db/schema/catalog";

export const createProductVariant: NonNullable<MutationResolvers['createProductVariant']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const newVariantArray = await db
      .insert(productVariantsTable)
      .values({
        productId: args.input.productId,
        sku: args.input.sku,
        quantityInStock: args.input.quantityInStock || 0,
      })
      .returning();

    const newVariant = Array.isArray(newVariantArray) ? newVariantArray[0] : null;

    return {
      success: !!newVariant,
      data: (newVariant || null) as any,
      error: null,
    };
  } catch (error) {
    console.error('Error creating product variant:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'VARIANT_CREATE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to create product variant',
      } as any,
    };
  }
};