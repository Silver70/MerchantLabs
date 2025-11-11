import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { collectionsTable } from "../../../../../db/schema/catalog";

export const deleteCollection: NonNullable<MutationResolvers['deleteCollection']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const deletedCollectionArray = await db
      .delete(collectionsTable)
      .where(eq(collectionsTable.id, args.id))
      .returning();

    const deletedCollection = Array.isArray(deletedCollectionArray) ? deletedCollectionArray[0] : null;

    return {
      success: !!deletedCollection,
      data: (deletedCollection || null) as any,
      error: deletedCollection ? null : { code: 'NOT_FOUND', message: 'Collection not found' } as any,
    };
  } catch (error) {
    console.error('Error deleting collection:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'COLLECTION_DELETE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to delete collection',
      } as any,
    };
  }
};