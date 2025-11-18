<script lang="ts">
	

	interface HeaderProps {
		isCollapsed: boolean;
		onToggleSidebar: () => void;
	}

	let { isCollapsed, onToggleSidebar }: HeaderProps = $props();
</script>

<!-- Header Container -->
<header
	class="flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-6 transition-all duration-300"
>
	<!-- Left Section: Toggle Button + Search -->
	<div class="flex items-center gap-4">
		<!-- Toggle Button -->
		<button
			onclick={onToggleSidebar}
			class="inline-flex items-center justify-center rounded-lg p-2 text-neutral-600 transition-colors hover:bg-primary-50 hover:text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 focus:outline-none"
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

		<!-- Search Bar -->
		<div class="relative hidden w-80 md:block">
			<input
				type="text"
				placeholder="Search..."
				class="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 pl-10 text-sm transition-colors placeholder-neutral-400 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-500"
			/>
			<svg
				class="absolute left-3 top-2.5 h-4 w-4 text-neutral-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		</div>
	</div>

	<!-- Right Section: Notifications, Messages, Avatar -->
	<div class="flex items-center gap-2">
		<!-- Notifications Bell -->
		<button
			class="relative inline-flex items-center justify-center rounded-lg p-2 text-neutral-600 transition-colors hover:bg-primary-50 hover:text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 focus:outline-none"
			aria-label="Notifications"
		>
			<svg
				class="h-5 w-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
				/>
			</svg>
			<!-- Notification Badge -->
			<span
				class="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white"
			>
				3
			</span>
		</button>

		<!-- Messages -->
		<button
			class="relative inline-flex items-center justify-center rounded-lg p-2 text-neutral-600 transition-colors hover:bg-primary-50 hover:text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 focus:outline-none"
			aria-label="Messages"
		>
			<svg
				class="h-5 w-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
				/>
			</svg>
			<!-- Message Badge -->
			<span
				class="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs font-semibold text-white"
			>
				2
			</span>
		</button>

		<!-- Divider -->
		<div class="mx-2 h-6 border-l border-neutral-200"></div>

		<!-- User Avatar -->
		<button
			class="inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-neutral-200 transition-colors hover:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 focus:outline-none"
			aria-label="User menu"
		>
			<img
				src="https://api.dicebear.com/7.x/avataaars/svg?seed=merchantlabs"
				alt="User Avatar"
				class="h-9 w-9"
			/>
		</button>
	</div>
</header>
