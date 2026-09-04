# Product decision — simplified entry, Home, and accounts

**Decision owner:** Malik
**Date:** 2026-09-03
**Status:** Current implementation direction; the affected locked story files still need matching revisions.

This direct product decision supersedes conflicting entry/account behavior in the current story packet:

- After choosing place/curriculum and path, every user goes directly to the existing vibrant Learn page
  at `?page=learn`; no replacement Home design is allowed.
- Guests see only **Create account** and **Sign in** account actions in the Home header. Rank, streak,
  levels, days, and other account/gamification indicators are absent.
- The only student account types are `guest`, `free`, `subscribed`, and `banned`. Internal staff remain
  roles, not additional student account types.
- Account creation is a one-question-at-a-time onboarding flow in this order: preferred name/username,
  curriculum, academic path, email, password, and optional phone number.
- Curriculum offers Gaza and Palestine as visual map cards. Academic path offers Scientific and
  Literary in Arabic.
- Phone number is optional; username, curriculum, path, email, and password are required.
- The landing header does not show a language selector.
- Account creation is immediate in the prototype. There is no email/SMS verification-code step.
- Sign in accepts username, email, or phone number plus password.
- Selection, successful registration, and successful sign in all end at the existing `?page=learn`
  subject map.
- A banned account still lands on the subjects Home, where the restriction is explained and subject
  access is blocked.
- New entry and account UI must reuse the established product design language. It must not replace the
  subject map with a separately designed card system.

The detailed stories and approved/locked artifacts must be revised to match this decision before backend
contracts are frozen.
