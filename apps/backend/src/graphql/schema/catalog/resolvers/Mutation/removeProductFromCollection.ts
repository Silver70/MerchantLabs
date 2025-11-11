import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { collectionProductsTable, collectionsTable } from "../../../../../db/schema/catalog";
import { and, eq } from "drizzle-orm";

export const removeProductFromCollection: NonNullable<MutationResolvers['removeProductFromCollection']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    // Delete the product from collection
    void db
      .delete(collectionProductsTable)
      .where(
        and(
          eq(collectionProductsTable.collectionId, args.collectionId),
          eq(collectionProductsTable.productId, args.productId)
        )
      );

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
    console.error('Error removing product from collection:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'PRODUCT_REMOVE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to remove product from collection',
      } as any,
    };
  }
};