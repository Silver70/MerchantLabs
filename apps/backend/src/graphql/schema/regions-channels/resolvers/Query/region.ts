import type { QueryResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { regionsTable } from "../../../../../db/schema/regions-channels";
import { eq } from "drizzle-orm";

export const region: NonNullable<QueryResolvers["region"]> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const foundRegion = await db.query.regionsTable.findFirst({
      where: eq(regionsTable.id, args.id),
    });

    if (!foundRegion) return null;

    return {
      id: foundRegion.id,
      name: foundRegion.name,
      countryCodes: foundRegion.countryCodes,
      taxRate: foundRegion.taxRate,
      taxCode: foundRegion.taxCode || null,
      createdAt: foundRegion.createdAt,
      updatedAt: foundRegion.updatedAt,
    } as any;
  } catch (error) {
    console.error("Error fetching region:", error);
    return null;
  }
};
