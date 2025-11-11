import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql";
import { Decimal as DecimalJS } from "decimal.js";

export const Decimal = new GraphQLScalarType({
  name: "Decimal",
  description: "Decimal scalar type for precise decimal arithmetic",
  serialize: (value) => {
    if (value instanceof DecimalJS) {
      return value.toString();
    }
    if (typeof value === "number" || typeof value === "string") {
      return new DecimalJS(value).toString();
    }
    throw new Error(`Invalid Decimal: ${value}`);
  },
  parseValue: (value) => {
    try {
      if (typeof value === "number" || typeof value === "string") {
        return new DecimalJS(value);
      }
      if (value instanceof DecimalJS) {
        return value;
      }
      throw new Error(`Invalid Decimal: ${value}`);
    } catch (error) {
      throw new Error(`Invalid Decimal: ${value}`);
    }
  },
  parseLiteral: (ast) => {
    try {
      if (
        ast.kind === Kind.STRING ||
        ast.kind === Kind.INT ||
        ast.kind === Kind.FLOAT
      ) {
        return new DecimalJS(ast.value as string);
      }
      throw new Error(`Invalid Decimal: ${ast.kind}`);
    } catch (error) {
      throw new Error(`Invalid Decimal: ${error}`);
    }
  },
});
