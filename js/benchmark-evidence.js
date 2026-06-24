(function () {
    const manifestTarget = document.querySelector('[data-benchmark-manifest]');
    const graphTargets = Array.from(document.querySelectorAll('[data-graph-id]'));
    const scaleTargets = Array.from(document.querySelectorAll('[data-benchmark-scale]'));
    const declaredScaleNode = document.querySelector('[data-benchmark-declared-scale]');
    const bytesNoteTarget = document.querySelector('[data-benchmark-bytes-note]');
    const correctnessTarget = document.querySelector('[data-benchmark-correctness]');

    if (
        !manifestTarget &&
        graphTargets.length === 0 &&
        scaleTargets.length === 0 &&
        !bytesNoteTarget &&
        !correctnessTarget
    ) {
        return;
    }

    const PENDING = 'Pending evidence';

    const formatStatus = (status) => {
        if (!status) {
            return PENDING;
        }
        return status
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // The scale the PAGE asserts in its own markup (status card / body copy). The
    // F-03 analogue cross-checks this against the manifest so the page can never
    // claim one scale while the published evidence is for another. Normalised to a
    // lowercase token (e.g. "SF1000" -> "sf1000") for comparison.
    const declaredScale = (
        (declaredScaleNode && declaredScaleNode.dataset.benchmarkDeclaredScale) || ''
    )
        .trim()
        .toLowerCase();

    const renderPending = (note) => {
        if (manifestTarget) {
            manifestTarget.textContent = note || 'Evidence manifest pending.';
        }
        graphTargets.forEach((target) => {
            const statusNode = target.querySelector('[data-graph-status]');
            if (statusNode) {
                statusNode.textContent = PENDING;
            }
        });
        // Honesty controls must stay visible in the pending state too: never leave
        // a stale cost or correctness claim on the page when evidence is withheld.
        if (bytesNoteTarget) {
            bytesNoteTarget.textContent = 'Cost ceiling published with the evidence bundle.';
        }
        if (correctnessTarget) {
            correctnessTarget.textContent = 'Correctness verification pending.';
        }
    };

    // Bug-5463 hardening:
    //  - Fetch the PRODUCTION manifest (evidence-manifest.json). The committed
    //    *.sample.json is a non-fetched template, so sample/placeholder values can
    //    never reach this page.
    //  - INTERLOCK (F-01): render manifest content (statuses, expected fields,
    //    scale, and any future numeric results) ONLY when manifest.status ===
    //    "published". Any other status (methodology_scaffold / in_progress /
    //    draft) forces the pending state, so unpublished numbers can never appear
    //    as a production claim.
    //  - SCALE FROM EVIDENCE (F-02): the benchmark SCALE is taken solely from the
    //    published manifest — the page never asserts a scale (e.g. SF1000)
    //    independently of captured evidence.
    //
    // Bug-5491 hardening (client-side analogues of the runner's F-03/F-04/F-06):
    //  - SCALE CONSISTENCY (F-03): refuse to render manifest content when the
    //    manifest's scale disagrees with the scale the page declares in its own
    //    markup. This stops an SF1-scale manifest from publishing under an
    //    SF1000-labelled page (cross-scale relabelling).
    //  - COST HONESTY (F-04): surface the published per-scale cost ceiling
    //    (maximum_bytes_billed) so the transparent-cost claim is backed by the
    //    number actually enforced, not an unstated cap.
    //  - CORRECTNESS GATE (F-06): require manifest.correctness_verified === true
    //    in ADDITION to status === "published" before any graph statuses/numbers
    //    render. A published-but-unverified manifest is forced to the pending
    //    state, so a benchmark can never read as a clean "same answer, faster"
    //    claim before the correctness comparison against the BigQuery baseline has
    //    passed.
    fetch('assets/benchmarks/evidence-manifest.json', { cache: 'no-store' })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Benchmark evidence manifest unavailable');
            }
            return response.json();
        })
        .then((manifest) => {
            if (!manifest || typeof manifest !== 'object') {
                renderPending();
                return;
            }

            if (manifest.status !== 'published') {
                renderPending('Evidence manifest pending publication.');
                return;
            }

            // F-03: cross-check the manifest scale against the page's declared
            // scale BEFORE rendering anything. The manifest scale is the source of
            // truth (F-02); if the page asserts a different scale, the markup and
            // the evidence disagree and nothing may render as a production claim.
            const manifestScale = (manifest.scale || manifest.declared_scale || '')
                .toString()
                .trim();
            const manifestScaleToken = manifestScale.toLowerCase();
            if (!manifestScaleToken) {
                renderPending('Evidence manifest is missing a benchmark scale.');
                return;
            }
            // Fail closed if the page carries a declared-scale anchor but it is
            // empty/whitespace: an empty anchor must NOT silently disable the F-03
            // cross-check. Only the total absence of the anchor skips it.
            if (declaredScaleNode && !declaredScale) {
                renderPending(
                    'Evidence withheld: this page’s declared benchmark scale is missing.'
                );
                return;
            }
            if (declaredScale && manifestScaleToken !== declaredScale) {
                renderPending(
                    'Evidence withheld: the published manifest scale does not match ' +
                        'this page’s declared scale.'
                );
                return;
            }

            // F-06: correctness must be explicitly verified. A published manifest
            // that has not passed the correctness comparison cannot render numbers
            // or "verified" graph statuses; it is held in the pending state with an
            // explicit note so the "same answer, faster" claim is never implied.
            if (manifest.correctness_verified !== true) {
                renderPending(
                    'Evidence withheld: correctness verification against the BigQuery ' +
                        'baseline has not passed for this manifest.'
                );
                return;
            }

            if (manifestTarget) {
                const status = formatStatus(manifest.evidence_status || manifest.status);
                manifestTarget.textContent = `${status}. Manifest updated ${manifest.last_updated}.`;
            }

            // F-02: display the manifest scale on every scale target.
            scaleTargets.forEach((target) => {
                target.textContent = manifestScale;
            });

            // F-04: surface the enforced per-scale cost ceiling honesty note.
            if (correctnessTarget) {
                correctnessTarget.textContent =
                    'Correctness verified against the BigQuery source baseline.';
            }
            if (bytesNoteTarget) {
                const cap = manifest.maximum_bytes_billed;
                if (typeof cap === 'number' && Number.isFinite(cap) && cap > 0) {
                    bytesNoteTarget.textContent =
                        `Each measured query was capped at ${formatBytes(cap)} ` +
                        '(maximum_bytes_billed); runs over the cap were rejected, not billed.';
                } else if (typeof manifest.maximum_bytes_billed_note === 'string') {
                    bytesNoteTarget.textContent = manifest.maximum_bytes_billed_note;
                } else {
                    bytesNoteTarget.textContent = 'Cost ceiling published with the evidence bundle.';
                }
            }

            graphTargets.forEach((target) => {
                const graph = (manifest.graphs || []).find((item) => item.id === target.dataset.graphId);
                if (!graph) {
                    return;
                }

                const statusNode = target.querySelector('[data-graph-status]');
                const inputsNode = target.querySelector('[data-graph-inputs]');

                if (statusNode) {
                    statusNode.textContent = formatStatus(graph.status);
                }

                if (inputsNode && Array.isArray(graph.expected_inputs)) {
                    inputsNode.textContent = `Expected evidence fields: ${graph.expected_inputs.join(', ')}.`;
                }
            });
        })
        .catch(() => {
            renderPending();
        });

    function formatBytes(bytes) {
        const units = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'];
        let value = bytes;
        let unit = 0;
        while (value >= 1024 && unit < units.length - 1) {
            value /= 1024;
            unit += 1;
        }
        const rounded = unit === 0 ? value : Math.round(value * 100) / 100;
        return `${rounded} ${units[unit]}`;
    }
}());
