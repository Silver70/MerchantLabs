import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { productsTable, categoriesTable } from "../../../../../db/schema/catalog";
import { generateSlug } from "../../../../../lib/slug";
import { eq } from "drizzle-orm";

export const createProduct: NonNullable<
  MutationResolvers["createProduct"]
> = async (_parent, args, _ctx): Promise<any> => {
  try {
    // Validate required fields
    if (!args.input.name || args.input.name.trim().length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "INVALID_NAME",
          message: "Product name is required and cannot be empty",
        },
      };
    }

    // Validate category exists
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

    const slug = generateSlug(args.input.name);

    // Check if slug is unique
    const existingProduct = await db.query.productsTable.findFirst({
      where: eq(productsTable.slug, slug),
    });

    if (existingProduct) {
      return {
        success: false,
        data: null,
        error: {
          code: "SLUG_ALREADY_EXISTS",
          message: `A product with the slug "${slug}" already exists. Please use a different name.`,
        },
      };
    }

    const newProductArray = await db
      .insert(productsTable)
      .values({
        name: args.input.name,
        slug: slug,
        description: args.input.description || null,
        categoryId: args.input.categoryId,
        isActive: true,
      })
      .returning();

    const newProduct = Array.isArray(newProductArray)
      ? newProductArray[0]
      : null;

    if (!newProduct) {
      return {
        success: false,
        data: null,
        error: {
          code: "PRODUCT_CREATE_FAILED",
          message: "Failed to create product",
        },
      };
    }

    // Fetch the product with relations to match GraphQL schema
    const productWithRelations = await db.query.productsTable.findFirst({
      where: eq(productsTable.id, newProduct.id),
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
    console.error("Error creating product:", error);
    return {
      success: false,
      data: null,
      error: {
        code: "PRODUCT_CREATE_ERROR",
        message:
          error instanceof Error ? error.message : "Failed to create product",
      } as any,
    };
  }
};
