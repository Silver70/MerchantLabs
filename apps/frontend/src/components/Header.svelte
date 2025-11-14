<script lang="ts">
	

	interface HeaderProps {
		isCollapsed: boolean;
		onToggleSidebar: () => void;
	}

	let { isCollapsed, onToggleSidebar }: HeaderProps = $props();
</script>

<!-- Header Container -->
<header
	class="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 transition-all duration-300"
>
	<!-- Toggle Button -->
	<button
		onclick={onToggleSidebar}
		class="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 transition-colors hover:bg-orange-50 hover:text-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-0 focus:outline-none"
		aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
	>
		<svg
			class={`h-5 w-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
	</button>
</header>
