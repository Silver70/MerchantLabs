import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { addressesTable } from "../../../../../db/schema/customers";

export const updateAddress: NonNullable<MutationResolvers['updateAddress']> = async (_parent, args, _ctx): Promise<any> => {
  try {
    const updateData: any = {};

    if (args.input.type !== undefined && args.input.type !== null) {
      updateData.type = args.input.type.toLowerCase();
    }

    if (args.input.line1 !== undefined && args.input.line1 !== null) {
      updateData.line1 = args.input.line1;
    }

    if (args.input.line2 !== undefined && args.input.line2 !== null) {
      updateData.line2 = args.input.line2;
    }

    if (args.input.city !== undefined && args.input.city !== null) {
      updateData.city = args.input.city;
    }

    if (args.input.state !== undefined && args.input.state !== null) {
      updateData.state = args.input.state;
    }

    if (args.input.postalCode !== undefined && args.input.postalCode !== null) {
      updateData.postalCode = args.input.postalCode;
    }

    if (args.input.country !== undefined && args.input.country !== null) {
      updateData.country = args.input.country;
    }

    if (Object.keys(updateData).length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "ADDRESS_UPDATE_NO_CHANGES",
          message: "No fields to update",
        },
      };
    }

    const result = await db
      .update(addressesTable)
      .set(updateData)
      .where(eq(addressesTable.id, args.id))
      .returning();

    if (!result || result.length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "ADDRESS_NOT_FOUND",
          message: "Address not found",
        },
      };
    }

    return {
      success: true,
      data: result[0],
      error: null,
    };
  } catch (error) {
    console.error("Error updating address:", error);
    return {
      success: false,
      data: null,
      error: {
        code: "ADDRESS_UPDATE_ERROR",
        message:
          error instanceof Error ? error.message : "Failed to update address",
      },
    };
  }
};