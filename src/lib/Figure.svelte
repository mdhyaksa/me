<script lang="ts">
	let {
		title = '',
		caption = '',
		source = '',
		children,
		table
	}: {
		title?: string;
		caption?: string;
		source?: string;
		children: import('svelte').Snippet;
		/** Every chart ships a table view — identity is never colour-alone. */
		table?: import('svelte').Snippet;
	} = $props();
</script>

<figure class="fig">
	{#if title}<p class="fig__title">{title}</p>{/if}
	{#if caption}<p class="fig__caption">{caption}</p>{/if}

	<div class="fig__plot">
		{@render children()}
	</div>

	{#if source}<p class="fig__source">{source}</p>{/if}

	{#if table}
		<details class="fig__table">
			<summary>Table view</summary>
			<div class="table-wrap">{@render table()}</div>
		</details>
	{/if}
</figure>

<style>
	.fig {
		margin: 2.25rem 0;
		padding: 0;
		max-width: 100%;
	}

	.fig__title {
		font-family: var(--sans);
		font-size: 0.9375rem;
		font-weight: 620;
		margin: 0 0 0.15rem;
		color: var(--ink);
	}

	.fig__caption {
		font-family: var(--sans);
		font-size: 0.8125rem;
		color: var(--ink-soft);
		margin: 0 0 0.9rem;
		max-width: var(--measure);
		line-height: 1.5;
	}

	.fig__plot {
		overflow-x: auto;
	}

	.fig__source {
		font-family: var(--sans);
		font-size: 0.75rem;
		color: var(--ink-faint);
		margin: 0.6rem 0 0;
		max-width: var(--measure);
	}

	.fig__table {
		margin-top: 0.5rem;
	}

	.fig__table summary {
		font-family: var(--sans);
		font-size: 0.75rem;
		color: var(--ink-faint);
		cursor: pointer;
	}

	.fig__table summary:hover {
		color: var(--accent);
	}

	@media print {
		.fig {
			break-inside: avoid;
			page-break-inside: avoid;
		}
		.fig__table {
			display: none;
		}
	}
</style>
