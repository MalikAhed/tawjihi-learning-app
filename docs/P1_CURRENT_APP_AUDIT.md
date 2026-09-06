# P1.0 current application audit

**Audit date:** 2026-09-03
**Phase:** Frontend-only UI/UX prototype
**Product baseline:** 49 first-release stories; 3 locked and 46 provisional

> Historical 2026-09-03 snapshot, retained for traceability. This is not the current runtime inventory.
> See [architecture](ARCHITECTURE.md), [route map](P1_ROUTE_STATE_MAP.md), and [refactor audit](REFACTOR_AUDIT_2026-09-05.md).

## Current experience

| Area | What exists | Current behavior | Product assessment |
|---|---|---|---|
| Main navigation | Learn, Shop, More | Learn shows subjects; Shop shows a generic coming-soon card; More exposes developer tools | Does not match the story navigation and exposes a first-release Shop that is not required |
| Subject overview | Eight Arabic subject cards | Every card opens the same “in progress” status view | Useful visual shell; only Gaza Scientific ICT should have a deep first-release journey |
| ICT roadmap | No active roadmap | ICT opens a placeholder | Missing |
| Entry | No curriculum/path questions | App opens directly on subjects | Conflicts with locked `US-ENTRY-001` |
| Preview | Inactive generic lesson/question machinery | No student-facing ICT preview is registered or reachable | Reusable interaction code exists, but the locked preview flow is missing |
| Registration/auth | None | No forms or routes | Missing |
| Learning | Old full-stack lesson candidates and renderer | Registry is empty, so no lesson is reachable | Renderer patterns may be adapted after story-level review |
| Learning records | Versioned local lesson-progress store | No current lesson can create progress | Old day-based model is not the Tawjihi state model |
| Gamification | Rank, streak, gems, league, challenges, XP calculations | Displayed globally with zero/default values | Rank, streak, gems, league, and challenges conflict with first-release scope; XP needs a new story-aligned model |
| Profile | Decorative avatar | Not clickable | Dead control/meaning |
| Error/empty states | Generic coming-soon and some lesson failures | Not organized around recovery actions from the stories | Partial foundation only |
| Accessibility | RTL document, focus styles, responsive rules, reduced-motion CSS, dialog focus handling | Available in the shell | Strong reusable foundation; must be proven per journey |
| Internal tools | UI Lab, Ship Ready, Design System | More tab; Design System is development-guarded | Keep separate from student navigation and production UI |
| Backend | Development server and a developer explanation-review endpoint | Not a product backend | Phase 1 must not depend on it |

## Current clickable-control audit

| Control | Result | Action |
|---|---|---|
| Learn | Opens eight-subject overview | Replace destination with story-aligned Home/Subjects after entry |
| Shop | Generic coming-soon screen | Remove from first-release student navigation |
| More | Developer galleries | Keep development-only; do not treat as product UX |
| Eight subject cards | Opens a subject placeholder | Keep availability overview; give only ICT an implemented roadmap |
| Rank/streak/gem indicators | Informational only | Remove from first-release shell |
| Mobile overview trigger | Opens game sidebar | Replace or remove with the retired sidebar |
| Avatar | No action | Replace later with a real private profile entry point |
| Lesson back | Returns to subject list or developer gallery | Reuse the focus-restoration behavior |

## Reusable foundations

- Arabic RTL document direction and responsive layout primitives.
- Keyboard focus styles, focus restoration, modal/dialog controller, and reduced-motion preference.
- History updates and URL normalization, although the route vocabulary must change.
- Lazy development-gallery loading.
- Lesson content, inline-question, feedback, retry, and content-rendering patterns after they are adapted
  to the approved ICT stories.
- Versioned browser storage and safe corruption fallback as patterns, not as the future data schema.
- Current vibrant subject-card visual treatment as temporary Phase 1 styling.

## Conflicts to remove during Phase 1

1. Opening on subjects instead of curriculum/path selection.
2. Rank, streak, gems, league, challenges, and old day/course progression.
3. Shop as a primary navigation destination.
4. Full-stack course names, candidate lessons, ranks, course-card images, and obsolete week themes in
   active product paths.
5. “In progress” used as a blanket state where the stories require available, preview, locked,
   unavailable, published, or in-preparation distinctions.
6. Any state that visually suggests lesson completion, mastery, access, or XP without supporting
   evidence.

## P1.0 result

- The current app is scaffolding, not a story-complete product.
- No first-release story is complete in the running app.
- `US-SUBJECT-001`, `US-ACCESSIBILITY-001`, and `US-ERROR-STATES-001` have partial reusable UI
  foundations only.
- P1.1 should replace the opening experience with the three locked stories before adding provisional
  authenticated flows.
