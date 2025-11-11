import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql';

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isValidUUID(value: string): boolean {
  return uuidRegex.test(value);
}

export const UUID = new GraphQLScalarType({
  name: 'UUID',
  description: 'UUID scalar type',
  serialize: (value) => {
    if (typeof value === 'string' && isValidUUID(value)) {
      return value;
    }
    throw new Error(`Invalid UUID: ${value}`);
  },
  parseValue: (value) => {
    if (typeof value === 'string' && isValidUUID(value)) {
      return value;
    }
    throw new Error(`Invalid UUID: ${value}`);
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING && isValidUUID(ast.value)) {
      return ast.value;
    }
    throw new Error(`Invalid UUID: ${ast.kind === Kind.STRING ? ast.value : 'not a string'}`);
  },
});