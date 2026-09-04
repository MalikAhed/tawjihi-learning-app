# P1 current route and state map

This map follows Malik's simplified entry/account decision dated 2026-09-03. It supersedes the earlier
visitor preview and verification route map.

## Current experience

```text
Selection
   ↓
Existing `?page=learn` subject map ─→ Subject status
   ↕
Create account / Sign in
   ↓
Existing `?page=learn` subject map
```

Selection, successful account creation, and successful sign-in all finish at the same Subjects Home.

## Active routes

| Route | Purpose |
|---|---|
| `entry` | Choose place/curriculum and path |
| `?page=learn` | Existing vibrant eight-subject map and the current account state |
| `?subject={id}` | Existing vibrant subject in-progress or blocked state |
| `register` | Create a free account with username, email, phone, and password |
| `sign-in` | Sign in with username, email, or phone plus password |

The only new flow routes are `entry`, `register`, and `sign-in`. Old preview, verification, recovery,
orientation-handoff, replacement-Home, and separate account-state routes are not in the active router.

## Account types

| Type | Home behavior |
|---|---|
| `guest` | Sees all subjects plus Create account and Sign in |
| `free` | Sees all subjects and the free-account label |
| `subscribed` | Sees all subjects and the subscribed-account label |
| `banned` | Sees all subjects with a clear restriction; subject access is blocked |

Internal content or access staff are roles, not additional student account types.

## Shared Home rules

- Always shows the same eight-subject structure.
- Contains no streak, rank, level, day, challenge, or decorative background-image UI.
- Every subject is clickable and currently reports `قيد التقدم`.
- Guests have only Create account and Sign in account actions in the top header.
- Changing place/path returns to `entry`; it does not open a custom ICT visitor page.

## Prototype service boundary

`src/services/prototype-service.js` owns the temporary selection and account-type behavior. It exposes
dummy free, subscribed, and banned credentials for frontend testing. No database, real authentication,
verification message, or backend exists in Phase 1.
