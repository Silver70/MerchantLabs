<script lang="ts">
	import { onMount } from 'svelte';

	interface MenuItem {
		label: string;
		icon?: string;
		onClick: () => void;
		variant?: 'default' | 'danger';
		disabled?: boolean;
	}

	interface Props {
		items: MenuItem[];
		triggerLabel?: string;
	}

	let { items = [], triggerLabel = '⋯' }: Props = $props();

	let isOpen = $state(false);
	let dropdownElement: HTMLDivElement | undefined = $state();

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function handleMenuItemClick(item: MenuItem) {
		if (!item.disabled) {
			item.onClick();
			isOpen = false;
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	function getMenuItemClasses(variant?: string, disabled?: boolean) {
		const baseClasses =
			'w-full text-left px-4 py-2 text-sm rounded transition-colors flex items-center gap-2';
		const variantClasses =
			variant === 'danger'
				? 'text-danger-600 hover:bg-danger-50'
				: 'text-neutral-700 hover:bg-neutral-100';
		const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
		return `${baseClasses} ${variantClasses} ${disabledClasses}`;
	}
</script>

<div class="relative inline-block" bind:this={dropdownElement}>
	<!-- Trigger Button -->
	<button
		class="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
		title="More actions"
		onclick={toggleDropdown}
	>
		{triggerLabel}
	</button>

	<!-- Dropdown Menu -->
	{#if isOpen}
		<div
			class="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg z-50"
			role="menu"
		>
			<div class="py-1">
				{#each items as item (item.label)}
					<button
						class={getMenuItemClasses(item.variant, item.disabled)}
						onclick={() => handleMenuItemClick(item)}
						disabled={item.disabled}
						role="menuitem"
					>
						{#if item.icon}
							<span class="text-base">{item.icon}</span>
						{/if}
						<span>{item.label}</span>
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	/* Ensure dropdown doesn't get cut off by overflow */
	:global(table) {
		overflow: visible;
	}
</style>
