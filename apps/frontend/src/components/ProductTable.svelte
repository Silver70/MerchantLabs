<script lang="ts">
	import DataTable from './DataTable.svelte';
	import FilterBar from './FilterBar.svelte';

	interface ProductVariant {
		id: string;
		sku: string;
		quantityInStock: number;
		attributes: Array<{
			id: string;
			attributeId: string;
			value: string;
		}>;
	}

	interface ProductCategory {
		id: string;
		name: string;
		slug: string;
	}

	interface Product {
		id: string;
		name: string;
		slug: string;
		description: string;
		category: ProductCategory;
		variants: ProductVariant[];
		isActive: boolean;
		createdAt: string;
		updatedAt: string;
	}

	interface Props {
		products: Product[];
		isLoading?: boolean;
		pagination?: {
			currentPage: number;
			pageSize: number;
			totalCount: number;
			hasNextPage: boolean;
			hasPreviousPage: boolean;
			startCursor?: string;
			endCursor?: string;
		};
		onEdit?: (product: Product) => void;
		onDelete?: (product: Product) => void;
		onView?: (product: Product) => void;
		onSort?: (columnId: string, direction: 'asc' | 'desc') => void;
		onPaginationChange?: (cursor: string | null, direction: 'next' | 'prev') => void;
		onFilterChange?: (filterId: string, active: boolean) => void;
	}

	let { products = [], isLoading = false, pagination, onEdit, onDelete, onView, onSort, onPaginationChange, onFilterChange }: Props =
		$props();

	let activeFilters = $state<string[]>(['all']);

	const columns = [
		{
			id: 'name',
			label: 'Product Name',
			accessor: (product: Product) => product.name,
			sortable: true,
			width: '300px'
		},
		{
			id: 'category',
			label: 'Category',
			accessor: (product: Product) => product.category.name,
			sortable: true
		},
		{
			id: 'variants',
			label: 'SKU',
			accessor: (product: Product) => product.variants[0]?.sku ?? 'N/A',
			sortable: false
		},
		{
			id: 'stock',
			label: 'Stock',
			accessor: (product: Product) => product.variants[0]?.quantityInStock ?? 0,
			sortable: false
		},
		{
			id: 'status',
			label: 'Status',
			sortable: true,
			accessor: (product: Product) => product.isActive ? 'Active' : 'Inactive'
		},
		{
			id: 'updated',
			label: 'Updated',
			accessor: (product: Product) => {
				const date = new Date(product.updatedAt);
				return date.toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'short',
					day: 'numeric'
				});
			},
			sortable: true
		}
	];

	const rowActions = [
		...(onView ? [{ label: 'View', onClick: onView, variant: 'default' as const }] : []),
		...(onEdit ? [{ label: 'Edit', onClick: onEdit, variant: 'default' as const }] : []),
		...(onDelete ? [{ label: 'Delete', onClick: onDelete, variant: 'danger' as const }] : [])
	];
</script>

<div>
	<FilterBar
		filters={[
			{ id: 'all', label: 'All Products', count: products.length },
			{ id: 'active', label: 'Active', count: products.filter((p) => p.isActive).length },
			{ id: 'inactive', label: 'Inactive', count: products.filter((p) => !p.isActive).length },
			{ id: 'in-stock', label: 'In Stock', count: products.filter((p) => (p.variants[0]?.quantityInStock ?? 0) > 0).length },
			{ id: 'low-stock', label: 'Low Stock', count: products.filter((p) => (p.variants[0]?.quantityInStock ?? 0) > 0 && (p.variants[0]?.quantityInStock ?? 0) <= 10).length }
		]}
		activeFilters={activeFilters}
		onFilterChange={(filterId, active) => {
			if (active) {
				activeFilters = [...activeFilters, filterId];
			} else {
				activeFilters = activeFilters.filter((f) => f !== filterId);
			}
			onFilterChange?.(filterId, active);
		}}
	/>
	<DataTable
		data={products}
		{columns}
		rowActions={rowActions.length > 0 ? rowActions : undefined}
		{pagination}
		{isLoading}
		emptyMessage="No products found"
		{onSort}
		onPaginationChange={onPaginationChange}
		keyFn={(product) => product.id}
	/>
</div>
