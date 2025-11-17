<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ColumnDef<T> {
		id: string;
		label: string;
		accessor?: (item: T) => string | number | boolean | null;
		width?: string;
		sortable?: boolean;
		render?: Snippet<[T]>;
	}

	interface RowAction<T> {
		label: string;
		icon?: string;
		onClick: (item: T) => void;
		variant?: 'primary' | 'secondary' | 'danger';
	}

	interface PaginationState {
		currentPage: number;
		pageSize: number;
		totalCount: number;
		hasNextPage?: boolean;
		hasPreviousPage?: boolean;
		startCursor?: string;
		endCursor?: string;
	}

	interface Props<T> {
		data: T[];
		columns: ColumnDef<T>[];
		rowActions?: RowAction<T>[];
		pagination?: PaginationState;
		onSort?: (columnId: string, direction: 'asc' | 'desc') => void;
		onPageChange?: (page: number) => void;
		onPaginationChange?: (cursor: string | null, direction: 'next' | 'prev') => void;
		isLoading?: boolean;
		emptyMessage?: string;
		keyFn?: (item: T, index: number) => string | number;
	}

	type T = $$Generic;

	let {
		data = [],
		columns = [],
		rowActions = [],
		pagination,
		onSort,
		onPageChange,
		onPaginationChange,
		isLoading = false,
		emptyMessage = 'No data available',
		keyFn = (_, index) => index
	}: Props<T> = $props();

	let sortColumn = $state<string | null>(null);
	let sortDirection = $state<'asc' | 'desc'>('asc');

	function handleSort(columnId: string) {
		const column = columns.find((c) => c.id === columnId);
		if (!column?.sortable) return;

		if (sortColumn === columnId) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn = columnId;
			sortDirection = 'asc';
		}

		onSort?.(columnId, sortDirection);
	}

	function handleNextPage() {
		if (pagination?.hasNextPage && pagination?.endCursor) {
			onPaginationChange?.(pagination.endCursor, 'next');
		}
	}

	function handlePrevPage() {
		if (pagination?.hasPreviousPage && pagination?.startCursor) {
			onPaginationChange?.(pagination.startCursor, 'prev');
		}
	}

	function getCellValue(item: T, column: ColumnDef<T>): string {
		if (column.accessor) {
			const value = column.accessor(item);
			return String(value ?? '');
		}
		return '';
	}

	function getRowKey(item: T, index: number): string | number {
		return keyFn(item, index);
	}

	function getActionButtonClasses(variant: string) {
		const baseClasses = 'px-3 py-1 text-sm rounded transition-colors';
		const variants = {
			primary: 'bg-orange-600 text-white hover:bg-orange-700',
			secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
			danger: 'bg-red-600 text-white hover:bg-red-700'
		};
		return `${baseClasses} ${variants[variant as keyof typeof variants] || variants.secondary}`;
	}
</script>

<div class="w-full overflow-x-auto">
	{#if isLoading}
		<div class="flex items-center justify-center py-8">
			<div class="text-gray-500">Loading...</div>
		</div>
	{:else if data.length === 0}
		<div class="flex items-center justify-center py-8">
			<div class="text-gray-500">{emptyMessage}</div>
		</div>
	{:else}
		<table class="w-full border-collapse">
			<!-- Header -->
			<thead>
				<tr class="border-b border-gray-200 bg-gray-50">
					{#each columns as column (column.id)}
						<th
							class={`px-6 py-3 text-left text-sm font-semibold text-gray-700 ${column.width ? `w-${column.width}` : ''}`}
						>
							{#if column.sortable}
								<button
									class="flex items-center gap-2 hover:text-orange-600 transition-colors"
									onclick={() => handleSort(column.id)}
								>
									<span>{column.label}</span>
									{#if sortColumn === column.id}
										<span class="text-xs">
											{sortDirection === 'asc' ? '↑' : '↓'}
										</span>
									{/if}
								</button>
							{:else}
								{column.label}
							{/if}
						</th>
					{/each}
					{#if rowActions.length > 0}
						<th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
					{/if}
				</tr>
			</thead>

			<!-- Body -->
			<tbody>
				{#each data as item, index (getRowKey(item, index))}
					<tr class="border-b border-gray-200 hover:bg-gray-50 transition-colors">
						{#each columns as column (column.id)}
							<td class="px-6 py-4 text-sm text-gray-700">
								{#if column.render}
									{@render column.render(item)}
								{:else}
									{getCellValue(item, column)}
								{/if}
							</td>
						{/each}
						{#if rowActions.length > 0}
							<td class="px-6 py-4 text-sm">
								<div class="flex gap-2">
									{#each rowActions as action (action.label)}
										<button
											class={getActionButtonClasses(action.variant || 'secondary')}
											onclick={() => action.onClick(item)}
											title={action.label}
										>
											{#if action.icon}
												<span>{action.icon}</span>
											{/if}
											{action.label}
										</button>
									{/each}
								</div>
							</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>

		<!-- Pagination Controls -->
		{#if pagination}
			<div class="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-3">
				<div class="text-sm text-gray-600">
					{pagination.currentPage && pagination.pageSize
						? `Page ${pagination.currentPage} · ${pagination.pageSize} items per page`
						: `Total: ${pagination.totalCount} items`}
				</div>
				<div class="flex gap-2">
					<button
						class="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						onclick={handlePrevPage}
						disabled={!pagination.hasPreviousPage || isLoading}
					>
						← Previous
					</button>
					<button
						class="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						onclick={handleNextPage}
						disabled={!pagination.hasNextPage || isLoading}
					>
						Next →
					</button>
				</div>
			</div>
		{/if}
	{/if}
</div>

<style lang="postcss">
	:global(table) {
		@apply w-full;
	}
</style>
