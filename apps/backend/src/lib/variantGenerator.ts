import { generateSKU } from "./sku";

export interface AttributeValueWithId {
  id: string;
  value: string;
}

export interface AttributeWithValues {
  attributeId: string;
  attributeName: string;
  values: AttributeValueWithId[];
}

export interface GeneratedVariant {
  sku: string;
  quantityInStock: number;
  attributeValueIds: string[];
  attributeDetails: Array<{
    attributeId: string;
    attributeName: string;
    value: string;
  }>;
}

/**
 * Generates all possible variant combinations from selected attributes
 * Uses Cartesian product to create all combinations
 */
export const generateVariantCombinations = (
  productSlug: string,
  attributes: AttributeWithValues[],
  defaultQuantity: number = 0
): GeneratedVariant[] => {
  if (attributes.length === 0) {
    return [];
  }

  // Extract values for each attribute
  const valueArrays = attributes.map((attr) => attr.values);

  // Generate Cartesian product of all attribute values
  const combinations = cartesianProduct(valueArrays);

  // Convert combinations to variant objects
  return combinations.map((combination) => {
    const attributeValueIds = combination.map((val) => val.id);
    const attributeValues = combination.map((val) => val.value);
    const attributeDetails = combination
      .map((val, index) => {
        const attr = attributes[index];
        if (!attr) return null;
        return {
          attributeId: attr.attributeId,
          attributeName: attr.attributeName,
          value: val.value,
        };
      })
      .filter(
        (detail) => detail !== null
      ) as Array<{
      attributeId: string;
      attributeName: string;
      value: string;
    }>;

    const sku = generateSKU(productSlug, attributeValues);

    return {
      sku,
      quantityInStock: defaultQuantity,
      attributeValueIds,
      attributeDetails,
    };
  });
};

/**
 * Generates Cartesian product of arrays
 * Used to create all possible combinations of attribute values
 */
function cartesianProduct<T>(arrays: T[][]): T[][] {
  if (arrays.length === 0) return [[]];
  if (arrays.length === 1) {
    const firstArray = arrays[0];
    return firstArray ? firstArray.map((item) => [item]) : [];
  }

  const first = arrays[0];
  const rest = arrays.slice(1);
  const restProduct = cartesianProduct(rest);

  const result: T[][] = [];
  if (first) {
    for (const item of first) {
      for (const combination of restProduct) {
        result.push([item, ...combination]);
      }
    }
  }
  return result;
}

/**
 * Example usage:
 * const attributes = [
 *   {
 *     attributeId: 'attr-1',
 *     attributeName: 'Size',
 *     values: [
 *       { id: 'val-1', value: 'Small' },
 *       { id: 'val-2', value: 'Large' }
 *     ]
 *   },
 *   {
 *     attributeId: 'attr-2',
 *     attributeName: 'Color',
 *     values: [
 *       { id: 'val-3', value: 'Red' },
 *       { id: 'val-4', value: 'Blue' }
 *     ]
 *   }
 * ];
 *
 * const variants = generateVariantCombinations('my-product', attributes, 10);
 * // This will generate 4 variants: Small-Red, Small-Blue, Large-Red, Large-Blue
 */
