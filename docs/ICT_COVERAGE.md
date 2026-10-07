# ICT question coverage

## Active questions-only course

The 2024 Gaza Scientific/Industrial textbook defines five lessons with **246 questions**, ordered by book topic, then MCQs before written applications. `exam-lessons.js` selects questions only; teaching videos and summaries remain in source. `subject-question-progress.js` counts solved questions across preserved part records, excluding wrong attempts, retired IDs and developer skips.

| Textbook lesson | Printed book pages | Supplied mock papers | Textbook exercises | Earlier past-paper excerpt | New from complete collection | Total |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Database management | 3–11, unit review 34 | 31 | 5 | 4 | 22 | 62 |
| SQL queries | 12–34 | 45 | 0 | 2 | 12 | 59 |
| Smartphone operating systems | 36–42 | 19 | 0 | 3 | 14 | 36 |
| My mobile app | 43–53 | 22 | 2 | 3 | 34 | 61 |
| Upper OSI layers | 55–60 | 0 | 3 | 19 | 6 | 28 |

Original PDFs are in the separate reference archive; identities remain in `src/data/lessons/ict/source-documents.json`. Active classified page links use lightweight images with SHA-256 provenance.

Sources checked through 2026-09-27:

- Supplied textbook (source archive), 62 PDF pages. Printed page = PDF page minus 2. This defines assessed scope; lower OSI layers, router configuration, robotics and additional Access form/report procedures are excluded.
- Supplied exams and keys (source archive), 86 scanned pages, first-semester 2024–25 directorate mock papers. These contain no OSI questions; they are not labelled national finals.
- [Classified past-paper collection](https://www.sh-pal.com/2022/12/2023.html): 17-page excerpt (source archive) of the 142-page source, including attribution and ministry supervision on p2. Selected questions cite 2019–2022 national sessions and labelled 2022 mocks, **not a 2023 final**. Original question pages 6, 17, 63, 73–74, 124–126 were checked against keys 36–37, 89, 91, 135–137 and the book.
- Complete classified collection (source archive), all 142 original PDF pages, SHA-256 `f98a49d719f0f7b5d26524ee7f6116b59d0c4bd3761163045abd635af2ce7685`. Every page was audited. Questions in current textbook scope are on PDF pages 6–31, 63–87, and 124–127; their printed keys are on pages 36–56, 89–103, and 135–138. Forms/report procedures, 3-D design, robotics, home networking, and lower OSI layers remain outside the five current lessons.

The excerpt preserves original pages. PDF links use excerpt positions; `originalSourcePage`/`originalAnswerPage` map them to the complete source.

Questions retain source numbers, book alignment and answer provenance in the data. Learner question screens show the question, choices or answer, and any original figure without explanation panels or source page tags. The 88 new questions are in `classified-unit1-bank.js`, `classified-unit2-bank.js` and `classified-osi-bank.js`. Figure questions show exact crops from the original PDF, including its embedded network-settings JPEG; they are not redrawn. Crop coordinates and hashes are in `classified-crops.json` and `classified-unit2-figures.json`; the OSI JPEG is the original embedded object (SHA-256 `f9d5e7f17d6cedd8f8d8c722f55ae6f93ee29704a8bc573c82926240a6605852`). Earlier figures retain `past-paper-sources.json` and `sources.json` provenance.

The full audit excluded repeated prompts and out-of-book topics. Several printed keys conflict with the visible question or block: SQL insertion on PDF page 20 lacks `VALUES` in the keyed choice; App Inventor `floor(55/4)` is 13, not 13.75; the pictured triangle-area branch at area 20 takes `≥20`; the pictured `25 ≥ 13` branch leaves the second label at 13; and the pictured calculation `((8²−4)/2)` is 30. Each retained conflict is explained beside its answer. The source does not specify cascade-delete settings for the publisher question, so that card gives the conditional outcomes instead of asserting automatic deletion.

Source corrections: App Inventor p74 question 20 has a labelled correction from the key's browser (د) to programmer (ب). The OSI MCQ retains original RPC spelling despite RCP in answer tables. Error-handling answers use the book's upper-layer context.

Legacy topic parts remain storage and review owners. Old introduction URLs redirect to the first question lesson; old lesson/part URLs remain valid. No account or stored completion IDs are deleted. The following sections document **retained historical teaching coverage**, not visible lesson steps.

## Sources and boundaries

- Access source: [`database-management.js`](../src/data/lessons/ict/database-management.js).
- SQL source: [`sql-queries.js`](../src/data/lessons/ict/sql-queries.js).
- Part order and stable boundaries: [`subject-roadmaps.js`](../src/data/subject-roadmaps.js).
- All five lessons registered in [`subject-lesson-registry.js`](../src/data/lessons/subject-lesson-registry.js).
- Historical teaching summaries remain in the original lesson sources. Their unused special renderers were removed from the questions-only app.
- Relationship sentences become responsive diagrams through [`lesson-summary.js`](../src/ui/lesson/lesson-summary.js).

Access proceeds from foundations and types to keys, integrity, the educational center, engineering office, and hospital/transfer practice. Eleven SQL parts retain those topics and add separate playlist lessons for sorting, question review, and practical review. New engineering and count/parameter parts separate distinct applications without renaming existing IDs.

## Access: retained teaching coverage

These tables trace retained lesson teaching. Old synthetic question IDs remain in source for preservation but are excluded from the active student course by `exam-lessons.js`. `exam-bank.js`, `book-practice.js` and `past-paper-bank.js` own active question provenance. Historical prerequisites and solving methods are preserved in the pre-cleanup snapshot and Git history.

| Book pages | Instructional content | Summary ID |
|---|---|---|
| 3 | DBMS storage, insertion, deletion, update, retrieval, reporting | `dbms-responsibilities` |
| 3 | Access, SQL Server, Oracle, MySQL; common SQL language; textbook licensing statement; why Access; Office suite | `dbms-responsibilities` |
| 3 | Six characteristics: related tables; one `.accdb` file, 2 GB, file-loss consequence; import/export; access rights; concurrent network use; administrator control | `dbms-responsibilities` |
| 4 | Tables/entities, fields/columns, records/rows; queries retrieve and operate on records/fields/tables; forms add/edit/delete; reports display/print; further components exist | `dbms-responsibilities` plus visible component cards |
| 4–5 | Open Access; blank database; file name/location/Create; distinguish file, table, field, record; workspace | `row-column-check` |
| 6–7 | Design View versus Datasheet View; fields/types; meaningful table name, save, enter records, change design | `row-column-check` |
| 6 | English field names ease SQL; optional Description | `row-column-check` |
| 6 | Text 255, Memo 65536 in book; Date/Time; smallest sufficient type; text identifiers versus numeric quantities | `row-column-check` |
| 6 | Numeric sizes: Byte 1, Integer 2, Long Integer 4, Single 4, Double 8 bytes; fractional types | `row-column-check` |
| 6 | AutoNumber; primary-key selection and icon; compound key selection; remove key using same command | `row-column-check` |
| 6, 8–11 | Primary, foreign, compound keys; unique/nonempty identity; repeated foreign keys; relationship directions; junction tables | `primary-key-truth` |
| 11 | School has separate-shift directors; cars and drivers both permit multiple associations | `primary-key-truth` |
| 8–10 | Center: complete student/course/training schema, all key roles, Class and course-code text, date type, junction purpose | `junction-key-check` |
| 9–10; summary 11 | Center: valid records and ERD; entities, attributes, relationships and underlined compound keys | `junction-key-check` |
| 7–8 | Database Tools/Relationships, Show Table/Add, drag primary to foreign, enforce integrity/Create, repeat links, Hide Table | `access-build-order` |
| 8, 11 | Integrity purpose; compatible fields; reject absent parent; create parent before dependent data; effects on related records | `access-build-order` |
| 10 activity 1 | Engineering office: departments, engineers, projects, workers; engineer specialties; department–engineer and project–worker 1:M | `engineering-office-summary` |
| 10 activity 1 | Department–project M:N junction; proposed fields/keys; ERD; build, populate and test | `engineering-office-summary` |
| 11 hospital | Full patient/room/drug/patient-drug schema and attributes; primary/foreign keys; compound key | `hospital-schema-response` |
| 11 hospital | ERD, patient–room direction, patient–drug M:N, quantity as relationship attribute, duplicate compound key | `hospital-schema-response` |
| 34 | Seat number repeats across years; school-library student identity; normalization reduces repetition and update/insert/delete problems | `hospital-schema-response` |

All original lesson and teaching-step IDs, URLs and account records remain. Historical completed question IDs survive curriculum updates; retired prompts are excluded from active review links rather than assigned new meanings.

## SQL: retained teaching coverage

Summary IDs below refer to the SQL source; active assessment uses the source bank.

| Book pages | Instructional content | Summary ID |
|---|---|---|
| 12, 33 | SQL's purpose: request results without implementation details; especially relational databases; DDL/DCL/DML categories and their functions | `sql-introduction-summary` |
| 13 | SELECT, UPDATE, INSERT INTO, DELETE | `sql-introduction-summary` |
| 13–15 | SQL equivalence: a field may sort results without being selected; viewing SQL differs from executing it. Query-interface menus are optional reference only under p12. | `sql-introduction-summary` |
| 16–18 example 1 | SELECT selected columns/FROM, `*`, all rows without WHERE, temporary result versus source | `sql-select-order-summary` |
| 16, 18–20 example 2/activity 2 | ORDER BY, ASC/DESC, ascending default within ORDER BY, multiple-field priority, descending wage activity | `sql-select-order-summary` |
| 18 activity 1 | Select all project fields with department 2 condition, using the activity's explicitly simplified schema | `sql-where-conditions-summary` |
| 19–21 example 3/activity 3 | WHERE and clause order; six comparison operators; cost below 2500000; above 2500000 with ascending order | `sql-where-conditions-summary` |
| 14–15, 25 | AND requires all, OR at least one; numbers/text/date notation in Access | `sql-where-conditions-summary` |
| 21–23 example 4 | Engineer/department query, foreign-primary equality, table-qualified field names, absent-join error | `sql-related-tables-summary` |
| 23 activity 4 | Worker/project names for projects supervised by department 2, with department-project junction | `sql-related-tables-summary` |
| 23–24 example 5 | COUNT of project primary keys; result 3; AS result-column alias | `sql-count-parameters-summary` |
| 24–25 example 6 | User-supplied project number selects all fields, at most one result | `sql-count-parameters-summary` |
| 25 activity 5 | Decorator engineers hired after user-supplied date | `sql-count-parameters-summary` |
| 25–27 | UPDATE/SET/WHERE, multiple assignments, condition field may differ, GUI conversion, 10% increase only for wages >=20 | `sql-update-queries-summary` |
| 34 SQL question | Two parameters update student number AND average; missing WHERE targets all, uniqueness may reject | `sql-update-queries-summary` |
| 27 | INSERT columns/VALUES, matching count/order/types, punctuation/quoted text/date; complete engineer example; primary/foreign/type failures | `sql-insert-queries-summary` |
| 28–29 | Append SELECT from depart_2 into department_tbl; source/target, compatible fields/types/order/keys, GUI conversion | `sql-insert-queries-summary` |
| 30–33 | DELETE with/without WHERE, parameter department deletion, saved/run GUI procedure, records removed but structure stays | `sql-delete-review-summary` |
| 16, 25–33 | Missing WHERE consequences; reference constraints; distinguish operations and review intended target | `sql-delete-review-summary` |

The book names DCL and describes permissions; it does **not** teach GRANT/REVOKE command syntax. Similarly, it describes DDL's role without requiring CREATE/DROP exercises. Those additional topics are not silently added to the assessed syllabus.

## Corrections and explicit assumptions

- **Center record, p10:** the printed training example puts a student name in the course-code position. The lesson uses matching student/course keys `(111, 101A)` with a date.
- **Schema inconsistency, p18 versus pp10/23:** the simple department filter assumes `project_tbl.dep_num`; the fuller engineering model has a department-project junction. The SQL lesson labels the former as the activity's simplified schema, then uses `dep_proj` for the many-to-many application. Junction field names are explicitly introduced as this solution's choices. The screenshot-verified worker link is `employee_tbl.proj_num = project_tbl.proj_no`.
- **No implicit SQL sort guarantee:** the book's Access display observation is distinguished from an explicit ORDER BY guarantee.
- **SQL spelling:** examples use valid `SELECT *` rather than the book's `SELECT (*)` and correctly ordered LTR comparison operators.
- **Update arithmetic, p26:** 22 × 1.1 = 24.2 before integer rounding; the book screenshot shows 24. The lesson explains the distinction.
- **INSERT, p27:** the sample's date conflicts with the stated task and its email lacks quotes. The lesson uses the task's 1 February 2019 as `#2019-02-01#` and quotes the email.
- **Unit UPDATE, p34:** both values are user input; the absence of WHERE is retained and its all-record/duplicate-key consequence explained.
- **Version-bound facts:** [MySQL Community uses GPL](https://www.mysql.com/products/community/): free of charge does not mean unlicensed. The textbook's Access permissions list is qualified: [`.accdb` lacks legacy user-level security](https://support.microsoft.com/en-us/access/what-happened-to-user-level-security). Memo limits remain textbook-scoped. AutoNumber generation differs from key designation and record counting.
- **Explicit conditions:** file-loss questions assume an irrecoverable file and no backup. The engineering junction question explicitly permits repeated departments and repeated projects. Square brackets can enclose field names and aliases as well as input parameters; context determines their meaning. UPDATE targets all matching records, though a stored value may already equal the assignment.

## Complete course and playlist mapping

The source retains 29 historical entries (one orientation and 28 topic parts) for stable URLs and progress ownership. They are presented as five question collections, not 29 student lessons. Original four-choice questions use MCQs; written SQL, explanations and diagrams use `exam-question` self-review. Figures enlarge in place and solutions open only on request.

**Historical video review (not active playback):** all 36 entries were checked afresh. Twelve automatic-caption tracks were retrieved; 24 were unavailable. Six course videos have reviewed speech (playlist 3, 4, 5, 10, 17, 35). The other **21 mapped videos are withheld from playback**, with their source references retained, until their boundaries can be reviewed. Source practice remains available; explanations are retained in source. The historical video review record and caption hashes are preserved in the pre-cleanup snapshot and Git history. A representative secondary yt-dlp check returned no caption tracks and only image formats; an alternate audio-format retrieval timed out. These are access limitations, not proof the videos have no audio.

Orientation begins at 702 seconds and skips `0–702,949–987,1047–1161,1328–1473,1528–1595`; its retained statements are historical guidance. Session begins at 413 seconds and skips `0–413`, including manual rewinds. Integer boundaries bracket reviewed automatic-caption transitions; they are not claimed to be word-aligned. The native player displays whether skipping is active or unavailable. API failure leaves a visible manual-skip notice.

Companion corrections: SQL-intro integrity does not automatically cascade deletion; foreign-key NULL depends on constraints; a compound key must be unique/nonempty; a junction is identified by the association it represents. Access foundations include all six textbook properties and component definitions even where the video omits them. The table below retains all original topic mappings; “unavailable” means no active playback, not a safe full-video recommendation.

Book column uses **printed pages**; summary column uses **PDF pages**. Opening a book link adds 2 to its printed page. For a discontinuous range, the source guide opens its first relevant page and labels the rest.

| Playlist # | Video | App part / scope decision | Book | Summary | Retrieved captions |
|---:|---|---|---|---|---|
| 1 | [Orientation](https://www.youtube.com/watch?v=JDDkWhZQu-Q) | Playlist orientation; no separate syllabus lesson | — | — | auto ar |
| 2 | [Summary links](https://www.youtube.com/watch?v=i6am9oZ1HdU) | Promotional summary links; no lesson | — | — | auto ar |
| 3 | [Historical skills overview](https://www.youtube.com/watch?v=d3gaYsONaIc) | `course-introduction/getting-started` (historical orientation) | Scope guide | Source guide | auto ar |
| 4 | [Relational databases](https://www.youtube.com/watch?v=tfiw7kPiOgc) | `database-management/access-basics`: recap follows the video’s tables, keys and linking examples; original Access recap saved in `src/data/lessons/ict/saved-summaries/access-basics-book-summary.md` | 3–8 | 3, 7–9 | auto ar |
| 5 | [Keys and relationships](https://www.youtube.com/watch?v=IkUsDbEslgQ) | `database-management/keys-and-relations` | 6–11 | 6–10 | auto en-US |
| 6 | [Key/relationship recap](https://www.youtube.com/watch?v=pPW7AfgLbPg) | `database-management/build-and-integrity` | 7–8 | 6–10، 17–19 | unavailable |
| 7 | [Database analysis I](https://www.youtube.com/watch?v=TocVVIQ1ERc) | `database-management/education-center` | 8–10 | 7–19 | unavailable |
| 8 | [Database analysis II](https://www.youtube.com/watch?v=k9aZkF-R8G0) | `database-management/engineering-office` | 10 | 7–19 | unavailable |
| 9 | [Access and data types](https://www.youtube.com/watch?v=vMfXFtOYoz0) | `database-management/tables-and-types` | 4–7 | 3–7 | unavailable |
| 10 | [SQL introduction](https://www.youtube.com/watch?v=GROuHEfqsak) | `sql-queries/sql-introduction` | 12–15 | 20، 27، 47 | auto ar |
| 11 | [SELECT I](https://www.youtube.com/watch?v=wFr0WN-UbQg) | `sql-queries/select-order` | 16–20 | 27، 31–32 | unavailable |
| 12 | [SELECT II](https://www.youtube.com/watch?v=ItzlolMqgFY) | `sql-queries/where-conditions` | 14–15، 18–21، 25 | 22، 28–29 | unavailable |
| 13 | [SELECT sorting](https://www.youtube.com/watch?v=7SNKW0d20WI) | `sql-queries/order-practice` | 16، 18–19 | 31–32 | unavailable |
| 14 | [SELECT across tables](https://www.youtube.com/watch?v=1-3OhKBpLE0) | `sql-queries/related-tables` | 21–23 | 33–34 | unavailable |
| 15 | [UPDATE](https://www.youtube.com/watch?v=O6l6QcHu6wk) | `sql-queries/update-queries` | 25–27، 34 | 35–38 | unavailable |
| 16 | [DELETE](https://www.youtube.com/watch?v=9-KD6vpyDuY) | `sql-queries/delete-review` | 30–33 | 39–40 | unavailable |
| 17 | [INSERT](https://www.youtube.com/watch?v=dIY8E8yLt_4) | `sql-queries/insert-queries` | 27–29 | 41–42 | auto ar |
| 18 | [SQL questions](https://www.youtube.com/watch?v=tfwizvmwyAo) | `sql-queries/sql-questions` | 12–33 | 20–43، المطابق | unavailable |
| 19 | [SQL practical work](https://www.youtube.com/watch?v=1PlyQ80dWDw) | `sql-queries/sql-practical` | 12–33 | 20–43، المطابق | unavailable |
| 20 | [Forms and reports](https://www.youtube.com/watch?v=nnzsRRp5tKw) | Detailed forms/reports workflows outside supplied book; definitions retained in Access | — | — | unavailable |
| 21 | [Android](https://www.youtube.com/watch?v=UX3Zyxt2zPQ) | `smartphone-operating-systems/android-features` | 36–40 | 56–58 | unavailable |
| 22 | [iOS](https://www.youtube.com/watch?v=t63ANNixm5s) | `smartphone-operating-systems/ios-files` | 40–42، 53 | 59–61 | unavailable |
| 23 | [App Inventor tools](https://www.youtube.com/watch?v=CVwK8gwlv2o) | `my-mobile-app/app-inventor-tools` | 43–44، 47–49 | 62–65 | unavailable |
| 24 | [App Inventor blocks](https://www.youtube.com/watch?v=VJHcUBHvNNI) | `my-mobile-app/app-inventor-blocks` | 44–46، 49–51 | 63–65، 67–68 | unavailable |
| 25 | [Weight-factor app](https://www.youtube.com/watch?v=1eH8PNtyca8) | `my-mobile-app/bmi-interface` | 43–46، 52 | 66–70 | unavailable |
| 26 | [Simple calculator](https://www.youtube.com/watch?v=bOotzHiK-hs) | `my-mobile-app/calculator-interface` | 47–51 | 71–74 | unavailable |
| 27 | [Advanced calculator](https://www.youtube.com/watch?v=7_8TQqE3UVI) | `my-mobile-app/calculator-events` | 52 | 78–79 | unavailable |
| 28 | [Unit project](https://www.youtube.com/watch?v=omnIYdW4-oo) | Wider-edition unit project outside supplied book (title/summary match) | — | — | unavailable |
| 29 | [App Inventor review](https://www.youtube.com/watch?v=0jvFwR5EesE) | `my-mobile-app/app-practice` | 43–53 | 77–86 | unavailable |
| 30 | [Exam samples](https://www.youtube.com/watch?v=K0Y1H7eIU5g) | Mixed historical exam; cannot verify book-only boundaries | — | — | unavailable |
| 31 | [2021 exam](https://www.youtube.com/watch?v=fn0dqwDo8gY) | 2021 exam covering the wider edition | — | — | auto ar |
| 32 | [2023 exam format](https://www.youtube.com/watch?v=nchfc0cGcIA) | 2023 exam-format discussion, not this package’s syllabus | — | — | auto ar |
| 33 | [3D drawing](https://www.youtube.com/watch?v=T1aMmWWw9-c) | 3D engineering drawing outside supplied book | — | — | auto ar |
| 34 | [Robot design](https://www.youtube.com/watch?v=9Jeo0QVois4) | Robot design outside supplied book | — | — | auto ar |
| 35 | [Session layer](https://www.youtube.com/watch?v=XuaOI_Tg6ao) | `osi-model-layers/upper-layers` | 55–57 | 96–98 | auto ar |
| 36 | [Presentation and application](https://www.youtube.com/watch?v=tzTULxoNAAs) | `osi-model-layers/presentation-layer` | 58–60 | 99–101 | unavailable |


The two additional source-only parts are `database-management/practice-and-review` (book 11,34; summary 19 and the matching unit question on 52) and `sql-queries/count-parameters` (book 23–25; selected summary 30–32). Summary 30–31 also discusses SUM/AVG/MAX/MIN; these are not added as required commands because only COUNT appears explicitly in the supplied package.

## Remaining textbook coverage

| Source topic | Book printed pages | Summary PDF pages | Lesson / question scope |
|---|---|---|
| Android features, transfer, sensors, VR/AR | 36–40 | 56–58 |
| iOS, native/hybrid apps, language/extension comparison | 40–42,53 | 59–61 |
| App Inventor interface, properties, events, variables | 43–51 | Selected 62–65,67–68 |
| Weight-factor program | 43–46,52 | 66–70 | Input units, squared denominator, trace branches and boundary values 20/25/30 |
| Calculator and calculator extension | 47–52 | 71–74,78–79 | Unary/binary operations, initialization, output, mod, power, square root, min, floor, digit construction |
| Application exercises | 52–53 | Selected 77–86 | Average, ordered conditions, enrollment, profit and output tracing; no ball/canvas project |
| Session layer | 55–57 | 96–98 | Transport recap; opening/closing sessions, duplex, cable example, authentication/authorization, checkpoints and listed protocols |
| Presentation and application layers | 58–60 | 99–101 | Formatting/encoding/compression/encryption, listed protocols and service selection, textbook end questions |

Summary pages 48–53 contain detailed forms/reports workflows; pages 75–76 and 80–81 contain ball/canvas projects; pages 87–95 cover CAD/robots; pages 102–114 cover router/home-network setup. These are outside this package. Mixed pages 52–54,62–65 and 77–86 are used only for individually matched concepts, not wholesale screenshots. Query GUI exercises on 21–26 and 44–46 are reference-only under the book’s printed 12 instruction. The textbook table of contents calls networking Unit 4 while its divider uses 3; the app preserves the existing Unit 4 identity and TOC label.

## Corrections and source handling

Original summary crops accompany accessible Arabic recaps. Incorrect source passages are excluded or corrected beside the crop. A foreign key does not automatically imply unrestricted NULL values; referential integrity does not automatically enable cascading deletion. The book’s INSERT date illustration is inconsistent with its prose; examples must use one consistent date. A 10% increase on 22 is 24.2 unless a storage type rounds it. The weight-factor exercise is assessed as programming, with its pictured ordered `<20`, `<25`, `<30`, `else` branches, not as health advice. Historical phone features and executable extensions are scoped to the textbook; app-store checks do not imply immunity to malware, and differing memory-management mechanisms do not mean iOS never frees memory.

Authentication follows book 57: confirming the credibility of transmitted information; permissions belong to authorization.

App Inventor source conflicts are stated where relevant: book 50 binary-mode prose hides unary controls, but its pictured block sets their visibility true; book 49 reset prose clears input boxes, while book 51 blocks only hide four groups, clear the result and reset variables. Book 52 repeats the same grade label for 70–79 and 80–89. Summary 73 incorrectly calls the power block multiplication; book 51 controls. Source practice includes calculator initialization, sensor functions and branch tracing; OSI practice uses the book's layer and protocol questions.

The PDFs are unmodified copies of the supplied files. SHA-256: book `4c9fbe32f1b76d840d213badacfb5b7830722d0e3569595a4f2b224544c64aba`; summary `51d3885f88b6f0fb9cb55ae081c9da941cd9a265ff345efaedc45bc504af8e6b`. The exam PDF SHA-256 is `4fdff8b18d8ce8c9dedec604e7e8738ad99b722397fe8ad7490f95a4f8c22ec1`; all three source PDFs remain bundled. Exam figure hashes, crop rectangles and per-page dispositions are in `assets/lessons/ict/exams/sources.json`. Unreadable or answer-marked figures were excluded, never reconstructed as original exam images. `assets/lessons/ict/summary/crops.json` records each lossless source crop’s page, PDF rectangle, renderer and hash. Temporary renders/transcripts are not shipped.

## Subtitle tools and reproducibility

Used [yt-dlp](https://github.com/yt-dlp/yt-dlp) for metadata/caption availability and [youtube-transcript-api](https://github.com/jdepoix/youtube-transcript-api) for timestamped public cues. [YouTube’s transcript view](https://support.google.com/youtube/answer/15930243?hl=en) is a manual alternative. Browser alternatives [DownSub](https://downsub.com/sites/youtube) and [Tactiq](https://help.tactiq.io/en/articles/9832255-how-to-use-tactiq-to-transcribe-youtube-videos) were blocked by verification/HTTP 403. A local [whisper.cpp](https://github.com/ggml-org/whisper.cpp) tiny-model trial produced unusable Arabic; no timestamps derive from it. These access failures do not prove transcripts cannot exist. The 21 mapped course videos without reviewed captions are withheld by the centralized policy.

```sh
yt-dlp --flat-playlist --dump-single-json 'https://www.youtube.com/playlist?list=PLfxpHP1wOTEglC13cxyi4yyEMUgFSNg2y'
yt-dlp --skip-download --list-subs 'https://www.youtube.com/watch?v=tfiw7kPiOgc'
yt-dlp --skip-download --write-subs --write-auto-subs --sub-langs 'ar.*,en.*' 'https://www.youtube.com/watch?v=tfiw7kPiOgc'
```

[Automatic caption quality varies](https://support.google.com/youtube/answer/6373554?hl=en). No caption track means further timestamped segmentation needs actual audio/video review or a new transcription; title-based guesses are insufficient. `tests/ict-course.test.mjs` checks the complete one-video mapping, source hashes/page bounds and timestamp provenance. The browser-question-course journey checks the published student question flow at desktop and mobile sizes.
