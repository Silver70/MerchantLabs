import { query } from '$app/server';

const GRAPHQL_URL = process.env.VITE_GRAPHQL_URL || 'http://localhost:4000/graphql';

export const getAllProducts = query(async (first = 20, after = null, filter = null) => {
	try {
		const response = await fetch(GRAPHQL_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				query: `
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
				`,
				variables: {
					first,
					after,
					filter
				}
			})
		});

		if (!response.ok) {
			throw new Error(`GraphQL request failed: ${response.statusText}`);
		}

		const result = await response.json();

		if (result.errors) {
			// @ts-ignore
			throw new Error(`GraphQL error: ${result.errors.map((e) => e.message).join(', ')}`);
		}

		return result.data.products;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
});
