import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { attributesTable } from "../../../../../db/schema/catalog";

export const deleteAttribute: NonNullable<MutationResolvers['deleteAttribute']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const deletedAttributeArray = await db
      .delete(attributesTable)
      .where(eq(attributesTable.id, args.id))
      .returning();

    const deletedAttribute = Array.isArray(deletedAttributeArray) ? deletedAttributeArray[0] : null;

    return {
      success: !!deletedAttribute,
      data: (deletedAttribute || null) as any,
      error: deletedAttribute ? null : { code: 'NOT_FOUND', message: 'Attribute not found' } as any,
    };
  } catch (error) {
    console.error('Error deleting attribute:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'ATTRIBUTE_DELETE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to delete attribute',
      } as any,
    };
  }
};