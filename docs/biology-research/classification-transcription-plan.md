# Gaza biology classification booklet: transcription and answer-audit plan

Research date: 2026-10-05. This plan covers the downloaded Gaza question-classification booklet and its model-answer pages. It is an extraction/audit record, not a republication of the booklet.

## Source record and provenance

| Field | Value |
|---|---|
| Local source | `/tmp/gaza-biology-research/gaza-review-3.bin` |
| File type | PDF 1.7; Microsoft Word 2010 creator/producer |
| Printed date in file | 2023 |
| Page count / size | 136 pages; 4,633,410 bytes |
| SHA-256 | `334a65d5d00e3ee368c131f8cc07f83bdb8005ef6999dafedfce8aa40db11b04` |
| Public lead | Telegram question-classification post: <https://t.me/s/tawjihi_pal/277>; its linked Drive file is `https://drive.google.com/file/d/1Ih0eyqTk1KLgCnfuagrtBJw3SZ80CeqL/view?usp=drivesdk` |
| Stated provenance | The opening credits name Gaza biology supervisors/teachers and `فريق المتابعة الوزاري`; the introduction says the Ministry classified previous Tawjihi questions by the prescribed topics and supplied model answers. |
| Reliability tier | **B for distribution/provenance, A/B for individual wording/answers after visual verification.** The local PDF is a community-linked copy of a Ministry-branded booklet; retain the PDF hash and page evidence. It is not a substitute for the official Gaza pack or an official marking scheme. |

The contents page (printed p.4; PDF page 3) maps the question bank to printed pages 5–85 and the answer sections to pp.86, 101, 117 and 131. PDF pages 3 and 4 are in reverse front-matter order (PDF 3 shows printed p.4 contents; PDF 4 shows printed p.3 introduction). From printed p.5 onward, PDF page number and printed page number are the same. The machine `pdftotext` output misreads some page numerals (for example, printed 100 may extract as `611`); use the physical page footer or the inventory rather than extracted numerals.

## Scope map to preserve while transcribing

| Printed pages | Classification topic | Answer section |
|---:|---|---:|
| 5–23 | الوحدة الأولى: تدفق الطاقة (photosynthesis and cellular respiration) | 86–100 |
| 24–31 | الوحدة الأولى: من الجين إلى البروتين | 86–100 |
| 32–37 | الوحدة الثانية: قانون مندل في الوراثة | 101–116 |
| 38–59 | الوحدة الثانية: الصفات غير المندلية | 101–116 |
| 60–61 | الوحدة الثانية: تطبيقات في علم الوراثة | 101–116 |
| 62–68 | الوحدة الثالثة: الجهاز الهيكلي | 117–130 |
| 69–73 | الوحدة الثالثة: جهاز الدوران | 117–130 |
| 74–78 | الوحدة الثالثة: الجهاز المناعي | 117–130 |
| 79–82 | الوحدة الرابعة: البكتيريا | 131–136 |
| 83–85 | الوحدة الرابعة: الفيروسات | 131–136 |

The answer section is grouped by unit, not by page adjacency to each source item. An answer must therefore be linked by the source's topic heading, year, cycle and item number; never match only by page or by the option letter.

The repository's `source-archives/` and `learn/source-archives/` directories currently contain no biology/life-sciences past-paper PDF. The past-paper PDFs used for style and answer-source research are still in `/tmp/gaza-biology-research/` (notably `exam-2023-r1.pdf`, `exam-2024-r1.pdf`, `exam-2025-r1.pdf` and `ministry-questions-1997-2020.pdf`); keep those files' hashes with any future archive import.

| Local PDF | Pages | SHA-256 (source identity) | Transcription policy |
|---|---:|---|---|
| `exam-2023-r1.pdf` | 6 | `1e72cf3740ca21349f2d26398f9996259016384a8755abfed99b82c5709adefe` | Official-paper scan lead; retain date/session and page/figure crops. |
| `exam-2024-r1.pdf` | 4 | `4f11e32a8e02694c897f5249693bf359b979b081aae47890b2c8467aa22d02a2` | Official-paper scan lead; cross-check any teacher solution against the printed question. |
| `exam-2025-r1.pdf` | 5 | `ed9a2063c9a72d207a1485934145d7609c81f442e623557a9f862d44d157b25d` | Standard first-session scientific paper; tag separately from Gaza electronic cohorts. |
| `ministry-questions-1997-2020.pdf` | 103 | `ef46a7873725f1c7a79718386509639d892f5b1dd33cacb033892d6f12ee45b0` | Teacher compilation with answers; useful solved lead, never an official key by itself. |
| `biology-800-mcq.pdf` | 61 | `5620332ddb08089deecc58ca3d22e2ee7fd3f71c6de611af4904607d701c8db5` | Candidate-only MCQ bank; no answer key was found locally, so mark answers `unsolved` until independently resolved. |

