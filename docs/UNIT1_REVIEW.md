# Unit 1 independent lesson review

Reviewer role: teacher director and visual design critic. The reviewer wrote no application code. Review uses independently captured Chrome screenshots through the actual authored renderer, at desktop 1280×900 and mobile 390×844. Main-app navigation, question correctness traversal and source-book completeness are separately verified by the builder/auditor; this report does not substitute screenshot inspection for those checks.

Pass criterion: every lesson's clarity, design and aesthetics must each exceed 8.5/10, with zero identified errors. A score of 8.5 does not pass. Scores reflect the weaker viewport.

## Baseline (round 0, not an iteration)

Unit: clarity 6.8, design 6.8, aesthetics 6.8 — FAIL. Lesson 1 had a strong visual reference; lesson 2 was 10,426px desktop and 10,954px mobile before questions. Remaining Access lessons were mostly generic shadowed text boxes without relational diagrams. SQL teaching was not yet complete. Full baseline notes: `/tmp/unit1-critic-round0.md`; own screenshots: `/tmp/unit1-critic/`.

## Round 1 — FAIL

The integrated unit contains seven Access parts and eight SQL parts. Questions are predominantly clear, use plausible misconceptions and explain the correct choice. The table workflow is now six sections, about 4,317px desktop / 5,035px mobile; it describes one coherent finished table. Diagrams now make the center, office and hospital relationships visible. These are substantial improvements.

The mobile renderer still obscures important content. Tables hide entire columns (including examples, field definitions and UPDATE results) without a visible cue; SQL blocks hide long line endings; question prompts discard code isolation and reorder mixed Arabic/SQL. These are blocking instructional errors, not cosmetic preferences.

| Part | Clarity | Design | Aesthetics |
| --- | ---: | ---: | ---: |
| Access: program and environment | 8.6 | 8.7 | 8.7 |
| Access: create and design tables | 8.6 | 8.6 | 8.6 |
| Access: keys and relationships | 7.2 | 6.8 | 7.4 |
| Access: educational center | 7.3 | 7.0 | 7.5 |
| Access: referential integrity | 7.5 | 7.0 | 7.5 |
| Access: engineering office | 7.5 | 7.2 | 7.7 |
| Access: hospital and review | 7.4 | 7.0 | 7.5 |
| SQL: introduction | 7.4 | 6.9 | 7.4 |
| SQL: SELECT and ORDER BY | 7.3 | 6.8 | 7.4 |
| SQL: WHERE and conditions | 7.6 | 7.0 | 7.6 |
| SQL: related tables | 7.0 | 6.8 | 7.4 |
| SQL: COUNT and parameters | 7.3 | 6.8 | 7.4 |
| SQL: UPDATE | 7.2 | 6.8 | 7.4 |
| SQL: INSERT and append | 7.4 | 7.0 | 7.4 |
| SQL: DELETE and review | 8.0 | 7.8 | 8.0 |

### Ranked corrections

1. Make all instructional columns readable on mobile. Use compact labelled rows/cards for wide schema tables and genuine wrapping for two-column comparisons. Do not reduce text to an illegible size.
2. Wrap SQL source lines within the phone width; preserve syntax order and Arabic string direction. All syntax must be visible without discovering hidden horizontal scrolling.
3. Render inline code correctly in question prompts, with left-to-right isolation, just as in SQL answer options. Particularly inspect `sql-unit-update-parameters-check`, `sql-append-direction-check`, and `sql-where-department-check`.
4. Add one concrete engineer row + department row → joined output example to the related-tables lesson. The current table describes field names, not a join outcome; this is the most abstract remaining concept.
5. Use the required memorization label «يجب حفظه» consistently alongside the brain illustration. SQL currently uses «احفظ».
6. Reinspect INSERT's first memory panel after entrance settles: the first capture showed a bare paragraph and heading at the title. This may be a transition capture artifact, so verify before changing application code.

### Own evidence

All 15 summaries were captured at both widths, including top, middle (45% scroll) and bottom (90% scroll), using `.level-layout-task` as the actual scroll owner. Eight representative questions and five long SQL prompt/option questions were also captured at both widths. Evidence directory: `/tmp/unit1-critic-r1/`. Capture scripts: `/tmp/unit1-critic-r1.mjs`, `/tmp/unit1-critic-long.mjs`.

Representative blocking screenshots:

- `/tmp/unit1-critic-r1/primary-key-truth-mobile.png`: missing example column and clipped definition.
- `/tmp/unit1-critic-r1/sql-update-queries-summary-mobile-0.45.png`: result column hidden.
- `/tmp/unit1-critic-r1/sql-related-tables-summary-mobile-0.9.png`: clipped SQL.
- `/tmp/unit1-critic-r1/sql-unit-update-parameters-check-mobile.png`: RTL-reordered SQL prompt.
- `/tmp/unit1-critic-r1/sql-append-direction-check-mobile.png`: unisolated long SQL prompt.

No document-level horizontal overflow was observed. That fact does not establish content visibility inside clipped/scrolling elements.

## Round 2 — FAIL pending two direction fixes

The major layout failures are resolved. Three-column tables become labelled records on mobile, two-column tables wrap, SQL blocks fit, prompts preserve inline code, memorization headings are consistent, and the join lesson now has a concrete matched-row result and a question testing it. The SQL INSERT opening panel is correct after the entrance settles; the round-1 capture was a transition artifact, not a persistent missing section.

Scores now meet the visual target (design 8.6–8.8; aesthetics 8.6–8.8), but zero errors is not yet met:

