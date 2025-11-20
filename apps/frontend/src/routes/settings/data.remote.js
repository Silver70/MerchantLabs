import { GET_ALL_REGIONS, GET_ALL_CHANNELS, CREATE_REGION } from '$lib/graphql/channelQueries';
import { form, query } from '$app/server';
import {
	CreateRegionSchema,
	UpdateRegionSchema,
	CreateChannelSchema,
	UpdateChannelSchema,
	ChannelProductPriceSchema
} from '$lib/validations/channel';
import { redirect } from '@sveltejs/kit';

const GRAPHQL_URL = 'http://localhost:4000/graphql';

export const getAllRegions = query(async (first = 20, after = null, filter = null) => {
	const response = await fetch(GRAPHQL_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query: GET_ALL_REGIONS,
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
		throw new Error(result.errors[0].message);
	}

	return result.data.regions;
});

export const createRegion = form(
	CreateRegionSchema,
	async ({ name, countryCodes, taxRate, taxCode }) => {
		console.log('Creating region with data:', { name, countryCodes, taxRate, taxCode });

		// countryCodes should already be an array from the select multiple field
		const countryCodesArray = Array.isArray(countryCodes) ? countryCodes : [];

		console.log('Processed countryCodes:', countryCodesArray);

		try {
			const response = await fetch(GRAPHQL_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					query: CREATE_REGION,
					variables: {
						input: {
							name,
							countryCodes: countryCodesArray,
							taxRate: typeof taxRate === 'string' ? parseFloat(taxRate) : taxRate,
							taxCode
						}
					}
				})
			});

			console.log('GraphQL response status:', response.status);

			if (!response.ok) {
				const errorText = await response.text();
				console.error('GraphQL request failed:', errorText);
				throw new Error(`Failed to create region: ${response.status} ${response.statusText}`);
			}

			const result = await response.json();
			console.log('GraphQL response:', result);

			// Check for GraphQL errors
			if (result.errors) {
				console.error('GraphQL errors:', result.errors);
				throw new Error(result.errors[0]?.message || 'GraphQL error');
			}

			// Check mutation success
			if (!result.data?.createRegion?.success) {
				const errorMessage = result.data?.createRegion?.error?.message || 'Failed to create region';
				console.error('Mutation failed:', errorMessage);
				throw new Error(errorMessage);
			}

			console.log('Region created successfully:', result.data.createRegion.data);
			redirect(303, '/settings');
		} catch (error) {
			console.error('Error in createRegion:', error);
			throw error; // Re-throw to show user the error
		}
	}
);