## Extraction audit

`pdftotext -layout` was run against all 136 pages and saved as [`/tmp/gaza-biology-research/gaza-review-layout.txt`](file:///tmp/gaza-biology-research/gaza-review-layout.txt). It returns 440,568 characters, including 141,555 Arabic code points, 5,398 Latin characters (biology symbols and formulas), no replacement characters (`U+FFFD`), and 33,346 bidirectional/format controls. It also emits large numbers of nonstandard Arabic code points (`U+063B`, 9,867 occurrences; `U+063F`, 1,653 occurrences) and tatweel/fragmented words such as `تحمؿ`, `الحمقػي` and `اللكتركني`. The page rendering itself is legible Arabic; the Unicode text layer is therefore suitable for search, rough segmentation, page indexing and locating years/option labels, but **not for verbatim publication**.

Use the text layer for candidate extraction only. Every Arabic stem, option, number, unit, gene symbol, subscript/superscript and answer must be checked against a rendered page before it enters app content. Do not “correct” a malformed extracted word by intuition when the page image is available.

The booklet contains embedded page backgrounds and many small JPEG/bitmap/vector figures. The page inventory records non-background assets and visual-language triggers in [`classification-page-inventory.csv`](./classification-page-inventory.csv). The following question pages should receive a rendered crop review before transcription:

```
6, 7, 8, 9, 11, 12, 13, 14, 18, 19, 20, 21, 22, 23, 24, 25, 26,
28, 29, 30, 31, 39, 41, 42, 43, 45, 49, 53, 54, 56, 58, 59, 61,
63, 64, 65, 66, 69, 71, 72, 77, 78, 79, 80, 81, 82, 83, 84, 85
```

These include Calvin-cycle/light-response graphs, respiration pathways, transcription/translation sequences, genotype tables and maps, skeletal/heart diagrams, immune-cell figures, bacterial structures/shapes and virus diagrams. Pages without a trigger or embedded asset still need a full-page visual check because a vector drawing or a malformed text layer can evade the detector.

For a practical work queue, review the crops in this order:

| Queue | Printed pages | Expected visual material |
|---|---:|---|
| Energy flow | 6–14, 18–24 | light-response/absorption graphs, light-reaction and Calvin-cycle diagrams, respiration pathway figures and data tables |
| Gene → protein | 25–31 | transcription/translation figures, codon/anticodon strings and sequence tables |
| Genetics | 39, 41–45, 49, 53–54, 56, 58–61 | blood/genotype tables, crosses, pedigree or linkage maps, gene-technology figures (scope-check before import) |
| Skeleton and circulation | 63–66, 69, 71–72 | rib/vertebra/bone-shape figures and heart/chamber/valve diagrams |
| Immune system | 77–78 | antibody/immune-cell structures and response diagrams |
| Bacteria and viruses | 79–85 | bacterial shape/structure figures and virus form/replication diagrams |

The queue is intentionally broader than the embedded-image detector: question pages 15–17, 27, 32–38, 40, 46–48, 50–52, 55, 57, 60, 67–68, 70, 73–76 may still contain a vector or text-built table and should be visually checked before marking them “text only.”

The model-answer pages with a detected figure/table asset or visual-language trigger are:

```
87, 88, 89, 90, 91, 92, 94, 96, 99, 100, 104, 105, 107, 110, 111,
112, 114, 115, 118, 119, 125, 131, 132, 133, 134, 135, 136
```

All answer pages 86–136 must still be read visually. A page marked “no embedded visual trigger” can contain a text-built Punnett square/table, line breaks that carry meaning, or a key row whose answer letter is separated from its year/cycle.

For answer-page cropping, treat **pp.101–116 (the entire genetics answer section)** as a table/cross review queue even when `pdfimages` reports no bitmap: several crosses, genotype grids and linkage maps are drawn with text and vector lines. In the human-systems and microorganism keys, add a crop whenever the answer resolves a label or numbered figure on pp.118–119, 125, 131–132 or 135–136; the inventory flags these pages, while the remaining pages can usually be archived as full-page verification images.

## Reproducible page and crop procedure

1. Keep the source hash above. Use the printed page number in all IDs; store the PDF page separately. The only page-number exception is the p.3/p.4 front-matter swap described above.
2. Extract one page at a time with `pdftotext -layout -f N -l N`; retain that raw text as audit material. Strip only direction marks/tatweel for searching; do not use the stripped string as final Arabic.
3. Segment each page by the visible topic heading and item number. A source item may span a page break. Carry the same `source_question_id` until the next visible number/topic heading.
4. Record the year and cycle exactly as printed (`دورة أولى`, `دورة ثانية`, `دورة ثالثة`, `تجريبي`, etc.). Keep Western/Arabic digits as shown in the source record and add a normalized numeric `exam_year` only as a separate field.
5. Render the original PDF page at 250–300 dpi. For a figure/table/genetics grid, crop the smallest rectangle that includes all labels, axes, legends, arrows and units. Keep a full-page render too. Use stable names such as `classification-p013-q15-figure.png`; never overwrite crops from another source.
6. Transcribe Arabic manually from the rendered page. Preserve wording, punctuation, options (أ/ب/ج/د), symbols, primes (`5′`, `3′`), subscripts, superscripts, allele case and units. Mark any unreadable glyph `⟦needs_visual_review⟧` rather than guessing.
7. Read the corresponding answer section visually. Store the answer page and answer-row text; distinguish an official-looking model answer from an independent re-solve. If an answer disagrees with the Gaza pack or a second key, set `answer_status=conflict` and keep the item blocked.
8. Independently re-solve calculations, crosses and sequence questions. For a derived app question, cite the source item but write new wording/options rather than copying a whole page or malzamah.
9. Run a final scope check against the official Gaza pack. A classification item that belongs to a full Palestine/West Bank chapter absent from the reduced pack is tagged `out_of_gaza_scope` even if the booklet contains it.

Example render command:

```bash
mkdir -p /tmp/gaza-biology-research/classification-renders
pdftoppm -f 13 -l 13 -png -r 300 \
  /tmp/gaza-biology-research/gaza-review-3.bin \
  /tmp/gaza-biology-research/classification-renders/p013
```

## Required transcription record

Use JSONL/CSV rows (one row per source question or written subpart), with these fields:

```text
source_question_id       # e.g. classbook-p013-q15
source_id                # gaza_classification_2023_hash334a...
document_title           # تصنيف نماذج امتحانات الثانوية العامة 2023م – العلوم الحياتية
pdf_page                 # physical PDF page index
printed_page             # printed footer page
unit, topic, lesson      # Arabic names plus normalized app tags
exam_year                # normalized integer, if printed
exam_cycle               # exact printed cycle phrase
question_number         # visible item number; preserve subpart numbering
question_kind            # mcq | written | calculation | diagram | table | cross
original_arabic          # visually checked prompt; no machine-only text
options_arabic           # ordered أ/ب/ج/د when present
figure_crop_path         # relative stable crop, or empty
answer_text_arabic       # visually checked model answer
answer_key_pdf_page      # 86–100, 101–116, 117–130 or 131–136
answer_provenance        # booklet_model_key | official_key | independent_resolve | conflict
answer_status            # verified | needs_second_key | conflict | blocked
scope_status             # in_gaza_pack | extension | out_of_gaza_scope
verification_notes       # formulas, ambiguity, source disagreement, etc.
```

For model answers, `answer_key_pdf_page` is mandatory. For a multi-part source item, either keep one row with structured subparts or use child IDs (`classbook-p013-q15-a`, `…-b`) that all retain the same year, cycle and figure crop. Do not collapse distinct cycles with identical stems into one record.

## Answer-key audit gates

- **Unit 1:** question pages 5–31 must resolve to answer pages 86–100. Confirm ATP/CO₂/NADPH conventions against the Gaza pack before accepting numeric keys.
- **Unit 2:** pages 32–61 resolve to 101–116. For crosses, verify allele dominance, chromosome location, linkage assumption, sex conditioning and whether the key reports genotype or phenotype.
- **Unit 3:** pages 62–78 resolve to 117–130. For heart and skeleton figures, verify every label against the rendered source; do not infer from a cropped arrow.
- **Unit 4:** pages 79–85 resolve to 131–136. Check bacterial shape versus arrangement and virus genome versus capsid/envelope terminology.
- If the key gives only a letter for an MCQ, preserve that letter plus a decoded option after visual checking. If the answer row is clipped or detached by extraction, set `needs_second_key`.
- A solved item is publishable only after source wording, year/cycle, figure, model-key row and independent reasoning agree. The model key is evidence, not automatic truth.

## What can be trusted from automation

- Page boundaries, topic headings, printed years/cycles and rough item segmentation: **high after visual spot check**.
- Detection of pages likely to contain a figure/table: **high recall, not complete**; vector/text-built tables require manual review.
- Arabic verbatim text, answer letters, equations and diagram labels from the Unicode layer: **not reliable without visual comparison**.
- Answer assignment across sections: **unsafe to automate by page order**; use topic + year + cycle + item number and record the answer page.

The inventory is the audit index; the downloaded PDF and rendered crops are the evidence. Keep this plan and the CSV alongside any generated question dataset so a reviewer can trace every MCQ/flashcard back to its printed source without republishing the complete booklet.
