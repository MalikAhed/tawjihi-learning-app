# Noto Sans Arabic

Locally supplied variable web font (weights 400–900), downloaded 6 September 2026 from Google Fonts. The Arabic and Latin subsets are kept as supplied; the UI uses both through one family. Other glyphs fall back to Tahoma, Arial, and the system sans-serif family.

Copyright 2022 The Noto Project Authors. Distributed under the SIL Open Font License 1.1; see [OFL.txt](OFL.txt).

Source family and license: https://github.com/google/fonts/tree/main/ofl/notosansarabic

Web font files:

- Arabic: https://fonts.gstatic.com/s/notosansarabic/v33/nwpCtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlj4wv4r4xA.woff2
- Latin: https://fonts.gstatic.com/s/notosansarabic/v33/nwpCtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlj41v4o.woff2

`src/styles/base.css` owns the font faces, coverage ranges, and global typography roles. The preload in `index.html` starts loading both subsets before the first view. Fonts use `swap`, keeping content readable if a font request fails.
