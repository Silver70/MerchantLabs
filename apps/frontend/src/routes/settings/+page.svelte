<script lang="ts">
	import DataTable from '../../components/DataTable.svelte';
	import {
		COMMON_COUNTRY_CODES,
		COMMON_CURRENCIES,
		COMMON_LANGUAGES
	} from '$lib/validations/channel';
	import { getAllRegions, createRegion, getAllChannels } from './data.remote';

	// Load regions data from backend
	let regionsPromise = $state(getAllRegions());
	let channelPromise = $state(getAllChannels());

	// Keep hardcoded channels data for now
	let channelsData = $state([
		{
			id: '1',
			name: 'Main Store',
			slug: 'main-store',
			region: 'North America',
			currencyCode: 'USD',
			taxInclusive: false,
			defaultLanguage: 'en',
			isActive: true,
			createdAt: '2023-01-15',
			updatedAt: '2023-01-15'
		},
		{
			id: '2',
			name: 'European Store',
			slug: 'eu-store',
			region: 'Europe',
			currencyCode: 'EUR',
			taxInclusive: true,
			defaultLanguage: 'en',
			isActive: true,
			createdAt: '2023-01-15',
			updatedAt: '2023-01-15'
		}
	]);

	let activeTab = $state<'regions' | 'channels'>('regions');
	let showRegionModal = $state(false);
	let showChannelModal = $state(false);

	// Form state for region modal
	let selectedCountries = $state<string[]>([]);
	let countrySearchTerm = $state('');
	let showCountryDropdown = $state(false);

	// Reset form and close modal on successful submission
	function resetRegionModal() {
		showRegionModal = false;
		selectedCountries = [];
		countrySearchTerm = '';
		showCountryDropdown = false;
		// Refresh regions data
		regionsPromise = getAllRegions();
	}

	// Watch for successful form submission
	$effect(() => {
		// Access the result from the remote function
		if (createRegion.result?.success) {
			resetRegionModal();
		}
	});

	// Filter countries based on search term
	const filteredCountries = $derived(
		COMMON_COUNTRY_CODES.filter(
			(code) =>
				code.toLowerCase().includes(countrySearchTerm.toLowerCase()) &&
				!selectedCountries.includes(code)
		)
	);

	function addCountry(code: string) {
		selectedCountries = [...selectedCountries, code];
		countrySearchTerm = '';
		showCountryDropdown = false;
	}

	function removeCountry(code: string) {
		selectedCountries = selectedCountries.filter((c) => c !== code);
	}

	// Region table columns
	const regionColumns = [
		{
			id: 'name',
			label: 'Name',
			accessor: (region: any) => region.name,
			sortable: true
		},
		{
			id: 'countries',
			label: 'Countries',
			accessor: (region: any) => region.countryCodes.join(', ')
		},
		{
			id: 'taxRate',
			label: 'Tax Rate',
			accessor: (region: any) => `${region.taxRate}%`
		},
		{
			id: 'taxCode',
			label: 'Tax Code',
			accessor: (region: any) => region.taxCode || 'N/A'
		},
		{
			id: 'updatedAt',
			label: 'Last Updated',
			accessor: (region: any) => new Date(region.updatedAt).toLocaleDateString()
		}
	];

	// Channel table columns
	const channelColumns = [
		{
			id: 'name',
			label: 'Name',
			accessor: (channel: any) => channel.name,
			sortable: true
		},
		{
			id: 'slug',
			label: 'Slug',
			accessor: (channel: any) => channel.slug
		},
		{
			id: 'region',
			label: 'Region',
			accessor: (channel: any) => channel.region?.name || 'N/A'
		},
		{
			id: 'currency',
			label: 'Currency',
			accessor: (channel: any) => channel.currencyCode
		},
		{
			id: 'taxInclusive',
			label: 'Tax Inclusive',
			accessor: (channel: any) => (channel.taxInclusive ? 'Yes' : 'No')
		},
		{
			id: 'status',
			label: 'Status',
			accessor: (channel: any) => (channel.isActive ? 'Active' : 'Inactive')
		}
	];

	// Action handlers
	function handleEditRegion(region: any) {
		console.log('Edit region:', region);
	}

	function handleDeleteRegion(region: any) {
		if (confirm(`Are you sure you want to delete the region "${region.name}"?`)) {
			console.log('Delete region:', region);
			// TODO: Implement actual delete API call and refresh data
			// regionsPromise = getAllRegions();
		}
	}

	function handleEditChannel(channel: any) {
		console.log('Edit channel:', channel);
	}

	function handleDeleteChannel(channel: any) {
		if (confirm(`Are you sure you want to delete the channel "${channel.name}"?`)) {
			channelsData = channelsData.filter((c) => c.id !== channel.id);
		}
	}

	const regionActions = [
		{
			label: 'Edit',
			onClick: handleEditRegion,
			variant: 'default' as const
		},
		{
			label: 'Delete',
			onClick: handleDeleteRegion,
			variant: 'danger' as const
		}
	];

	const channelActions = [
		{
			label: 'Edit',
			onClick: handleEditChannel,
			variant: 'default' as const
		},
		{
			label: 'Delete',
			onClick: handleDeleteChannel,
			variant: 'danger' as const
		}
	];
