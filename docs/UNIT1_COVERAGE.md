# Unit 1 textbook coverage

Content audit: 2026-09-09. Source: `../books/تكنولوجيا علمي ١٢ متمازجة.pdf`, printed pages **3–34** (PDF pages 5–36). Both textbook lessons and the unit-end questions are included. Printed page 12 explicitly prioritizes SQL commands; interface windows are for familiarization.

This maps current teaching and practice, not a claim that screenshot review or browser verification has passed. A question mapping includes its explanation; related facts may be practised together rather than as separate recall prompts. Practical activities are explained with examples and checked through MCQs; the app does not run Microsoft Access or grade a student's Access database/hand-drawn ERD.

## Sources and boundaries

- Access source: [`database-management.js`](../src/data/lessons/ict/database-management.js).
- SQL source: [`sql-queries.js`](../src/data/lessons/ict/sql-queries.js).
- Part order and stable boundaries: [`subject-roadmaps.js`](../src/data/subject-roadmaps.js).
- Both lessons registered in [`subject-lesson-registry.js`](../src/data/lessons/subject-lesson-registry.js).
- The first Access summary uses [`access-summary.js`](../src/ui/lesson/access-summary.js) for its four component cards, query operations and table illustration. Its visible content is not solely the raw Markdown.
- Relationship sentences become responsive diagrams through [`lesson-summary.js`](../src/ui/lesson/lesson-summary.js).

Seven Access parts preserve the existing first two reference parts, then teach keys, the educational center, integrity, the engineering office, and hospital/transfer practice. Eight SQL parts separate introduction, selection/order, conditions, joins, count/parameters, update, insert/append and delete. New engineering and count/parameter parts separate distinct applications without renaming existing IDs.

## Access: summaries and questions

Question and summary identifiers below refer to the Access source unless otherwise stated.

| Book pages | Instructional content | Summary ID | Practice IDs |
|---|---|---|---|
| 3 | DBMS storage, insertion, deletion, update, retrieval, reporting | `dbms-responsibilities` | `dbms-task-check`, `access-query-operations-check`, `access-report-display-check` |
| 3 | Access, SQL Server, Oracle, MySQL; common SQL language; textbook licensing statement; why Access; Office suite | `dbms-responsibilities` | `access-software-examples-check`, `access-shared-language-check`, `access-license-check`, `access-choice-check`, `access-office-check` |
| 3 | Six characteristics: related tables; one `.accdb` file, 2 GB, file-loss consequence; import/export; access rights; concurrent network use; administrator control | `dbms-responsibilities` | `access-characteristics`, `access-tradeoff-check`, `access-file-facts-check`, `access-exchange-check`, `access-security-check`, `access-network-check`, `access-admin-check` |
| 4 | Tables/entities, fields/columns, records/rows; queries retrieve and operate on records/fields/tables; forms add/edit/delete; reports display/print; further components exist | `dbms-responsibilities` plus visible component cards | `access-table-structure-check`, `access-entity-check`, `access-query-operations-check`, `access-form-delete-check`, `access-report-display-check`, `access-other-components-check` |
| 4–5 | Open Access; blank database; file name/location/Create; distinguish file, table, field, record; workspace | `row-column-check` | `access-create-file`, `access-save-table`, `field-data-types` |
| 6–7 | Design View versus Datasheet View; fields/types; meaningful table name, save, enter records, change design | `row-column-check` | `access-design-view`, `access-save-table`, `access-enter-record`, `access-change-design` |
| 6 | English field names ease SQL; optional Description | `row-column-check` | `access-english-fields`, `access-field-description` |
| 6 | Text 255, Memo 65536 in book; Date/Time; smallest sufficient type; text identifiers versus numeric quantities | `row-column-check` | `data-type-fill`, `access-date-type`, `access-text-capacity`, `access-memo-capacity` |
| 6 | Numeric sizes: Byte 1, Integer 2, Long Integer 4, Single 4, Double 8 bytes; fractional types | `row-column-check` | `access-number-sizes`, `access-single-byte` (including its explanation) |
| 6 | AutoNumber; primary-key selection and icon; compound key selection; remove key using same command | `row-column-check` | `access-enter-record`, `access-primary-key-action`, `access-composite-key`, `access-remove-key` |
| 6, 8–11 | Primary, foreign, compound keys; unique/nonempty identity; repeated foreign keys; relationship directions; junction tables | `primary-key-truth` | `relationships-cardinality`, `primary-key-null`, `foreign-key-repeat`, `relationship-one-one`, `relationship-junction` |
| 11 | School has separate-shift directors; cars and drivers both permit multiple associations | `primary-key-truth` | `relationship-school-shifts`, `relationship-type-check` |
| 8–10 | Center: complete student/course/training schema, all key roles, Class and course-code text, date type, junction purpose | `junction-key-check` | `schema-design-bug`, `education-center-key-check`, `center-field-types`, `center-class-type`, `center-foreign-keys` |
| 9–10 | Center: valid sample records and ERD; link original records through their keys | `junction-key-check` | `center-valid-record`, `center-erd` |
| 7–8 | Database Tools/Relationships, Show Table/Add, drag primary to foreign, enforce integrity/Create, repeat links, Hide Table | `access-build-order` | `access-build-sequence`, `relations-show-table`, `relations-drag-key`, `relations-create-integrity`, `relations-hide` |
| 8, 11 | Integrity purpose; compatible fields; reject absent parent; create parent before dependent data; effects on related records | `access-build-order` | `referential-integrity-check`, `relations-types`; SQL `sql-delete-referential-check` revisits deletion |
| 10 activity 1 | Engineering office: departments, engineers, projects, workers; engineer specialties; department–engineer and project–worker 1:M | `engineering-office-summary` | `engineering-entities`, `engineering-engineer-key`, `engineering-worker-relation`, `engineering-specialty` |
| 10 activity 1 | Department–project M:N junction; proposed fields/keys; ERD; build, populate and test | `engineering-office-summary` | `engineering-junction-key`, `engineering-insert-order`, `engineering-entities` |
| 11 hospital | Full patient/room/drug/patient-drug schema and attributes; primary/foreign keys; compound key | `hospital-schema-response` | `hospital-relationship-check`, `hospital-foreign-keys`, `hospital-attributes` |
| 11 hospital | ERD, patient–room direction, patient–drug M:N, quantity as relationship attribute, duplicate compound key | `hospital-schema-response` | `lesson-recap`, `hospital-room-direction`, `hospital-quantity`, `hospital-duplicate-pair` |
| 34 | Seat number repeats across years; school-library student identity; normalization reduces repetition and update/insert/delete problems | `hospital-schema-response` | `unit-seat-year`, `unit-library-student`, `unit-normalization` |

