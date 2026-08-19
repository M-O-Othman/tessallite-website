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
                    'Correctness verified: accelerated answers match the raw source query results.';
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
                const shellNode = target.querySelector('.graph-shell');

                if (statusNode) {
                    statusNode.textContent = formatStatus(graph.status);
                }

                // Render the chart from the manifest's chart data. Only reached
                // after the published + scale (F-03) + correctness (F-06) gates
                // above have all passed, so a chart can never paint from an
                // unpublished or unverified manifest.
                if (shellNode && graph.chart) {
                    renderChart(shellNode, graph.chart);
                }

                // For a published chart show the plain-language caption; otherwise
                // fall back to the engineering "expected fields" line.
                if (inputsNode) {
                    if (graph.chart && typeof graph.caption === 'string') {
                        inputsNode.textContent = graph.caption;
                    } else if (Array.isArray(graph.expected_inputs)) {
                        inputsNode.textContent = `Expected evidence fields: ${graph.expected_inputs.join(', ')}.`;
                    }
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

    // ---- chart rendering (LINEAR only — business audience; never a log axis) ----
    const NS = 'http://www.w3.org/2000/svg';
    const COLORS = ['#c0563b', '#006c35', '#b8860b'];

    function svgEl(tag, attrs) {
        const el = document.createElementNS(NS, tag);
        for (const k in attrs) {
            el.setAttribute(k, attrs[k]);
        }
        return el;
    }
    function svgText(x, y, str, attrs) {
        const t = svgEl('text', Object.assign({ x: x, y: y }, attrs || {}));
        t.textContent = str;
        return t;
    }
    function usd(n) {
        return n >= 1 ? '$' + n.toFixed(0) : '$' + n.toFixed(2);
    }
    function gb(n) {
        if (n >= 1) return n.toFixed(0) + ' GB';
        if (n >= 0.001) return (n * 1000).toFixed(1) + ' MB';
        if (n >= 1e-6) return (n * 1e6).toFixed(1) + ' KB';
        if (n > 0) return Math.round(n * 1e9) + ' B';
        return '0';
    }
    function count(n) {
        return String(Math.round(n));
    }
    // Linear "nice" axis ticks (0..ceil). Math.log10 is only used to size the step,
    // not to scale the axis — the axis itself is strictly linear.
    function niceTicks(maxv, n) {
        if (!(maxv > 0)) return [0, 1];
        const raw = maxv / n;
        const mag = Math.pow(10, Math.floor(Math.log10(raw)));
        const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) || 10 * mag;
        const ticks = [];
        for (let v = 0; v <= maxv + 1e-9; v += step) ticks.push(v);
        return ticks;
    }

    function renderChart(shell, chart) {
        if (!shell || !chart || chart.type !== 'grouped_bars' || !Array.isArray(chart.series)) {
            return;
        }
        const fmt = chart.unit === 'usd' ? usd : chart.unit === 'gb' ? gb : count;
        while (shell.firstChild) shell.removeChild(shell.firstChild);
        shell.classList.add('graph-shell--chart');

        const W = 760, H = 300, P = { l: 82, r: 14, t: 30, b: 66 };
        const s = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H,
            width: '100%',
            preserveAspectRatio: 'xMidYMid meet',
            role: 'img',
        });
        const all = chart.series.reduce((acc, ser) => acc.concat(ser.values), []);
        const maxv = Math.max.apply(null, all);
        const ticks = niceTicks(maxv, 5);
        const top = ticks[ticks.length - 1] || 1;
        const y = (v) => (H - P.b) - (v / top) * (H - P.b - P.t);

        ticks.forEach((tv) => {
            const yy = y(tv);
            s.appendChild(svgEl('line', { x1: P.l, y1: yy, x2: W - P.r, y2: yy, stroke: '#eef2ef' }));
            s.appendChild(svgText(P.l - 8, yy + 3, fmt(tv), { 'text-anchor': 'end', 'font-size': '10', fill: '#8a97a3' }));
        });
        s.appendChild(svgEl('line', { x1: P.l, y1: H - P.b, x2: W - P.r, y2: H - P.b, stroke: '#cdd6cf' }));

        const n = chart.labels.length;
        const gw = (W - P.l - P.r) / n;
        const k = chart.series.length;
        const bw = Math.min(70, (gw - 18) / k);
        chart.labels.forEach((lb, i) => {
            const cx = P.l + i * gw + gw / 2;
            chart.series.forEach((ser, j) => {
                const v = ser.values[i];
                const x = cx - (k * bw) / 2 + j * bw;
                const yy = y(v);
                const h = (H - P.b) - yy;
                const barY = Math.min(yy, (H - P.b) - 2);
                s.appendChild(svgEl('rect', { x: x + 2, y: barY, width: bw - 6, height: Math.max(h, 2), fill: COLORS[j % COLORS.length], rx: 3 }));
                s.appendChild(svgText(x + 2 + (bw - 6) / 2, barY - 5, fmt(v), { 'text-anchor': 'middle', 'font-size': '10', fill: '#1f2a24', 'font-weight': '700' }));
            });
            String(lb).split('\n').forEach((ln, r) =>
                s.appendChild(svgText(cx, H - P.b + 18 + r * 12, ln, { 'text-anchor': 'middle', 'font-size': '10.5', fill: '#3a4a40' }))
            );
        });
        chart.series.forEach((ser, j) => {
            const lx = P.l + 8 + j * 215;
            s.appendChild(svgEl('rect', { x: lx, y: 6, width: 12, height: 12, fill: COLORS[j % COLORS.length], rx: 2 }));
            s.appendChild(svgText(lx + 17, 16, ser.name, { 'font-size': '11.5', fill: '#1f2a24' }));
        });
        shell.appendChild(s);
    }
}());
