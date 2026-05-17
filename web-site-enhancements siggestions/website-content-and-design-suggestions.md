# Tessallite Website Enhancement Suggestions

Date: 2026-05-17

Scope:

- Website reviewed: `/media/oz/work/my-code/tessallite-website/tessallite-website`
- Main page reviewed: `index.html`
- Help files intentionally ignored, per request.
- Feature evidence reviewed from:
  - `/media/oz/work/my-code/tessallite-workspace/tessallite-workspace/docs/testing/uat_feature_checklist.md`
  - `/media/oz/work/my-code/tessallite-workspace/tessallite-workspace/docs/execution/execution_future-features.md`

The goal is not to change Tessallite's visual identity. The current green, gold, charcoal, white, and mint palette is distinctive and should remain. The stronger opportunity is content positioning: the website should stop reading like "query acceleration for big data" only, and start presenting Tessallite as a governed semantic acceleration layer for BI, Excel, APIs, and conversational data agents.

## 1. Executive Recommendation

The current single-page website is visually strong and already has a clear identity. It successfully communicates trust, speed, big-data acceleration, and Excel/BI relevance. However, it is now behind the product. The solution has grown into a much richer platform:

- governed conversational analytics,
- project-aware agent chat,
- headless semantic API,
- Excel/XMLA/JDBC/Power BI paths,
- semantic model canvas and model health,
- data tags and column-level persona security,
- row security and personas,
- pocket tables,
- predictive and lifecycle-aware acceleration,
- usage analytics,
- impact analysis,
- data preview and schema-change review,
- multi-calendar and time-variant modelling,
- glossary, lineage, trust metadata,
- local/GCP deployment and onboarding wizard.

The website should reposition Tessallite around this sharper message:

> Tessallite is the governed semantic acceleration layer that gives business users, BI tools, APIs, and AI agents one trusted way to ask questions over big data.

Recommended top-of-page positioning:

> **Trusted analytics for BI teams and AI agents.**
>
> Tessallite turns warehouse-scale data into governed business answers across Excel, Power BI, SQL, APIs, and conversational agents. Define metrics once, enforce access rules once, and let the platform route each query to the fastest trusted path.

This is more current than the existing "When leadership asks for the number..." framing. That line is good, but it should become supporting copy rather than the primary category definition.

## 2. What Should Change

### Keep

- The existing visual identity: primary green, gold accent, charcoal, white, mint sections.
- The premium, calm, enterprise tone.
- The emphasis on one trusted answer.
- The Excel/big-data narrative.
- The architecture and acceleration story.
- The founder vision section, but make it shorter or lower on the page.

### Change

- Replace "AI Interrogation" with "Governed Conversational Analytics". "Interrogation" is memorable but harsh for business buyers. It may work internally, but client-facing language should feel trusted, safe, and enterprise-ready.
- Reduce absolute claims such as "80% Less Cost" unless backed by public benchmark evidence on the page. Use "reduce repeated warehouse scans" or "target lower query cost" unless a benchmark section is added.
- Replace "Native Compatibility with the Entire BI Ecosystem" with a more accurate phrase. Current implemented surfaces support JDBC, XMLA/Excel/Power BI style paths, REST/headless API, and source systems such as PostgreSQL, BigQuery, and Spark/Hive. "Entire BI ecosystem" overclaims.
- Replace the roadmap-heavy "Product Direction" section with "Now Available in Tessallite" or "Platform Capabilities". The product has implemented many features that should be marketed as present, not future.
- Add sections for agent analytics, governance/security, API/headless integration, model lifecycle, and acceleration lifecycle.

## 3. Recommended Single-Page Structure

The page should remain a single page, but it should be reorganized around buyer questions.

### Proposed Navigation

Current:

- AI Interrogation
- Semantic Modeling
- Platform
- Capabilities
- Performance
- How It Works
- Documentation

Recommended:

- Platform
- Agents
- Governance
- Acceleration
- Integrations
- Deployment
- Docs

Rationale:

