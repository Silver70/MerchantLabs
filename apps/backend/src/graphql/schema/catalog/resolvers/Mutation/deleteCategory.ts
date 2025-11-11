import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { categoriesTable } from "../../../../../db/schema/catalog";

export const deleteCategory: NonNullable<MutationResolvers['deleteCategory']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const deletedCategoryArray = await db
      .delete(categoriesTable)
      .where(eq(categoriesTable.id, args.id))
      .returning();

    const deletedCategory = Array.isArray(deletedCategoryArray) ? deletedCategoryArray[0] : null;

    return {
      success: !!deletedCategory,
      data: (deletedCategory || null) as any,
      error: deletedCategory ? null : { code: 'NOT_FOUND', message: 'Category not found' } as any,
    };
  } catch (error) {
    console.error('Error deleting category:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'CATEGORY_DELETE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to delete category',
      } as any,
    };
  }
};