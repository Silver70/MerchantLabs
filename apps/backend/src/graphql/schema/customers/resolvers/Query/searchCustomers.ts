import type { QueryResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { or, like, desc } from "drizzle-orm";
import { customersTable } from "../../../../../db/schema/customers";

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

export const searchCustomers: NonNullable<QueryResolvers['searchCustomers']> = async (
  _parent,
  args,
  _ctx
): Promise<any> => {
  try {
    const pageSize = Math.min(args.first || DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);
    const searchQuery = args.query.trim();

    if (!searchQuery) {
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

    const allCustomers = await db.query.customersTable.findMany({
      where: or(
        like(customersTable.email, `%${searchQuery}%`),
        like(customersTable.firstName, `%${searchQuery}%`),
        like(customersTable.lastName, `%${searchQuery}%`),
        like(customersTable.phone, `%${searchQuery}%`)
      ),
      with: {
        addresses: true,
      },
      orderBy: desc(customersTable.createdAt),
      limit: pageSize + 1,
    });

    const hasNextPage = allCustomers.length > pageSize;
    const customers = hasNextPage
      ? allCustomers.slice(0, pageSize)
      : allCustomers;

    const startCustomer = customers[0];
    const endCustomer = customers[customers.length - 1];

    return {
      edges: customers.map((customer) => ({
        cursor: Buffer.from(customer.id).toString("base64"),
        node: customer as any,
      })),
      pageInfo: {
        hasNextPage,
        hasPreviousPage: !!args.after,
        startCursor: startCustomer
          ? Buffer.from(startCustomer.id).toString("base64")
          : null,
        endCursor: endCustomer
          ? Buffer.from(endCustomer.id).toString("base64")
          : null,
        totalCount: customers.length,
      },
    };
  } catch (error) {
    console.error("Error searching customers:", error);
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
