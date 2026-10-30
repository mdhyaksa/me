<script lang="ts">
	let {
		items
	}: {
		items: { value: string; label: string; sub?: string }[];
	} = $props();
</script>

<div class="stats">
	{#each items as s (s.label)}
		<div class="stat">
			<span class="stat__value">{s.value}</span>
			<span class="stat__label">{s.label}</span>
			{#if s.sub}<span class="stat__sub">{s.sub}</span>{/if}
		</div>
	{/each}
</div>

<style>
	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(8.5rem, 1fr));
		gap: 1px;
		background: var(--rule);
		border: 1px solid var(--rule);
		border-radius: 5px;
		overflow: hidden;
		margin: 2rem 0;
		font-family: var(--sans);
	}

	.stat {
		background: var(--bg);
		padding: 0.9rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.stat__value {
		font-size: 1.5rem;
		font-weight: 620;
		letter-spacing: -0.02em;
		color: var(--ink);
		font-variant-numeric: tabular-nums;
		line-height: 1.15;
	}

	.stat__label {
		font-size: 0.8125rem;
		color: var(--ink-soft);
		line-height: 1.35;
	}

	.stat__sub {
		font-size: 0.75rem;
		color: var(--ink-faint);
		line-height: 1.35;
	}

	@media print {
		.stats {
			break-inside: avoid;
			page-break-inside: avoid;
		}
	}
</style>
