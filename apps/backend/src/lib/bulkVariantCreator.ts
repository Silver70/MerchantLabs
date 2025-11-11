import { db } from "../db/index";
import {
  productVariantsTable,
  productVariantAttributesTable,
} from "../db/schema/catalog";
import type { GeneratedVariant } from "./variantGenerator";

export interface BulkVariantCreationResult {
  success: boolean;
  createdCount: number;
  failedCount: number;
  variants: Array<{
    id: string;
    sku: string;
  }>;
  errors?: string[];
}

/**
 * Creates multiple variants in bulk and links them to attribute values
 */
export const bulkCreateVariants = async (
  productId: string,
  variants: GeneratedVariant[]
): Promise<BulkVariantCreationResult> => {
  const createdVariants: Array<{ id: string; sku: string }> = [];
  const errors: string[] = [];
  let failedCount = 0;

  for (const variant of variants) {
    try {
      // Insert the variant
      const insertedVariants = await db
        .insert(productVariantsTable)
        .values({
          productId,
          sku: variant.sku,
          quantityInStock: variant.quantityInStock,
        })
        .returning({
          id: productVariantsTable.id,
          sku: productVariantsTable.sku,
        });

      const newVariant = Array.isArray(insertedVariants)
        ? insertedVariants[0]
        : insertedVariants;

      if (!newVariant) {
        failedCount++;
        errors.push(`Failed to create variant with SKU: ${variant.sku}`);
        continue;
      }

      // Link variant to attribute values
      if (variant.attributeValueIds.length > 0) {
        await db.insert(productVariantAttributesTable).values(
          variant.attributeValueIds.map((attributeValueId) => ({
            productVariantId: newVariant.id,
            attributeValueId,
          }))
        );
      }

      createdVariants.push({
        id: newVariant.id,
        sku: newVariant.sku,
      });
    } catch (error) {
      failedCount++;
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      errors.push(
        `Failed to create variant with SKU ${variant.sku}: ${errorMessage}`
      );
      console.error(`Variant creation error for SKU ${variant.sku}:`, error);
    }
  }

  return {
    success: failedCount === 0,
    createdCount: createdVariants.length,
    failedCount,
    variants: createdVariants,
    errors: errors.length > 0 ? errors : undefined,
  };
};
