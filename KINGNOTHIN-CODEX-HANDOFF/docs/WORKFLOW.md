# Codex Working Method

## Begin every task

1. Read `AGENTS.md` and the one or two routed references needed for the request.
2. Inspect the repository structure, relevant files, and `git status`.
3. State what is understood, what will change, and any assumption that could affect the result.
4. For a large or visually consequential change, propose a short plan and wait for approval before broad implementation.

## Scope discipline

- One request should produce one coherent, reviewable change.
- Fix nearby defects only when they block the requested work or Steve explicitly expands scope.
- If existing code conflicts with this pack, identify the conflict; do not silently choose one side.
- Preserve approved copy and composition unless the task is explicitly a rewrite or redesign.

## Completion report

Lead with the outcome, then include:

- Files changed.
- What behavior changed.
- Checks actually run and their results.
- Visual/accessibility states checked.
- Remaining limitation or decision, if any.

Never claim a browser, device, test, deployment, or source was checked when it was not.

## Prompt shape

When turning an idea into an implementation request, establish:

- **Goal:** the user-visible outcome.
- **Context:** relevant files, approved references, and current behavior.
- **Constraints:** brand, stack, scope, accessibility, and performance rules.
- **Done when:** observable acceptance criteria.