Two older questions (`access-components`, `component-purpose-check`) remain in the original source as reserved side quests through the existing centralized filter. The published component questions listed above cover their teaching goals; reserved questions are not counted as published coverage.

## SQL: summaries and questions

All identifiers in this table refer to the SQL source.

| Book pages | Instructional content | Summary ID | Practice IDs |
|---|---|---|---|
| 12, 33 | SQL's purpose: request results without implementation details; especially relational databases; DDL/DCL/DML categories and their functions | `sql-introduction-summary` | `sql-purpose-check`, `sql-ddl-check`, `sql-dcl-check`, `sql-dml-check` |
| 13 | SELECT, UPDATE, INSERT INTO, DELETE | `sql-introduction-summary` | `sql-dml-check`, `sql-review-choose-operation-check` |
| 13–15 | Query design/wizard; add tables/fields; Show default, Sort, Criteria; hide a field while using it; save/run/edit/SQL View; design/SQL equivalence | `sql-introduction-summary` | `sql-design-hidden-field-check`, `sql-design-view-check` |
| 16–18 example 1 | SELECT selected columns/FROM, `*`, all rows without WHERE, temporary result versus source | `sql-select-order-summary` | `sql-select-fields-check`, `sql-select-star-check`, `sql-result-table-check` |
| 16, 18–20 example 2/activity 2 | ORDER BY, ASC/DESC, ascending default within ORDER BY, multiple-field priority, descending wage activity | `sql-select-order-summary` | `sql-order-desc-check`, `sql-default-order-check`, `sql-multiple-order-check` |
| 18 activity 1 | Select all project fields with department 2 condition, using the activity's explicitly simplified schema | `sql-where-conditions-summary` | `sql-where-department-check` |
| 19–21 example 3/activity 3 | WHERE and clause order; six comparison operators; cost below 2500000; above 2500000 with ascending order | `sql-where-conditions-summary` | `sql-where-boundary-check`, `sql-not-equal-check`, `sql-where-order-activity-check`; `sql-update-threshold-check` exercises `>=` |
| 14–15, 25 | AND requires all, OR at least one; numbers/text/date notation in Access | `sql-where-conditions-summary` | `sql-and-check`, `sql-or-check`, `sql-value-notation-check` |
| 21–23 example 4 | Engineer/department query, foreign-primary equality, table-qualified field names, absent-join error | `sql-related-tables-summary` | `sql-join-key-check`, `sql-qualified-field-check`, `sql-join-missing-check`, `sql-join-filter-check`, `sql-join-result-check` |
| 23 activity 4 | Worker/project names for projects supervised by department 2, with department-project junction | `sql-related-tables-summary` | `sql-worker-project-activity-check` |
| 23–24 example 5 | COUNT of project primary keys; result 3; AS result-column alias | `sql-count-parameters-summary` | `sql-count-projects-check`, `sql-count-alias-check` |
| 24–25 example 6 | User-supplied project number selects all fields, at most one result | `sql-count-parameters-summary` | `sql-parameter-select-check`, `sql-parameter-primary-key-check` |
| 25 activity 5 | Decorator engineers hired after user-supplied date | `sql-count-parameters-summary` | `sql-parameter-date-activity-check`, `sql-and-check` |
| 25–27 | UPDATE/SET/WHERE, multiple assignments, condition field may differ, GUI conversion, 10% increase only for wages >=20 | `sql-update-queries-summary` | `sql-update-command-check`, `sql-update-percent-check`, `sql-update-threshold-check`, `sql-update-different-field-check` |
| 34 SQL question | Two parameters update student number AND average; missing WHERE targets all, uniqueness may reject | `sql-update-queries-summary` | `sql-unit-update-parameters-check`, `sql-update-no-where-check` |
| 27 | INSERT columns/VALUES, matching count/order/types, punctuation/quoted text/date; complete engineer example; primary/foreign/type failures | `sql-insert-queries-summary` | `sql-insert-order-check`, `sql-insert-primary-key-check`, `sql-insert-foreign-key-check`, `sql-insert-type-check` |
| 28–29 | Append SELECT from depart_2 into department_tbl; source/target, compatible fields/types/order/keys, GUI conversion | `sql-insert-queries-summary` | `sql-append-direction-check`, `sql-append-compatibility-check` |
| 30–33 | DELETE with/without WHERE, parameter department deletion, saved/run GUI procedure, records removed but structure stays | `sql-delete-review-summary` | `sql-delete-where-check`, `sql-delete-all-check`, `sql-delete-parameter-check` |
| 16, 25–33 | Missing WHERE consequences; reference constraints; distinguish operations and review intended target | `sql-delete-review-summary` | `sql-delete-referential-check`, `sql-review-choose-operation-check`, `sql-review-safe-target-check` |

