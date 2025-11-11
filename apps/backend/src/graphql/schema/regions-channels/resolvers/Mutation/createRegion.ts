import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { regionsTable } from "../../../../../db/schema/regions-channels";

export const createRegion: NonNullable<
  MutationResolvers["createRegion"]
> = async (_parent, args, _ctx) => {
  try {
    const newRegionArray = await db
      .insert(regionsTable)
      .values({
        name: args.input.name,
        countryCodes: args.input.countryCodes,
        taxRate: args.input.taxRate,
        taxCode: args.input.taxCode || null,
      })
      .returning();

    const newRegion = Array.isArray(newRegionArray)
      ? newRegionArray[0]
      : newRegionArray;

    if (!newRegion) {
      return {
        success: false,
        data: null,
        error: {
          code: "REGION_CREATE_ERROR",
          message: "Failed to create region",
        } as any,
      };
    }

    return {
      success: true,
      data: {
        id: newRegion.id,
        name: newRegion.name,
        countryCodes: newRegion.countryCodes,
        taxRate: newRegion.taxRate,
        taxCode: newRegion.taxCode || null,
        createdAt: newRegion.createdAt,
        updatedAt: newRegion.updatedAt,
      } as any,
      error: null,
    };
  } catch (error) {
    console.error("Error creating region:", error);
    return {
      success: false,
      data: null,
      error: {
        code: "REGION_CREATE_ERROR",
        message:
          error instanceof Error ? error.message : "Failed to create region",
      } as any,
    };
  }
};