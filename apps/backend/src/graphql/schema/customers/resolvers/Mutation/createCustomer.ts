import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import { customersTable } from "../../../../../db/schema/customers";
import { eq } from "drizzle-orm";

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createCustomer: NonNullable<
  MutationResolvers["createCustomer"]
> = async (_parent, args, _ctx): Promise<any> => {
  try {
    // Validate required fields
    if (!args.input.firstName || args.input.firstName.trim().length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "INVALID_FIRST_NAME",
          message: "First name is required and cannot be empty",
        },
      };
    }

    if (!args.input.lastName || args.input.lastName.trim().length === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "INVALID_LAST_NAME",
          message: "Last name is required and cannot be empty",
        },
      };
    }

    // Validate email format
    if (!args.input.email || !EMAIL_REGEX.test(args.input.email)) {
      return {
        success: false,
        data: null,
        error: {
          code: "INVALID_EMAIL",
          message: "A valid email address is required",
        },
      };
    }

    // Check email uniqueness
    const existingCustomer = await db.query.customersTable.findFirst({
      where: eq(customersTable.email, args.input.email),
    });

    if (existingCustomer) {
      return {
        success: false,
        data: null,
        error: {
          code: "EMAIL_ALREADY_EXISTS",
          message: "A customer with this email already exists",
        },
      };
    }

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