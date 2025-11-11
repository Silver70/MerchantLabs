import type { MutationResolvers } from "./../../../../types.generated";
import { db } from "../../../../../db/index";
import { productsTable } from "../../../../../db/schema/catalog";
import {
  generateVariantCombinations,
  type AttributeWithValues,
} from "../../../../../lib/variantGenerator";
import { bulkCreateVariants } from "../../../../../lib/bulkVariantCreator";
import { attributeValuesTable } from "../../../../../db/schema/catalog";
import { eq, inArray } from "drizzle-orm";

export const createProductVariant: NonNullable<MutationResolvers['createProductVariant']> = async (_parent, args, _ctx) => {
  try {
    const { productId, attributeValueIds, quantityInStock } = args.input;

    // Validate product exists
    const product = await db.query.productsTable.findFirst({
      where: eq(productsTable.id, productId),
    });

    if (!product) {
      return {
        success: false,
        data: null,
        error: {
          code: "PRODUCT_NOT_FOUND",
          message: "Product not found",
        } as any,
      };
    }

    // Fetch attribute values with their attribute information
    const selectedAttributeValues = await db
      .select()
      .from(attributeValuesTable)
      .where(inArray(attributeValuesTable.id, attributeValueIds || []));

    if (!attributeValueIds || attributeValueIds.length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "NO_ATTRIBUTES_PROVIDED",
          message: "At least one attribute value must be selected",
        } as any,
      };
    }

    // Group attribute values by attribute to maintain structure
    const attributeMap = new Map<string, AttributeWithValues>();

    for (const attrValue of selectedAttributeValues) {
      const attrId = attrValue.attributeId;
      if (!attributeMap.has(attrId)) {
        attributeMap.set(attrId, {
          attributeId: attrId,
          attributeName: "", // Will be populated if needed
          values: [],
        });
      }
      attributeMap.get(attrId)!.values.push({
        id: attrValue.id,
        value: attrValue.value,
      });
    }

    const attributes = Array.from(attributeMap.values());

    // Generate all variant combinations
    const variantCombinations = generateVariantCombinations(
      product.slug,
      attributes,
      quantityInStock || 0
    );

    if (variantCombinations.length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "NO_VARIANTS_GENERATED",
          message: "Could not generate variants from selected attributes",
        } as any,
      };
    }

    // Bulk create all variants
    const result = await bulkCreateVariants(productId, variantCombinations);

    if (!result.success) {
      return {
        success: false,
        data: null,
        error: {
          code: "VARIANT_CREATE_ERROR",
          message: `Failed to create some variants. ${result.failedCount} of ${result.failedCount + result.createdCount} failed.`,
          details: result.errors?.join(", ") || "Unknown error",
        } as any,
      };
    }

    return {
      success: true,
      data: {
        createdCount: result.createdCount,
        variants: result.variants,
        attributeCombinations: variantCombinations.map((v) => ({
          sku: v.sku,
          attributes: v.attributeDetails,
        })),
      } as any,
      error: null,
    };
  } catch (error) {
    console.error("Error creating product variants:", error);
    return {
      success: false,
      data: null,
      error: {
        code: "VARIANT_CREATE_ERROR",
        message:
          error instanceof Error
            ? error.message
            : "Failed to create product variants",
      } as any,
    };
  }
};
