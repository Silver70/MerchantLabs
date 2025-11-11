import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { collectionProductsTable, collectionsTable } from "../../../../../db/schema/catalog";
import { eq } from "drizzle-orm";

export const addProductToCollection: NonNullable<MutationResolvers['addProductToCollection']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    // Insert the product to collection
    void db.insert(collectionProductsTable).values({
      collectionId: args.collectionId,
      productId: args.productId,
      position: 0,
    });

    // Fetch the updated collection
    const collection = await db.query.collectionsTable.findFirst({
      where: eq(collectionsTable.id, args.collectionId),
      with: {
        products: {
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
    });

    return {
      success: !!collection,
      data: (collection || null) as any,
      error: null,
    };
  } catch (error) {
    console.error('Error adding product to collection:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'PRODUCT_ADD_ERROR',
        message: error instanceof Error ? error.message : 'Failed to add product to collection',
      } as any,
    };
  }
};