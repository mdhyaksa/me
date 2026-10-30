export type Project = {
	slug: string;
	title: string;
	org: string;
	period: string;
	/** One line for the home page. */
	blurb: string;
	/** What I personally built, and where someone else's work begins. */
	role: string;
	/** The two or three decisions that actually mattered. */
	approach: string;
	/** A measured number where one exists, or an explicit statement that there isn't one. */
	outcome: string;
	stack: string;
};

/** Ordered by strength of evidence: published and externally checkable work first. */
export const projects: Project[] = [
	{
		slug: 'pneumococcus',
		title: 'Predicting antibiotic activity against drug-resistant pneumococcus',
		org: 'Imperial College London',
		period: '2024–2026',
		blurb:
			'Three model families, trained on 36,352 compounds, picked 11 existing drugs to test against a priority pathogen. Nine worked. Published in Advanced Science.',
		role: 'I wrote the modelling code and ran the numerical experiments with the first author, and selected the candidates for in-vitro testing together with the principal investigator. The microbiology was done by collaborators at the MRC Centre for Global Infectious Disease Analysis. Second of seven authors.',
		approach:
			'The hard part was not the models, it was the split. Molecules that resemble their training set are easy to score and tell you nothing about a genuinely new compound, so I held out 4,812 structural outliers — no molecule with a Tanimoto similarity above 0.5 to anything else in the set — and clustered the remainder into 26 scaffold groups, then trained ensembles leave-one-cluster-out. Three model families ran over the same splits: a random forest on Morgan fingerprints, a 26-model directed message-passing graph network, and a five-model ensemble on a frozen pre-trained chemical language model.',
		outcome:
			'Of 11 prospectively chosen drugs, 9 reduced growth of S. pneumoniae at IC50 ≤ 0.4 µg/mL; thiostrepton reached 0.0001 µg/mL and held its potency against three multidrug-resistant strains. The result I find more instructive is the disagreement: ranking the tested drugs against their measured potency, the language model correlated at ρ = 0.75 while the random forest managed ρ = 0.16 — but the forest was the only model to rank the one already-known active highly. No single model would have found everything.',
		stack: 'PyTorch, Lightning, scikit-learn, DeepChem, Chemprop, RDKit, transformers, Ray Tune, SHAP, UMAP, PBS HPC'
	},
	{
		slug: 'spaceship-scout',
		title: 'A logistics dashboard that answers questions from data',
		org: 'Personal project',
		period: '2026',
		blurb:
			'A logistics analytics dashboard with a natural-language interface, where the model writes a query plan and never writes SQL, and the answer is checked for statistical sufficiency before it is allowed to make a claim.',
		role: 'Built solo, start to finish — semantic layer, query compiler, forecasting, statistical guards, dashboard and deployment. Public repository and live deployment.',
		approach:
			'The design question was what the model is allowed to produce. It writes a typed query plan through a single forced tool call, never SQL; the plan is validated against a semantic layer that is the only place a metric is defined, then compiled to SQL by code. A plan naming a metric that does not exist, grouping by a field that is not a valid grain, or asking for a window outside the data is rejected before execution. The dashboard tiles go through the same validator as the chat, so there is one definition of "delayed" in the system and changing it is an edit to one YAML file. Forecasting picks among moving average, linear trend and simple exponential smoothing by backtest error, reports prediction intervals from the residual spread, and refuses outright rather than fit a line through too few points.',
		outcome:
			'The part I would point at is the sufficiency check that runs after execution and before any answer text: it finds the smallest denominator behind a ratio, compares it to a floor, and runs a two-proportion or chi-square test before the answer is permitted to call one carrier better than another. Ranking two carriers on a handful of orders is how a dashboard gets someone fired for noise, so the system is required to say when a difference is not significant. Every number on both surfaces has an explainability panel behind it showing the plan that produced it.',
		stack: 'TypeScript, React, Recharts, Cloudflare Workers, D1/SQLite, Zod, Vitest'
	},
	{
		slug: 'sirka-agents',
		title: 'Clinical conversation agents and retrieval',
		org: 'Sirka',
		period: '2025–2026',
		blurb:
			'Two tool-calling agents handling patient conversations for a telehealth clinic, where the retrieval was measured and the safety checks were deliberately not left to a model.',
		role: 'I built the agent service end to end — retrieval, agents, guardrails, evaluation and its deployment pipeline — as the sole author of that service. The surrounding CRM was a team effort.',
		approach:
			'Retrieval fuses three signals with reciprocal rank fusion: vector similarity, lexical ranking, and exact overlap on clinical and product codes. The third exists because the text tokeniser collapsed a product code and its suffixed variant into the same token, which made two different products indistinguishable to lexical search. Safety is the other half. Emergency detection runs as a regex before the model is called at all, and grounding, dose-figure and citation checks run as pure functions afterwards, because a guardrail that depends on a ranking function is not a guardrail. Each classifier is documented as fail-open or fail-closed by purpose; the urgency classifier can only add an emergency, never clear one, after a small model missed a plainly urgent phrasing in testing.',
		outcome:
			'On an 81-case evaluation set, hybrid retrieval reached recall@8 of 0.971 against 0.941 for dense-only and 0.309 for lexical-only. Multi-turn questions were the weak point at 0.667, which is recorded as the next thing to fix rather than averaged away. The safety suite runs in CI ahead of the image build, so a failing check blocks the deploy.',
		stack: 'Python, FastAPI, PostgreSQL, pgvector, OpenRouter, Docker, GitHub Actions, GCP'
	},
	{
		slug: 'doctor-ai',
		title: 'A prescribing engine that the model does not control',
		org: 'Sirka',
		period: '2025–2026',
		blurb:
			'A patient assessment flow where a language model runs the conversation and a deterministic engine makes every clinical decision. Validated by shadow-running it against live traffic.',
		role: 'I wrote the decision engine, the agent layer around it, and the shadow and backtest tooling used to validate changes to it. Analytics and media features in the same codebase were built by colleagues.',
		approach:
			'The design rule was that the model orchestrates and never decides. A deterministic engine holds the eligibility logic and the safety gate; the model gets read-only tools and cannot declare itself finished, because the backend produces the final verdict. A later revision narrowed its role further — code owns the order of questions, and the model only extracts fields under a forced schema and phrases the replies. Safety-critical fields can be filled only through interface widgets under a default-deny allowlist, so they can never be set from free text. Every error path routes to a human doctor; none routes to an automatic prescription.',
		outcome:
			'Engine changes shipped behind a shadow mode that ran the new version passively against live sessions, flagging any divergence and specifically any case where the new version was less restrictive than the old — a safety regression is a different class of bug from a disagreement. Paired with a backtest that replays historical sessions, and a release-blocking gate in CI with shared fixtures across the Go and TypeScript implementations.',
		stack: 'Go, PostgreSQL, OpenRouter, OpenTelemetry, Docker, GitHub Actions'
	},
	{
		slug: 'taxcognitio',
		title: 'Cited-answer legal research, and realtime voice agents',
		org: 'TaxCognitio · Cliqo',
		period: '2025–2026',
		blurb:
			'A retrieval system over Singapore tax and case law that had to cite its sources, and later a speech-to-speech agent with a tool surface too large to hand a model directly.',
		role: 'I was the founding engineer on the legal research assistant and took it through its first three milestones. The production platform and evaluation suite that replaced it were built by a colleague afterwards and are not my work. The voice gateway is mine.',
		approach:
			'For legal research, an uncited answer is worthless, so retrieval was organised by source authority rather than as one flat index — statute lookup split into graph traversal for "find me section 10(1)(b)" and vector search for "find me the provision about this", because they are different problems wearing the same interface. A ReAct agent selected among per-source tools, each bound to its own namespace and retrieval parameters, and models were self-hosted at that stage for cost and data-handling reasons. The voice work turned on a similar framing: rather than exposing every integration tool to a realtime model, I put three meta-tools in front of a vector router, so the model searches for a capability, asks for its schema, then calls it.',
		outcome:
			'Both systems went to real users and I hold no evaluation numbers I can honestly quote for either — the legal assistant\'s measured benchmarks postdate my work on it, and the voice gateway has latency instrumentation but no recorded results. The architectural claims above are checkable in the code; the performance claims I would have to go and measure.',
		stack: 'Python, LlamaIndex, Neo4j, Pinecone, Ollama, vLLM, TypeScript, OpenAI Realtime, Docker'
	},
	{
		slug: 'analytics-agent',
		title: 'An analytics agent for people who do not write queries',
		org: 'Cliqo',
		period: '2025–2026',
		blurb:
			'A design brief: letting colleagues ask questions of product data directly, and the execution boundary that choice forces you to own.',
		role: 'This one is a design contribution, not an implementation one. I specified the agent and its execution model; a colleague built it. I am listing it because the central decision is one I think is worth defending, not to claim the code.',
		approach:
			'The obvious shape is text-to-SQL: the agent writes a query, something runs it, the user gets rows. But the questions people actually asked needed more than one query and some arithmetic between them — a funnel compared across two cohorts, a rate normalised by an exposure. An agent that writes code answers those; an agent that writes a single query does not. Choosing the code-writing agent means accepting that you now run generated code, which makes the execution boundary the real design problem rather than an implementation detail: static validation of the generated code before running it in-process is cheap and leaky, while a genuinely isolated runtime costs latency on every call. The tool surface was kept small, read-only and schema-described, so the agent composes a few well-understood sources instead of being handed general query access.',
		outcome:
			'Not measured. I have no adoption or accuracy figures for this, and would not guess at them.',
		stack: 'LangGraph, Python, FastAPI, MongoDB'
	}
];
