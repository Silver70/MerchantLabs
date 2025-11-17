import type { QueryResolvers } from "./../../../../types.generated";
import { db } from "../../../../../db/index";
import { and, eq, like, desc } from "drizzle-orm";
import { productsTable } from "../../../../../db/schema/catalog";

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

export const products: NonNullable<QueryResolvers['products']> = async (
  _parent,
  args,
  _ctx
) => {
  try {
    const pageSize = Math.min(args.first || DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);
    const filter = args.filter;

    // Build filter conditions
    const conditions = [];

    if (filter?.categoryId) {
      conditions.push(eq(productsTable.categoryId, filter.categoryId));
    }

    if (filter?.isActive !== undefined && filter.isActive !== null) {
      conditions.push(eq(productsTable.isActive, filter.isActive));
    }

    if (filter?.search) {
      conditions.push(
        like(productsTable.name, `%${filter.search}%`)
      );
    }

    // TODO: Implement minPrice/maxPrice filtering when pricing is added to product_variants
    // This requires joining with product_variants table

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    let baseQuery = db.query.productsTable.findMany({
      where: whereClause,
      with: {
        category: true,
        variants: {
          with: {
            attributes: {
              with: {
                attributeValue: true,
              },
            },
          },
        },
      },
      orderBy: desc(productsTable.createdAt),
      limit: pageSize + 1, // Fetch one extra to determine hasNextPage
    });

    // Handle cursor-based pagination
    if (args.after) {
      // In a real implementation, you'd decode the cursor and apply offset/keyset pagination
      // For now, this is a basic implementation
    }

    const allProducts = await baseQuery;
    const hasNextPage = allProducts.length > pageSize;
    const products = hasNextPage ? allProducts.slice(0, pageSize) : allProducts;

    const startProduct = products[0];
    const endProduct = products[products.length - 1];

    return {
      edges: products.map(product => ({
        cursor: Buffer.from(product.id).toString('base64'),
        node: product as any,
      })),
      pageInfo: {
        hasNextPage,
        hasPreviousPage: !!args.after,
        startCursor: startProduct ? Buffer.from(startProduct.id).toString('base64') : null,
        endCursor: endProduct ? Buffer.from(endProduct.id).toString('base64') : null,
        totalCount: products.length,
      },
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      edges: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
        totalCount: 0,
      },
    };
  }
};
  