<svelte:head>
	<title>About — Muhammad Dhyaksa Ariadi</title>
</svelte:head>

<h1>About</h1>

<p class="lede">
	I work on machine learning and language-model systems, mostly in healthcare and other settings
	where a wrong answer costs something.
</p>

<p>
	My training is in computational drug discovery, at Imperial College London — virtual screening,
	molecular representation learning, and the evaluation design that makes a retrospective result
	mean something prospectively. That work produced a paper in <em>Advanced Science</em> in which
	models we built selected 11 existing drugs to test against antibiotic-resistant
	<em>Streptococcus pneumoniae</em>, 9 of which proved active in vitro.
</p>

<p>
	Since then I have been building production systems: conversation agents for an Indonesian
	telehealth clinic, a prescribing engine designed so that the language model cannot make the
	clinical decision, a cited-answer retrieval system over Singapore tax and case law, and a
	realtime voice agent. Alongside those, an analytics dashboard where a natural-language question
	becomes a validated query plan rather than generated SQL, and no answer is allowed to rank
	anything the underlying sample cannot support. The common thread is less the modelling than the
	scaffolding around it — what gets measured, what is deterministic, and what happens on the
	failure path.
</p>

<h2>Publication</h2>

<p>
	Fitch, J. S.; <strong>Ariadi, M. D.</strong>; Kwun, M. J.; Howells, L.; Hernandez-Hernandez, S.;
	Croucher, N. J.; Ballester, P. J. “Artificial Intelligence-Guided Phenotypic Drug Repurposing
	Against <em>Streptococcus pneumoniae</em>.” <em>Advanced Science</em>, 2026.
	<a class="print-url" href="https://doi.org/10.1002/advs.76959">doi:10.1002/advs.76959</a>
	— open access.
</p>

<h2>What I work with</h2>

<p>
	Python and Go day to day, with TypeScript when the work reaches a browser. PyTorch, Lightning
	and scikit-learn for modelling; PostgreSQL and pgvector, and SQL for anything analytical.
	Hosted and self-hosted language models, retrieval systems, and the usual deployment machinery —
	Docker, GitHub Actions, GCP and AWS.
</p>

<p>
	Things I have not done, since a portfolio is also a list of absences: no telecoms or subscriber
	analytics, no large-scale distributed training, and no Kubernetes in production — the services
	described here run as containers on managed platforms and VMs.
</p>

<h2>Contact</h2>

<p>
	<a class="print-url" href="mailto:m.dhyaksa@gmail.com">m.dhyaksa@gmail.com</a><br />
	<a class="print-url" href="https://github.com/mdhyaksa">github.com/mdhyaksa</a>
</p>

<p class="cs-meta">
	Most of the work described on this site is private company code. The write-ups cover design and
	results only — no source, no client data, no internal documentation.
</p>
