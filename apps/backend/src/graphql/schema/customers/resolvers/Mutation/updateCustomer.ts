import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { customersTable } from "../../../../../db/schema/customers";

export const updateCustomer: NonNullable<MutationResolvers['updateCustomer']> = async (_parent, args, _ctx): Promise<any> => {
  try {
    const updateData: any = {};

    if (args.input.firstName !== undefined && args.input.firstName !== null) {
      updateData.firstName = args.input.firstName;
    }

    if (args.input.lastName !== undefined && args.input.lastName !== null) {
      updateData.lastName = args.input.lastName;
    }

    if (args.input.phone !== undefined && args.input.phone !== null) {
      updateData.phone = args.input.phone;
    }

    if (Object.keys(updateData).length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "CUSTOMER_UPDATE_NO_CHANGES",
          message: "No fields to update",
        },
      };
    }

    const result = await db
      .update(customersTable)
      .set(updateData)
      .where(eq(customersTable.id, args.id))
      .returning();

    if (!result || result.length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "CUSTOMER_NOT_FOUND",
          message: "Customer not found",
        },
      };
    }

    // Fetch full customer with addresses
    const customer = await db.query.customersTable.findFirst({
      where: eq(customersTable.id, args.id),
      with: {
        addresses: true,
      },
    });

    return {
      success: true,
      data: customer || null,
      error: null,
    };
  } catch (error) {
    console.error("Error updating customer:", error);
    return {
      success: false,
      data: null,
      error: {
        code: "CUSTOMER_UPDATE_ERROR",
        message:
          error instanceof Error ? error.message : "Failed to update customer",
      },
    };
  }
};