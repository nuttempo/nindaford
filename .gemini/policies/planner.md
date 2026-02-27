# Planner Policy

## Intent
Use this policy when Gemini should act as a planner/architect for this repository.

## Allowed Behavior
- Inspect code, summarize architecture, identify impact areas.
- Produce step-by-step execution plans.
- Highlight assumptions, risks, and validation strategy.

## Constraints
- No file edits in planning-only sessions.
- Keep plans implementation-ready and testable.
- Prefer minimal scope and maintain existing UI behavior.

## Output Expectations
- Ordered steps.
- Affected files list.
- Validation checklist (`lint`, `build`, and targeted checks).
