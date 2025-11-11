import type { QueryResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { and, eq, desc } from "drizzle-orm";
import { addressesTable } from "../../../../../db/schema/customers";

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

export const addresses: NonNullable<QueryResolvers['addresses']> = async (
  _parent,
  args,
  _ctx
): Promise<any> => {
  try {
    const pageSize = Math.min(args.first || DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);

    // Build filter conditions
    const conditions = [];

    if (args.customerId) {
      conditions.push(eq(addressesTable.customerId, args.customerId));
    }

    if (args.type) {
      conditions.push(eq(addressesTable.type, args.type.toLowerCase() as "shipping" | "billing"));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const allAddresses = await db.query.addressesTable.findMany({
      where: whereClause,
      orderBy: desc(addressesTable.createdAt),
      limit: pageSize + 1,
    });

    const hasNextPage = allAddresses.length > pageSize;
    const addresses = hasNextPage
      ? allAddresses.slice(0, pageSize)
      : allAddresses;

    const startAddress = addresses[0];
    const endAddress = addresses[addresses.length - 1];

    return {
      edges: addresses.map((address) => ({
        cursor: Buffer.from(address.id).toString("base64"),
        node: address as any,
      })),
      pageInfo: {
        hasNextPage,
        hasPreviousPage: !!args.after,
        startCursor: startAddress
          ? Buffer.from(startAddress.id).toString("base64")
          : null,
        endCursor: endAddress
          ? Buffer.from(endAddress.id).toString("base64")
          : null,
        totalCount: addresses.length,
      },
    };
  } catch (error) {
    console.error("Error fetching addresses:", error);
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