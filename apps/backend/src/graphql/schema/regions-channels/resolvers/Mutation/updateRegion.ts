import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { regionsTable } from "../../../../../db/schema/regions-channels";
import { eq } from "drizzle-orm";
import { Decimal as DecimalJS } from "decimal.js";

export const updateRegion: NonNullable<MutationResolvers['updateRegion']> = async (_parent, args, _ctx) => {
  try {
    const updateData: Record<string, any> = {};

    if (args.input.name !== undefined) updateData.name = args.input.name;
    if (args.input.countryCodes !== undefined)
      updateData.countryCodes = args.input.countryCodes;
    if (args.input.taxRate !== undefined) {
      // Convert taxRate to string for database storage
      updateData.taxRate = args.input.taxRate instanceof DecimalJS
        ? args.input.taxRate.toString()
        : String(args.input.taxRate);
    }
    if (args.input.taxCode !== undefined) updateData.taxCode = args.input.taxCode;

    const updatedRegionArray = await db
      .update(regionsTable)
      .set(updateData)
      .where(eq(regionsTable.id, args.id))
      .returning();

    const updatedRegion = Array.isArray(updatedRegionArray)
      ? updatedRegionArray[0]
      : updatedRegionArray;

    if (!updatedRegion) {
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
        id: updatedRegion.id,
        name: updatedRegion.name,
        countryCodes: updatedRegion.countryCodes,
        taxRate: updatedRegion.taxRate,
        taxCode: updatedRegion.taxCode || null,
        createdAt: updatedRegion.createdAt,
        updatedAt: updatedRegion.updatedAt,
      } as any,
      error: null,
    };
  } catch (error) {
    console.error("Error updating region:", error);
    return {
      success: false,
      data: null,
      error: {
        code: "REGION_UPDATE_ERROR",
        message:
          error instanceof Error ? error.message : "Failed to update region",
      } as any,
    };
  }
};