import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { addressesTable } from "../../../../../db/schema/customers";

export const createAddress: NonNullable<MutationResolvers['createAddress']> = async (_parent, args, _ctx): Promise<any> => {
  try {
    const result = await db
      .insert(addressesTable)
      .values({
        customerId: args.input.customerId,
        type: args.input.type.toLowerCase() as "shipping" | "billing",
        line1: args.input.line1,
        line2: args.input.line2 || null,
        city: args.input.city,
        state: args.input.state,
        postalCode: args.input.postalCode,
        country: args.input.country,
      })
      .returning();

    if (!result || result.length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "ADDRESS_CREATE_FAILED",
          message: "Failed to create address",
        },
      };
    }

    return {
      success: true,
      data: result[0],
      error: null,
    };
  } catch (error) {
    console.error("Error creating address:", error);
    return {
      success: false,
      data: null,
      error: {
        code: "ADDRESS_CREATE_ERROR",
        message:
          error instanceof Error ? error.message : "Failed to create address",
      },
    };
  }
};