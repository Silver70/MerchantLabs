


<script lang="ts">
	import DataTable from '../../components/DataTable.svelte';
	
	// Mock data for now - replace with actual GraphQL queries
	let regionsData = $state([
		{
			id: '1',
			name: 'North America',
			countryCodes: ['US', 'CA'],
			taxRate: 8.25,
			taxCode: 'NA_TAX',
			createdAt: '2023-01-15',
			updatedAt: '2023-01-15'
		},
		{
			id: '2',
			name: 'Europe',
			countryCodes: ['DE', 'FR', 'ES', 'IT'],
			taxRate: 19.0,
			taxCode: 'EU_VAT',
			createdAt: '2023-01-15',
			updatedAt: '2023-01-15'
		}
	]);

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
			accessor: (region: any) => region.countryCodes.join(', '),
		},
		{
			id: 'taxRate',
			label: 'Tax Rate',
			accessor: (region: any) => `${region.taxRate}%`,
		},
		{
			id: 'taxCode',
			label: 'Tax Code',
			accessor: (region: any) => region.taxCode || 'N/A',
		},
		{
			id: 'updatedAt',
			label: 'Last Updated',
			accessor: (region: any) => new Date(region.updatedAt).toLocaleDateString(),
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
			accessor: (channel: any) => channel.slug,
		},
		{
			id: 'region',
			label: 'Region',
			accessor: (channel: any) => channel.region,
		},
		{
			id: 'currency',
			label: 'Currency',
			accessor: (channel: any) => channel.currencyCode,
		},
		{
			id: 'taxInclusive',
			label: 'Tax Inclusive',
			accessor: (channel: any) => channel.taxInclusive ? 'Yes' : 'No',
		},
		{
			id: 'status',
			label: 'Status',
			accessor: (channel: any) => channel.isActive ? 'Active' : 'Inactive',
		}
	];

	// Action handlers
	function handleEditRegion(region: any) {
		console.log('Edit region:', region);
	}

	function handleDeleteRegion(region: any) {
		if (confirm(`Are you sure you want to delete the region "${region.name}"?`)) {
			regionsData = regionsData.filter(r => r.id !== region.id);
		}
	}

	function handleEditChannel(channel: any) {
		console.log('Edit channel:', channel);
	}

	function handleDeleteChannel(channel: any) {
		if (confirm(`Are you sure you want to delete the channel "${channel.name}"?`)) {
			channelsData = channelsData.filter(c => c.id !== channel.id);
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
    <div class="flex flex-col gap-2 my-6">
		<h1 class="text-3xl font-semibold">Settings</h1>
		<p class="text-gray-500 text-sm">Manage settings related to your business here</p>
	</div>

	<!-- Tab Navigation -->
	<div class="mb-6">
		<div class="border-b border-neutral-200">
			<nav class="-mb-px flex gap-8">
				<button
					class={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
						activeTab === 'regions'
							? 'border-primary-500 text-primary-600'
							: 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
					}`}
					onclick={() => activeTab = 'regions'}
				>
					Regions & Tax Rates
				</button>
				<button
					class={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
						activeTab === 'channels'
							? 'border-primary-500 text-primary-600'
							: 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
					}`}
					onclick={() => activeTab = 'channels'}
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
					<p class="text-sm text-neutral-600 mt-1">Configure geographical regions and their tax settings</p>
				</div>
				<button
					class="rounded-lg bg-primary-600 px-6 py-2 font-medium text-white shadow-md transition-colors hover:bg-primary-700 hover:shadow-lg"
					onclick={() => showRegionModal = true}
				>
					+ Add Region
				</button>
			</div>

			<DataTable
				data={regionsData}
				columns={regionColumns}
				rowActions={regionActions}
				keyFn={(region) => region.id}
			/>
		</div>
	{:else}
		<!-- Channels Section -->
		<div class="space-y-6">
			<div class="flex items-center justify-between">
				<div>
					<h2 class="text-xl font-semibold text-neutral-900">Sales Channels</h2>
					<p class="text-sm text-neutral-600 mt-1">Manage your different sales channels and their configurations</p>
				</div>
				<button
					class="rounded-lg bg-primary-600 px-6 py-2 font-medium text-white shadow-md transition-colors hover:bg-primary-700 hover:shadow-lg"
					onclick={() => showChannelModal = true}
				>
					+ Add Channel
				</button>
			</div>

			<DataTable
				data={channelsData}
				columns={channelColumns}
				rowActions={channelActions}
				keyFn={(channel) => channel.id}
			/>
		</div>
	{/if}

	<!-- Region Modal (placeholder) -->
	{#if showRegionModal}
		<div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
			<div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
				<h3 class="text-lg font-semibold mb-4">Add New Region</h3>
				<p class="text-neutral-600 mb-6">Region creation form will be implemented here.</p>
				<div class="flex gap-3 justify-end">
					<button
						class="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
						onclick={() => showRegionModal = false}
					>
						Cancel
					</button>
					<button
						class="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
						onclick={() => showRegionModal = false}
					>
						Create Region
					</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- Channel Modal (placeholder) -->
	{#if showChannelModal}
		<div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
			<div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
				<h3 class="text-lg font-semibold mb-4">Add New Channel</h3>
				<p class="text-neutral-600 mb-6">Channel creation form will be implemented here.</p>
				<div class="flex gap-3 justify-end">
					<button
						class="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
						onclick={() => showChannelModal = false}
					>
						Cancel
					</button>
					<button
						class="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
						onclick={() => showChannelModal = false}
					>
						Create Channel
					</button>
				</div>
			</div>
		</div>
	{/if}
</main>