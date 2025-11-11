import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { channelsTable } from "../../../../../db/schema/regions-channels";
import { eq } from "drizzle-orm";

export const deleteChannel: NonNullable<
  MutationResolvers["deleteChannel"]
> = async (_parent, args, _ctx): Promise<any> => {
  try {
    const deletedChannelArray = await db
      .delete(channelsTable)
      .where(eq(channelsTable.id, args.id))
      .returning();

    const deletedChannel = Array.isArray(deletedChannelArray)
      ? deletedChannelArray[0]
      : deletedChannelArray;

    if (!deletedChannel) {
      return {
        success: false,
        data: null,
        error: {
          code: "CHANNEL_NOT_FOUND",
          message: "Channel not found",
        } as any,
      };
    }

    return {
      success: true,
      data: {
        id: deletedChannel.id,
        name: deletedChannel.name,
        slug: deletedChannel.slug,
        regionId: deletedChannel.regionId,
        currencyCode: deletedChannel.currencyCode,
        taxInclusive: deletedChannel.taxInclusive,
        defaultLanguage: deletedChannel.defaultLanguage || null,
        isActive: deletedChannel.isActive,
        createdAt: deletedChannel.createdAt,
        updatedAt: deletedChannel.updatedAt,
      } as any,
      error: null,
    };
  } catch (error) {
    console.error("Error deleting channel:", error);
    return {
      success: false,
      data: null,
      error: {
        code: "CHANNEL_DELETE_ERROR",
        message:
          error instanceof Error ? error.message : "Failed to delete channel",
      } as any,
    };
  }
};