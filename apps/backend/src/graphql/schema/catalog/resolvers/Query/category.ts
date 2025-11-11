import type { QueryResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { categoriesTable } from "../../../../../db/schema/catalog";

export const category: NonNullable<QueryResolvers['category']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const categoryData = await db.query.categoriesTable.findFirst({
      where: eq(categoriesTable.id, args.id),
      with: {
        parent: true,
        children: true,
      },
    });

    return categoryData as any;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
};