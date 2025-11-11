import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { collectionsTable } from "../../../../../db/schema/catalog";

export const updateCollection: NonNullable<MutationResolvers['updateCollection']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const updateData: Record<string, any> = {};
    if (args.input.name !== undefined) updateData.name = args.input.name;
    if (args.input.slug !== undefined) updateData.slug = args.input.slug;
    if (args.input.description !== undefined) updateData.description = args.input.description;
    if (args.input.isActive !== undefined) updateData.isActive = args.input.isActive;

    const updatedCollectionArray = await db
      .update(collectionsTable)
      .set(updateData)
      .where(eq(collectionsTable.id, args.id))
      .returning();

    const updatedCollection = Array.isArray(updatedCollectionArray) ? updatedCollectionArray[0] : null;

    return {
      success: !!updatedCollection,
      data: (updatedCollection || null) as any,
      error: updatedCollection ? null : { code: 'NOT_FOUND', message: 'Collection not found' } as any,
    };
  } catch (error) {
    console.error('Error updating collection:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'COLLECTION_UPDATE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to update collection',
      } as any,
    };
  }
};