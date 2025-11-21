import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { regionsTable, channelsTable, channelProductsTable } from "../../../../../db/schema/regions-channels";
import { eq } from "drizzle-orm";

export const deleteRegion: NonNullable<MutationResolvers['deleteRegion']> = async (_parent, args, _ctx) => {
  try {
    // First, check if the region exists
    const existingRegion = await db
      .select()
      .from(regionsTable)
      .where(eq(regionsTable.id, args.id))
      .limit(1);

    if (existingRegion.length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "REGION_NOT_FOUND",
          message: "Region not found",
        } as any,
      };
    }

    // Get all channels that reference this region
    const channelsToDelete = await db
      .select({ id: channelsTable.id })
      .from(channelsTable)
      .where(eq(channelsTable.regionId, args.id));

    // Delete channel products first for each channel (CASCADE)
    for (const channel of channelsToDelete) {
      await db
        .delete(channelProductsTable)
        .where(eq(channelProductsTable.channelId, channel.id));
    }

    // Then delete all channels that reference this region
    await db
      .delete(channelsTable)
      .where(eq(channelsTable.regionId, args.id));

    // Now delete the region
    const deletedRegionArray = await db
      .delete(regionsTable)
      .where(eq(regionsTable.id, args.id))
      .returning();

    const deletedRegion = Array.isArray(deletedRegionArray)
      ? deletedRegionArray[0]
      : deletedRegionArray;

    if (!deletedRegion) {
      return {
        success: false,
        data: null,
        error: {
          code: "REGION_NOT_FOUND",
          message: "Region not found",
        } as any,
      };
    }

    return {
      success: true,
      data: {
        id: deletedRegion.id,
        name: deletedRegion.name,
        countryCodes: deletedRegion.countryCodes,
        taxRate: deletedRegion.taxRate,
        taxCode: deletedRegion.taxCode || null,
        createdAt: deletedRegion.createdAt,
        updatedAt: deletedRegion.updatedAt,
      } as any,
      error: null,
    };
  } catch (error) {
    console.error("Error deleting region:", error);
    return {
      success: false,
      data: null,
      error: {
        code: "REGION_DELETE_ERROR",
        message:
          error instanceof Error ? error.message : "Failed to delete region",
      } as any,
    };
  }
};