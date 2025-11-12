import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import {
  collectionProductsTable,
  collectionsTable,
  productsTable,
} from "../../../../../db/schema/catalog";
import { eq } from "drizzle-orm";

export const addProductToCollection: NonNullable<
  MutationResolvers["addProductToCollection"]
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

    // Validate product exists
    const product = await db.query.productsTable.findFirst({
      where: eq(productsTable.id, args.productId),
    });

    if (!product) {
      return {
        success: false,
        data: null,
        error: {
          code: "PRODUCT_NOT_FOUND",
          message: "Product not found",
        },
      };
    }

    // Check if product is already in collection
    const existing = await db.query.collectionProductsTable.findFirst({
      where: (t, { and, eq: eqOp }) =>
        and(
          eqOp(t.collectionId, args.collectionId),
          eqOp(t.productId, args.productId)
        ),
    });

    if (existing) {
      return {
        success: false,
        data: null,
        error: {
          code: "PRODUCT_ALREADY_IN_COLLECTION",
          message: "Product is already in this collection",
        },
      };
    }

    // CRITICAL FIX: Await the insert operation!
    const insertResult = await db
      .insert(collectionProductsTable)
      .values({
        collectionId: args.collectionId,
        productId: args.productId,
        position: 0,
      })
      .returning();

    if (!insertResult || insertResult.length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "PRODUCT_ADD_FAILED",
          message: "Failed to add product to collection",
        },
      };
    }

    // Fetch the updated collection with all products
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
    console.error("Error adding product to collection:", error);
    return {
      success: false,
      data: null,
      error: {
        code: "PRODUCT_ADD_ERROR",
        message:
          error instanceof Error
            ? error.message
            : "Failed to add product to collection",
      } as any,
    };
  }
};