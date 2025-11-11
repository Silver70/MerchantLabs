import type { PageInfoResolvers } from './../../../types.generated';

export const PageInfo: PageInfoResolvers = {
  hasNextPage: (parent) => parent.hasNextPage ?? false,
  hasPreviousPage: (parent) => parent.hasPreviousPage ?? false,
  startCursor: (parent) => parent.startCursor ?? null,
  endCursor: (parent) => parent.endCursor ?? null,
  totalCount: (parent) => parent.totalCount ?? 0,
};