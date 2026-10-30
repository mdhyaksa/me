<script lang="ts">
	import { base } from '$app/paths';
	import { projects } from '$lib/projects';
</script>

<svelte:head>
	<title>Work — Muhammad Dhyaksa Ariadi</title>
	<meta
		name="description"
		content="Five projects in machine learning and language-model systems: drug repurposing, clinical conversation agents, a deterministic prescribing engine, legal retrieval and voice agents, and an analytics agent."
	/>
</svelte:head>

<h1>Work</h1>

<p class="lede">
	Six projects, ordered by how much of each one you can verify rather than by date. The thread
	running through them is that the interesting engineering is rarely the model — it is the
	evaluation that tells you whether the thing works, and the path the system takes when it
	doesn't.
</p>

<p>
	The first two are open — one published and open access, one with its source and a live
	deployment. The other four are private company code, described here without links or excerpts.
	Where I have measured results I give them; where I don't, I say so rather than estimate. I have
	not worked in telecoms, so there is nothing here about churn or subscriber economics.
</p>

{#each projects as project (project.slug)}
	<section class="project">
		<div class="project__head">
			<h2>{project.title}</h2>
			<span class="project__org">{project.org} · {project.period}</span>
		</div>

		<dl>
			<dt>My role</dt>
			<dd>{project.role}</dd>

			<dt>Approach</dt>
			<dd>{project.approach}</dd>

			<dt>Outcome</dt>
			<dd>{project.outcome}</dd>
		</dl>

		<p class="stack">{project.stack}</p>

		<p class="more">
			<a href="{base}/work/{project.slug}/">Full write-up: {project.title}</a>
		</p>
	</section>
{/each}
