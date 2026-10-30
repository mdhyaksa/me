import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'node:url';

// mdsvex resolves a layout path relative to each .svx file, so it must be absolute.
const caseStudyLayout = fileURLToPath(new URL('./src/lib/CaseStudy.svelte', import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx'],
	preprocess: [
		mdsvex({
			extensions: ['.svx'],
			layout: {
				_: caseStudyLayout
			}
		})
	],
	kit: {
		adapter: adapter({ fallback: undefined, strict: true }),
		// Set BASE_PATH=/<repo-name> when deploying to a GitHub Pages project page.
		paths: {
			base: process.env.BASE_PATH ?? ''
		},
		prerender: {
			handleHttpError: 'fail',
			handleMissingId: 'fail'
		}
	}
};

export default config;
