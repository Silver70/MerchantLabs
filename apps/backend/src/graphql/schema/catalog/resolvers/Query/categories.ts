import type { QueryResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { categoriesTable } from "../../../../../db/schema/catalog";
import { desc } from "drizzle-orm";

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

export const categories: NonNullable<QueryResolvers['categories']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const pageSize = Math.min(args.first || DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);

    let query = db.query.categoriesTable.findMany({
      with: {
        parent: true,
        children: true,
      },
      orderBy: desc(categoriesTable.createdAt),
      limit: pageSize + 1, // Fetch one extra to determine hasNextPage
    });

    // Handle cursor-based pagination
    if (args.after) {
      // In a real implementation, you'd decode the cursor and apply it to the query
      // For now, this is a basic implementation
    }

    const allCategories = await query;
    const hasNextPage = allCategories.length > pageSize;
    const categories = hasNextPage ? allCategories.slice(0, pageSize) : allCategories;

    const startCategory = categories[0];
    const endCategory = categories[categories.length - 1];

    return {
      edges: categories.map((category) => ({
        cursor: Buffer.from(category.id).toString('base64'),
        node: category as any,
      })),
      pageInfo: {
        hasNextPage,
        hasPreviousPage: !!args.after,
        startCursor: startCategory ? Buffer.from(startCategory.id).toString('base64') : null,
        endCursor: endCategory ? Buffer.from(endCategory.id).toString('base64') : null,
        totalCount: categories.length,
      },
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      edges: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
        totalCount: 0,
      },
    };
  }
};