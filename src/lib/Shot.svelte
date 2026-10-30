<script lang="ts">
	import { base } from '$app/paths';

	let {
		src,
		alt,
		title = '',
		caption = ''
	}: { src: string; alt: string; title?: string; caption?: string } = $props();
</script>

<figure class="shot">
	{#if title}<p class="shot__title">{title}</p>{/if}
	{#if caption}<p class="shot__caption">{caption}</p>{/if}
	<img src="{base}{src}" {alt} loading="lazy" decoding="async" />
</figure>

<style>
	.shot {
		margin: 2.25rem 0;
		padding: 0;
	}

	.shot__title {
		font-family: var(--sans);
		font-size: 0.9375rem;
		font-weight: 620;
		margin: 0 0 0.15rem;
		color: var(--ink);
	}

	.shot__caption {
		font-family: var(--sans);
		font-size: 0.8125rem;
		color: var(--ink-soft);
		margin: 0 0 0.9rem;
		max-width: var(--measure);
		line-height: 1.5;
	}

	img {
		width: 100%;
		height: auto;
		display: block;
		border: 1px solid var(--rule);
		border-radius: 5px;
	}

	@media print {
		.shot {
			break-inside: avoid;
			page-break-inside: avoid;
		}
	}
</style>