The book names DCL and describes permissions; it does **not** teach GRANT/REVOKE command syntax. Similarly, it describes DDL's role without requiring CREATE/DROP exercises. Those additional topics are not silently added to the assessed syllabus.

## Corrections and explicit assumptions

- **Center record, p10:** the printed training example puts a student name in the course-code position. The lesson uses matching student/course keys `(111, A101)` with a date.
- **Schema inconsistency, p18 versus pp10/23:** the simple department filter assumes `project_tbl.dep_num`; the fuller engineering model has a department-project junction. The SQL lesson labels the former as the activity's simplified schema, then uses `dep_proj` for the many-to-many application. Junction field names are explicitly introduced as this solution's choices. The screenshot-verified worker link is `employee_tbl.proj_num = project_tbl.proj_no`.
- **No implicit SQL sort guarantee:** the book's Access display observation is distinguished from an explicit ORDER BY guarantee.
- **SQL spelling:** examples use valid `SELECT *` rather than the book's `SELECT (*)` and correctly ordered LTR comparison operators.
- **Update arithmetic, p26:** 22 × 1.1 = 24.2 before integer rounding; the book screenshot shows 24. The lesson explains the distinction.
- **INSERT, p27:** the sample's date conflicts with the stated task and its email lacks quotes. The lesson uses the task's 1 February 2019 as `#2019-02-01#` and quotes the email.
- **Unit UPDATE, p34:** both values are user input; the absence of WHERE is retained and its all-record/duplicate-key consequence explained.
- **Version-bound facts:** textbook licensing and Memo limits are identified as textbook facts. AutoNumber generation is distinguished from key designation and from record counting.

## Verification boundary

This document is a source-to-content trace. Browser screenshots, interaction checks, and the independent critic's scores are separate evidence. The matrix does not certify their results. Re-check referenced IDs whenever lesson content changes; do not treat a stale matrix as proof of coverage.

## Completed implementation checks

On 2026-09-09, `npm test` passed all 170 tests, `npm run check:types` and `npm run build` passed, and `npm run test:browser` passed against the final renderer. The focused question-layout browser check also passed.

`node scripts/browser-unit1.mjs` traversed all 15 parts and 121 MCQs at 1280×900 and 390×844, checking answers, feedback, completion, question-only progress, and visible table/code content. Focused reruns after the final edits passed for `UNIT1_PART=education-center` and `UNIT1_PART=update-queries`; the latter checks the visual ordering of Arabic SQL assignment targets and input values. Evidence is in `/tmp/unit1-verification/`.

All 49 published step IDs observed at the start of this task remain present. The independent critic passed round 3 with every per-part score above 8.5 and zero identified review errors; see [the full review](UNIT1_REVIEW.md).
