# KINGNOTHIN Agent Instructions

Read this file before acting, then consult only the reference document relevant to the task.

## Mission

KINGNOTHIN (KN) helps ordinary people—especially adults 40+ who feel left behind by technology—remain sovereign in a future shaped by AI, pervasive tracking, and persuasive systems. Privacy is the foundation; it protects the mental room from which agency, attention, discernment, and wisdom can grow.

## Working relationship

- Steve is the founder and final creative authority. Explain technical decisions plainly and make tradeoffs visible.
- Preserve approved work. Never redesign, rewrite, rename, or remove approved elements merely for novelty or cleanup.
- When direction is incomplete, present a small number of concrete options before making a high-impact choice.
- Do not let implementation outrun oversight. Work in focused, reviewable increments.
- Inspect existing files and git status before editing. Preserve unrelated user changes.
- Never commit, push, publish, deploy, delete, install production dependencies, or change external services unless Steve explicitly asks.

## Non-negotiable implementation rules

- HTML5, CSS3, and vanilla JavaScript only.
- No React, Vue, Angular, Svelte, jQuery, Bootstrap, Tailwind, Material UI, or build step unless Steve explicitly reverses this decision.
- Use semantic HTML; CSS Grid and Flexbox for layout; avoid absolute positioning as a layout system.
- Mobile-first breakpoints: 375px, 768px, 1024px, 1440px.
- Use CSS custom properties for colors, spacing, typography, and animation timing.
- Wrap non-essential animation behavior in `prefers-reduced-motion` support.
- Preserve accessibility: keyboard operation, visible focus, useful alt text, sufficient contrast, and semantic structure.
- Avoid unnecessary dependencies and protect performance on ordinary hardware and mobile connections.

## Design rules

- Core aesthetic: futuristic, cinematic neo-brutalism softened by art-nouveau detail.
- Composition is unapologetically symmetrical. Center headings and subheadings; keep each on one line when it remains legible. Use two lines only when aesthetically or responsively necessary.
- Approved fonts only: Dosis, Exo, Prototype, and GC Epic Pro Demo. Do not introduce Jost or Space Mono.
- Approved palette: obsidian black, supernova gold, crimson red, jade green, regal silver, and ivory white. Derive exact tokens from the existing stylesheet when present; do not invent conflicting values.
- Visual motifs include jade circuitry splitting obsidian, crownless city geometry, cracked vaults/thrones, restrained gold filigree, signals, data fragments, and decryption.
- Aim for Kubrickian control and symmetry with Capote-like precision. Avoid generic SaaS cards, template aesthetics, visual clutter, and empty cyberpunk clichés.

## Voice

- Serious, urgent, lucid, human, and occasionally wry—not corporate, preachy, or breathlessly futuristic.
- Explain complex technology to newcomers without talking down to them.
- Prefer exact images and concrete consequences over slogans piled on slogans.
- Preserve exact approved copy listed in `docs/CONTENT_AND_COPY.md`.

## Verification

Before declaring a change complete:

1. Run the site locally using the existing documented command or a simple static server.
2. Check browser console errors.
3. Check 375px, 768px, 1024px, and 1440px layouts.
4. Check keyboard access and reduced-motion behavior for changed interactions.
5. Report files changed, checks run, and anything not verified.

## Reference routing

- Mission, audience, conceptual system: `docs/KINGNOTHIN_CANON.md`
- Visual language and typography: `docs/BRAND_SYSTEM.md`
- Exact language and writing voice: `docs/CONTENT_AND_COPY.md`
- Architecture and coding standards: `docs/TECHNICAL_STANDARDS.md`
- Approved features, open work, and project status: `docs/CURRENT_STATE.md`
- How to scope and execute work: `docs/WORKFLOW.md`

