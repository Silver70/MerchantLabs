import type { OrderResolvers } from "../../../types.generated";
import { db } from "../../../../db/index";
import { eq } from "drizzle-orm";

export const Order: OrderResolvers = {
  status: (parent) => {
    // Convert database enum (lowercase) to GraphQL enum (uppercase)
    return (parent.status?.toUpperCase() || "PENDING") as any;
  },
  items: (parent) => {
    return parent.items || [];
  },
  customer: async (parent) => {
    // If customer is already loaded, return it
    if ((parent as any).customer) {
      return (parent as any).customer;
    }
    const customerId = (parent as any).customerId;
    if (!customerId) return null;
    const customer = await db.query.customersTable.findFirst({
      where: eq(require("../../../../db/schema/customers").customersTable.id, customerId),
    });
    return customer as any;
  },
  channel: async (parent) => {
    if ((parent as any).channel) {
      return (parent as any).channel;
    }
    const channelId = (parent as any).channelId;
    if (!channelId) return null;
    const channel = await db.query.channelsTable.findFirst({
      where: eq(require("../../../../db/schema/regions-channels").channelsTable.id, channelId),
    });
    return channel as any;
  },
  shippingAddress: async (parent) => {
    if ((parent as any).shippingAddress) {
      return (parent as any).shippingAddress;
    }
    const shippingAddressId = (parent as any).shippingAddressId;
    if (!shippingAddressId) return null;
    const address = await db.query.addressesTable.findFirst({
      where: eq(require("../../../../db/schema/customers").addressesTable.id, shippingAddressId),
    });
    return address as any;
  },
  billingAddress: async (parent) => {
    if ((parent as any).billingAddress) {
      return (parent as any).billingAddress;
    }
    const billingAddressId = (parent as any).billingAddressId;
    if (!billingAddressId) return null;
    const address = await db.query.addressesTable.findFirst({
      where: eq(require("../../../../db/schema/customers").addressesTable.id, billingAddressId),
    });
    return address as any;
  },
  discount: async (parent) => {
    if ((parent as any).discount) {
      return (parent as any).discount;
    }
    const discountId = (parent as any).discountId;
    if (!discountId) return null;
    const discount = await db.query.discountsTable.findFirst({
      where: eq(require("../../../../db/schema/discounts").discountsTable.id, discountId),
    });
    return discount as any;
  },
  region: async (parent) => {
    if ((parent as any).region) {
      return (parent as any).region;
    }
    const regionId = (parent as any).regionId;
    if (!regionId) return null;
    const region = await db.query.regionsTable.findFirst({
      where: eq(require("../../../../db/schema/regions-channels").regionsTable.id, regionId),
    });
    return region as any;
  },
};