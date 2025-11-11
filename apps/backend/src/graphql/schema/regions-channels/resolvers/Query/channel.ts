import type { QueryResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { channelsTable } from "../../../../../db/schema/regions-channels";
import { eq } from "drizzle-orm";

export const channel: NonNullable<QueryResolvers['channel']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const foundChannel = await db.query.channelsTable.findFirst({
      where: eq(channelsTable.id, args.id),
    });

    if (!foundChannel) return null;

    return {
      id: foundChannel.id,
      name: foundChannel.name,
      slug: foundChannel.slug,
      regionId: foundChannel.regionId,
      currencyCode: foundChannel.currencyCode,
      taxInclusive: foundChannel.taxInclusive,
      defaultLanguage: foundChannel.defaultLanguage || null,
      isActive: foundChannel.isActive,
      createdAt: foundChannel.createdAt,
      updatedAt: foundChannel.updatedAt,
    } as any;
  } catch (error) {
    console.error("Error fetching channel:", error);
    return null;
  }
};
