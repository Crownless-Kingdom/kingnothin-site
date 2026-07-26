# KINGNOTHIN Site Change Clearance

This file is the holding chamber between an idea and the live KINGNOTHIN site.

Potential changes stop here before they reach production. A proposal may be
described, researched, mocked up, or built as an isolated prototype, but it must
not alter or connect to the live site until the user gives explicit final
approval and the proposal is marked `CLEARED`.

## Production Boundary

The protected production surface includes:

- `index.html`
- `styles.css`
- `script.js`
- Any asset referenced by the live site
- Public navigation, metadata, forms, links, and integrations
- Any file that changes what a visitor can see, hear, use, or download

Before clearance, work must remain in this file or in a clearly isolated
prototype that is not referenced by the production surface.

## Clearance States

- `HOLD` — The idea is being defined. No production edits are permitted.
- `READY FOR REVIEW` — The proposal, evidence, and preview are ready. No
  production edits are permitted.
- `CLEARED` — The user has explicitly approved the stated scope. Production
  edits are permitted only within that scope.
- `APPLIED` — The cleared change has been implemented and verified.
- `WITHDRAWN` — The proposal will not proceed.

Silence, discussion, experimentation, or a request to preview an idea does not
count as clearance. Approval must be explicit. Clearance for one proposal does
not authorize another.

## Active Chamber

**Status:** `EMPTY`

There is no active proposal.

When a potential site change enters the chamber, replace the empty state with
the following record:

```text
Proposal ID:
Title:
Status: HOLD
Opened:

Purpose:

Visitor consequence:

Proposed mechanism:

Files that would change:

What must remain untouched:

Privacy and trust check:

Accessibility check:

Brand check:

Preview or evidence:

Risks and reversal plan:

Final clearance:
- Approved by:
- Approval date:
- Approved scope:
- Approval evidence:

Implementation:
- Applied date:
- Verification:
- Commit:
```

## Operating Rule

1. Record one active proposal in this file.
2. Keep all experimental implementation isolated from the production surface.
3. Present the proposal or preview for review.
4. Wait for the user's explicit final approval.
5. Record the approval and change the status to `CLEARED`.
6. Implement only the cleared scope.
7. Verify the result, record it, and change the status to `APPLIED`.

If the requested scope changes after clearance, return the proposal to `HOLD`
and seek clearance again.
