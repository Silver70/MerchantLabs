import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { attributeValuesTable } from "../../../../../db/schema/catalog";

export const createAttributeValue: NonNullable<MutationResolvers['createAttributeValue']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const newValueArray = await db
      .insert(attributeValuesTable)
      .values({
        attributeId: args.input.attributeId,
        value: args.input.value,
      })
      .returning();

    const newValue = Array.isArray(newValueArray) ? newValueArray[0] : null;

    // Return as an AttributeResponse by returning the attribute with the new value
    // For now, return the value itself as the attribute data
    return {
      success: !!newValue,
      data: (newValue || null) as any,
      error: null,
    };
  } catch (error) {
    console.error('Error creating attribute value:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'ATTRIBUTE_VALUE_CREATE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to create attribute value',
      } as any,
    };
  }
};