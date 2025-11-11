import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { customersTable } from "../../../../../db/schema/customers";

export const deleteCustomer: NonNullable<MutationResolvers['deleteCustomer']> = async (_parent, args, _ctx): Promise<any> => {
  // Return type is DeleteResponse, not CustomerResponse
  try {
    const result = await db
      .delete(customersTable)
      .where(eq(customersTable.id, args.id))
      .returning();

    if (!result || result.length === 0) {
      return {
        success: false,
        error: {
          code: "CUSTOMER_NOT_FOUND",
          message: "Customer not found",
        },
      };
    }

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Error deleting customer:", error);
    return {
      success: false,
      error: {
        code: "CUSTOMER_DELETE_ERROR",
        message:
          error instanceof Error ? error.message : "Failed to delete customer",
      },
    };
  }
};