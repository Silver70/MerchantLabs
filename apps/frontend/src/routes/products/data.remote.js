import { query } from '$app/server';
import { GET_ALL_PRODUCTS } from '$lib/graphql/productQueries';

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
				query: GET_ALL_PRODUCTS,
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
