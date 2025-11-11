import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { regionsTable } from "../../../../../db/schema/regions-channels";
import { eq } from "drizzle-orm";

export const deleteRegion: NonNullable<MutationResolvers['deleteRegion']> = async (_parent, args, _ctx) => {
  try {
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