- "Agents" is now a buying trigger.
- "Governance" answers enterprise trust objections.
- "Acceleration" carries the performance/cost thesis.
- "Integrations" groups Excel, Power BI, JDBC, XMLA, REST/headless API.

### Proposed Section Order

1. Hero: category, promise, and buyer outcome.
2. Trusted answer strip: one metric definition, many consumers.
3. Agentic analytics: governed conversational data agents.
4. Semantic modelling workspace: model, test, govern, deploy.
5. Governance and access: RBAC, personas, row security, data tags, column restrictions.
6. Acceleration layer: aggregates, pockets, predictive candidates, lifecycle, scheduler.
7. Integrations: Excel, Power BI/XMLA, JDBC, REST/headless API, PostgreSQL/BigQuery/Spark.
8. Trust and operations: model health, usage analytics, impact analysis, lineage, glossary, audit.
9. Deployment: local, private, GCP, zero phone home where applicable.
10. Proof / product maturity: UAT-backed feature coverage, docs, demo tenant, GitHub.
11. CTA: demo for business buyer, architecture review for technical buyer.

## 4. Revised Hero Recommendation

### Current Issue

The current hero is good but too narrow:

> "When leadership asks for the number, Tessallite returns one trusted answer."

This is emotionally strong but does not immediately tell a new visitor what category Tessallite belongs to. A website visitor should understand within five seconds:

- Tessallite is a semantic layer.
- It accelerates big data queries.
- It supports BI tools and AI agents.
- It is governed.

### Recommended Hero Copy

**Headline option A**

> Governed analytics for BI teams and AI agents.

**Subheadline**

> Tessallite turns warehouse-scale data into trusted business answers across Excel, Power BI, SQL, APIs, and conversational agents. Define metrics once, enforce access once, and let the platform route every query to the fastest trusted path.

**CTA buttons**

- `Book a demo`
- `Explore the platform`
- optional secondary: `Read the docs`

**Trust strip under CTA**

- Semantic layer
- Query acceleration
- Conversational analytics
- Excel/XMLA/JDBC/API
- Row and column security

### Alternative Hero Copy

**Headline option B**

> One semantic layer for dashboards, spreadsheets, APIs, and data agents.

**Subheadline**

> Tessallite gives every analytics consumer the same governed definitions while automatically routing repeated questions through aggregates, pocket tables, and live source queries.

### Recommended Hero Visual

Keep the current business trust card concept, but update it to show multiple consumer channels:

```
Question
"Gross margin by region, fiscal QTD"

Resolved by Tessallite
Metric: Gross Margin %
Calendar: Fiscal
Access policy: Finance persona
Route: Aggregate / Pocket / Live
Freshness: 09:03 UTC

Delivered to
Excel | Power BI | API | Agent Chat
```

This makes newer features visible without changing the brand identity.

## 5. Feature Themes to Add

The website should not list every feature. It should group features into buying themes.

### Theme 1: Governed Conversational Analytics

Why this matters:

The market has moved toward AI agents over governed semantic context. Current industry messaging from AtScale, Cube, IBM, Gartner-adjacent coverage, and Microsoft Fabric all points to the same need: AI needs a governed semantic layer, not raw warehouse tables.

Features to promote:

- Agent Chat.
- Project-level agent entry points.
- Agent log.
- Session memory.
- Project personas.
- Glossary and alias map.
- Judge rubrics / answer evaluation.
- Streaming responses.
- Chart or rendered analytical output.

Suggested website section:

**Section badge**

> Governed AI Analytics

**Headline**

> Give data agents governed business context, not raw tables.

**Copy**

> Tessallite lets teams ask analytical questions through conversational agents while keeping the answer grounded in approved measures, dimensions, calendars, personas, and access rules. Agents can explore data without inventing joins, bypassing definitions, or exposing fields the user should not see.

**Three cards**

1. **Ask in business language**
   - Users ask about revenue, margin, customers, products, or time periods without knowing table names.

2. **Ground answers in the semantic model**
   - The agent works from governed metrics, glossary terms, hierarchies, and model context.

