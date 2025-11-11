import type { QueryResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { productVariantsTable } from "../../../../../db/schema/catalog";

export const productVariant: NonNullable<QueryResolvers['productVariant']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const variantData = await db.query.productVariantsTable.findFirst({
      where: eq(productVariantsTable.id, args.id),
      with: {
        attributes: true,
      },
    });

    return variantData as any;
  } catch (error) {
    console.error('Error fetching product variant:', error);
    return null;
  }
};