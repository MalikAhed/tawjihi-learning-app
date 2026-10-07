# Current product boundaries

Arabic-first Tawjihi learning for Palestinian students; Gaza Scientific ICT is the first teaching focus. This records the current implemented experience, including the simplified entry flow and later onboarding, lesson, review and reward changes. Current user decisions take precedence. Earlier conflicting plans remain in Git history; outside story packets are not present in this checkout and must not be assumed to approve new features.

## Entry and access

The app has one learner experience. More opens a blank page. Unfinished navigation tabs show a brief bottom message (`قريبًا`) while preserving the current tab, view, URL and lesson progress. Retired developer URLs return to Home.

- Choose curriculum (Gaza/Palestine) and path (Scientific/Literary), then enter the shared subjects Home at `?page=learn`.
- Guests see Create account/Sign in. Registration requires username, curriculum, path, email, password one step at a time, ending at password. Registration does not ask for a phone number. Existing accounts may still sign in using their saved phone. Prototype registration is immediate; no verification-code detour or language selector.
- Sign in accepts username/email/phone plus password. Successful actions return to the same Home.
- Student account types are `guest`, `free`, `subscribed`, `banned`; staff roles are separate. Banned students reach Home with subject access blocked.
- `src/data/course.js` publishes ICT, Mathematics 1/2, Physics, Chemistry, and the subjects explicitly enabled by the current catalog. Chemistry follows the Gaza Grade 12 scientific package and its own question coverage ledger.
- Preserve vibrant cards, subtle gradients, white filled-action labels, and original gem/heart/level icons. Member statistics derive from confirmed progress; gems/hearts have no balance service.

## Learning

The ICT student course is **questions only**, with five textbook lessons grouped under the book's three units. Each lesson opens one continuous question collection, ordered by the retained book-topic parts. The roadmap shows one circular question-progress indicator per lesson. Videos, summaries and the historical introduction are absent from the student journey. Original source files, published IDs and account records are retained. `src/data/subject-roadmaps.js` owns order and legacy part identities; [ICT_COVERAGE.md](ICT_COVERAGE.md) records question sources and exclusions. The supplied 2024 Gaza textbook defines scope.

Keep completion, mastery, review, XP and access distinct. Published lesson/part/step IDs are durable identities. Unpublished parts show an honest preparation state. Retired tooling cannot complete a learner's part or award XP.

The current question review records repeated MCQ/true-false mistakes and returns the student to the preceding explanation and specific question. Correct review clears that item; interruption preserves it. This is not a complete concept-mastery or assessment system. First completion awards the current part XP once; repeated completion cannot duplicate it. Preserve the current reward rules in `src/domain/subject-progress.js`.

The five ICT lessons contain 246 retained source questions, including textbook exercises, mock papers, selected past papers and the classified collection. Original choices and diagram pixels are retained. The 98 MCQs use selectable options. The other 148 questions use fixed white flip cards, with questions on the front and answers on the back; long text and original images scroll inside. No answer fields exist. Flipping alone does not save completion: the learner explicitly continues after review. A question counts once in its lesson ring when answered correctly, or after card review. Incorrect answers, mere visits, retired teaching IDs do not fill a ring. Historical part completion flags cannot complete newly added questions. Storage remains keyed by each question's original lesson/part identity.

Question layouts omit Rocky; his onboarding and completion appearances are retained. Source diagrams enlarge in place with keyboard-accessible controls. Answers distinguish checked source keys, corrected source mistakes, and authored teaching solutions.

## Routes

| URL | Owner/behavior |
| --- | --- |
| `/`, `?flow=entry`, `?flow=register`, `?flow=sign-in` | Entry/account flows |
| `?page=learn` | Shared subjects Home |
| `?subject=ict` | ICT roadmap |
| `?subject=mathematics` | Mathematics 1 question roadmap |
| `?subject=ict&lesson=database-management&part=access-basics` | Full question lesson, resuming saved progress; legacy part identity remains valid |
| `?page=quests`, `shop`, `challenges`, `levels` | Locked; direct links normalize to Home |
| `?page=more` | Blank page |
| `?view=ui-lab`, `?view=design-system`, `?view=ship-ready-*` | Retired; normalize to Home |

`src/app/route.js` normalizes invalid routes. URLs never override publication, account or sequence gates. Answers save without adding history entries; Back/Forward and Exit restore the correct learner and roadmap. Review/completion are in-view states; a refresh restores saved part progress.

## Unresolved release work

- The project is not a completed production product. Paid access, payment processing, content operations, full assessments and broader provisional stories require explicit product scope; do not infer implementation approval from old plans.
- Preserve the selected bright palette while reporting its known contrast failures. The current browser suite reports those contrast exceptions while other WCAG violations block release. Do not expand exceptions or describe the palette as fully accessible.
- SQLite supports the existing single-server deployment. Multi-instance writes, live provider performance, scheduled backups/restore drills and actual hosting capacity have not been validated here.
- The fixture preview is browser-local and is not a real account service. Installed app windows still require a reachable server; no offline lesson cache exists.
