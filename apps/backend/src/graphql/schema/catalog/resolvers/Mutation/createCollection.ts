import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { collectionsTable } from "../../../../../db/schema/catalog";

export const createCollection: NonNullable<MutationResolvers['createCollection']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const newCollectionArray = await db
      .insert(collectionsTable)
      .values({
        name: args.input.name,
        slug: args.input.slug,
        description: args.input.description || null,
        isActive: true,
      })
      .returning();

    const newCollection = Array.isArray(newCollectionArray) ? newCollectionArray[0] : null;

    return {
      success: !!newCollection,
      data: (newCollection || null) as any,
      error: null,
    };
  } catch (error) {
    console.error('Error creating collection:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'COLLECTION_CREATE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to create collection',
      } as any,
    };
  }
};