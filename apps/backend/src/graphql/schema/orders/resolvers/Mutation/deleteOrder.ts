import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { ordersTable } from "../../../../../db/schema/orders";

export const deleteOrder: NonNullable<MutationResolvers['deleteOrder']> = async (_parent, args, _ctx): Promise<any> => {
  try {
    // Check if order exists
    const existingOrder = await db.query.ordersTable.findFirst({
      where: eq(ordersTable.id, args.id),
    });

    if (!existingOrder) {
      return {
        success: false,
        data: null,
        error: {
          code: "ORDER_NOT_FOUND",
          message: "Order not found",
        },
      };
    }

    // Delete the order (cascade will delete order items)
    const result = await db
      .delete(ordersTable)
      .where(eq(ordersTable.id, args.id))
      .returning();

    if (!result || result.length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "ORDER_DELETE_FAILED",
          message: "Failed to delete order",
        },
      };
    }

    // Return the deleted order data
    return {
      success: true,
      data: existingOrder,
      error: null,
    };
  } catch (error) {
    console.error("Error deleting order:", error);
    return {
      success: false,
      data: null,
      error: {
        code: "ORDER_DELETE_ERROR",
        message: error instanceof Error ? error.message : "Failed to delete order",
      },
    };
  }
};