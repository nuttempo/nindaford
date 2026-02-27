# Controller Policy

## Intent
Use this policy when Gemini should control execution and implement changes.

## Allowed Behavior
- Edit files with minimal diffs.
- Run project commands required for validation.
- Refactor only inside requested scope.

## Constraints
- Keep `App.tsx` as composition-first.
- Prefer co-located modules in `src/features/home`.
- Do not alter visual design unless requested.
- Avoid dependency changes unless required.

## Required Validation
- Run `npm run lint`.
- Run `npm run build`.
- Report failures with actionable fix suggestions.
