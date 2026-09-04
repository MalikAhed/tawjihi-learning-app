# Tawjihi app implementation plan

## Goal

Create the entire first-release product as a testable UI/UX prototype, wire that proven experience to a
real backend, and only then redesign its visual presentation without destabilizing the UX.

The detailed user stories are the behavioral source of truth. Approved artifacts are binding; the 46
review-packet stories are complete working specifications but remain provisional until Malik approves
them. The prototype should make those provisional decisions easy to inspect rather than hide them.

## Source hierarchy

| Purpose | Source | How it is used |
|---|---|---|
| Approved product rules | `../user story plan/product-definition/` | Binding behavior and scope |
| Complete story detail | `../user story plan/user-story-versions/original-long/STORIES/` | Flows, edge cases, impacts, and acceptance criteria |
| Approval status | `../user story plan/product-definition/STATUS.md` | Separates locked behavior from provisional behavior |
| Fast inventory | `../user story plan/user-story-versions/compact/` | Navigation and backlog scanning only |
| Full journey checks | `../user story plan/review-packet/MILESTONES.md` | Prototype walkthroughs and readiness scenarios |

## Phase 1 — Map and build the complete UI/UX

### Outcome

A frontend-only Arabic RTL product in which every first-release journey can be reached and exercised
with realistic dummy data. Buttons and forms behave; state changes are simulated; no production backend
is required. The result is a behavioral prototype, not a collection of disconnected mockups.

### Foundation before feature screens

- Create a route and navigation map for visitor, student, content, reviewer, publisher, access-admin,
  and release-review experiences.
- Create a traceability matrix connecting all 49 stories to screens, states, prototype scenarios, and
  tests.
- Put all dummy data behind fixture repositories or service adapters. Components must not contain
  hard-coded backend assumptions.
- Add a development-only scenario switcher for account, subscription, content, progress, failure, and
  permission states. Keep it out of the student navigation.
- Establish shared Arabic RTL shell components, forms, feedback, dialogs, loading/empty/error states,
  focus handling, responsive behavior, and reduced motion.
- Remove first-release conflicts from the student shell, including rank, streak, levels, challenges,
  social features, and other future-lane controls. XP may remain only where its story defines it.
- Preserve the current eight-subject overview as an availability view, while making Gaza Scientific ICT
  the only first-release learning journey with real prototype depth.

### Build sequence

| Slice | Stories | Frontend result |
|---|---|---|
| P1.1 Entry and account | 1–6 | Curriculum/path selection, supported and unsupported entry, genuine preview, registration, verification, sign-in, and recovery flows |
| P1.2 Orientation and navigation | 7–10 | Optional orientation, personalized Home, subject availability, and the official three-unit ICT roadmap |
| P1.3 Learning experience | 11–14 | Lesson shell, practical teaching segments, inline checks, explanatory feedback, guided correction, safe continue/resume behavior |
| P1.4 Assessment and evidence | 15–20 | Exit quizzes, unit tests, retries, result explanations, and visibly separate completion, progress, and mastery states |
| P1.5 Review and motivation | 21–25 | Review-now/later choice, Must Review collection, targeted review, useful next action, and meaningful-effort XP |
| P1.6 Access and subscriptions | 26–31 | Free/paid boundary, WhatsApp handoff, payment-review states, access administration, expiry, renewal, and exceptional corrections; no placeholder public price |
| P1.7 Content operations | 32–37 | Author, independent review, publish/withdraw, student report, investigation, correction, and version outcome screens |
| P1.8 Safeguards | 38–46 | Private profile, account settings, path correction, restriction, deletion, interruption recovery, recoverable errors, privacy, and accessibility states |
| P1.9 Validation | 47–49 | Purpose-limited pilot evidence, release-gate dashboard, and all first-release end-to-end walkthroughs |

Each slice includes the main path plus relevant alternate, failure, empty, interrupted, expired, and
permission-denied paths from its detailed stories. A screen does not count as complete if its actions are
dead or if only the ideal path works.

### Phase 1 acceptance gate

Phase 1 is complete only when:

- all 49 first-release stories appear in the traceability matrix with their approval status;
- every story has at least one reachable prototype scenario and its required alternate/error states;
- the 12 final paper-walkthrough scenarios can be completed in the browser with fixtures;
- every visible control has an intentional result;
- student and internal-role navigation are separated and permission states are demonstrable;
- Arabic RTL, keyboard navigation, focus, contrast, narrow-screen layout, and reduced motion pass checks;
- automated behavior tests cover critical state transitions and end-to-end journeys;
- no production API, database, real authentication, or real payment dependency is required; and
- Malik has reviewed the UX and explicitly agrees that it is ready for backend wiring.

## Phase 2 — Wire the backend

### Outcome

The approved Phase 1 journeys operate on durable, secure data and real role permissions without changing
the established UX.

