<script lang="ts">
	interface FilterOption {
		id: string;
		label: string;
		count?: number;
	}

	interface Props {
		filters: FilterOption[];
		activeFilters?: string[];
		onFilterChange?: (filterId: string, active: boolean) => void;
		clearFiltersLabel?: string;
	}

	let { filters = [], activeFilters = [], onFilterChange, clearFiltersLabel = 'Clear all' }: Props =
		$props();

	function handleFilterClick(filterId: string) {
		const isActive = activeFilters.includes(filterId);
		onFilterChange?.(filterId, !isActive);
	}

	function handleClearFilters() {
		activeFilters.forEach((filterId) => {
			onFilterChange?.(filterId, false);
		});
	}

	function isFilterActive(filterId: string) {
		return activeFilters.includes(filterId);
	}
</script>

<div class="flex flex-wrap items-center gap-2 mb-6">
	{#each filters as filter (filter.id)}
		<button
			class={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
				isFilterActive(filter.id)
					? 'bg-primary-600 text-white shadow-md'
					: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
			}`}
			onclick={() => handleFilterClick(filter.id)}
		>
			<span>{filter.label}</span>
			{#if filter.count !== undefined}
				<span class="ml-2 text-xs opacity-75">({filter.count})</span>
			{/if}
		</button>
	{/each}

	{#if activeFilters.length > 0}
		<button
			class="ml-2 px-3 py-2 text-sm text-neutral-600 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
			onclick={handleClearFilters}
			title={clearFiltersLabel}
		>
			✕ {clearFiltersLabel}
		</button>
	{/if}
</div>

<style lang="postcss">
	/* Optional: Add smooth transitions */
	button {
		@apply transition-all duration-200;
	}
</style>
