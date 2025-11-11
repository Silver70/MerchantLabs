import type { QueryResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { eq } from "drizzle-orm";
import { attributesTable } from "../../../../../db/schema/catalog";

export const attribute: NonNullable<QueryResolvers['attribute']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const attributeData = await db.query.attributesTable.findFirst({
      where: eq(attributesTable.id, args.id),
      with: {
        values: true,
      },
    });

    return attributeData as any;
  } catch (error) {
    console.error('Error fetching attribute:', error);
    return null;
  }
};