import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { channelsTable, regionsTable } from "../../../../../db/schema/regions-channels";
import { eq } from "drizzle-orm";
import { generateSlug } from "../../../../../lib/slug";

export const createChannel: NonNullable<MutationResolvers['createChannel']> = async (_parent, args, _ctx) => {
  try {
    // Validate region exists
    const region = await db.query.regionsTable.findFirst({
      where: eq(regionsTable.id, args.input.regionId),
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

    const slug = generateSlug(args.input.name);

    const newChannelArray = await db
      .insert(channelsTable)
      .values({
        name: args.input.name,
        slug: slug,
        regionId: args.input.regionId,
        currencyCode: args.input.currencyCode,
        taxInclusive: args.input.taxInclusive ?? false,
        defaultLanguage: args.input.defaultLanguage || null,
      })
      .returning();

    const newChannel = Array.isArray(newChannelArray)
      ? newChannelArray[0]
      : newChannelArray;

    if (!newChannel) {
      return {
        success: false,
        data: null,
        error: {
          code: "CHANNEL_CREATE_ERROR",
          message: "Failed to create channel",
        } as any,
      };
    }

    return {
      success: true,
      data: {
        id: newChannel.id,
        name: newChannel.name,
        slug: newChannel.slug,
        regionId: newChannel.regionId,
        currencyCode: newChannel.currencyCode,
        taxInclusive: newChannel.taxInclusive,
        defaultLanguage: newChannel.defaultLanguage || null,
        isActive: newChannel.isActive,
        createdAt: newChannel.createdAt,
        updatedAt: newChannel.updatedAt,
      } as any,
      error: null,
    };
  } catch (error) {
    console.error("Error creating channel:", error);
    return {
      success: false,
      data: null,
      error: {
        code: "CHANNEL_CREATE_ERROR",
        message:
          error instanceof Error ? error.message : "Failed to create channel",
      } as any,
    };
  }
};