3. **Audit what happened**
   - Agent logs, traces, citations, and judge rubrics help teams review the answer path.

Suggested wording to replace "AI Interrogation":

- Use "Conversational Analytics"
- Use "Agent-ready semantic layer"
- Use "Governed agent context"
- Avoid "Interrogation" in nav and section headline.

### Theme 2: One Semantic Model, Many Consumers

Features to promote:

- Measures, dimensions, joins, hierarchies.
- Calculated measures.
- Measure format tokens.
- Business/technical catalogues.
- Hidden-column cascade.
- Model save/deploy/versioning.
- Import/export project bundles.
- Headless metadata API.
- JDBC/XMLA catalogues.

Suggested website section:

**Headline**

> Define the business once. Serve every analytics channel.

**Copy**

> Tessallite centralizes measures, dimensions, hierarchies, joins, calendars, and glossary terms so every dashboard, spreadsheet, API call, SQL query, and agent response resolves to the same business definition.

**Feature bullets**

- Governed measures and calculated measures.
- Business-friendly names, descriptions, folders, and formats.
- Hierarchies for drill-down and analysis paths.
- Model versions, deploy/undeploy, revert, import, and export.
- Business and technical catalogues for different audiences.

### Theme 3: Acceleration Without Giving Up Trust

Features to promote:

- Aggregate lifecycle.
- Pocket tables.
- Predictive aggregate preview.
- Force live / force aggregate / force pocket.
- Query result cache.
- Cold-start latency dashboard.
- Usage analytics.
- Optimizer run logs.
- Lifecycle log.
- Scheduler refresh.
- BigQuery/Spark/Postgres statistics collectors.

Suggested website section:

**Headline**

> Fast answers without fragile shortcuts.

**Copy**

> Tessallite observes real query patterns, identifies expensive misses, and creates the right acceleration path: aggregate tables for repeated rollups, pocket tables for governed subsets, or live source execution when freshness or security requires it.

**Three cards**

1. **Automatic aggregates**
   - Build and refresh high-value summary paths from observed demand.

2. **Pocket tables**
   - Materialize governed subsets for repeated slice-and-filter analysis.

3. **Explainable routing**
   - Show whether a query used live source, aggregate, pocket, or cache.

Design suggestion:

- Replace the current generic "Kill the Full Table Scan" card with a route diagram:

```
Question -> Semantic Binder -> Security Gate -> Route Decision
                                      |-> Live Source
                                      |-> Aggregate
                                      |-> Pocket
                                      |-> Cache
```

### Theme 4: Governance and Security for Real Organizations

Features to promote:

- Tenant/workspace isolation.
- System admin and tenant admin.
- RBAC model-scoped bindings.
- Viewer/modeler/admin roles.
- Project access binding.
- Row security.
- Personas.
- Persona audience roles.
- Persona default filters.
- Persona row-security bypass with confirmation/audit language.
- Data tags.
- Column-level persona security.
- SSO configuration.
- Audit/security trail.

Suggested website section:

**Headline**

> Governance is built into the query path.

**Copy**

> Tessallite does not treat governance as documentation next to the data. Roles, personas, row security, column restrictions, hidden fields, and data tags are enforced where users and agents actually ask questions.

**Four proof points**

- Role-based access from workspace to model scope.
- Row security and persona filters for audience-specific answers.
- Data tags and column restrictions for sensitive fields.
- Audit trails, query logs, and impact views for accountability.

Important caveat:

Do not overstate as "zero leak" or "military grade". Use defensible wording: "designed to enforce", "governed by", "auditable", "role-aware", "tenant-aware".

### Theme 5: Model Builder and Analyst Experience

Features to promote:

- Model Builder mini tabs: Canvas, Query, Model Health, Usage Analytics.
- Toolbelt panels.
- Schema browser search.
- Data preview.
- Table auto-analysis.
- Table details.
- Schema changes.
- Model health structural validation.
- Usage analytics.
- Unsaved changes guard.
- Accessibility/focus handling.
- Welcome wizard.

Suggested section:

**Headline**

