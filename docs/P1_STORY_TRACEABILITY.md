# P1 story traceability

**Status key:** `Locked` means approved product behavior. `Provisional` means complete review-packet
behavior that is useful for prototyping but not yet approved. `Missing` and `Foundation only` describe
the current running app, not the quality of the story.

| # | Story | Product status | Primary prototype surface | Current app coverage |
|---:|---|---|---|---|
| 1 | `US-ENTRY-001` Select visitor curriculum context | Direct product revision | `entry`, `?page=learn` | Selection now always leads directly to the existing vibrant eight-subject Learn page |
| 2 | `US-PREVIEW-001` Experience the ICT learning preview | Superseded in active UX | — | Removed from the active route set by the simplified Home decision; story artifact needs revision |
| 3 | `US-ACCOUNT-001` Start minimum-data registration | Direct product revision | `register`, `?page=learn` | Exactly username, email, phone, and password; successful creation immediately creates a free prototype account and returns to the existing Learn page |
| 4 | `US-ACCOUNT-002` Verify and activate the account | Removed by product decision | — | No verification-code flow; story artifact needs revision or retirement |
| 5 | `US-AUTH-001` Sign in and continue | Direct product revision | `sign-in`, `?page=learn` | Username, email, or phone plus password; free, subscribed, and banned results all return to the existing Learn page |
| 6 | `US-AUTH-002` Recover account access | Removed from current UX | — | Recovery is not part of the simplified active account flow; story artifact needs revision or retirement |
| 7 | `US-ORIENTATION-001` Understand the learning experience | Provisional | `orientation` | Missing |
| 8 | `US-HOME-001` Use personalized Home | Direct product revision | `home` | Signed-in learners receive a dedicated dashboard with their name, level, rank, access state, and private analytics above the existing subject grid; guests and banned accounts receive no personal dashboard |
| 9 | `US-SUBJECT-001` See subject availability and progress | Provisional | `subjects` | Foundation only; eight cards use one inaccurate state |
| 10 | `US-ROADMAP-001` Navigate the ICT curriculum roadmap | Provisional | `ict-roadmap` | Missing; ICT is a placeholder |
| 11 | `US-LESSON-001` Start and move through a lesson | Provisional | `lesson` | Foundation only; inactive legacy renderer |
| 12 | `US-LESSON-CONTENT-001` Learn from practical teaching | Provisional | `lesson` | Foundation only; no ICT content |
| 13 | `US-INLINE-001` Complete an understanding check | Provisional | `lesson` | Foundation only; inactive question patterns |
| 14 | `US-GUIDED-CORRECTION-001` Correct a misunderstanding and continue | Provisional | `lesson` | Foundation only; not wired to ICT evidence |
| 15 | `US-QUIZ-001` Complete an exit quiz | Provisional | `exit-quiz` | Missing |
| 16 | `US-QUIZ-002` Understand and retry an exit quiz | Provisional | `quiz-result` | Missing |
| 17 | `US-TEST-001` Complete a unit test | Provisional | `unit-test` | Missing |
| 18 | `US-TEST-002` Understand and retry a unit test | Provisional | `test-result` | Missing |
| 19 | `US-PROGRESS-001` Distinguish completion and progress | Provisional | `home`, `ict-roadmap` | Home fixture reports required lessons completed out of applicable required lessons; backend authority and roadmap synchronization remain missing |
| 20 | `US-MASTERY-001` Understand mastery evidence | Provisional | `home`, result routes | Home fixture shows a separate Arabic evidence state based on submitted-assessment semantics; assessment wiring remains missing |
| 21 | `US-REVIEW-001` Choose review now or later | Provisional | `quiz-result`, `test-result` | Missing |
| 22 | `US-REVIEW-002` Use the Must Review collection | Provisional | `must-review` | Home fixture exposes the private active-item count only; the collection and targeted navigation remain missing |
| 23 | `US-REVIEW-003` Complete targeted review | Provisional | `targeted-review` | Missing |
| 24 | `US-NEXT-001` Receive a useful next action | Direct product revision | `home` | The separate next-action card was removed; start or resume now appears directly on the relevant subject card with its completion ring |
| 25 | `US-XP-001` Earn and understand XP | Direct product revision | `home`, activity result | XP appears inside the learner-level progress bar; rank has a separate bar, while questions solved, daily streak, completed lessons, and overall curriculum completion remain separate counters; backend authority remains missing |
| 26 | `US-ACCESS-001` Understand the paid-unit boundary | Provisional | `ict-roadmap`, `access-offer` | Missing |
| 27 | `US-PAYMENT-001` Begin manual WhatsApp payment | Provisional | `payment-handoff` | Missing |
| 28 | `US-PAYMENT-002` Follow payment review and correction | Provisional | `payment-status` | Missing |
| 29 | `US-ADMIN-ACCESS-001` Verify and activate paid access | Provisional | `ops-access` | Missing |
| 30 | `US-SUBSCRIPTION-001` Use, expire, and renew paid access | Provisional | `subscription`, `ict-roadmap` | Missing |
| 31 | `US-ADMIN-ACCESS-002` Correct exceptional access changes | Provisional | `ops-access` | Missing |
| 32 | `US-CONTENT-001` Author structured curriculum content | Provisional | `ops-content` | Missing; dev lesson authoring is not product operations |
| 33 | `US-ACADEMIC-REVIEW-001` Review and revise content | Provisional | `ops-review` | Missing |
| 34 | `US-PUBLISH-001` Publish or withdraw approved content | Provisional | `ops-publish` | Missing; empty code registry is not workflow |
| 35 | `US-CONTENT-REPORT-001` Report a suspected content problem | Provisional | `content-report` | Missing |
| 36 | `US-CONTENT-REPORT-002` Investigate and resolve a report | Provisional | `ops-reports` | Missing |
| 37 | `US-CONTENT-CORRECTION-001` Correct published content fairly | Provisional | `ops-correction` | Missing |
| 38 | `US-PROFILE-001` Manage private profile identity | Provisional | `profile` | Missing; avatar is decorative |
| 39 | `US-ACCOUNT-SETTINGS-001` Change password or private contact | Provisional | `account-settings` | Missing |
| 40 | `US-PATH-CORRECTION-001` Correct curriculum context safely | Provisional | `path-correction` | Missing |
| 41 | `US-ACCOUNT-RESTRICTION-001` Restrict and restore an account safely | Provisional | `restriction`, `ops-access` | Missing |
| 42 | `US-ACCOUNT-DELETION-001` Request or cancel account deletion | Provisional | `deletion` | Missing |
| 43 | `US-RESILIENCE-001` Recover interrupted activity | Provisional | all activity routes | Foundation only; browser storage pattern exists |
| 44 | `US-ERROR-STATES-001` Recover from empty, unavailable, or failed states | Provisional | all data routes | Foundation only; generic placeholders are insufficient |
| 45 | `US-PRIVACY-001` Keep student data purpose-limited and private | Provisional | all account/internal routes | Missing as product behavior |
| 46 | `US-ACCESSIBILITY-001` Use the essential Arabic experience accessibly | Provisional | all routes | Foundation only; RTL/focus/responsive/reduced motion exist |
| 47 | `US-ANALYTICS-001` Review purpose-limited pilot evidence | Provisional | `ops-analytics` | Missing |
| 48 | `US-RELEASE-GATE-001` Enforce pilot and public readiness gates | Provisional | `ops-release-gates` | Missing |
| 49 | `US-E2E-001` Complete the first-release acceptance journey | Provisional | all surfaces | Missing |

## Delivery status

| Slice | Stories | State |
|---|---:|---|
| P1.0 Inventory, route/state map, fixture boundary | Cross-cutting | Complete |
| P1.1 Entry and account | 1–6 | Reworked to Malik's simplified direct-Home and four-account-type decision; source stories need revision |
| P1.2 Orientation and navigation | 7–10 | Not started |
| P1.3 Learning experience | 11–14 | Not started |
| P1.4 Assessment and evidence | 15–20 | Not started |
| P1.5 Review and motivation | 21–25 | Not started |
| P1.6 Access and subscriptions | 26–31 | Not started |
| P1.7 Content operations | 32–37 | Not started |
| P1.8 Safeguards | 38–46 | Not started |
| P1.9 Validation | 47–49 | Not started |

For each implementation slice, extend this table with its concrete scenario IDs and automated test
references. UI presence alone never changes a story to complete.
