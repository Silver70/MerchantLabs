import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { ordersTable } from "../../../../../db/schema/orders";

export const updateOrderStatus: NonNullable<MutationResolvers['updateOrderStatus']> = async (_parent, args, _ctx): Promise<any> => {
  // Returns OrderResponse type
  try {
    const result = await db
      .update(ordersTable)
      .set({
        status: args.input.status.toLowerCase() as any,
      })
      .where(eq(ordersTable.id, args.id))
      .returning();

    if (!result || result.length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "ORDER_NOT_FOUND",
          message: "Order not found",
        },
      };
    }

    // Fetch full order with relations
    const order = await db.query.ordersTable.findFirst({
      where: eq(ordersTable.id, args.id),
      with: {
        items: {
          with: {
            productVariant: {
              with: {
                product: true,
                attributes: true,
              },
            },
          },
        },
      },
    });

    return {
      success: true,
      data: order || null,
      error: null,
    };
  } catch (error) {
    console.error("Error updating order status:", error);
    return {
      success: false,
      data: null,
      error: {
        code: "ORDER_UPDATE_ERROR",
        message:
          error instanceof Error
            ? error.message
            : "Failed to update order status",
      },
    };
  }
};
