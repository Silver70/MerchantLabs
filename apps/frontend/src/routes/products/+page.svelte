<script lang="ts">
    import { getAllProducts } from './data.remote';

    let productsPromise = getAllProducts();
</script>

<div class="m-10">
    <h1 class="text-2xl font-bold text-amber-300">Products</h1>
    {#await productsPromise}
        <p>Loading products...</p>
    {:then products}
        {#each products.edges as { node, cursor } (cursor)}
            <div class="mb-4 p-4 border rounded">
                <h2 class="text-xl font-semibold">{node.name}</h2>
                <p class="text-gray-600">{node.description}</p>
                <div class="mt-2 text-sm text-gray-500">
                    <p>SKU: {node.sku ?? 'N/A'}</p>
                    <p>Status: {node.isActive ? 'Active' : 'Inactive'}</p>
                </div>
            </div>
        {/each}
    {:catch error}
        <p class="text-red-500">Error loading products: {error.message}</p>
    {/await}
</div>