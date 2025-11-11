import type { QueryResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { productsTable } from "../../../../../db/schema/catalog";

export const productBySlug: NonNullable<QueryResolvers['productBySlug']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const productData = await db.query.productsTable.findFirst({
      where: eq(productsTable.slug, args.slug),
      with: {
        category: true,
        variants: {
          with: {
            attributes: true,
          },
        },
      },
    });

    return productData as any;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
};