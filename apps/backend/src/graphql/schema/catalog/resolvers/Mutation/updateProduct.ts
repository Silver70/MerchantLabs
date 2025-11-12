import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { eq, and, ne } from "drizzle-orm";
import {
  productsTable,
  categoriesTable,
} from "../../../../../db/schema/catalog";

export const updateProduct: NonNullable<
  MutationResolvers["updateProduct"]
> = async (_parent, args, _ctx): Promise<any> => {
  try {
    // Check if product exists
    const existingProduct = await db.query.productsTable.findFirst({
      where: eq(productsTable.id, args.id),
    });

    if (!existingProduct) {
      return {
        success: false,
        data: null,
        error: {
          code: "PRODUCT_NOT_FOUND",
          message: "Product not found",
        },
      };
    }

    // Validate input
    if (
      args.input.name !== undefined &&
      args.input.name !== null &&
      args.input.name.trim().length === 0
    ) {
      return {
        success: false,
        data: null,
        error: {
          code: "INVALID_NAME",
          message: "Product name cannot be empty",
        },
      };
    }

    // Validate category exists if being updated
    if (args.input.categoryId !== undefined) {
      const category = await db.query.categoriesTable.findFirst({
        where: eq(categoriesTable.id, args.input.categoryId),
      });

      if (!category) {
        return {
          success: false,
          data: null,
          error: {
            code: "CATEGORY_NOT_FOUND",
            message: "Product category not found",
          },
        };
      }
    }

    // Check slug uniqueness if slug is being updated
    if (
      args.input.slug !== undefined &&
      args.input.slug !== null &&
      args.input.slug !== existingProduct.slug
    ) {
      const slugExists = await db.query.productsTable.findFirst({
        where: and(
          eq(productsTable.slug, args.input.slug),
          ne(productsTable.id, args.id)
        ),
      });

      if (slugExists) {
        return {
          success: false,
          data: null,
          error: {
            code: "SLUG_ALREADY_EXISTS",
            message: `A product with the slug "${args.input.slug}" already exists`,
          },
        };
      }
    }

    const updateData: Record<string, any> = {};
    if (args.input.name !== undefined) updateData.name = args.input.name;
    if (args.input.slug !== undefined) updateData.slug = args.input.slug;
    if (args.input.description !== undefined)
      updateData.description = args.input.description;
    if (args.input.categoryId !== undefined)
      updateData.categoryId = args.input.categoryId;
    if (args.input.isActive !== undefined)
      updateData.isActive = args.input.isActive;

    if (Object.keys(updateData).length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "NO_CHANGES",
          message: "No fields to update",
        },
      };
    }

    const updatedProductArray = await db
      .update(productsTable)
      .set(updateData)
      .where(eq(productsTable.id, args.id))
      .returning();

    const updatedProduct = Array.isArray(updatedProductArray)
      ? updatedProductArray[0]
      : null;

    if (!updatedProduct) {
      return {
        success: false,
        data: null,
        error: {
          code: "PRODUCT_UPDATE_FAILED",
          message: "Failed to update product",
        },
      };
    }

    // Fetch the product with relations to match GraphQL schema
    const productWithRelations = await db.query.productsTable.findFirst({
      where: eq(productsTable.id, updatedProduct.id),
      with: {
        category: true,
        variants: {
          with: {
            attributes: true,
          },
        },
      },
    });

    return {
      success: true,
      data: (productWithRelations || null) as any,
      error: null,
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      data: null,
      error: {
        code: "PRODUCT_UPDATE_ERROR",
        message:
          error instanceof Error ? error.message : "Failed to update product",
      } as any,
    };
  }
};
