import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { addressesTable } from "../../../../../db/schema/customers";

export const deleteAddress: NonNullable<MutationResolvers['deleteAddress']> = async (_parent, args, _ctx): Promise<any> => {
  try {
    const result = await db
      .delete(addressesTable)
      .where(eq(addressesTable.id, args.id))
      .returning();

    if (!result || result.length === 0) {
      return {
        success: false,
        error: {
          code: "ADDRESS_NOT_FOUND",
          message: "Address not found",
        },
      };
    }

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Error deleting address:", error);
    return {
      success: false,
      error: {
        code: "ADDRESS_DELETE_ERROR",
        message:
          error instanceof Error ? error.message : "Failed to delete address",
      },
    };
  }
};