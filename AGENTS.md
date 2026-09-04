# Tawjihi learning app agent instructions

These instructions apply to the entire repository.

## Product source of truth

Build product behavior from the user-story workspace at `../user story plan/`.

Use the sources in this order:

1. Approved and locked artifacts in `../user story plan/product-definition/` are binding.
2. Detailed stories in `../user story plan/user-story-versions/original-long/STORIES/` are the working
   implementation reference for flows, rules, exceptions, impacts, and acceptance criteria.
3. Review-only stories remain provisional. They may be represented in a prototype so the full journey
   can be evaluated, but their behavior must not be described as approved or silently promoted into the
   product baseline.
4. The compact story version is a backlog index and quick reference, not an implementation contract.

When the application conflicts with a story, the latest approved story or product rule wins. Do not
silently reinterpret, merge, split, or omit story behavior. Record unresolved product decisions in the
implementation plan and use an explicit, reversible prototype assumption when work can safely continue.

The direct product decision recorded in
`docs/PRODUCT_DECISION_2026-09-03_SIMPLIFIED_ENTRY_ACCOUNTS.md` currently overrides conflicting entry,
Home, registration, verification, recovery, and account-state behavior in the older story packet. Update
the story artifacts before freezing backend contracts.

## Three-phase delivery strategy

### Phase 1 — Complete clickable UI/UX prototype

This is the current phase. Map the complete first-release experience before building a backend.

- Implement every student and internal-operations journey as reachable frontend screens, dialogs, and
  states.
- Make controls genuinely clickable. Use local fixtures and an in-memory or local prototype state layer
  to simulate success, failure, empty, loading, interruption, expiry, permission, and access states.
- Do not add production APIs, databases, real authentication, real payment processing, or other backend
  infrastructure in this phase.
- Keep state boundaries and service interfaces clear enough that fixtures can later be replaced without
  redesigning the UX.
- Validate behavior against the detailed story flows and observable acceptance criteria.
- Do not show unsupported future-lane features as if they belong to the first release.

The temporary visual direction is smooth, clean, calm, and mature. Use Arabic-first RTL layouts,
comfortable spacing, readable typography, clear hierarchy, restrained motion, and vibrant accents for
important actions. Avoid brown legacy styling, decorative background images, visual clutter, and
gamification that is not part of the approved first-release scope. Support keyboard use, narrow screens,
visible focus, sufficient contrast, and reduced-motion preferences from the start. Phase 1 should be
coherent and pleasant, but final brand polish is deliberately deferred.

### Phase 2 — Backend wiring and functional completion

Keep the Phase 1 information architecture, journeys, component contracts, and user-visible behavior.
Replace prototype adapters incrementally with real services for accounts, content, learning state,
assessment, review, access, internal operations, and purpose-limited analytics. Add durable persistence,
authorization, validation, auditability, recovery, privacy controls, and reliable error handling. Each
vertical slice must preserve its story acceptance behavior and pass integration and end-to-end tests.

Do not redesign UX merely because backend integration is underway. If a real constraint requires a UX
change, document the conflict against the relevant story and obtain a product decision first.

### Phase 3 — UI rework without UX churn

After the complete product works end to end, rework the visual system only. Brand, color, typography,
spacing, component appearance, illustration, and motion may change. Navigation, information
architecture, task sequence, labels' meaning, feedback rules, accessibility, and established interaction
behavior stay stable unless Malik explicitly approves a product change. Run visual, accessibility, and
behavioral regression checks before accepting the redesign.

## Story implementation workflow

For each slice:

1. Read the authoritative product rules and the complete detailed story, including alternate and failure
   flows.
2. Add the story to the implementation traceability map with its approval status.
3. Define the reachable screens, entry points, states, actions, and observable outcomes.
4. In Phase 1, implement those outcomes with fixtures behind a replaceable interface.
5. Test the acceptance criteria, including RTL, keyboard, responsive, empty, and error behavior.
6. Mark only demonstrated outcomes complete; never mark lessons, progress, mastery, access, or stories
   complete merely because their UI exists.
7. In Phase 2, replace the fixture implementation while keeping the same behavior contract.

Work in the sequence defined by `IMPLEMENTATION_PLAN.md`. Until Malik explicitly advances the project,
remain in Phase 1 and do not create backend infrastructure.

## Required lesson skills

For every task that creates, rewrites, reviews, validates, or publishes a full-stack lesson, load and
follow all three project lesson skills:

1. `$teach-full-stack` — owns the learner-facing teaching plan and lesson style.
2. `$author-full-stack-lessons` — owns the supported Markdown lesson system and publication workflow.
3. `$technical-diagram-generation` — owns the final diagram/no-diagram decision, visual composition,
   course visual language, prompting contract, and diagram acceptance.

Read each selected `SKILL.md` completely before changing lesson content. Follow every directly required
reference named by those skills. If the current parser, renderer, or project source conflicts with a
skill's cached description of the lesson system, treat the current project implementation as final
authority and update the authored content to match it; do not invent syntax.

When an accepted diagram will be an AI-generated raster image, also load and follow `$imagegen` for
tool execution, file handling, and basic artifact inspection. The three project lesson skills remain
responsible for the teaching, diagram design, and renderer integration decisions.

## Use the skills in this order

### 1. Plan the learning with `$teach-full-stack`

Before choosing Markdown components or images, establish:

- the learner and prior-course context;
- one observable performance outcome;
- prerequisites and terms that must be introduced;
- the simplest correct mental model and necessary refinement;
- essential, working-knowledge, and deferred scope;
- the explanation sequence, realistic example, misconception or failure mode, and practice;
- at least one causal, prediction, or trace check and one application, debugging, comparison, or
  transfer check for a full lesson;
- candidate relationships that might benefit from a visual.

Write for a complete beginner progressing toward job-ready understanding. Explain cause, state,
boundaries, and layer ownership instead of asking for isolated memorization. Use a practical, patient,
precise senior-developer voice. Do not let available UI components or image generation distort the
learning objective.

### 2. Decide visual representation with `$technical-diagram-generation`

Treat the teaching skill's visual audit as a candidate signal. The diagram skill makes the final
choice among a diagram, another representation, or no visual.

- Use a diagram only when flow, direction, hierarchy, boundary, spatial relationship, simultaneous
  state, or before/after change becomes materially clearer.
- Prefer renderer-native code for exact syntax, tables for exact mappings, traces for exact values over
  time, and DevTools or terminal evidence for observable behavior.
- Prefer deterministic construction when exact topology or geometry is the teaching content.
- For generated raster diagrams, use the Illustrated Technical Learning system and the
  `scientific-educational` prompt taxonomy required by the diagram skill.
- Never add decorative images, generic architecture posters, box soup, dense generated code, or an
  image merely because generation is available.
- Inspect existing assets read-only. Reuse an asset directly only when it already performs the same
  teaching job. Otherwise create or copy a non-destructive lesson-owned version; never overwrite
  another lesson's or a shared asset without explicit authorization.

Every included visual needs one explicit teaching job, technically correct relationships, meaningful
alt text, and nearby prose explaining where to start and what to notice. The written lesson must remain
sufficient for someone who cannot see the image.

### 3. Author through `$author-full-stack-lessons`

Read the skill's complete `references/lesson-system.md` before editing lesson source. Express the
teaching plan only through supported ordinary Markdown and documented directives.

- Do not create lesson UI with raw HTML, CSS, JSX, inline styles, custom scripts, iframes, wrappers,
  arbitrary fields, or unsupported directives.
- Do not invent Mermaid, a generated-image directive, multiple-select, matching, custom test code, or
  renderer options.
- Use standard Markdown image syntax for diagrams and save lesson-owned assets under
  `assets/lessons/day-NNN/`.
- Use supported interactions only when they faithfully prove the intended understanding. Do not add
  components for variety.
- Preserve every published step ID unless an intentional progress migration is explicitly in scope.
- Keep step and interaction IDs unique, descriptive, lowercase kebab-case.
- Treat the application as the owner of the lesson shell, navigation, progress, feedback, spacing,
  typography, responsive behavior, and editor UI.

## Repository scope and source authority

Before editing, inspect the target lesson, the relevant prior lesson, neighboring course expectations,
the lesson registry, and the current authoring/parser contract. Keep changes limited to the requested
lesson, its lesson-owned assets, and explicitly requested shared authoring files.

Important project authorities include:

- `src/data/lessons/candidates/` for authored lesson modules;
- `src/data/lessons/lesson-registry.js` for publication registration;
- `src/markdown/lesson-authoring.js` and `src/markdown/lesson-model.js` for parsing and modeling;
- `src/ui/lesson-content.js` and `src/ui/lesson-view.js` for rendered lesson behavior;
- `LESSON_MARKDOWN_AUTHORING.md` for the repository authoring contract;
- `$author-full-stack-lessons/references/lesson-system.md` for the audited skill reference.

Do not modify unrelated application code to make authored content appear valid. If the requested
lesson needs unsupported behavior, report the capability gap instead of simulating support in Markdown.

## Diagram and image acceptance

Before accepting a generated lesson diagram:

- inspect the original asset and the actual rendered lesson at desktop and narrow widths;
- account for `.markdown-rendered img { max-width: 100%; max-height: 340px; }` and record effective
  rendered dimensions when reporting diagram work;
- verify the teaching relationship, reading order, object identity, labels, arrow attachment and
  direction, hierarchy, semantic color, contrast, whitespace, and safe margins;
- reject malformed objects, random text, overlaps, crossings, misleading simultaneity, decorative
  clutter, excessive containers, or unreadable labels;
- require the three-second subject test, ten-second flow test, and basic teach-back test from
  `$technical-diagram-generation`;
- save the accepted project asset inside the repository, not only under a generated-images or temporary
  directory.

If generation repeatedly fails at exact text, geometry, or topology, switch to a deterministic or
renderer-native representation. Never repair an incorrect picture only through alt text or prose.

## Validation before completion

Run validation in proportion to the change, following the lesson-authoring skill as the minimum:

1. Resolve every authoring/parser issue for the target lesson.
2. Assert that every new local Markdown image path exists.
3. Render new images and verify `image.complete && image.naturalWidth > 0`; a successful build alone
   does not prove that lesson media loaded.
4. Run `npm run check:syntax`, `npm test`, and `npm run build` for lesson-source changes.
5. Complete every changed interaction, including wrong-answer and retry paths.
6. Run `npm run test:browser` when changing shared parser, renderer, component behavior, the
   representative authored lesson, or when required for the changed visual/runtime path.

Do not claim a lesson or diagram is complete until both pedagogical review and mechanical validation
pass. Report any validation that could not be performed and why.
