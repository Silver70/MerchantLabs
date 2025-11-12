import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { collectionProductsTable, collectionsTable } from "../../../../../db/schema/catalog";
import { and, eq } from "drizzle-orm";

export const removeProductFromCollection: NonNullable<
  MutationResolvers["removeProductFromCollection"]
> = async (_parent, args, _ctx): Promise<any> => {
  try {
    // Validate collection exists
    const collection = await db.query.collectionsTable.findFirst({
      where: eq(collectionsTable.id, args.collectionId),
    });

    if (!collection) {
      return {
        success: false,
        data: null,
        error: {
          code: "COLLECTION_NOT_FOUND",
          message: "Collection not found",
        },
      };
    }

    // Check if product is in collection
    const existing = await db.query.collectionProductsTable.findFirst({
      where: and(
        eq(collectionProductsTable.collectionId, args.collectionId),
        eq(collectionProductsTable.productId, args.productId)
      ),
    });

    if (!existing) {
      return {
        success: false,
        data: null,
        error: {
          code: "PRODUCT_NOT_IN_COLLECTION",
          message: "Product is not in this collection",
        },
      };
    }

    // CRITICAL FIX: Await the delete operation!
    const deleteResult = await db
      .delete(collectionProductsTable)
      .where(
        and(
          eq(collectionProductsTable.collectionId, args.collectionId),
          eq(collectionProductsTable.productId, args.productId)
        )
      )
      .returning();

    if (!deleteResult || deleteResult.length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "PRODUCT_REMOVE_FAILED",
          message: "Failed to remove product from collection",
        },
      };
    }

    // Fetch the updated collection
    const updatedCollection = await db.query.collectionsTable.findFirst({
      where: eq(collectionsTable.id, args.collectionId),
      with: {
        collectionProducts: {
          with: {
            product: {
              with: {
                category: true,
                variants: {
                  with: {
                    attributes: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Transform to match GraphQL schema - remove collectionProducts from response
    let result = null;
    if (updatedCollection) {
      const { collectionProducts, ...rest } = updatedCollection;
      result = {
        ...rest,
        products: collectionProducts?.map((cp: any) => cp.product) ?? [],
      };
    }

    return {
      success: true,
      data: result as any,
      error: null,
    };
  } catch (error) {
    console.error("Error removing product from collection:", error);
    return {
      success: false,
      data: null,
      error: {
        code: "PRODUCT_REMOVE_ERROR",
        message:
          error instanceof Error
            ? error.message
            : "Failed to remove product from collection",
      } as any,
    };
  }
};