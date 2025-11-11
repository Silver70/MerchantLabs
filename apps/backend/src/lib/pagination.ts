/**
 * Cursor-based pagination helper
 */

export interface CursorPaginationArgs {
  first?: number | null;
  after?: string | null;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface Edge<T> {
  cursor: string;
  node: T;
}

export interface Connection<T> {
  edges: Edge<T>[];
  pageInfo: PageInfo;
}

/**
 * Encodes an ID to a base64 cursor
 */
export const encodeCursor = (id: string): string => {
  return Buffer.from(id).toString("base64");
};

/**
 * Decodes a base64 cursor to an ID
 */
export const decodeCursor = (cursor: string): string => {
  try {
    return Buffer.from(cursor, "base64").toString("utf-8");
  } catch (error) {
    return "";
  }
};

/**
 * Applies cursor-based pagination to a sorted array
 */
export const applyPagination = <T extends { id: string }>(
  items: T[],
  args: CursorPaginationArgs,
  defaultFirst: number = 10
): Connection<T> => {
  const first = Math.min(args.first || defaultFirst, 100); // Max 100 items per request
  const afterId = args.after ? decodeCursor(args.after) : null;

  let startIndex = 0;
  if (afterId) {
    startIndex = items.findIndex((item) => item.id === afterId) + 1;
    if (startIndex === 0) startIndex = 0; // Not found, start from beginning
  }

  const paginatedItems = items.slice(startIndex, startIndex + first + 1);
  const hasNextPage = paginatedItems.length > first;
  const edges = paginatedItems.slice(0, first).map((item) => ({
    cursor: encodeCursor(item.id),
    node: item,
  }));

  return {
    edges,
    pageInfo: {
      hasNextPage,
      hasPreviousPage: startIndex > 0,
      startCursor: edges.length > 0 ? edges[0].cursor : null,
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
    },
  };
};
