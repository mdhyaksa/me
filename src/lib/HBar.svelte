<script lang="ts">
	export type Item = {
		label: string;
		value: number;
		/** 1 | 2 | 3 — categorical slot, assigned by identity, never cycled. */
		series?: 1 | 2 | 3;
		/** Printed at the bar end instead of the formatted value. */
		display?: string;
		/** Censored ("greater than") — drawn hollow with a hatch. */
		censored?: boolean;
		/** Extra context in the hover title. */
		note?: string;
	};

	let {
		items,
		scale = 'linear',
		/** Bars encode magnitude by length, so they require a zero baseline:
		    a log axis has none. Log data gets a dot plot (Cleveland), where
		    position carries the value and no length is implied. */
		mode = 'bar',
		ticks = [],
		max = 0,
		min = 0,
		format = (v: number) => String(v),
		labelWidth = 178,
		rowHeight = 27,
		axisLabel = ''
	}: {
		items: Item[];
		scale?: 'linear' | 'log';
		mode?: 'bar' | 'dot';
		ticks?: number[];
		max?: number;
		min?: number;
		format?: (v: number) => string;
		labelWidth?: number;
		rowHeight?: number;
		axisLabel?: string;
	} = $props();

	const W = 680;
	const PAD_R = 62;
	const BAR = 13;

	const x0 = $derived(labelWidth + 8);
	const x1 = W - PAD_R;

	const hi = $derived(max || Math.max(...items.map((d) => d.value)));
	const lo = $derived(scale === 'log' ? min || Math.min(...items.map((d) => d.value)) : 0);

	const pos = (v: number) => {
		if (scale === 'log') {
			const a = Math.log10(lo);
			const b = Math.log10(hi);
			return x0 + ((Math.log10(Math.max(v, lo)) - a) / (b - a)) * (x1 - x0);
		}
		return x0 + (v / hi) * (x1 - x0);
	};

	const H = $derived(items.length * rowHeight + 30);
	const uid = Math.random().toString(36).slice(2, 8);
</script>

<svg
	class="hbar"
	viewBox="0 0 {W} {H}"
	role="img"
	aria-label={axisLabel || 'bar chart'}
	preserveAspectRatio="xMinYMin meet"
>
	<defs>
		<pattern id="hatch-{uid}" width="5" height="5" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
			<line x1="0" y1="0" x2="0" y2="5" class="hatch" />
		</pattern>
	</defs>

	<!-- grid, recessive and behind the marks -->
	{#each ticks as t (t)}
		<line x1={pos(t)} y1="4" x2={pos(t)} y2={items.length * rowHeight + 4} class="grid" />
		<text x={pos(t)} y={items.length * rowHeight + 19} class="tick" text-anchor="middle">
			{format(t)}
		</text>
	{/each}

	<!-- baseline -->
	<line x1={x0} y1="4" x2={x0} y2={items.length * rowHeight + 4} class="axis" />

	{#each items as d, i (d.label)}
		{@const y = i * rowHeight + 8}
		{@const w = Math.max(pos(d.value) - x0, 2)}
		<g class="row">
			<title>{d.label}: {d.display ?? format(d.value)}{d.note ? ` — ${d.note}` : ''}</title>

			<text x={labelWidth} y={y + BAR - 2} class="lab" text-anchor="end">{d.label}</text>

			{#if mode === 'bar'}
				<rect
					x={x0}
					y={y}
					width={w}
					height={BAR}
					rx="3"
					class="bar s{d.series ?? 1}"
					class:censored={d.censored}
					fill={d.censored ? `url(#hatch-${uid})` : undefined}
				/>
				<text x={x0 + w + 7} y={y + BAR - 2} class="val">{d.display ?? format(d.value)}</text>
			{:else}
				<circle
					cx={pos(d.value)}
					cy={y + BAR / 2}
					r="5"
					class="dot s{d.series ?? 1}"
					class:censored={d.censored}
				/>
				{#if d.censored}
					<!-- open marker plus a caret: the value is a lower bound -->
					<path
						d="M {pos(d.value) + 8} {y + BAR / 2 - 3.5} l 4 3.5 l -4 3.5"
						class="caret"
						fill="none"
					/>
				{/if}
				<text
					x={pos(d.value) + (d.censored ? 16 : 10)}
					y={y + BAR - 2}
					class="val">{d.display ?? format(d.value)}</text
				>
			{/if}
		</g>
	{/each}

	{#if axisLabel}
		<text x={(x0 + x1) / 2} y={H - 1} class="tick" text-anchor="middle">{axisLabel}</text>
	{/if}
</svg>

<style>
	.hbar {
		width: 100%;
		min-width: 460px;
		height: auto;
		font-family: var(--sans);
		overflow: visible;
	}

	.grid {
		stroke: var(--grid);
		stroke-width: 1;
	}

	.axis {
		stroke: var(--ink-faint);
		stroke-width: 1;
		opacity: 0.5;
	}

	/* Thin marks, rounded data-end, anchored to the baseline. */
	.bar {
		fill: var(--series-1);
	}

	.bar.s2 {
		fill: var(--series-2);
	}

	.bar.s3 {
		fill: var(--series-3);
	}

	.bar.censored {
		stroke: var(--mark-muted);
		stroke-width: 1.5;
	}

	.hatch {
		stroke: var(--mark-muted);
		stroke-width: 1.5;
	}

	/* >= 8px marker */
	.dot {
		fill: var(--series-1);
	}

	.dot.s2 {
		fill: var(--series-2);
	}

	.dot.s3 {
		fill: var(--series-3);
	}

	.dot.censored {
		fill: var(--bg);
		stroke: var(--mark-muted);
		stroke-width: 2;
	}

	.caret {
		stroke: var(--mark-muted);
		stroke-width: 1.5;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	/* Text wears ink tokens, never the series colour. */
	.lab {
		font-size: 11.5px;
		fill: var(--ink-soft);
	}

	.val {
		font-size: 11.5px;
		font-weight: 600;
		fill: var(--ink);
		font-variant-numeric: tabular-nums;
	}

	.tick {
		font-size: 10.5px;
		fill: var(--ink-faint);
		font-variant-numeric: tabular-nums;
	}

	.row:hover .bar {
		opacity: 0.78;
	}

	@media print {
		.hbar {
			min-width: 0;
		}
	}
</style>