> A modelling workspace built for repeated analytical work.

**Copy**

> Tessallite gives data teams one workspace to connect sources, inspect schemas, preview data, define semantic objects, validate model health, review usage, and publish trusted models.

**Feature cards**

- **From source to model**
  - Search schemas, inspect table details, preview data, and auto-profile candidate facts/dimensions.

- **Validate before publishing**
  - Model Health highlights invalid objects, drift, and structural issues before users consume the model.

- **Learn from usage**
  - Usage Analytics shows query volume, top measures, aggregate hit rate, cache hit rate, and latency trends.

### Theme 6: Time Intelligence and Calendars

Features to promote:

- Standard, fiscal, ISO week, retail 4-4-5, Hijri, Thai Buddhist calendars.
- Calendar table generation.
- Date hierarchy association.
- Time variants: YTD, QTD, prior year, trailing N, moving average N, lag.
- Multi-calendar per model.

Suggested website block:

**Headline**

> Business calendars, not just database dates.

**Copy**

> Fiscal calendars, ISO weeks, retail 4-4-5 periods, and regional calendar systems can sit directly inside the semantic model, so time-based metrics match how the business reports.

This is a strong differentiator. Many semantic layer websites talk about metrics, but fewer make calendar complexity visible.

### Theme 7: Integrations and APIs

Features to promote:

- Excel/XMLA.
- Power BI/XMLA.
- JDBC/PostgreSQL wire-style access.
- REST headless API.
- API authentication.
- Query panel.
- Headless query with measures/dimensions/filters/pagination/order.
- Metadata endpoints for models, measures, dimensions.
- PostgreSQL, BigQuery, Spark/Hive sources.

Suggested section:

**Headline**

> Meet users where they already work.

**Copy**

> Business users can stay in spreadsheets and BI tools. Developers and agents can call the headless API. Analysts can use SQL-style workflows. Tessallite keeps all of them on the same governed semantic model.

**Channel grid**

- Excel / XMLA
- Power BI / XMLA
- JDBC / SQL clients
- REST headless API
- Conversational agent
- Model Builder UI

Accuracy note:

The footer currently lists Databricks. Unless Databricks is explicitly supported as a first-class connector, phrase this as "Spark/Hive compatible environments" or "Spark/Hive" rather than "Databricks".

### Theme 8: Trust, Lineage, Glossary, and Impact

Features to promote:

- Glossary lifecycle.
- Approved glossary entries.
- Synonyms and context notes.
- Public glossary links.
- CSV/XLSX/PDF glossary downloads.
- Lineage graph.
- Downstream assets.
- Query log scan.
- Impact panel.
- Trust info schema / info measures.
- Model freshness and owners.

Suggested section:

**Headline**

> Trust signals travel with the answer.

**Copy**

> Every answer can carry the surrounding context teams need: definition, owner, source, freshness, lineage, downstream impact, and approved business language.

This reinforces enterprise confidence and supports the "one trusted answer" theme.

## 6. Proposed Page Copy Blocks

### Hero

```html
<h1>Governed analytics for BI teams and AI agents.</h1>
<p>
  Tessallite turns warehouse-scale data into trusted business answers across
  Excel, Power BI, SQL, APIs, and conversational agents. Define metrics once,
  enforce access once, and let the platform route every query to the fastest
  trusted path.
</p>
```

### Agent Section

```html
<h2>Give data agents governed business context, not raw tables.</h2>
<p>
  Tessallite grounds conversational analytics in approved measures, dimensions,
  calendars, glossary terms, personas, and access rules. Your agents can answer
  business questions without inventing joins or bypassing security policy.
</p>
```

### Acceleration Section

```html
<h2>Acceleration that still respects the semantic model.</h2>
<p>
  Tessallite observes query patterns, detects expensive misses, and routes
  each request through the right path: live source, aggregate, pocket table,
  or cache. Fast answers stay tied to governed definitions.
</p>
```

### Governance Section

```html
<h2>Access rules are part of the query path.</h2>
<p>
  Roles, personas, row security, data tags, and column-level restrictions
  are enforced where people, tools, APIs, and agents actually ask questions.
</p>
```

