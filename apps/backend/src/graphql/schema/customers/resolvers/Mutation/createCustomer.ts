import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { customersTable } from "../../../../../db/schema/customers";

export const createCustomer: NonNullable<MutationResolvers['createCustomer']> = async (_parent, args, _ctx): Promise<any> => {
  try {
    const result = await db
      .insert(customersTable)
      .values({
        firstName: args.input.firstName,
        lastName: args.input.lastName,
        email: args.input.email,
        phone: args.input.phone || null,
      })
      .returning();

    if (!result || result.length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "CUSTOMER_CREATE_FAILED",
          message: "Failed to create customer",
        },
      };
    }

    return {
      success: true,
      data: {
        ...result[0],
        addresses: [],
      },
      error: null,
    };
  } catch (error) {
    console.error("Error creating customer:", error);
    return {
      success: false,
      data: null,
      error: {
        code: "CUSTOMER_CREATE_ERROR",
        message:
          error instanceof Error ? error.message : "Failed to create customer",
      },
    };
  }
};