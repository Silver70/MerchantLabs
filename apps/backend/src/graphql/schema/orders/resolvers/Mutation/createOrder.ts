import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { ordersTable, orderItemsTable } from "../../../../../db/schema/orders";

export const createOrder: NonNullable<MutationResolvers['createOrder']> = async (_parent, args, _ctx): Promise<any> => {
  try {
    // Calculate totals from items
    const subtotalAmount = args.input.items.reduce((sum, item) => {
      return sum + (Number(item.priceAtOrderTime) * item.quantity);
    }, 0);

    // Create the order
    const orderResult = await db
      .insert(ordersTable)
      .values({
        customerId: args.input.customerId,
        channelId: args.input.channelId,
        shippingAddressId: args.input.shippingAddressId,
        billingAddressId: args.input.billingAddressId,
        discountId: args.input.discountId || null,
        regionId: args.input.channelId, // TODO: Get actual region from channel
        currencyCode: "USD", // TODO: Get from channel/region config
        subtotalAmount: subtotalAmount.toString(),
        taxAmount: "0", // TODO: Calculate tax
        totalAmount: subtotalAmount.toString(), // TODO: Apply discount
        status: "pending",
      })
      .returning();

    if (!orderResult || orderResult.length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "ORDER_CREATE_FAILED",
          message: "Failed to create order",
        },
      };
    }

    const orderId = orderResult[0]!.id;

    // Create order items
    const itemsResult = await db
      .insert(orderItemsTable)
      .values(
        args.input.items.map((item) => ({
          orderId,
          productVariantId: item.productVariantId,
          quantity: item.quantity,
          priceAtOrderTime: item.priceAtOrderTime.toString(),
        }))
      )
      .returning();

    if (!itemsResult || itemsResult.length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "ORDER_ITEMS_CREATE_FAILED",
          message: "Failed to create order items",
        },
      };
    }

    // Fetch the complete order with all relations
    const completeOrder = await db.query.ordersTable.findFirst({
      where: (table, { eq }) => eq(table.id, orderId),
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
      data: completeOrder || null,
      error: null,
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      data: null,
      error: {
        code: "ORDER_CREATE_ERROR",
        message: error instanceof Error ? error.message : "Failed to create order",
      },
    };
  }
};