### Model Workspace Section

```html
<h2>Build, validate, deploy, and monitor semantic models in one workspace.</h2>
<p>
  Connect sources, search schemas, preview data, define measures and dimensions,
  validate model health, inspect usage analytics, and publish versioned models
  from a single governed workspace.
</p>
```

### Trust Section

```html
<h2>Every answer should explain where it came from.</h2>
<p>
  Tessallite connects business definitions to source systems, owners, freshness,
  glossary terms, lineage, and downstream impact so teams can trust the answer
  and understand the consequences of change.
</p>
```

### CTA

```html
<h2>Ready to give BI users and AI agents the same trusted answers?</h2>
<p>
  Bring one business-critical KPI domain. We will show how Tessallite models it,
  governs it, accelerates it, and serves it through BI tools, APIs, and agents.
</p>
```

## 7. Recommended Design Enhancements

Keep the current visual system:

- Primary green: `#006C35`
- Accent gold: `#D4AF37`
- Charcoal: `#333333`
- Mint: `#F2F7F4`
- White surfaces
- Inter and JetBrains Mono typography

Suggested design changes:

### 1. Replace generic cards with product-specific proof cards

Current cards are attractive but sometimes generic. Add more product-specific content:

- "Persona-aware answers"
- "Pocket-table route"
- "Headless API"
- "Model health"
- "Impact scan"
- "Agent log"

### 2. Add a route decision visual

Create a compact horizontal diagram:

```
Question
  -> Semantic binding
  -> Access policy
  -> Route decision
  -> Live | Aggregate | Pocket | Cache
  -> Trusted answer
```

Use green for the main path, gold for route decision, mint for background.

### 3. Add a "many consumers, one model" visual

Center card:

```
Tessallite Semantic Model
```

Surrounding chips:

- Excel
- Power BI
- JDBC
- Headless API
- Agent Chat
- Model Builder

### 4. Add a "governance stack" vertical card

Layered blocks:

1. Tenant / workspace
2. Project access
3. Model roles
4. Persona
5. Row security
6. Data tags / column restrictions

### 5. Add product screenshots only after capture is current

The website currently uses illustrations. That is fine. But the product has matured enough to benefit from real UI screenshots:

- Agent Chat with answer trace.
- Model Builder canvas/toolbelt.
- Pocket Tables panel.
- Usage Analytics tab.
- Impact panel.
- Data Tags / Persona restrictions.

Do not add stale screenshots. Capture only from the current app and use consistent viewport/cropping.

### 6. Keep section density balanced

The page is currently long. Add more capability, but reduce repetition:

- Merge "solution capabilities" and "capability deep dive" into one stronger section.
- Replace "Product Direction" with "Now Available".
- Move Founder Vision lower and shorten it.
- Keep Deployment but make it more precise and less absolute.

## 8. Sections to Rewrite or Replace

### Current: "AI Interrogation"

Replace with:

> Governed Conversational Analytics

Reason:

"Interrogation" can sound adversarial. "Governed Conversational Analytics" better matches enterprise buying language and current AI-agent trends.

### Current: "Native Compatibility with the Entire BI Ecosystem"

Replace with:

> Serve trusted metrics through BI tools, spreadsheets, APIs, and agents.

Reason:

"Entire BI ecosystem" overclaims. The product supports important paths, but the website should stay defensible.

### Current: "Billions of Records. Sub-Second Speed. 80% Less Cost."

Replace with:

> Warehouse-scale data. Interactive answers. Fewer repeated scans.

or:

> Make big-data analytics feel interactive without losing governance.

Reason:

"80% Less Cost" should only stay if a benchmark report or customer evidence is added.

### Current: "Would you like big data on an Excel sheet?"

Keep but tighten:

> Big data, inside the tools your teams already use.

Reason:

Excel is a strong wedge, but Tessallite is now broader than Excel.

### Current: "Product Direction"

Replace with:

> Now Available in Tessallite

Cards:

- Agent-ready semantic layer
- Pocket and aggregate acceleration
- Governance and persona security

Reason:

The current section makes implemented capability feel future-tense.

## 9. Target Customer Messaging

### Data Leaders

Pain:

- Different teams report different numbers.
- AI initiatives need trusted data context.
- Warehouse costs rise with self-service demand.

Message:

> Tessallite gives your organization one governed semantic layer for BI and AI, reducing metric disputes and repeated expensive scans.

### Analytics Engineering Teams

Pain:

- Metrics are duplicated across dashboards, notebooks, spreadsheets, and APIs.
- Model changes are risky.
- Teams lack impact visibility.

Message:

> Tessallite centralizes semantic definitions, validates model health, tracks downstream impact, and lets you publish versioned analytical models.

### BI and Excel Users

Pain:

- Big data is slow in familiar tools.
- Users do not want to learn warehouse schemas.

Message:

> Keep using spreadsheets and BI tools. Tessallite keeps the business definitions consistent and makes the query path fast.

### AI / Agent Teams

Pain:

- Agents hallucinate over raw schemas.
- Natural language analytics needs controlled context.
- Security rules must still apply.

Message:

> Tessallite gives agents a governed business model, approved vocabulary, and access-controlled query surface.

### Platform / FinOps Teams

Pain:

- Query cost is hard to control.
- Manual aggregates are brittle and expensive to maintain.

Message:

> Tessallite uses observed workloads to route, build, refresh, and retire acceleration paths, reducing repeated scans while preserving correctness.

## 10. Feature Selection: What to Promote Now

Prioritize these implemented or UAT-listed features on the website:

### Must Promote

- Governed conversational analytics / Agent Chat.
- Semantic model builder with measures, dimensions, joins, hierarchies, calculated measures.
- Excel/XMLA and JDBC compatibility.
- REST headless API.
- Automatic aggregate lifecycle.
- Pocket tables.
- Predictive aggregate preview and lifecycle.
- Personas, RBAC, row security.
- Data tags and column-level security.
- Usage analytics and model health.
- Impact analysis and lineage.
- Glossary lifecycle.
- Multi-calendar and time variants.
- Data preview and schema changes.
- Welcome wizard/onboarding.

### Promote Carefully

- Cost reduction: frame as reducing repeated scans unless benchmarked.
- "Sub-second": use as an aspiration or "interactive paths" unless measured.
- Air-gapped/zero phone home: keep if true for the deployed mode, but avoid implying every optional LLM feature works offline.
- All BI ecosystem: replace with named supported channels.

### Do Not Promote Yet as Implemented

From `execution_future-features.md`, avoid marketing these as live unless implementation status is later confirmed:

- dbt model and metric importer.
- BigQuery partition-swap incremental refresh.
- Helm chart distribution.
- Calcite-backed parser.
- pgBouncer protocol proxy.
- Snowflake connector.
- Source-native RLS pass-through.
- True end-user credential pass-through.
- Kerberos Spark auth.

These can appear in a roadmap only if the website has a roadmap section, but the single-page marketing page should focus on what is already demonstrable.

## 11. Proposed New Page Outline With Copy

### Section 1: Hero

Headline:

> Governed analytics for BI teams and AI agents.

Subcopy:

> Tessallite turns warehouse-scale data into trusted business answers across Excel, Power BI, SQL, APIs, and conversational agents.

Proof chips:

- Semantic layer
- Query acceleration
- Agent-ready
- Excel/XMLA/JDBC
- Row and column security

### Section 2: One Model, Many Consumers

Headline:

> One governed model. Every analytics channel.

Cards:

- BI and spreadsheets
- SQL and headless APIs
- Conversational agents

### Section 3: Conversational Analytics

Headline:

> Agents can ask better questions when the data has business meaning.

Add points:

- Glossary-aware context.
- Project personas.
- Session memory.
- Agent log and evaluation.
- Governed route through semantic model.

### Section 4: Semantic Workspace

Headline:

> Build trusted metrics without asking every user to learn the warehouse.

