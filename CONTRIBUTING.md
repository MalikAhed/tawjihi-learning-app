# Contributing

## Branches

Create focused branches from `main` using a short prefix:

- `feature/` for planned product behavior
- `fix/` for defects
- `docs/` for documentation
- `chore/` for tooling and maintenance

Do not commit directly to `main` for normal feature work.

## Before opening a pull request

1. Confirm that the change belongs to the current release scope.
2. Keep learner-facing behavior aligned with the applicable product decision or user story.
3. Add tests for new states and critical alternate paths.
4. Run `npm run ci`.
5. Check Arabic RTL, keyboard operation, mobile layout, and reduced motion when UI is affected.
6. Do not include local databases, account data, secrets, generated screenshots, or exported archives.

## Pull requests

- Keep each pull request focused on one product outcome.
- Explain the user-visible result and the story or decision it implements.
- List the validation performed.
- Include screenshots for meaningful UI changes, but do not commit temporary review screenshots unless they are intentional project artifacts.
- Call out provisional assumptions and unresolved product decisions explicitly.

## Commit messages

Use concise imperative messages, for example:

```text
Add ICT lesson resume state
Fix Arabic roadmap access labels
Document payment correction flow
```
