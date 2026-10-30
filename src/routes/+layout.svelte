<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';

	let { children } = $props();
</script>

<div class="shell">
	<header class="masthead">
		<a class="masthead__name" href="{base}/">Muhammad Dhyaksa Ariadi</a>
		<nav>
			<a href="{base}/work/">Work</a>
			<a href="{base}/about/">About</a>
		</nav>
	</header>

	<main>
		{@render children()}
	</main>

	<footer class="site">
		<p>Machine learning and language-model systems. Jakarta.</p>
	</footer>
</div>
