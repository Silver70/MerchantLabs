import type { ChannelResolvers } from "../../../types.generated";
import { db } from "../../../../db/index";
import { regionsTable } from "../../../../db/schema/regions-channels";
import { eq } from "drizzle-orm";

export const Channel: ChannelResolvers = {
  region: async (parent, _args, _ctx) => {
    try {
      const region = await db.query.regionsTable.findFirst({
        where: eq(regionsTable.id, (parent as any).regionId),
      });

      if (!region) return null;

      return {
        id: region.id,
        name: region.name,
        countryCodes: region.countryCodes,
        taxRate: region.taxRate,
        taxCode: region.taxCode || null,
        createdAt: region.createdAt,
        updatedAt: region.updatedAt,
      } as any;
    } catch (error) {
      console.error("Error resolving channel region:", error);
      return null;
    }
  },
};
