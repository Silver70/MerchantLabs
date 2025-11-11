import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { attributeValuesTable } from "../../../../../db/schema/catalog";

export const deleteAttributeValue: NonNullable<MutationResolvers['deleteAttributeValue']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const deletedValueArray = await db
      .delete(attributeValuesTable)
      .where(eq(attributeValuesTable.id, args.id))
      .returning();

    const deletedValue = Array.isArray(deletedValueArray) ? deletedValueArray[0] : null;

    return {
      success: !!deletedValue,
      data: (deletedValue || null) as any,
      error: deletedValue ? null : { code: 'NOT_FOUND', message: 'Attribute value not found' } as any,
    };
  } catch (error) {
    console.error('Error deleting attribute value:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'ATTRIBUTE_VALUE_DELETE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to delete attribute value',
      } as any,
    };
  }
};