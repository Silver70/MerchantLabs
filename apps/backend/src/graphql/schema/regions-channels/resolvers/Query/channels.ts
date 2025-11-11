import type { QueryResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { applyPagination } from "../../../../../lib/pagination";

export const channels: NonNullable<QueryResolvers["channels"]> = async (
  _parent,
  args,
  _ctx
): Promise<any> => {
  try {
    const allChannels = await db.query.channelsTable.findMany();

    // Sort by createdAt descending for consistent pagination
    const sortedChannels = allChannels.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    const mapped = sortedChannels.map((channel) => ({
      id: channel.id,
      name: channel.name,
      slug: channel.slug,
      regionId: channel.regionId,
      currencyCode: channel.currencyCode,
      taxInclusive: channel.taxInclusive,
      defaultLanguage: channel.defaultLanguage || null,
      isActive: channel.isActive,
      createdAt: channel.createdAt,
      updatedAt: channel.updatedAt,
    })) as any[];

    const connection = applyPagination(mapped, args, 10);

    return {
      edges: connection.edges,
      pageInfo: connection.pageInfo,
    };
  } catch (error) {
    console.error("Error fetching channels:", error);
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