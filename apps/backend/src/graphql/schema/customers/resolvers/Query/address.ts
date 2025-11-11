import type { QueryResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { addressesTable } from "../../../../../db/schema/customers";

export const address: NonNullable<QueryResolvers['address']> = async (
  _parent,
  args,
  _ctx
): Promise<any> => {
  try {
    const result = await db.query.addressesTable.findFirst({
      where: eq(addressesTable.id, args.id),
    });

    return result || null;
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
};