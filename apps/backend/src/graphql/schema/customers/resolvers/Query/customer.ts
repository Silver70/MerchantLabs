import type { QueryResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { customersTable } from "../../../../../db/schema/customers";

export const customer: NonNullable<QueryResolvers['customer']> = async (
  _parent,
  args,
  _ctx
): Promise<any> => {
  try {
    const result = await db.query.customersTable.findFirst({
      where: eq(customersTable.id, args.id),
      with: {
        addresses: true,
      },
    });

    return result || null;
  } catch (error) {
    console.error('Error fetching customer:', error);
    return null;
  }
};