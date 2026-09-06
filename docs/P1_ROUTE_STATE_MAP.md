# Current route and state map

Runtime inventory as of 2026-09-05. Product authority remains the [simplified account decision](PRODUCT_DECISION_2026-09-03_SIMPLIFIED_ENTRY_ACCOUNTS.md), [ICT implementation boundaries](ICT_TEXTBOOK_PARTS.md), and approved stories. This inventory does not approve provisional or future-release features.

| URL | Current behavior |
|---|---|
| `/` or `?flow=entry` | Entry/guest trial; normalized entry URL omits `flow` |
| `?flow=register` | Greeting, username, curriculum, path, required email/password, optional phone |
| `?flow=sign-in` | Username/email/phone identifier plus password |
| `?page=learn` | Eight subjects, personal dashboard for eligible accounts, guest account actions |
| `?subject=ict` | Three-unit roadmap with named lesson parts; part/review/completion are in-view state |
| `?subject={known-id}` | Subject status/access destination; seven unpublished subject cards remain disabled |
| `?page=quests`, `shop`, `challenges`, `levels` | Retained placeholder/gated destinations; their routes are preserved, not a claim of release readiness |
| `?page=more` | Five developer tabs: UI Lab, Ship Ready, Design System, motion studio and data |
| `?view=ui-lab` | Full-screen isolated HTML/CSS/JS playground |
| `?view=design-system` | Current Arabic component reference |
| `?view=ship-ready-*` | Eight registered templates; IDs are defined by `src/data/ship-ready.js` |

`src/app/route.js` normalizes unsupported values and obsolete day routes and preserves unrelated query parameters. Account types are `guest`, `free`, `subscribed`, and `banned`; internal fixture roles are separate. Successful account actions return to the shared Home. Banned access and guest trial gates stay separate from progress.

The service can run against fixtures or the existing local account adapter. UI callers use the service boundary in either case. See [architecture and validation](ARCHITECTURE.md) for state owners and lifecycle rules, rather than duplicating them here.
