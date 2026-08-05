# Technical Standards

## Baseline stack

- Semantic HTML5
- Modern CSS3
- Vanilla JavaScript
- Canvas API for justified generative visuals
- No required build step

Frameworks and UI libraries are excluded unless Steve explicitly changes the architecture after reviewing the tradeoffs.

## HTML

- Prefer `header`, `nav`, `main`, `section`, `article`, `aside`, and `footer` over anonymous containers.
- Maintain a logical heading outline.
- Use buttons for actions and links for navigation.
- Include useful accessible names, image alternatives, captions, and transcript paths when applicable.

## CSS

- Mobile-first.
- Design checkpoints: 375px, 768px, 1024px, and 1440px.
- Use Grid and Flexbox; do not use floats or absolute positioning as the primary layout mechanism.
- Centralize colors, typography, spacing, radii, layers, shadows, and animation durations in custom properties.
- Use fluid sizing such as `clamp()` where it protects composition and readability.
- Preserve visible focus and sufficient contrast.

## JavaScript

- Use progressive enhancement: core content should survive failed or disabled JavaScript whenever practical.
- Keep modules small and name behavior by purpose.
- Avoid global state and repeated DOM queries in animation loops.
- Use `IntersectionObserver` for viewport-triggered work where appropriate.
- Stop or throttle offscreen animation; avoid layout thrashing.
- Never introduce tracking, fingerprinting, behavioral profiling, or non-essential third-party scripts without explicit informed approval.

## Motion and accessibility

- CSS must include `@media (prefers-reduced-motion: reduce)` treatment for non-essential animations.
- JavaScript-driven animations must also check the media query and produce a stable final state.
- Never rely on color, motion, hover, or sound alone to convey required information.
- Test complete keyboard navigation for each changed interactive component.

## Performance

- Optimize images and video for their rendered size.
- Lazy-load below-the-fold media when it does not harm narrative timing.
- Preload only truly critical assets.
- Avoid continuous canvas work on hidden tabs or outside the viewport.
- Do not add a dependency for a task the platform can solve cleanly.

## Repository hygiene

- Keep secrets out of git.
- Do not edit generated or vendored files unless the project explicitly identifies them as source.
- Inspect `git status` before and after work.
- Make the smallest coherent change.
- Do not overwrite user work or discard an unfamiliar modification.
- Record run, test, lint, and deployment commands in the root README when known.

