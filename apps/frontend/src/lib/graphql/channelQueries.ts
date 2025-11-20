// Queries
export const GET_ALL_CHANNELS = `
	query GetChannels($first: Int, $after: String) {
		channels(first: $first, after: $after) {
			edges {
				cursor
				node {
					id
					name
					slug
					currencyCode
					taxInclusive
					defaultLanguage
					isActive
					createdAt
					updatedAt
					region {
						id
						name
						countryCodes
						taxRate
						taxCode
					}
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

export const GET_CHANNEL_BY_ID = `
	query GetChannel($id: UUID!) {
		channel(id: $id) {
			id
			name
			slug
			currencyCode
			taxInclusive
			defaultLanguage
			isActive
			createdAt
			updatedAt
			region {
				id
				name
				countryCodes
				taxRate
				taxCode
			}
		}
	}
`;

export const GET_ALL_REGIONS = `
	query GetRegions($first: Int, $after: String) {
		regions(first: $first, after: $after) {
			edges {
				cursor
				node {
					id
					name
					countryCodes
					taxRate
					taxCode
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

export const GET_REGION_BY_ID = `
	query GetRegion($id: UUID!) {
		region(id: $id) {
			id
			name
			countryCodes
			taxRate
			taxCode
			createdAt
			updatedAt
		}
	}
`;

// Channel Mutations
export const CREATE_CHANNEL = `
	mutation CreateChannel($input: CreateChannelInput!) {
		createChannel(input: $input) {
			success
			data {
				id
				name
				slug
				currencyCode
				taxInclusive
				defaultLanguage
				isActive
				createdAt
				updatedAt
				region {
					id
					name
					countryCodes
					taxRate
					taxCode
				}
			}
			error {
				code
				message
			}
		}
	}
`;

export const UPDATE_CHANNEL = `
	mutation UpdateChannel($id: UUID!, $input: UpdateChannelInput!) {
		updateChannel(id: $id, input: $input) {
			success
			data {
				id
				name
				slug
				currencyCode
				taxInclusive
				defaultLanguage
				isActive
				createdAt
				updatedAt
				region {
					id
					name
					countryCodes
					taxRate
					taxCode
				}
			}
			error {
				code
				message
			}
		}
	}
`;

export const DELETE_CHANNEL = `
	mutation DeleteChannel($id: UUID!) {
		deleteChannel(id: $id) {
			success
			error {
				code
				message
			}
		}
	}
`;

// Region Mutations
export const CREATE_REGION = `
	mutation CreateRegion($input: CreateRegionInput!) {
		createRegion(input: $input) {
			success
			data {
				id
				name
				countryCodes
				taxRate
				taxCode
				createdAt
				updatedAt
			}
			error {
				code
				message
			}
		}
	}
`;

export const UPDATE_REGION = `
	mutation UpdateRegion($id: UUID!, $input: UpdateRegionInput!) {
		updateRegion(id: $id, input: $input) {
			success
			data {
				id
				name
				countryCodes
				taxRate
				taxCode
				createdAt
				updatedAt
			}
			error {
				code
				message
			}
		}
	}
`;

export const DELETE_REGION = `
	mutation DeleteRegion($id: UUID!) {
		deleteRegion(id: $id) {
			success
			error {
				code
				message
			}
		}
	}
`;

// Channel Product Pricing Mutation
export const SET_CHANNEL_PRODUCT_PRICE = `
	mutation SetChannelProductPrice(
		$channelId: UUID!
		$input: ChannelProductPriceInput!
	) {
		setChannelProductPrice(channelId: $channelId, input: $input) {
			success
			data {
				id
				name
				slug
				currencyCode
				taxInclusive
				defaultLanguage
				isActive
				createdAt
				updatedAt
				region {
					id
					name
					countryCodes
					taxRate
					taxCode
				}
			}
			error {
				code
				message
			}
		}
	}
`;

// // Type definitions for TypeScript
// export interface Channel {
//   id: string;
//   name: string;
//   slug: string;
//   currencyCode: string;
//   taxInclusive: boolean;
//   defaultLanguage?: string;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
//   region: Region;
// }

// export interface Region {
//   id: string;
//   name: string;
//   countryCodes: string[];
//   taxRate: number;
//   taxCode?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface CreateChannelInput {
//   name: string;
//   slug: string;
//   regionId: string;
//   currencyCode: string;
//   taxInclusive?: boolean;
//   defaultLanguage?: string;
// }

// export interface UpdateChannelInput {
//   name?: string;
//   slug?: string;
//   regionId?: string;
//   currencyCode?: string;
//   taxInclusive?: boolean;
//   defaultLanguage?: string;
//   isActive?: boolean;
// }

// export interface CreateRegionInput {
//   name: string;
//   countryCodes: string[];
//   taxRate: number;
//   taxCode?: string;
// }

// export interface UpdateRegionInput {
//   name?: string;
//   countryCodes?: string[];
//   taxRate?: number;
//   taxCode?: string;
// }

// export interface ChannelProductPriceInput {
//   productVariantId: string;
//   price: number;
//   isVisible?: boolean;
// }

// export interface GraphQLResponse<T> {
//   success: boolean;
//   data: T | null;
//   error: {
//     code: string;
//     message: string;
//   } | null;
// }

// export interface ConnectionEdge<T> {
//   cursor: string;
//   node: T;
// }

// export interface PageInfo {
//   hasNextPage: boolean;
//   hasPreviousPage: boolean;
//   startCursor?: string;
//   endCursor?: string;
// }

// export interface Connection<T> {
//   edges: ConnectionEdge<T>[];
//   pageInfo: PageInfo;
// }
