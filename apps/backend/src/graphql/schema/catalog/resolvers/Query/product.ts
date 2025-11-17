import type { QueryResolvers } from "./../../../../types.generated";
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { productsTable } from "../../../../../db/schema/catalog";

export const product: NonNullable<QueryResolvers["product"]> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const productData = await db.query.productsTable.findFirst({
      where: eq(productsTable.id, args.id),
      with: {
        category: true,
        variants: {
          with: {
            attributes: {
              with: {
                attributeValue: true,
              },
            },
          },
        },
      },
    });

    return productData as any;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
