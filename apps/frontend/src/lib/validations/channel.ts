import {
	object,
	string,
	number,
	boolean,
	array,
	optional,
	pipe,
	minLength,
	maxLength,
	minValue,
	maxValue,
	regex,
	transform,
	toLowerCase
} from 'valibot';

// Region Validation Schemas
export const CreateRegionSchema = object({
	name: pipe(
		string('Name is required'),
		minLength(2, 'Name must be at least 2 characters'),
		maxLength(100, 'Name must be less than 100 characters')
	),
	countryCodes: pipe(
		array(string(), 'Country codes must be an array'),
		minLength(1, 'At least one country code is required')
	),
	taxRate: pipe(
		number('Tax rate is required'),
		minValue(0, 'Tax rate cannot be negative'),
		maxValue(100, 'Tax rate cannot exceed 100%')
	),
	taxCode: optional(pipe(string(), maxLength(20, 'Tax code must be less than 20 characters')))
});

export const UpdateRegionSchema = object({
	name: optional(
		pipe(
			string(),
			minLength(2, 'Name must be at least 2 characters'),
			maxLength(100, 'Name must be less than 100 characters')
		)
	),
	countryCodes: optional(
		pipe(array(string()), minLength(1, 'At least one country code is required'))
	),
	taxRate: optional(
		pipe(
			number(),
			minValue(0, 'Tax rate cannot be negative'),
			maxValue(100, 'Tax rate cannot exceed 100%')
		)
	),
	taxCode: optional(pipe(string(), maxLength(20, 'Tax code must be less than 20 characters')))
});

// Channel Validation Schemas
export const CreateChannelSchema = object({
	name: pipe(
		string('Name is required'),
		minLength(2, 'Name must be at least 2 characters'),
		maxLength(100, 'Name must be less than 100 characters')
	),
	regionId: pipe(string('Region is required'), minLength(1, 'Please select a region')),
	currencyCode: pipe(
		string('Currency code is required'),
		regex(/^[A-Z]{3}$/, 'Currency code must be 3 uppercase letters (e.g., USD, EUR)')
	),
	taxInclusive: optional(boolean(), false),
	defaultLanguage: optional(
		pipe(string(), regex(/^[a-z]{2}$/, 'Language code must be 2 lowercase letters (e.g., en, de)'))
	)
});

export const UpdateChannelSchema = object({
	name: optional(
		pipe(
			string(),
			minLength(2, 'Name must be at least 2 characters'),
			maxLength(100, 'Name must be less than 100 characters')
		)
	),
	slug: optional(
		pipe(
			string(),
			minLength(2, 'Slug must be at least 2 characters'),
			maxLength(100, 'Slug must be less than 100 characters'),
			regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
			transform(toLowerCase)
		)
	),
	regionId: optional(string()),
	currencyCode: optional(
		pipe(
			string(),
			regex(/^[A-Z]{3}$/, 'Currency code must be 3 uppercase letters (e.g., USD, EUR)')
		)
	),
	taxInclusive: optional(boolean()),
	defaultLanguage: optional(
		pipe(string(), regex(/^[a-z]{2}$/, 'Language code must be 2 lowercase letters (e.g., en, de)'))
	),
	isActive: optional(boolean())
});

// Channel Product Price Schema
export const ChannelProductPriceSchema = object({
	productVariantId: pipe(
		string('Product variant is required'),
		minLength(1, 'Please select a product variant')
	),
	price: pipe(number('Price is required'), minValue(0, 'Price cannot be negative')),
	isVisible: optional(boolean(), true)
});

// Common country codes for validation
export const COMMON_COUNTRY_CODES = [
	'US',
	'CA',
	'GB',
	'DE',
	'FR',
	'ES',
	'IT',
	'NL',
	'BE',
	'AT',
	'CH',
	'SE',
	'NO',
	'DK',
	'FI',
	'AU',
	'NZ',
	'JP',
	'KR',
	'SG',
	'HK',
	'IN',
	'CN',
	'BR',
	'MX',
	'AR',
	'CL',
	'CO',
	'PE'
];

// Common currency codes
export const COMMON_CURRENCIES = [
	{ code: 'USD', name: 'US Dollar' },
	{ code: 'EUR', name: 'Euro' },
	{ code: 'GBP', name: 'British Pound' },
	{ code: 'CAD', name: 'Canadian Dollar' },
	{ code: 'AUD', name: 'Australian Dollar' },
	{ code: 'JPY', name: 'Japanese Yen' },
	{ code: 'CHF', name: 'Swiss Franc' },
	{ code: 'SEK', name: 'Swedish Krona' },
	{ code: 'NOK', name: 'Norwegian Krone' },
	{ code: 'DKK', name: 'Danish Krone' }
];

// Common languages
export const COMMON_LANGUAGES = [
	{ code: 'en', name: 'English' },
	{ code: 'de', name: 'German' },
	{ code: 'fr', name: 'French' },
	{ code: 'es', name: 'Spanish' },
	{ code: 'it', name: 'Italian' },
	{ code: 'nl', name: 'Dutch' },
	{ code: 'sv', name: 'Swedish' },
	{ code: 'no', name: 'Norwegian' },
	{ code: 'da', name: 'Danish' },
	{ code: 'fi', name: 'Finnish' }
];

// Delete schemas
export const DeleteRegionSchema = object({
	id: pipe(string('ID is required'), minLength(1, 'Please provide a valid ID'))
});

export const DeleteChannelSchema = object({
	id: pipe(string('ID is required'), minLength(1, 'Please provide a valid ID'))
});
