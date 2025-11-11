import type { QueryResolvers } from './../../../../types.generated';
import { db } from "../../../../../db/index";
import { desc } from "drizzle-orm";
import { attributesTable } from "../../../../../db/schema/catalog";

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

export const attributes: NonNullable<QueryResolvers['attributes']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const pageSize = Math.min(args.first || DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);

    const attributesData = await db.query.attributesTable.findMany({
      with: {
        values: true,
      },
      orderBy: desc(attributesTable.name),
      limit: pageSize,
    });

    return attributesData as any[];
  } catch (error) {
    console.error('Error fetching attributes:', error);
    return [];
  }
};