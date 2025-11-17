export const GET_ALL_PRODUCTS = `
	query GetProducts($first: Int, $after: String, $filter: ProductFilterInput) {
		products(first: $first, after: $after, filter: $filter) {
			edges {
				cursor
				node {
					id
					name
					slug
					description
					category {
						id
						name
						slug
					}
					variants {
						id
						sku
						quantityInStock
						attributes {
							id
							attributeId
							value
						}
					}
					isActive
					createdAt
					updatedAt
				}
			}
			pageInfo {
				hasNextPage
				hasPreviousPage
				startCursor
				endCursor
				totalCount
			}
		}
	}
`;