Add points:

- Measures, dimensions, joins, hierarchies.
- Calculated measures and formats.
- Model versions and deploy/revert.
- Schema search, data preview, table details.
- Model Health and Usage Analytics.

### Section 5: Governance

Headline:

> Access policy travels with every answer.

Add points:

- Tenant/workspace isolation.
- Project/model roles.
- Personas and audience roles.
- Row security.
- Data tags and column restrictions.
- Audit trails.

### Section 6: Acceleration

Headline:

> The fastest trusted path, selected automatically.

Add points:

- Live route for fresh/secure paths.
- Aggregate route for repeated rollups.
- Pocket route for governed subsets.
- Cache for repeated safe queries.
- Scheduler and lifecycle logs.
- Predictive candidate preview.

### Section 7: Trust and Change Management

Headline:

> Know what each change affects before you publish it.

Add points:

- Impact assets.
- Query reference scan.
- Lineage badges.
- Glossary links and exports.
- Model freshness and owners.

### Section 8: Integrations

Headline:

> Built for the tools teams already use.

Grid:

- Excel / XMLA
- Power BI / XMLA
- JDBC / SQL clients
- REST headless API
- PostgreSQL
- BigQuery
- Spark/Hive
- Agent Chat

### Section 9: Deployment and Control

Headline:

> Run Tessallite close to your data.

Copy:

> Deploy locally, in private infrastructure, or on GCP. Keep semantic metadata, query routing, and acceleration policy under your operational control.

Avoid:

- Overstating air-gapped AI if LLM features require external providers.

### Section 10: CTA

Headline:

> Bring one KPI domain. We will show the full path.

Copy:

> See how Tessallite models it, governs it, accelerates it, and serves it through BI tools, APIs, and conversational agents.

Buttons:

- Book a demo
- Review architecture
- Explore docs

## 12. Website Claim Guardrails

Marketing can be ambitious, but claims should remain defensible.

| Existing / possible claim | Recommendation |
|---|---|
| "80% less cost" | Use only with benchmark proof. Otherwise say "reduce repeated warehouse scans". |
| "Sub-second speed" | Use "interactive routes" or "sub-second where acceleration paths apply" unless benchmarked. |
| "Entire BI ecosystem" | Replace with named supported channels. |
| "Zero phone home" | Keep for core self-hosted deployment, but clarify optional LLM integrations may call configured providers. |
| "Air-gapped ready" | Keep only for non-LLM/local-only mode. |
| "All clouds" | Say "deployable in your environment" unless cloud-specific docs are current. |
| "AI agents are always accurate" | Say "grounded in governed semantic context" and "designed to reduce hallucination risk". |

## 13. Content Tone Guidance

Use:

- governed
- trusted
- semantic
- agent-ready
- business context
- query acceleration
- route transparency
- model health
- impact-aware
- access-controlled
- workload-driven

Avoid or reduce:

- interrogation
- magic
- hallucination-free
- zero risk
- entire ecosystem
- guaranteed sub-second
- guaranteed cost savings
- clinical environment

The best tone is enterprise-confident, not hype-heavy.

## 14. Design-Specific Suggestions

### Hero

Keep the two-column hero, but the right visual should become a multi-channel answer card instead of a KPI-only card.

### Cards

Current cards are 14px radius in places. The brand is professional; keep radius moderate and consistent. Use product-specific cards rather than generic performance cards.

### Colour

Keep the current palette. Use:

- Green for trusted system/action.
- Gold for business value / route decision / highlight.
- Mint for explanatory bands.
- Charcoal for founder/vision or final credibility section.

### Icons

Use consistent line icons. Current inline SVG style is acceptable. Recommended new icons:

- Agent chat bubble with shield.
- Route split.
- Lock/tag.
- Calendar.
- API brackets.
- Lineage graph.

### Visual proof

Add a compact "capability strip" rather than more long prose:

```
Agent Chat | Headless API | Excel/XMLA | JDBC | Pockets | Personas | Data Tags | Impact
```

### Scannability

