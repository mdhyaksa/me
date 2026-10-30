<script lang="ts">
	let {
		items
	}: {
		items: { label: string; series?: 1 | 2 | 3; censored?: boolean }[];
	} = $props();
</script>

<ul class="legend">
	{#each items as it (it.label)}
		<li>
			<span class="swatch s{it.series ?? 1}" class:censored={it.censored}></span>
			{it.label}
		</li>
	{/each}
</ul>

<style>
	.legend {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem 1.1rem;
		padding: 0;
		margin: 0 0 0.7rem;
		font-family: var(--sans);
		font-size: 0.78125rem;
		color: var(--ink-soft);
		max-width: none;
	}

	.legend li {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		margin: 0;
	}

	.swatch {
		width: 11px;
		height: 11px;
		border-radius: 2px;
		background: var(--series-1);
		flex: none;
	}

	.swatch.s2 {
		background: var(--series-2);
	}

	.swatch.s3 {
		background: var(--series-3);
	}

	.swatch.censored {
		background: repeating-linear-gradient(
			45deg,
			var(--mark-muted) 0 1.5px,
			transparent 1.5px 4px
		);
		box-shadow: inset 0 0 0 1.5px var(--mark-muted);
	}
</style>
