<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '../components/Header.svelte';
	import Sidebar from '../components/Sidebar.svelte';

	let { children } = $props();

	let isCollapsed = $state(false);

	const handleToggleSidebar = () => {
		isCollapsed = !isCollapsed;
	};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex h-screen flex-col">
	<!-- Main Content Area -->
	<div class="flex flex-1 overflow-hidden">
		<!-- Sidebar -->
		<Sidebar bind:isCollapsed onToggleCollapse={handleToggleSidebar} />

		<!-- Right Section: Header + Page Content -->
		<div class="flex flex-1 flex-col overflow-hidden">
			<!-- Header -->
			<Header {isCollapsed} onToggleSidebar={handleToggleSidebar} />

			<!-- Page Content -->
			<main class="flex-1 overflow-y-auto bg-neutral-50">
				{@render children()}
			</main>
		</div>
	</div>
</div>