The page is long. Add section summaries and reduce paragraph length. Each major section should answer one buyer question:

- Can it govern definitions?
- Can agents use it safely?
- Can it make big data fast?
- Does it work with my tools?
- Can we operate it ourselves?

## 15. Concrete Index Page Change List

If implementing later, these are the recommended edits:

1. Update `<title>`:
   - From: `Transparent Query Acceleration for Big Data`
   - To: `Tessallite | Governed Semantic Acceleration for BI and AI Agents`

2. Update nav:
   - Platform
   - Agents
   - Governance
   - Acceleration
   - Integrations
   - Deployment
   - Documentation

3. Replace hero headline and subcopy with the new category-led messaging.

4. Rename `AI Interrogation` section to `Governed Conversational Analytics`.

5. Add a new `Governance` section before Acceleration.

6. Add a new `Headless API and Integrations` section.

7. Replace `Product Direction` with `Now Available in Tessallite`.

8. Add multi-calendar/time intelligence as a short differentiator block.

9. Add impact analysis / usage analytics / model health to the trust section.

10. Replace unsupported/overbroad claims:
    - "Entire BI Ecosystem"
    - "80% Less Cost"
    - "Sub-Second Speed" unless caveated.

11. Rework footer "Data Sources":
    - PostgreSQL
    - BigQuery
    - Spark/Hive
    - REST/JDBC/XMLA

12. Add CTA copy for two personas:
    - "Business demo"
    - "Technical architecture review"

## 16. Suggested Final Messaging Hierarchy

Primary message:

> Governed semantic acceleration for BI and AI agents.

Secondary message:

> One model of business meaning, served through Excel, Power BI, SQL, APIs, and conversational analytics.

Proof points:

- Metrics, dimensions, hierarchies, calendars, and glossary in one model.
- Row security, personas, data tags, and column restrictions.
- Aggregate, pocket, live, and cached route decisions.
- Agent Chat, headless API, JDBC, XMLA, and Model Builder UI.
- Model Health, Usage Analytics, Impact Analysis, and Lifecycle Logs.

Buyer outcome:

> Fewer metric disputes. Faster repeated analysis. Safer agent answers. Lower repeated-scan waste. Better control over analytical change.

## 17. External Trend Notes

The website should lean harder into "semantic layer for AI agents" because this is now a clear market trend. Public 2026 positioning from semantic-layer and analytics vendors emphasizes:

- agents need governed business context, not raw tables,
- semantic layers reduce hallucination risk by grounding AI in metrics and dimensions,
- AI/BI consistency is becoming a major enterprise requirement,
- governance and semantic models are increasingly positioned as core infrastructure for trustworthy AI analytics.

Useful positioning references:

- AtScale: semantic context and MCP for enterprise AI agents.
- Cube: semantic layer for humans, applications, and AI agents.
- dbt Semantic Layer: metrics-as-code and governed metric definitions.
- Microsoft Fabric: semantic models and Copilot/Fabric IQ direction.
- IBM/TechTarget coverage: AI-ready data, semantic consistency, and governance are central 2026 data themes.

Tessallite should not copy these vendors. It should differentiate with:

- open/deployable posture,
- workload-driven acceleration,
- Excel/JDBC/XMLA plus agent/API access,
- practical governance and route transparency,
- pocket tables as a unique acceleration primitive.

## 18. Recommended Near-Term Website Deliverable

Create one refreshed `index.html` version with:

1. Revised hero.
2. Renamed agent section.
3. New governance section.
4. New acceleration route visual.
5. New integrations grid.
6. New "Now Available" feature strip.
7. Cleaned claims and footer.

No brand redesign is required. The main work is content architecture and product positioning.

## 19. Summary

Tessallite's website already feels professional, but it undersells the product. The product is no longer just a query accelerator. It is a governed semantic acceleration platform for BI, spreadsheets, APIs, and AI agents.

The updated website should make that obvious immediately.

Best final positioning:

> Tessallite gives every analytics consumer - from Excel users to AI agents - the same governed business model, then routes each question to the fastest trusted answer path.

