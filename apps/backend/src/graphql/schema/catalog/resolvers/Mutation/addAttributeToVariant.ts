import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { productVariantAttributesTable, productVariantsTable } from "../../../../../db/schema/catalog";
import { eq } from "drizzle-orm";

export const addAttributeToVariant: NonNullable<MutationResolvers['addAttributeToVariant']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    // Insert the attribute association
    await db.insert(productVariantAttributesTable).values({
      productVariantId: args.variantId,
      attributeValueId: args.attributeValueId,
    });

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
    console.error('Error adding attribute to variant:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'ATTRIBUTE_ADD_ERROR',
        message: error instanceof Error ? error.message : 'Failed to add attribute to variant',
      } as any,
    };
  }
};