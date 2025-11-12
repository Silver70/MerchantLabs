import type { MutationResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { categoriesTable } from "../../../../../db/schema/catalog";
import { generateSlug } from "../../../../../lib/slug";

export const createCategory: NonNullable<MutationResolvers['createCategory']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const slug = args.input.slug || generateSlug(args.input.name);

    const newCategoryArray = await db
      .insert(categoriesTable)
      .values({
        name: args.input.name,
        slug,
        parentId: args.input.parentId || null,
      })
      .returning();

    const newCategory = Array.isArray(newCategoryArray) ? newCategoryArray[0] : null;

    return {
      success: true,
      data: (newCategory || null) as any,
      error: null,
    };
  } catch (error) {
    console.error('Error creating category:', error);
    return {
      success: false,
      data: null,
      error: {
        code: 'CATEGORY_CREATE_ERROR',
        message: error instanceof Error ? error.message : 'Failed to create category',
      } as any,
    };
  }
};