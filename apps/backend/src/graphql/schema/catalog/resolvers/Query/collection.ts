import type { QueryResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { collectionsTable } from "../../../../../db/schema/catalog";

export const collection: NonNullable<QueryResolvers['collection']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const collectionData = await db.query.collectionsTable.findFirst({
      where: eq(collectionsTable.id, args.id),
      with: {
        collectionProducts: {
          with: {
            product: {
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
        },
      },
    });

    // Transform collectionProducts into a products array for GraphQL
    if (collectionData) {
      const { collectionProducts, ...rest } = collectionData;
      return {
        ...rest,
        products: collectionProducts?.map((cp: any) => cp.product) ?? [],
      } as any;
    }

    return collectionData as any;
  } catch (error) {
    console.error('Error fetching collection:', error);
    return null;
  }
};