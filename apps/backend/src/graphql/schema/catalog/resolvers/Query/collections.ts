import type { QueryResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { desc, eq } from "drizzle-orm";
import { collectionsTable } from "../../../../../db/schema/catalog";

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

export const collections: NonNullable<QueryResolvers['collections']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const pageSize = Math.min(args.first || DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);

    const allCollections = await db.query.collectionsTable.findMany({
      where: eq(collectionsTable.isActive, true),
      with: {
        products: {
          with: {
            category: true,
            variants: {
              with: {
                attributes: true,
              },
            },
          },
        },
      },
      orderBy: desc(collectionsTable.createdAt),
      limit: pageSize + 1, // Fetch one extra to determine hasNextPage
    });

    const hasNextPage = allCollections.length > pageSize;
    const collections = hasNextPage ? allCollections.slice(0, pageSize) : allCollections;

    const startCollection = collections[0];
    const endCollection = collections[collections.length - 1];

    return {
      edges: collections.map((collection) => ({
        cursor: Buffer.from(collection.id).toString('base64'),
        node: collection as any,
      })),
      pageInfo: {
        hasNextPage,
        hasPreviousPage: !!args.after,
        startCursor: startCollection ? Buffer.from(startCollection.id).toString('base64') : null,
        endCursor: endCollection ? Buffer.from(endCollection.id).toString('base64') : null,
        totalCount: collections.length,
      },
    };
  } catch (error) {
    console.error('Error fetching collections:', error);
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