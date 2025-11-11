import type { QueryResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { regionsTable } from "../../../../../db/schema/regions-channels";
import { applyPagination } from "../../../../../lib/pagination";

export const regions: NonNullable<QueryResolvers["regions"]> = async (
  _parent,
  args,
  _ctx
): Promise<any> => {
  try {
    const allRegions = await db.query.regionsTable.findMany();

    // Sort by createdAt descending for consistent pagination
    const sortedRegions = allRegions.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    const mapped = sortedRegions.map((region) => ({
      id: region.id,
      name: region.name,
      countryCodes: region.countryCodes,
      taxRate: region.taxRate,
      taxCode: region.taxCode || null,
      createdAt: region.createdAt,
      updatedAt: region.updatedAt,
    })) as any[];

    const connection = applyPagination(mapped, args, 10);

    return {
      edges: connection.edges,
      pageInfo: connection.pageInfo,
    };
  } catch (error) {
    console.error("Error fetching regions:", error);
    return {
      edges: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
      },
    };
  }
};