### Integration sequence

1. Freeze the frontend behavior contracts and define request, response, validation, and error contracts
   from them.
2. Implement identity, verification, sign-in, recovery, profile, account changes, restrictions, and
   deletion.
3. Implement curriculum/content versions, independent review, publishing, withdrawal, reports, and
   fair corrections.
4. Implement learning sessions, attempts, resumption, completion, progress, mastery, Must Review, next
   actions, and XP as separate concepts.
5. Implement free access, manual payment review, paid activation, expiry, renewal, and access-admin
   audit history.
6. Implement privacy-safe operational analytics and release-gate evidence.
7. Replace fixtures one vertical slice at a time, retaining the scenario fixtures for tests and local
   development.
8. Verify authorization, validation, concurrency/idempotency where required, audit trails, data
   retention, interrupted requests, and safe recovery.

### Phase 2 acceptance gate

- The complete end-to-end journey runs against the real system.
- Integration and end-to-end tests prove the same observable outcomes as Phase 1.
- Refreshing, signing out and in, expiry, interruption, and retry do not lose or corrupt required state.
- Role and content-publication boundaries are enforced, not merely hidden in the UI.
- Privacy, accessibility, academic review, exact price, and pilot/public readiness gates are resolved at
  the appropriate release milestone.
- Malik confirms functionality before visual redesign begins.

## Phase 3 — Rework the UI, preserve the UX

### Outcome

A production-quality brand and visual system applied to the proven experience. This phase changes how the
product looks, not how users understand or complete tasks.

### Work

- Define final brand tokens for color, typography, spacing, shape, elevation, iconography, illustration,
  and motion.
- Restyle the shared component system and responsive layouts instead of redesigning screens one by one.
- Refine visual hierarchy, density, transitions, feedback presentation, and content imagery.
- Keep routes, navigation structure, task order, state rules, copy meaning, keyboard behavior, and
  accessibility semantics stable.
- Compare every changed flow with its Phase 1/2 behavior tests and approved story criteria.

### Phase 3 acceptance gate

- No accepted journey or state has disappeared or changed meaning.
- Visual regression, behavior, RTL, responsive, accessibility, performance, and reduced-motion checks
  pass.
- The final UI feels coherent across student and internal experiences.
- Malik approves the production presentation after the complete functional walkthrough still passes.

## Product gates and working rules

- Start with approved stories `US-ENTRY-001`, `US-PREVIEW-001`, and `US-ACCOUNT-001` while reviewing
  the next provisional slice in parallel through normal product-owner review.
- Label prototype behavior from unapproved stories as provisional in the traceability record and
  scenario switcher, not in ordinary student-facing copy.
- Do not display a made-up paid price; the exact public price is unresolved.
- Keep completion, progress, mastery, Must Review, XP, and access separate in both state and language.
- Do not add streaks, levels, badges, rankings, challenges, social systems, or automatic payments to the
  first release.
- Unit 1 is the free validation unit. Units 2–3 are the paid public-release continuation after their
  content and required gates are ready.
- The current interface is useful scaffolding, not proof that its existing UX matches the stories.

## Current delivery status

### P1.0 — Complete

- [Current application audit](docs/P1_CURRENT_APP_AUDIT.md)
- [Route and state map](docs/P1_ROUTE_STATE_MAP.md)
- [All-49-story traceability](docs/P1_STORY_TRACEABILITY.md)
- Replaceable fixture product service with development-only scenario controls
- Automated fixture and browser-boundary coverage

### P1.1 — Simplified shared Home and accounts

Malik's direct decision on 2026-09-03 replaces the earlier preview/verification branch. The running
prototype now has one short path:

1. Select place/curriculum and path.
2. Arrive directly at the existing vibrant `?page=learn` eight-subject map as a guest.
3. Optionally create an account using exactly username, email, phone, and password, or sign in using any
   one of username/email/phone plus password.
4. Return to that same existing Learn page as a free, subscribed, or banned account.

The existing subject design, vibrant gradients, spacing, and interactions are preserved. Its former rank,
streak, gem, avatar, challenge, and overview UI is removed. Guests see only Create account and Sign in in
that page's native top bar. Every subject opens the existing in-progress state. Banned accounts remain on
the same map with blocked subject access.

The former ICT visitor page, sample, verification-code flow, recovery flow, orientation handoff, and
separate account-state destinations have been removed from the active route set. The affected story
files must be revised before Phase 2 contracts are frozen; see
`docs/PRODUCT_DECISION_2026-09-03_SIMPLIFIED_ENTRY_ACCOUNTS.md`.

### Next: subject and learning UX

Use the shared subjects Home as the permanent navigation destination. Define what opens inside each
subject, beginning with ICT, without adding account detours or inventing official unit and lesson names.
