import type { QueryResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { ordersTable } from "../../../../../db/schema/orders";

export const order: NonNullable<QueryResolvers['order']> = async (
  _parent,
  args,
  _ctx
): Promise<any> => {
  try {
    const result = await db.query.ordersTable.findFirst({
      where: eq(ordersTable.id, args.id),
      with: {
        items: {
          with: {
            productVariant: true,
          },
        },
      },
    });

    return result || null;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
};