import type { QueryResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { and, eq, gte, lte, desc } from "drizzle-orm";
import { ordersTable } from "../../../../../db/schema/orders";

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

export const orders: NonNullable<QueryResolvers['orders']> = async (
  _parent,
  args,
  _ctx
): Promise<any> => {
  try {
    const pageSize = Math.min(args.first || DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);
    const filter = args.filter;

    // Build filter conditions
    const conditions = [];

    if (filter?.customerId) {
      conditions.push(eq(ordersTable.customerId, filter.customerId));
    }

    if (filter?.channelId) {
      conditions.push(eq(ordersTable.channelId, filter.channelId));
    }

    if (filter?.status) {
      conditions.push(
        eq(ordersTable.status, filter.status.toLowerCase() as any)
      );
    }

    if (filter?.minAmount) {
      conditions.push(gte(ordersTable.totalAmount, filter.minAmount.toString()));
    }

    if (filter?.maxAmount) {
      conditions.push(lte(ordersTable.totalAmount, filter.maxAmount.toString()));
    }

    if (filter?.startDate) {
      const startDate = new Date(filter.startDate);
      conditions.push(gte(ordersTable.createdAt, startDate));
    }

    if (filter?.endDate) {
      const endDate = new Date(filter.endDate);
      conditions.push(lte(ordersTable.createdAt, endDate));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const allOrders = await db.query.ordersTable.findMany({
      where: whereClause,
      with: {
        items: {
          with: {
            productVariant: true,
          },
        },
      },
      orderBy: desc(ordersTable.createdAt),
      limit: pageSize + 1,
    });

    const hasNextPage = allOrders.length > pageSize;
    const orders = hasNextPage ? allOrders.slice(0, pageSize) : allOrders;

    const startOrder = orders[0];
    const endOrder = orders[orders.length - 1];

    return {
      edges: orders.map((order) => ({
        cursor: Buffer.from(order.id).toString("base64"),
        node: order as any,
      })),
      pageInfo: {
        hasNextPage,
        hasPreviousPage: !!args.after,
        startCursor: startOrder
          ? Buffer.from(startOrder.id).toString("base64")
          : null,
        endCursor: endOrder
          ? Buffer.from(endOrder.id).toString("base64")
          : null,
        totalCount: orders.length,
      },
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
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