import type { MutationResolvers } from "../../../../types.generated";
import { db } from "../../../../../db/index";
import {
  channelProductsTable,
  channelsTable,
} from "../../../../../db/schema/regions-channels";
import { eq, and } from "drizzle-orm";
import { productVariantsTable } from "../../../../../db/schema/catalog";

export const setChannelProductPrice: NonNullable<
  MutationResolvers["setChannelProductPrice"]
> = async (_parent, args, _ctx): Promise<any> => {
  try {
    // Validate channel exists
    const channel = await db.query.channelsTable.findFirst({
      where: eq(channelsTable.id, args.channelId),
    });

    if (!channel) {
      return {
        success: false,
        data: null,
        error: {
          code: "CHANNEL_NOT_FOUND",
          message: "Channel not found",
        } as any,
      };
    }

    // Validate product variant exists
    const productVariant = await db.query.productVariantsTable.findFirst({
      where: eq(productVariantsTable.id, args.input.productVariantId),
    });

    if (!productVariant) {
      return {
        success: false,
        data: null,
        error: {
          code: "PRODUCT_VARIANT_NOT_FOUND",
          message: "Product variant not found",
        } as any,
      };
    }

    // Validate price is positive
    if (args.input.price < 0) {
      return {
        success: false,
        data: null,
        error: {
          code: "INVALID_PRICE",
          message: "Price must be a positive number",
        } as any,
      };
    }

    // Check if channel product already exists
    const existingChannelProduct = await db.query.channelProductsTable.findFirst(
      {
        where: and(
          eq(channelProductsTable.channelId, args.channelId),
          eq(
            channelProductsTable.productVariantId,
            args.input.productVariantId
          )
        ),
      }
    );

    if (existingChannelProduct) {
      // CRITICAL FIX: Await the update and check result with .returning()
      const updateResult = await db
        .update(channelProductsTable)
        .set({
          price: args.input.price,
          isVisible: args.input.isVisible ?? existingChannelProduct.isVisible,
        })
        .where(
          and(
            eq(channelProductsTable.channelId, args.channelId),
            eq(
              channelProductsTable.productVariantId,
              args.input.productVariantId
            )
          )
        )
        .returning();

      if (!updateResult || updateResult.length === 0) {
        return {
          success: false,
          data: null,
          error: {
            code: "PRICE_UPDATE_FAILED",
            message: "Failed to update channel product price",
          } as any,
        };
      }
    } else {
      // CRITICAL FIX: Await the insert and check result with .returning()
      const insertResult = await db
        .insert(channelProductsTable)
        .values({
          channelId: args.channelId,
          productVariantId: args.input.productVariantId,
          price: args.input.price,
          isVisible: args.input.isVisible ?? true,
        })
        .returning();

      if (!insertResult || insertResult.length === 0) {
        return {
          success: false,
          data: null,
          error: {
            code: "PRICE_SET_FAILED",
            message: "Failed to set channel product price",
          } as any,
        };
      }
    }

    return {
      success: true,
      data: {
        id: channel.id,
        name: channel.name,
        slug: channel.slug,
        regionId: channel.regionId,
        currencyCode: channel.currencyCode,
        taxInclusive: channel.taxInclusive,
        defaultLanguage: channel.defaultLanguage || null,
        isActive: channel.isActive,
        createdAt: channel.createdAt,
        updatedAt: channel.updatedAt,
      } as any,
      error: null,
    };
  } catch (error) {
    console.error("Error setting channel product price:", error);
    return {
      success: false,
      data: null,
      error: {
        code: "CHANNEL_PRODUCT_PRICE_ERROR",
        message:
          error instanceof Error
            ? error.message
            : "Failed to set channel product price",
      } as any,
    };
  }
};