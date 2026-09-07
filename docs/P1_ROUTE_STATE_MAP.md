# Current route and state map

Runtime inventory as of 2026-09-06. Product authority remains the [simplified account decision](PRODUCT_DECISION_2026-09-03_SIMPLIFIED_ENTRY_ACCOUNTS.md), [ICT implementation boundaries](ICT_TEXTBOOK_PARTS.md), and approved stories. This inventory does not approve provisional or future-release features.

| URL | Current behavior |
|---|---|
| `/` or `?flow=entry` | Entry/guest trial; normalized entry URL omits `flow` |
| `?flow=register` | Greeting, username, curriculum, path, required email/password, optional phone |
| `?flow=sign-in` | Username/email/phone identifier plus password |
| `?page=learn` | Eight subjects, personal dashboard for eligible accounts, guest account actions |
| `?subject=ict` | Three-unit roadmap with named lesson parts |
| `?subject=ict&lesson=database-management&part=access-basics` | Registered part; restores the current learner's saved step after refresh |
| `?subject=ict&lesson=course-introduction&part=getting-started` | The optional introduction, using its existing stable IDs |
| `?subject={known-id}` | Subject status/access destination; seven unpublished subject cards remain disabled |
| `?page=quests`, `shop`, `challenges`, `levels` | Retained placeholder/gated destinations; their routes are preserved, not a claim of release readiness |
| `?page=more` | Five developer tabs: UI Lab, Ship Ready, Design System, motion studio and data |
| `?view=ui-lab` | Full-screen isolated HTML/CSS/JS playground |
| `?view=design-system` | Current Arabic component reference |
| `?view=ship-ready-*` | Eight registered templates; IDs are defined by `src/data/ship-ready.js` |

`src/app/route.js` normalizes unsupported values and obsolete day routes and preserves unrelated query parameters. Account types are `guest`, `free`, `subscribed`, and `banned`; internal fixture roles are separate. Successful account actions return to the shared Home. Banned access and guest trial gates stay separate from progress.

Lesson and part must be supplied together and belong to the selected subject. Invalid combinations normalize to its roadmap. Known unpublished or inaccessible parts open the roadmap's existing explanation of publication, account, or previous-part requirements; the URL never grants access. `src/domain/subject-access.js` supplies the same part gate to the roadmap and controller.

Opening a part adds one history entry. Answers update saved progress without adding question entries. Browser Back returns to the prior destination; Forward restores the part with the active learner's saved step. The lesson's Exit action returns to the preceding roadmap entry and restores focus to its node; a part opened directly replaces its own entry with the roadmap. Repeated Exit activation cannot skip the map or add duplicate map entries. Review and completion remain in-view states under the part URL; refreshing them reopens the part from saved learning progress. Account changes dispose the old view and recheck the destination against the new owner. Navigation records the subject before awaiting progress, so an account change during roadmap loading also cancels stale work.

The service can run against fixtures or the existing local account adapter. UI callers use the service boundary in either case. See [architecture and validation](ARCHITECTURE.md) for state owners and lifecycle rules, rather than duplicating them here.
