<script lang="ts">
	import { base } from '$app/paths';
	import { projects } from '$lib/projects';
</script>

<svelte:head>
	<title>Muhammad Dhyaksa Ariadi</title>
	<meta
		name="description"
		content="Machine learning and language-model systems — drug discovery, clinical agents, retrieval and evaluation."
	/>
</svelte:head>

<h1>Muhammad Dhyaksa Ariadi</h1>

<p class="lede">
	I build machine-learning and language-model systems, and I spend most of my time on the part that
	decides whether they can be trusted: how they are evaluated, and what they do when they are
	wrong.
</p>

<p>
	Lately that has meant clinical software — conversation agents for a telehealth clinic, and a
	prescribing engine deliberately designed so that the language model cannot make the clinical
	decision. Before that, drug discovery at Imperial College London, where models we built picked
	11 existing drugs to test against antibiotic-resistant pneumococcus and 9 of them worked in the
	lab. That work is <a href="https://doi.org/10.1002/advs.76959">published in Advanced Science</a>.
</p>

<ul class="cards">
	{#each projects as project (project.slug)}
		<li>
			<h2><a href="{base}/work/{project.slug}/">{project.title}</a></h2>
			<p>{project.blurb}</p>
		</li>
	{/each}
</ul>

<p class="more" style="margin-top: 2rem">
	<a href="{base}/work/">All six, summarised on one page →</a>
</p>
