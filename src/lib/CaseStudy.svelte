<script lang="ts">
	import { base } from '$app/paths';

	let {
		title,
		org = '',
		period = '',
		role = '',
		children
	}: {
		title: string;
		org?: string;
		period?: string;
		role?: string;
		children: import('svelte').Snippet;
	} = $props();

	const meta = $derived([org, period].filter(Boolean).join(' · '));
</script>

<svelte:head>
	<title>{title} — Muhammad Dhyaksa Ariadi</title>
</svelte:head>

<article>
	<header class="cs-head">
		<h1>{title}</h1>
		{#if meta}<p class="dek">{meta}</p>{/if}
		{#if role}<p class="cs-meta">{role}</p>{/if}
	</header>

	{@render children()}

	<p class="more"><a href="{base}/work/">← All work</a></p>
</article>

<style>
	/* Tables inside Markdown need a scroll container on narrow screens. */
	article :global(table) {
		display: table;
	}
</style>
