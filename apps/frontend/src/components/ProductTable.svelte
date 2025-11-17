<script lang="ts">
	import DataTable from './DataTable.svelte';
	import type { Snippet } from 'svelte';

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
	}

	let { products = [], isLoading = false, pagination, onEdit, onDelete, onView, onSort, onPaginationChange }: Props =
		$props();

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
			render: (product: Product) => {
				const statusClasses = product.isActive
					? 'bg-green-100 text-green-800'
					: 'bg-red-100 text-red-800';
				return `<span class="inline-block px-3 py-1 rounded-full text-sm font-medium ${statusClasses}">
					${product.isActive ? 'Active' : 'Inactive'}
				</span>`;
			}
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
		...(onView ? [{ label: 'View', onClick: onView, variant: 'secondary' as const }] : []),
		...(onEdit ? [{ label: 'Edit', onClick: onEdit, variant: 'primary' as const }] : []),
		...(onDelete ? [{ label: 'Delete', onClick: onDelete, variant: 'danger' as const }] : [])
	];
</script>

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