1. The Arabic-only UPDATE assignment visually reverses target/value segments inside the LTR code block. In `/tmp/unit1-critic-r2/sql-update-queries-summary-desktop-0.9.png`, the displayed assignment puts the input parameter before the equals sign. Isolate Arabic identifiers/parameters independently, and verify both the summary and `sql-unit-update-parameters-check`.
2. Ordered mixed-language center records reorder the course code/date visually; source `111، A101، 2019/12/22` cannot safely be taught as a positional record in an RTL cell. Use explicit field labels. Similarly isolate relationship notation `1:M` so it is not displayed as `M:1` beside correct Arabic text.

Clarity scores remain below pass only for the affected center/keys/UPDATE material (8.2–8.4); other reviewed parts are 8.6–8.9. These narrow errors require correction, not another layout redesign.

Evidence: `/tmp/unit1-critic-r2/`, captured independently for all 15 summaries at both widths and seven SQL questions, with 650ms settled entrance and middle/bottom scroll positions. Table/pre/document-level overflow was absent. CODE elements reported a consistent extra 20px internal width from padding even for short lines; screenshots showed their syntax fitting, so this metric alone was not treated as a failure. The root builder also corrected matching accent colors for memorization bullet markers during this review; final focused evidence must use that state.

## Round 3 — PASS

The two remaining direction problems are corrected. I independently captured fresh desktop/mobile screenshots of the affected summaries and questions. Arabic SQL identifiers and parameter names now keep their own direction while `SET target = value` keeps its left-to-right order. Center examples explicitly label each field; relationship notation displays `1:M` correctly. The memory card's bullet dots now match its purple accent. No identified teaching or display errors remain in the reviewed material.

The final unit has a coherent sequence: understand Access → build a table → reason about keys and relationships → apply the model to a center, office and hospital → learn SQL through small commands, examples and questions. The second part remains the longest because it completes a real table workflow, but its six purposeful sections and reduced screenshots make it manageable. Later parts use comparisons, actual records, schema diagrams and code results rather than decorative repetition. Questions distinguish realistic misconceptions and include the important boundary cases, such as missing WHERE, equal-to thresholds, missing parent records and repeated composite keys.

### Final per-part scores

| Part | Clarity | Design | Aesthetics | Errors |
| --- | ---: | ---: | ---: | ---: |
| Access: program and environment | 8.6 | 8.7 | 8.7 | 0 |
| Access: create and design tables | 8.6 | 8.6 | 8.6 | 0 |
| Access: keys and relationships | 8.8 | 8.7 | 8.6 | 0 |
| Access: educational center | 8.8 | 8.7 | 8.6 | 0 |
| Access: referential integrity | 8.9 | 8.6 | 8.6 | 0 |
| Access: engineering office | 8.7 | 8.7 | 8.6 | 0 |
| Access: hospital and review | 8.8 | 8.7 | 8.6 | 0 |
| SQL: introduction | 8.7 | 8.7 | 8.6 | 0 |
| SQL: SELECT and ORDER BY | 8.9 | 8.8 | 8.7 | 0 |
| SQL: WHERE and conditions | 8.9 | 8.8 | 8.7 | 0 |
| SQL: related tables | 8.8 | 8.8 | 8.7 | 0 |
| SQL: COUNT and parameters | 8.9 | 8.7 | 8.7 | 0 |
| SQL: UPDATE | 8.8 | 8.8 | 8.7 | 0 |
| SQL: INSERT and append | 8.8 | 8.7 | 8.7 | 0 |
| SQL: DELETE and review | 8.9 | 8.8 | 8.7 | 0 |

All final component scores strictly exceed 8.5. Final assessment: clarity approximately 8.8, design 8.7, aesthetics 8.7. The restrained scores recognize a clear, finished educational experience without pretending every lesson is a maximal visual showcase.

### Final verification evidence

- Complete-unit desktop/mobile summary review: `/tmp/unit1-critic-r2/` (all 15 summaries; initial, middle and bottom positions), supplemented by final affected-area captures in `/tmp/unit1-critic-r3/`.
- Fixed Arabic assignment: `/tmp/unit1-critic-r3/sql-update-queries-summary-desktop-0.9.png` and `sql-update-queries-summary-mobile-0.9.png`.
- Fixed question prompt: `/tmp/unit1-critic-r3/sql-unit-update-parameters-check-desktop.png` and `sql-unit-update-parameters-check-mobile.png`.
- Labelled center data: `/tmp/unit1-critic-r3/junction-key-check-desktop-0.9.png` and `junction-key-check-mobile-0.9.png`; corresponding question `center-valid-record-{desktop,mobile}.png`.
- Isolated cardinalities: `/tmp/unit1-critic-r3/primary-key-truth-mobile-0.9.png` and `center-erd-{desktop,mobile}.png`.
- Worked join result and matching purple bullets: `/tmp/unit1-critic-r3/sql-related-tables-summary-mobile-0.45.png`.
- Arabic string/date answer options: `/tmp/unit1-critic-r3/sql-value-notation-check-{desktop,mobile}.png`.
- Independent browser comparison of all 14 rendered SQL blocks against the authored SQL source passed exact text equality after trimming outer whitespace. This includes UPDATE's Arabic identifiers. Script: `/tmp/unit1-critic-sourcecheck.mjs`.

No fourth iteration was needed. This report certifies the independent lesson/design review; the separate book-coverage audit and builder's full interaction/technical checks remain the authoritative evidence for those respective requirements. Screenshots are local review evidence, not committed application assets.
