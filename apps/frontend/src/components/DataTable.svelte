<script lang="ts">
	import type { Snippet } from 'svelte';
	import DropdownMenu from './DropdownMenu.svelte';

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
		variant?: 'default' | 'danger';
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

	function getDropdownMenuItems<T extends object>(item: T, actions: RowAction<T>[]) {
		return actions.map((action) => ({
			label: action.label,
			icon: action.icon,
			variant: action.variant || 'default',
			onClick: () => action.onClick(item),
			disabled: false
		}));
	}
</script>

<div class="w-full overflow-x-auto rounded-2xl bg-white">
	{#if isLoading}
		<div class="flex items-center justify-center py-8">
			<div class="text-neutral-500">Loading...</div>
		</div>
	{:else if data.length === 0}
		<div class="flex items-center justify-center py-8">
			<div class="text-neutral-500">{emptyMessage}</div>
		</div>
	{:else}
		<table class="w-full border-collapse">
			<!-- Header -->
			<thead>
				<tr class=" bg-primary-50">
					{#each columns as column (column.id)}
						<th
							class={`px-6 py-4 text-left text-sm font-semibold text-neutral-800 ${column.width ? `w-${column.width}` : ''}`}
						>
							{#if column.sortable}
								<button
									class="flex items-center gap-2 transition-colors hover:text-primary-600"
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
						<th class="px-6 py-4 text-left text-sm font-semibold text-neutral-800">Actions</th>
					{/if}
				</tr>
			</thead>

			<!-- Body -->
			<tbody>
				{#each data as item, index (getRowKey(item, index))}
					<tr class="border-b border-neutral-200 transition-colors hover:bg-neutral-50">
						{#each columns as column (column.id)}
							<td
								class={`px-6 py-4 text-sm text-neutral-700 ${column.id === 'image' ? 'flex items-center justify-center' : ''}`}
							>
								{#if column.render}
									{@render column.render(item)}
								{:else if column.id === 'image'}
									<div
										class="flex h-16 w-16 items-center justify-center rounded-lg border border-neutral-300 bg-neutral-200"
									>
										<svg
											class="h-8 w-8 text-neutral-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
											></path>
										</svg>
									</div>
								{:else}
									{getCellValue(item, column)}
								{/if}
							</td>
						{/each}
						{#if rowActions.length > 0}
							<td class="px-6 py-4 text-sm">
								<DropdownMenu
									items={getDropdownMenuItems(item as any, rowActions)}
									triggerLabel="⋯"
								/>
							</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>

		<!-- Pagination Controls -->
		{#if pagination}
			<div
				class="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-6 py-3"
			>
				<div class="text-sm text-neutral-600">
					{pagination.currentPage && pagination.pageSize
						? `Page ${pagination.currentPage} · ${pagination.pageSize} items per page`
						: `Total: ${pagination.totalCount} items`}
				</div>
				<div class="flex gap-2">
					<button
						class="rounded border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
						onclick={handlePrevPage}
						disabled={!pagination.hasPreviousPage || isLoading}
					>
						← Previous
					</button>
					<button
						class="rounded border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
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
