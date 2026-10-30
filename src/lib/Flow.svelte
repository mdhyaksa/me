<script lang="ts">
	export type Step = {
		label: string;
		detail?: string;
		/** model = the LLM's part · code = deterministic · gate = a blocking check */
		kind?: 'model' | 'code' | 'gate';
	};

	let { steps, note = '' }: { steps: Step[]; note?: string } = $props();
</script>

<div class="flow">
	{#each steps as s, i (s.label)}
		<div class="step {s.kind ?? 'code'}">
			<span class="step__label">{s.label}</span>
			{#if s.detail}<span class="step__detail">{s.detail}</span>{/if}
		</div>
		{#if i < steps.length - 1}
			<div class="arrow" aria-hidden="true">↓</div>
		{/if}
	{/each}
</div>

{#if note}<p class="flow__note">{note}</p>{/if}

<style>
	.flow {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 0;
		max-width: 27rem;
		font-family: var(--sans);
	}

	.step {
		border: 1px solid var(--rule);
		border-left-width: 3px;
		border-radius: 4px;
		padding: 0.55rem 0.8rem;
		background: var(--bg-inset);
	}

	/* Identity by border colour AND by the kind label in the legend —
	   never colour alone. */
	.step.model {
		border-left-color: var(--series-2);
	}

	.step.code {
		border-left-color: var(--series-1);
	}

	.step.gate {
		border-left-color: var(--ink);
		border-style: dashed;
		border-left-style: solid;
	}

	.step__label {
		display: block;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--ink);
	}

	.step__detail {
		display: block;
		font-size: 0.78125rem;
		color: var(--ink-soft);
		margin-top: 0.1rem;
		line-height: 1.45;
	}

	.arrow {
		color: var(--ink-faint);
		font-size: 0.875rem;
		line-height: 1;
		padding: 0.25rem 0 0.25rem 0.9rem;
	}

	.flow__note {
		font-family: var(--sans);
		font-size: 0.78125rem;
		color: var(--ink-faint);
		margin: 0.7rem 0 0;
		max-width: var(--measure);
	}

	@media print {
		.flow {
			break-inside: avoid;
			page-break-inside: avoid;
		}
	}
</style>
