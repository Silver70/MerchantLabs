import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { productVariantAttributesTable, productVariantsTable } from "../../../../../db/schema/catalog";
import { and, eq } from "drizzle-orm";

export const removeAttributeFromVariant: NonNullable<MutationResolvers['removeAttributeFromVariant']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    // Delete the attribute association
    await db
      .delete(productVariantAttributesTable)
      .where(
        and(
          eq(productVariantAttributesTable.productVariantId, args.variantId),
          eq(productVariantAttributesTable.attributeValueId, args.attributeValueId)
        )
      );

    // Fetch the updated variant
    const variant = await db.query.productVariantsTable.findFirst({
      where: eq(productVariantsTable.id, args.variantId),
      with: {
        attributes: true,
      },
    });

    return {
      success: !!variant,
      data: (variant || null) as any,
      error: null,
    };
  } catch (error) {
    console.error('Error removing attribute from variant:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'ATTRIBUTE_REMOVE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to remove attribute from variant',
      } as any,
    };
  }
};