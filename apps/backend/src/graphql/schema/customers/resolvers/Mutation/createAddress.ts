import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { addressesTable, customersTable } from "../../../../../db/schema/customers";
import { eq } from "drizzle-orm";

const POSTAL_CODE_REGEX = /^[\d\w\s\-]{3,10}$/;

export const createAddress: NonNullable<
  MutationResolvers["createAddress"]
> = async (_parent, args, _ctx): Promise<any> => {
  try {
    // Validate customer exists
    const customer = await db.query.customersTable.findFirst({
      where: eq(customersTable.id, args.input.customerId),
    });

    if (!customer) {
      return {
        success: false,
        data: null,
        error: {
          code: "CUSTOMER_NOT_FOUND",
          message: "Customer not found",
        },
      };
    }

    // Validate required address fields
    if (!args.input.line1 || args.input.line1.trim().length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "INVALID_ADDRESS_LINE1",
          message: "Address line 1 is required",
        },
      };
    }

    if (!args.input.city || args.input.city.trim().length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "INVALID_CITY",
          message: "City is required",
        },
      };
    }

    if (!args.input.state || args.input.state.trim().length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "INVALID_STATE",
          message: "State is required",
        },
      };
    }

    if (
      !args.input.postalCode ||
      !POSTAL_CODE_REGEX.test(args.input.postalCode)
    ) {
      return {
        success: false,
        data: null,
        error: {
          code: "INVALID_POSTAL_CODE",
          message: "A valid postal code is required (3-10 alphanumeric characters)",
        },
      };
    }

    if (!args.input.country || args.input.country.trim().length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "INVALID_COUNTRY",
          message: "Country is required",
        },
      };
    }

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