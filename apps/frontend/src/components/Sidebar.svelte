<script lang="ts">
	import { page } from '$app/stores';
	import Logo from '$lib/assets/Logo.svg';
	import LogoIcon from '$lib/assets/LogoIcon.svg';
	import DashboardIcon from '$lib/assets/icons/dashboard_Icon.svelte';
	import DiscountIcon from '$lib/assets/icons/discount_icon.svelte';
	import SettingIcon from '$lib/assets/icons/setting_icon.svelte';
	import CustomerIcon from '$lib/assets/icons/customer_icon.svelte';
	import ProductIcon from '$lib/assets/icons/product_icon.svelte';
	import AnalyticIcon from '$lib/assets/icons/analytic_icon.svelte';

	interface MenuItem {
		label: string;
		href: string;
		icon: any;
		color?: string;
	}

	interface SidebarProps {
		isCollapsed?: boolean;
		onToggleCollapse?: () => void;
	}

	let { isCollapsed = $bindable(false) }: SidebarProps = $props();

	// Internal state
	let menuItems = $state<MenuItem[]>([
		{ label: 'Dashboard', href: '/', icon: DashboardIcon, color: 'gray' },
		{ label: 'Products', href: '/products', icon: ProductIcon, color: 'gray' },
		{ label: 'Customers', href: '/customers', icon: CustomerIcon, color: 'gray' },
		{ label: 'Discounts', href: '/discounts', icon: DiscountIcon, color: 'gray' },
		{ label: 'Analytics', href: '/analytics', icon: AnalyticIcon, color: 'gray' },
		{ label: 'Settings', href: '/settings', icon: SettingIcon, color: 'gray' }
	]);

	let hoveredItem = $state<string | null>(null);

	// Check if a menu item is active based on current route
	const isItemActive = (href: string): boolean => {
		if (href === '/') {
			return $page.url.pathname === '/';
		}
		return $page.url.pathname.startsWith(href);
	};
</script>

<!-- Sidebar Container -->
<aside
	class={`flex h-screen flex-col border-r border-neutral-200 bg-white transition-all duration-300 ease-in-out ${
		isCollapsed ? 'w-20' : 'w-64'
	}`}
>
	<!-- Logo Section -->
	<div class="flex items-center px-4 py-6">
		{#if !isCollapsed}
		<div class="flex items-center gap-2">
			<img src={LogoIcon} alt="MerchantLabs Logo" class="h-10" />
			<div class="flex flex-col">
				<p class="text-lg font-semibold">Merchant Labs</p>
				<p class="text-sm text-neutral-500">Enterprise</p>
			</div>
		</div>
		{:else}
			<img src={LogoIcon} alt="MerchantLabs Logo" class="h-10" />
		{/if}
	</div>

	<!-- Navigation Menu -->
	<nav class="flex-1 space-y-2 overflow-y-auto px-3 py-6">
		{#each menuItems as item (item.href)}
			{@const IconComponent = item.icon}
			{@const itemIsActive = isItemActive(item.href)}
			{@const isItemHovered = hoveredItem === item.href}
			{@const iconColor = itemIsActive || isItemHovered ? 'orange' : item.color}
			<a
				href={item.href}
				class={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
					itemIsActive
						? 'bg-primary-50 text-primary-600'
						: 'text-neutral-700 hover:bg-primary-50 hover:text-primary-600'
				}`}
				aria-current={itemIsActive ? 'page' : undefined}
				onmouseenter={() => (hoveredItem = item.href)}
				onmouseleave={() => (hoveredItem = null)}
			>
				<div
					class={`flex h-5 w-5 shrink-0 items-center justify-center transition-colors duration-200 ${
						itemIsActive ? 'text-primary-600' : 'text-neutral-400 group-hover:text-primary-600'
					}`}
				>
					<IconComponent color={iconColor} />
				</div>
				{#if !isCollapsed}
					<span class="truncate">{item.label}</span>
				{/if}
			</a>
		{/each}
	</nav>

	<!-- Footer Section (Optional) -->
	<div class="border-t border-neutral-200 px-3 py-4">
		<button
			class="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 transition-all duration-200 hover:bg-primary-50 hover:text-primary-600"
		>
			<div
				class="flex h-5 w-5 shrink-0 items-center justify-center text-neutral-400 transition-colors duration-200 group-hover:text-primary-600"
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
						d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
					/>
				</svg>
			</div>
			{#if !isCollapsed}
				<span class="truncate">Logout</span>
			{/if}
		</button>
	</div>
</aside>
