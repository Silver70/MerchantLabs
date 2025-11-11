import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { attributesTable } from "../../../../../db/schema/catalog";

export const createAttribute: NonNullable<MutationResolvers['createAttribute']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const newAttributeArray = await db
      .insert(attributesTable)
      .values({
        name: args.input.name,
      })
      .returning();

    const newAttribute = Array.isArray(newAttributeArray) ? newAttributeArray[0] : null;

    return {
      success: !!newAttribute,
      data: (newAttribute || null) as any,
      error: null,
    };
  } catch (error) {
    console.error('Error creating attribute:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'ATTRIBUTE_CREATE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to create attribute',
      } as any,
    };
  }
};