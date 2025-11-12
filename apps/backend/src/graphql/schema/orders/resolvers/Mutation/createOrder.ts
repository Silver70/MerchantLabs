import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { ordersTable, orderItemsTable } from "../../../../../db/schema/orders";
import { eq } from "drizzle-orm";
import { customersTable, addressesTable } from "../../../../../db/schema/customers";
import { channelsTable, regionsTable } from "../../../../../db/schema/regions-channels";

export const createOrder: NonNullable<MutationResolvers['createOrder']> = async (_parent, args, _ctx): Promise<any> => {
  try {
    // Validate all required entities exist
    const [customer, shippingAddress, billingAddress, channel] = await Promise.all([
      db.query.customersTable.findFirst({
        where: eq(customersTable.id, args.input.customerId),
      }),
      db.query.addressesTable.findFirst({
        where: eq(addressesTable.id, args.input.shippingAddressId),
      }),
      db.query.addressesTable.findFirst({
        where: eq(addressesTable.id, args.input.billingAddressId),
      }),
      db.query.channelsTable.findFirst({
        where: eq(channelsTable.id, args.input.channelId),
      }),
    ]);

    if (!customer) {
      return {
        success: false,
        data: null,
        error: {
          code: "CUSTOMER_NOT_FOUND",
          message: "Customer not found",
        },
      };
    }

    if (!shippingAddress) {
      return {
        success: false,
        data: null,
        error: {
          code: "SHIPPING_ADDRESS_NOT_FOUND",
          message: "Shipping address not found",
        },
      };
    }

    if (!billingAddress) {
      return {
        success: false,
        data: null,
        error: {
          code: "BILLING_ADDRESS_NOT_FOUND",
          message: "Billing address not found",
        },
      };
    }

    if (!channel) {
      return {
        success: false,
        data: null,
        error: {
          code: "CHANNEL_NOT_FOUND",
          message: "Channel not found",
        },
      };
    }

    // Get region from channel (or use a default/provided region)
    const region = await db.query.regionsTable.findFirst({
      where: eq(regionsTable.id, channel.regionId as any),
    });

    if (!region) {
      return {
        success: false,
        data: null,
        error: {
          code: "REGION_NOT_FOUND",
          message: "Region not found",
        },
      };
    }

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
        regionId: region.id,
        currencyCode: (region as any).currencyCode || "USD",
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