</script>

<main class="m-10">
	<div class="my-6 flex flex-col gap-2">
		<h1 class="text-3xl font-semibold">Settings</h1>
		<p class="text-sm text-gray-500">Manage settings related to your business here</p>
	</div>

	<!-- Tab Navigation -->
	<div class="mb-6">
		<div class="border-b border-neutral-200">
			<nav class="-mb-px flex gap-8">
				<button
					class={`border-b-2 px-1 py-2 text-sm font-medium transition-colors ${
						activeTab === 'regions'
							? 'border-primary-500 text-primary-600'
							: 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
					}`}
					onclick={() => (activeTab = 'regions')}
				>
					Regions & Tax Rates
				</button>
				<button
					class={`border-b-2 px-1 py-2 text-sm font-medium transition-colors ${
						activeTab === 'channels'
							? 'border-primary-500 text-primary-600'
							: 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
					}`}
					onclick={() => (activeTab = 'channels')}
				>
					Sales Channels
				</button>
			</nav>
		</div>
	</div>

	{#if activeTab === 'regions'}
		<!-- Regions Section -->
		<div class="space-y-6">
			<div class="flex items-center justify-between">
				<div>
					<h2 class="text-xl font-semibold text-neutral-900">Regions & Tax Rates</h2>
					<p class="mt-1 text-sm text-neutral-600">
						Configure geographical regions and their tax settings
					</p>
				</div>
				<button
					class="rounded-lg bg-primary-600 px-6 py-2 font-medium text-white shadow-md transition-colors hover:bg-primary-700 hover:shadow-lg"
					onclick={() => (showRegionModal = true)}
				>
					+ Add Region
				</button>
			</div>

			{#await regionsPromise}
				<div class="py-8 text-center text-neutral-500">Loading regions...</div>
			{:then data}
				<DataTable
					data={data.edges.map((edge: any) => edge.node)}
					columns={regionColumns}
					rowActions={regionActions}
					keyFn={(region) => region.id}
				/>
			{:catch error}
				<p class="text-red-500">Error loading regions: {error.message}</p>
			{/await}
		</div>
	{:else}
		<!-- Channels Section -->
		<div class="space-y-6">
			<div class="flex items-center justify-between">
				<div>
					<h2 class="text-xl font-semibold text-neutral-900">Sales Channels</h2>
					<p class="mt-1 text-sm text-neutral-600">
						Manage your different sales channels and their configurations
					</p>
				</div>
				<button
					class="rounded-lg bg-primary-600 px-6 py-2 font-medium text-white shadow-md transition-colors hover:bg-primary-700 hover:shadow-lg"
					onclick={() => (showChannelModal = true)}
				>
					+ Add Channel
				</button>
			</div>

			{#await channelPromise}
				<div class="py-8 text-center text-neutral-500">Loading channels...</div>
			{:then data}
				<DataTable
					data={data.edges.map((edge: any) => edge.node)}
					columns={channelColumns}
					rowActions={channelActions}
					keyFn={(channel) => channel.id}
				/>
			{:catch error}
				<p class="text-red-500">Error loading channels: {error.message}</p>
			{/await}
		</div>
	{/if}

	<!-- Region Modal -->
	{#if showRegionModal}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
			<div class="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
				<h3 class="mb-6 text-lg font-semibold">Add New Region</h3>

				<form {...createRegion} class="space-y-4">
					<!-- Region Name -->
					<div>
						<label for="regionName" class="mb-2 block text-sm font-medium text-neutral-700">
							Region Name <span class="text-red-500">*</span>
						</label>
						<input
							{...createRegion.fields.name.as('text')}
							placeholder="e.g., North America, Europe"
							class="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500 focus:outline-none"
							required
						/>
						{#each createRegion.fields.name.issues() as issue}
							<p class="mt-1 text-sm text-red-500">{issue.message}</p>
						{/each}
					</div>

					<!-- Country Codes -->
					<div>
						<label class="mb-2 block text-sm font-medium text-neutral-700" for="countryCodes">
							Country Codes <span class="text-red-500">*</span>
						</label>

						<!-- Selected Countries -->
						{#if selectedCountries.length > 0}
							<div class="mb-2 flex flex-wrap gap-2">
								{#each selectedCountries as country}
									<span
										class="inline-flex items-center rounded-md bg-primary-50 px-2.5 py-1.5 text-sm text-primary-700"
									>
										{country}
										<button
											type="button"
											class="ml-1 text-primary-500 hover:text-primary-700"
											onclick={() => removeCountry(country)}
										>
											×
										</button>
									</span>
								{/each}
							</div>
						{/if}

						<!-- Hidden input to submit selected countries -->
						<select
							{...createRegion.fields.countryCodes.as('select multiple')}
							multiple
							style="display: none;"
						>
							{#each selectedCountries as country}
								<option value={country} selected>{country}</option>
							{/each}
						</select>
						{#each createRegion.fields.countryCodes.issues() as issue}
							<p class="mt-1 text-sm text-red-500">{issue.message}</p>
						{/each}

						<!-- Country Search Input -->
						<div class="relative">
							<input
								type="text"
								placeholder="Search and select country codes..."
								class="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500 focus:outline-none"
								bind:value={countrySearchTerm}
								onfocus={() => (showCountryDropdown = true)}
								onblur={() => setTimeout(() => (showCountryDropdown = false), 150)}
							/>

							<!-- Dropdown -->
							{#if showCountryDropdown && (countrySearchTerm || filteredCountries.length > 0)}
								<div
									class="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-neutral-300 bg-white shadow-lg"
								>
									{#if filteredCountries.length > 0}
										{#each filteredCountries.slice(0, 10) as country}
											<button
												type="button"
												class="w-full px-3 py-2 text-left text-sm hover:bg-neutral-50"
												onclick={() => addCountry(country)}
											>
												{country}
											</button>
										{/each}
									{:else if countrySearchTerm}
										<div class="px-3 py-2 text-sm text-neutral-500">
											No countries found matching "{countrySearchTerm}"
										</div>
									{:else}
										{#each COMMON_COUNTRY_CODES.slice(0, 10) as country}
											{#if !selectedCountries.includes(country)}
												<button
													type="button"
													class="w-full px-3 py-2 text-left text-sm hover:bg-neutral-50"
													onclick={() => addCountry(country)}
												>
													{country}
												</button>
											{/if}
										{/each}
									{/if}
								</div>
							{/if}
						</div>

						<p class="mt-1 text-xs text-neutral-500">
							Search and select from predefined country codes (e.g., US, CA, GB)
						</p>
					</div>

					<!-- Tax Rate -->
					<div>
						<label for="taxRate" class="mb-2 block text-sm font-medium text-neutral-700">
							Tax Rate (%) <span class="text-red-500">*</span>
						</label>
						<input
							{...createRegion.fields.taxRate.as('number')}
							step="0.01"
							min="0"
							max="100"
							placeholder="e.g., 8.25"
							class="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500 focus:outline-none"
							required
						/>
						{#each createRegion.fields.taxRate.issues() as issue}
							<p class="mt-1 text-sm text-red-500">{issue.message}</p>
						{/each}
					</div>

					<!-- Tax Code -->
					<div>
						<label for="taxCode" class="mb-2 block text-sm font-medium text-neutral-700">
							Tax Code (Optional)
						</label>
						<input
							{...createRegion.fields.taxCode.as('text')}
							placeholder="e.g., VAT, GST, SALES_TAX"
							class="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500 focus:outline-none"
						/>
						{#each createRegion.fields.taxCode.issues() as issue}
							<p class="mt-1 text-sm text-red-500">{issue.message}</p>
						{/each}

						<p class="mt-1 text-xs text-neutral-500">
							Optional identifier for the tax type (e.g., VAT, GST)
						</p>
					</div>

					<!-- Form Actions -->
					<div class="flex justify-end gap-3 pt-4">
						<button
							type="button"
							class="px-4 py-2 text-neutral-600 transition-colors hover:text-neutral-800"
							onclick={() => (showRegionModal = false)}
						>
							Cancel
						</button>
						<button
							type="submit"
							class="rounded-lg bg-primary-600 px-6 py-2 text-white shadow-md transition-colors hover:bg-primary-700 hover:shadow-lg"
						>
							Create Region
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	<!-- Channel Modal -->
	{#if showChannelModal}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
			<div class="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
				<h3 class="mb-6 text-lg font-semibold">Add New Channel</h3>

				<form class="space-y-4">
					<!-- Channel Name -->
					<div>
						<label for="channelName" class="mb-2 block text-sm font-medium text-neutral-700">
							Channel Name <span class="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="channelName"
							name="name"
							placeholder="e.g., Main Store, US Store"
							class="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500 focus:outline-none"
							required
						/>
					</div>

					<!-- Channel Slug -->
					<div>
						<label for="channelSlug" class="mb-2 block text-sm font-medium text-neutral-700">
							Slug <span class="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="channelSlug"
							name="slug"
							placeholder="e.g., main-store, us-store"
							class="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500 focus:outline-none"
							required
						/>
						<p class="mt-1 text-xs text-neutral-500">
							URL-friendly identifier (lowercase, numbers, hyphens only)
						</p>
					</div>

					<!-- Region Selection -->
					<div>
						<label for="regionSelect" class="mb-2 block text-sm font-medium text-neutral-700">
							Region <span class="text-red-500">*</span>
						</label>
						<select
							id="regionSelect"
							name="regionId"
							class="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500 focus:outline-none"
							required
						>
							<option value="">Select a region</option>
							{#await regionsPromise then data}
								{#each data.edges as edge}
									<option value={edge.node.id}>{edge.node.name}</option>
								{/each}
							{/await}
						</select>
					</div>

					<!-- Currency -->
					<div>
						<label for="currencySelect" class="mb-2 block text-sm font-medium text-neutral-700">
							Currency <span class="text-red-500">*</span>
						</label>
						<select
							id="currencySelect"
							name="currencyCode"
							class="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500 focus:outline-none"
							required
						>
							<option value="">Select currency</option>
							{#each COMMON_CURRENCIES as currency}
								<option value={currency.code}>{currency.code} - {currency.name}</option>
							{/each}
						</select>
					</div>

					<!-- Tax Inclusive -->
					<div>
						<label class="flex items-center gap-3">
							<input
								type="checkbox"
								name="taxInclusive"
								class="rounded border-neutral-300 text-primary-600 focus:ring-2 focus:ring-primary-500"
							/>
							<span class="text-sm font-medium text-neutral-700">Tax Inclusive Pricing</span>
						</label>
						<p class="mt-1 text-xs text-neutral-500">
							Check if prices include tax (e.g., VAT included in price)
						</p>
					</div>

					<!-- Default Language -->
					<div>
						<label for="languageSelect" class="mb-2 block text-sm font-medium text-neutral-700">
							Default Language (Optional)
						</label>
						<select
							id="languageSelect"
							name="defaultLanguage"
							class="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary-500 focus:outline-none"
						>
							<option value="">Select language</option>
							{#each COMMON_LANGUAGES as language}
								<option value={language.code}>{language.name} ({language.code})</option>
							{/each}
						</select>
					</div>

					<!-- Form Actions -->
					<div class="flex justify-end gap-3 pt-4">
						<button
							type="button"
							class="px-4 py-2 text-neutral-600 transition-colors hover:text-neutral-800"
							onclick={() => (showChannelModal = false)}
						>
							Cancel
						</button>
						<button
							type="submit"
							class="rounded-lg bg-primary-600 px-6 py-2 text-white shadow-md transition-colors hover:bg-primary-700 hover:shadow-lg"
						>
							Create Channel
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
</main>
