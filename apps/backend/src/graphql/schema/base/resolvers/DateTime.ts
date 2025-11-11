import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql';

export const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'DateTime scalar type (ISO 8601 format)',
  serialize: (value) => {
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (typeof value === 'string') {
      return new Date(value).toISOString();
    }
    throw new Error(`Invalid DateTime: ${value}`);
  },
  parseValue: (value) => {
    if (typeof value === 'string' || typeof value === 'number') {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid DateTime: ${value}`);
      }
      return date;
    }
    if (value instanceof Date) {
      return value;
    }
    throw new Error(`Invalid DateTime: ${value}`);
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
      const value = ast.kind === Kind.STRING ? ast.value : parseInt(ast.value as string);
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid DateTime: ${value}`);
      }
      return date;
    }
    throw new Error(`Invalid DateTime: ${ast.kind}`);
  },
});