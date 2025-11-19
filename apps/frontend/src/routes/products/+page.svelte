<script lang="ts">
	import ProductTable from '../../components/ProductTable.svelte';
	import { getAllProducts } from './data.remote';

	let productsPromise = getAllProducts();
	let isLoading = $state(false);
	console.log(await productsPromise);
	async function handleSort(columnId: string, direction: 'asc' | 'desc') {
		// You can implement sorting logic here if needed
		// For now, this is a placeholder for backend integration
		console.log(`Sorting by ${columnId} in ${direction} order`);
	}

	async function handlePaginationChange(cursor: string | null, direction: 'next' | 'prev') {
		isLoading = true;
		try {
			// Implement pagination with cursor-based fetching
			// const newProducts = await getAllProducts({ first: 20, after: cursor });
			// Update the products data
			console.log(`Paginating ${direction} with cursor: ${cursor}`);
		} finally {
			isLoading = false;
		}
	}

	function handleFilterChange(filterId: string, active: boolean) {
		console.log(`Filter ${filterId} is ${active ? 'enabled' : 'disabled'}`);
		// Implement filtering logic here
		// You can send filter params to your backend GraphQL query
	}

	function handleEdit(product: any) {
		console.log('Edit product:', product);
		// Navigate to edit page or open edit modal
	}

	function handleDelete(product: any) {
		if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
			console.log('Delete product:', product);
			// Implement delete logic
		}
	}

	function handleView(product: any) {
		console.log('View product:', product);
		// Navigate to product details page
	}
</script>

<div class="m-10">
	<div class="mb-6 flex items-center justify-between">
		<div class="flex flex-col gap-2">
			<h1 class="text-3xl font-semibold">Products</h1>
			<p class="text-gray-500 text-sm">Manage All your products here</p>
		</div>
		<button
			class="rounded-lg bg-orange-600 px-6 py-2 font-medium text-white shadow-md transition-colors hover:bg-orange-700 hover:shadow-lg"
			onclick={() => {
				console.log('Navigate to add product page');
				// Navigate to /products/new or open a modal
			}}
		>
			+ Add Products
		</button>
	</div>
	{#await productsPromise}
		<div class="py-8 text-center text-gray-500">Loading products...</div>
	{:then data}
		<ProductTable
			products={data.edges.map((edge: any) => edge.node)}
			{isLoading}
			pagination={{
				currentPage: 1,
				pageSize: 20,
				totalCount: data.pageInfo.totalCount,
				hasNextPage: data.pageInfo.hasNextPage,
				hasPreviousPage: data.pageInfo.hasPreviousPage,
				startCursor: data.pageInfo.startCursor,
				endCursor: data.pageInfo.endCursor
			}}
			onSort={handleSort}
			onPaginationChange={handlePaginationChange}
			onFilterChange={handleFilterChange}
			onEdit={handleEdit}
			onDelete={handleDelete}
			onView={handleView}
		/>
	{:catch error}
		<p class="text-red-500">Error loading products: {error.message}</p>
	{/await}
</div>
