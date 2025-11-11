import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { categoriesTable } from "../../../../../db/schema/catalog";

export const updateCategory: NonNullable<MutationResolvers['updateCategory']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const updateData: Record<string, any> = {};
    if (args.input.name !== undefined) updateData.name = args.input.name;
    if (args.input.slug !== undefined) updateData.slug = args.input.slug;
    if (args.input.parentId !== undefined) updateData.parentId = args.input.parentId;

    const updatedCategoryArray = await db
      .update(categoriesTable)
      .set(updateData)
      .where(eq(categoriesTable.id, args.id))
      .returning();

    const updatedCategory = Array.isArray(updatedCategoryArray) ? updatedCategoryArray[0] : null;

    return {
      success: !!updatedCategory,
      data: (updatedCategory || null) as any,
      error: updatedCategory ? null : { code: 'NOT_FOUND', message: 'Category not found' } as any,
    };
  } catch (error) {
    console.error('Error updating category:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'CATEGORY_UPDATE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to update category',
      } as any,
    };
  }
};