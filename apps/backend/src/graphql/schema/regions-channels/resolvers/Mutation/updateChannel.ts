import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import {
  channelsTable,
  regionsTable,
} from "../../../../../db/schema/regions-channels";
import { eq } from "drizzle-orm";
import { generateSlug } from "../../../../../lib/slug";

export const updateChannel: NonNullable<
  MutationResolvers["updateChannel"]
> = async (_parent, args, _ctx): Promise<any> => {
  try {
    const updateData: Record<string, any> = {};

    if (args.input.name !== undefined) {
      updateData.name = args.input.name;
      // Auto-generate slug from name unless explicitly provided
      if (args.input.slug === undefined || args.input.slug === null) {
        //@ts-ignore
        updateData.slug = generateSlug(args.input.name);
      }
    }
    if (args.input.slug !== undefined && args.input.slug !== null) {
      updateData.slug = args.input.slug;
    }
    if (args.input.regionId !== undefined)
      updateData.regionId = args.input.regionId;
    if (args.input.currencyCode !== undefined)
      updateData.currencyCode = args.input.currencyCode;
    if (args.input.taxInclusive !== undefined)
      updateData.taxInclusive = args.input.taxInclusive;
    if (args.input.defaultLanguage !== undefined)
      updateData.defaultLanguage = args.input.defaultLanguage;
    if (args.input.isActive !== undefined)
      updateData.isActive = args.input.isActive;

    // Validate region exists if regionId is being updated
    if (updateData.regionId) {
      const region = await db.query.regionsTable.findFirst({
        where: eq(regionsTable.id, updateData.regionId),
      });

      if (!region) {
        return {
          success: false,
          data: null,
          error: {
            code: "REGION_NOT_FOUND",
            message: "Region not found",
          } as any,
        };
      }
    }

    const updatedChannelArray = await db
      .update(channelsTable)
      .set(updateData)
      .where(eq(channelsTable.id, args.id))
      .returning();

    const updatedChannel = Array.isArray(updatedChannelArray)
      ? updatedChannelArray[0]
      : updatedChannelArray;

    if (!updatedChannel) {
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
        id: updatedChannel.id,
        name: updatedChannel.name,
        slug: updatedChannel.slug,
        regionId: updatedChannel.regionId,
        currencyCode: updatedChannel.currencyCode,
        taxInclusive: updatedChannel.taxInclusive,
        defaultLanguage: updatedChannel.defaultLanguage || null,
        isActive: updatedChannel.isActive,
        createdAt: updatedChannel.createdAt,
        updatedAt: updatedChannel.updatedAt,
      } as any,
      error: null,
    };
  } catch (error) {
    console.error("Error updating channel:", error);
    return {
      success: false,
      data: null,
      error: {
        code: "CHANNEL_UPDATE_ERROR",
        message:
          error instanceof Error ? error.message : "Failed to update channel",
      } as any,
    };
  }
};
