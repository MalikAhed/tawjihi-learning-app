# ICT textbook parts audit — 2026-09-04

Source: `../../books/تكنولوجيا علمي ١٢ متمازجة.pdf`, the only book currently in the workspace.
Reviewed its contents and topic sections using local PDF text extraction. Page references in the
roadmap are printed book pages (PDF page = printed page + 2).

The contents list three units and five lessons. Preserve the contents' Unit 4 label for Networks;
the internal divider on printed page 54 calls it Unit 3. This inconsistency is in the source.

| Official lesson | Printed pages | App parts |
| --- | --- | --- |
| Database management | 3–11 | 6: Access environment; tables/types; keys/relationships; education center; integrity/building; practice/review |
| Queries and SQL | 12–33 | 7: introduction; SELECT/order; WHERE/operators; related tables; UPDATE; INSERT; DELETE/review |
| Smartphone operating systems | 36–42 | 5: Android; files/sensors; augmented reality; iOS; app types/comparison |
| My mobile app | 43–52 | 5: BMI interface; BMI programming; calculator interface/variables; calculator events; exercises |
| OSI layers | 55–60 | 5: upper layers/session; dialogue/session services; presentation; application; review |

These 28 parts are app groupings based on textbook topics, not new official lessons. Page ranges
may overlap because the existing authored lesson teaches some concepts in a different order.
Unit questions on pages 34 and 53 are not represented as new lesson parts.

The first lesson's six parts reuse all 24 published steps exactly once, preserving every step and
interaction ID. The map opens individual parts only. Other parts expose their title and page
reference with an in-preparation state; they do not pretend to contain published teaching.

Part completion is distinct from lesson completion and does not display a separate XP award.
Part progress is saved locally per learner in this browser; guest progress uses session storage.
The unit card shows completed parts / all mapped parts, including parts still in preparation, under
the explicit label “إنجاز الأجزاء”. This is a part-completion view, not assessed mastery or the
broader unit-completion rule (which also requires a unit test). Reopening and retries cannot lower
or double-count completion. A part is counted only after its existing steps and checks finish.
The guest trial finishes only after all six parts of the first lesson finish. Returning from a part
restores map position and focus. Units keep a winding map of circular part stops, with visible lesson dividers and no collapsed
lesson lists. Backend synchronization remains outside this prototype slice.

Traceability: US-ROADMAP-001 remains provisional. Direct user authorization covers the nested
lesson/part structure only; the wider access, assessment, and mastery roadmap remains unfinished.


## 2026-09-04 follow-up

The user requested removal of the full-lesson button, a neater map, and progress on unit cards.
The standalone full-lesson data remains a content source; the learner-facing entry has been removed.
US-PROGRESS-001 remains provisional. This locally saved part-progress view does not approve or
implement the story's broader lesson, exit-quiz, unit-test, and subject completion contracts.

### Unit review card prototype (2026-09-05)

Added a warm amber “بحاجة للمراجعة” card below each ICT unit header with an honest empty state, part count, source lesson, and actionable review rows. Repeated MCQ/true-false mistakes (two incorrect checks for the same authored step) create one local active item; parts group their active steps. The two-attempt threshold is a reversible prototype interpretation of persistent inline misunderstanding, not an approved mastery rule. Guest evidence uses session storage and member evidence uses the existing per-learner local storage adapter. Completion remains independent. Review opens the preceding authored explanation and the specific question; a correct review answer clears that item, interruption preserves it, and later repeated mistakes can re-add it. Existing published explanation/question content is reused: this does not claim completion of the separately authored targeted practice/follow-up, cross-assessment concept mapping, history UI, or review XP stories.

Traceability: approved EPIC-REVIEW-001; detailed US-REVIEW-002/003 remain NEEDS REVIEW. Validation covers repeated errors, deduplication, reload, learner isolation, interruption, correction, completion preservation, and narrow RTL layout.

### Completion celebration and test preview (2026-09-05)

Malik requested a test pass button, happy Rocky/piñata celebration, XP, daily streak, and overall progress gains. ICT part endings now reuse the happy-jump SVG and existing particle celebration, with a still Rocky under reduced motion. A development pass button (localhost, or explicit `?testLesson=1`) previews the ending without persisting completion or rewards, and is labelled accordingly. Regular completion records 10 prototype XP once per part and the local completion date; distinct activity dates determine the subject streak. Totals and progress shown here are ICT subject totals, with progress based on the 28 mapped parts. Old completed parts are not retroactively granted rewards. Per-part XP and streak reflect this new user-requested prototype direction and supersede the earlier no-part-reward presentation; they are not a claim that the older US-XP-001 award schedule or separate Home totals were migrated. Repeat completion adds no XP or progress. Preview exit and normal Continue return to the map.

Validation: one-time rewards, reload and learner isolation, same-day/next-day/missed-day streaks, read-only test preview, loaded Rocky asset, narrow ending layout, and reduced motion. No lesson source was changed.

The ending streak flame now uses the original dashboard SVG paths rigged as `streak-fire` in Mascot Studio. `streak-fire-burning` has bottom-anchored flame/core motion and two staggered rising embers; the reduced clip is still. Studio contact sheets and seam validation precede exported app assets. Completion layout is checked without task scrolling at 320×568, 390×667, 844×390, and 1366×768, including complete action labels.
