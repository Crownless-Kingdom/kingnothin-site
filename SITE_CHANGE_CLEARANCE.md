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

Proposal ID: `KN-HERO-SPOTLIGHT-RADIUS-2026-08-06`

Title: Hero spotlight radius increase

Status: `APPLIED`

Purpose:

Increase the existing, approved hero spotlight radius by a further ten percent.

Files that may change:

- `script.js`
- `SITE_CHANGE_CLEARANCE.md`

What must remain untouched:

- All spotlight intensity, copy, layout, typography, assets, and other sections

Final clearance:

- Approved by: User
- Approval date: 2026-08-06
- Approved scope: Increase only the current spotlight radius by ten percent.

Implementation:

- Applied date: 2026-08-06
- Verification: Reviewed in the in-app browser with the spotlight active;
  confirmed the wider reveal remains centered and controlled, with no browser
  console warnings or errors. `git diff --check` and the JavaScript syntax
  check passed.

---

Proposal ID: `KN-HERO-CROP-AND-HORIZON-2026-08-06`

Title: Revised hero title treatment

Status: `APPLIED`

Purpose:

Remove the unused black space above and below the hero artwork, while adding a
small, restrained crimson edge in the lower-right of the art.

Files that may change:

- `styles.css`
- `SITE_CHANGE_CLEARANCE.md`

What must remain untouched:

- Hero copy, type, navigation, and interaction structure
- All sections after the hero
- Assets, metadata, forms, links, integrations, and unrelated work

Final clearance:

- Approved by: User
- Approval date: 2026-08-06
- Approved scope: Apply the reviewed cropped hero artwork and the small
  lower-right crimson sun edge.

Implementation:

- Applied date: 2026-08-06
- Verification: Reviewed in the in-app browser at desktop and 390 x 844;
  confirmed the artwork fills the hero, the crimson edge remains restrained,
  and no browser console warnings or errors were recorded. `git diff --check`
  and the JavaScript syntax check passed.

---

Proposal ID: `KN-HERO-SPOTLIGHT-2026-08-06`

Title: Hero spotlight lift

Status: `APPLIED`

Purpose:

Make the existing hero spotlight slightly brighter and wider so the central
KINGNOTHIN mark is more legible while the opening remains restrained.

Files that may change:

- `styles.css`
- `script.js`
- `SITE_CHANGE_CLEARANCE.md`

What must remain untouched:

- Hero copy, layout, fonts, and assets
- All sections after the hero
- Navigation, metadata, forms, links, integrations, and unrelated work

Final clearance:

- Approved by: User
- Approval date: 2026-08-06
- Approved scope: Increase only the existing hero spotlight's radius and
  intensity, with no copy, layout, font, or other-section changes.

Implementation:

- Applied date: 2026-08-06
- Verification: Reviewed in the in-app browser at desktop and 390 x 844;
  confirmed the larger spotlight reveals the title art without changing copy
  or layout. `git diff --check` and the JavaScript syntax check passed.

---

Proposal ID: `KN-PRIVACY-SCROLL-2026-07-30`

Title: Privacy static-scroll behavioral association experience

Status: `APPLIED`

Opened: 2026-07-30

Purpose:

Create a reviewable study of how ordinary recommendation language can build
pressure around a person's attention, then return the composition to calm and
protected space.

Visitor consequence:

The person should recognize how familiar behavioral-association phrases can
accumulate into a sense of prediction and enclosure without being frightened,
shamed, or manipulated.

Proposed mechanism:

An isolated static-scroll prototype presents nine phrases one at a time. The
composition begins centered and restrained, grows into deliberate clutter with
subtle heat-map, dissolving-thumbnail, and lower progress-trace treatments,
then resolves to calm. The supplied extraction cue begins only during the final
escalation and supports the return to calm. Playback remains user-controlled.

Files that would change:

- `index.html`
- `privacy-experience.css`
- `privacy-experience.js`
- `assets/privacy-experience/phrase-01.png`
- `assets/privacy-experience/phrase-02.png`
- `assets/privacy-experience/phrase-03.png`
- `assets/privacy-experience/phrase-04.png`
- `assets/privacy-experience/phrase-05.png`
- `assets/privacy-experience/phrase-06.png`
- `assets/privacy-experience/phrase-07.png`
- `assets/privacy-experience/phrase-08.png`
- `assets/privacy-experience/phrase-09.png`
- `assets/privacy-experience/extraction-sounds-1.mp3`
- `SITE_CHANGE_CLEARANCE.md`

What must remain untouched:

- `styles.css`
- `script.js`
- All content outside the approved `#privacy-foundation` integration
- The existing post-`PAUSE.` explanatory path from `SPACE` through
  `INDEPENDENT THOUGHT`
- All unrelated live assets, navigation, metadata, forms, links, and
  integrations
- Existing unrelated work

Privacy and trust check:

No analytics, trackers, external requests, or captured user data. Audio is
local. The preview does not autoplay; the person explicitly enables playback
and can mute, pause, or stop it.

Accessibility check:

Semantic structure, keyboard-operable controls, visible focus, live status,
muted behavior, reduced-motion behavior, readable contrast, and a static
fallback are required before review.

Brand check:

Use only Dosis, Exo, Prototype, and GC-Epic-Pro-Demo with the approved
obsidian, ivory, silver, gold, crimson, and jade palette. Begin and end in
symmetry; use asymmetry only as the purposeful pressure arc.

Preview or evidence:

- Isolated folder:
  `prototypes/privacy-static-scroll-hold/`
- Portable review archive:
  `prototypes/privacy-static-scroll-hold.zip`
- Loopback review URL while the local server is running:
  `http://127.0.0.1:8877/`
- Verified 2026-07-30 in the in-app browser at desktop and 390 x 844:
  exact phrase order; calm-to-pressure-to-calm arc; silent default; explicit
  audio enablement; final-escalation audio trigger; mute, play, and pause;
  static reduced-motion reading; keyboard-focus styling; zero horizontal
  overflow; and no console errors.
- The earlier `end-transition.mp3` copy has been removed from the isolated
  prototype. Its original source outside the prototype remains untouched.
- The supplied `ElevenLabs_extraction_sounds_1.mp3` is now the prototype's
  only audio, copied as `assets/audio/extraction-sounds-1.mp3`. Its exact
  browser duration is 4.455986 seconds. It enters at `Recommended for you`,
  plays two passes (approximately 8.91 seconds), stays at or below 70%
  playback level, uses a 1.1-second opening fade and a softened 0.65-second
  loop boundary, then resolves through a 2.1-second final fade.
- The user-approved isolated opening copy is now:
  `The Quiet Before the Choice`; `At KINGNOTHIN, privacy is the foundation:
  the space where independent, unique, and deliberate thought can be born.`;
  `Before every choice, there is a quiet moment when something begins to take
  shape inside your attention. Privacy gives that thought room to linger,
  turn, question itself, and become truly your own.`; `Take that room away,
  and someone else is already waiting to finish the thought for you.`; and the
  retained invitation `SCROLL SLOWLY`.
- A review-only `typography-options.html` comparison presents three treatments
  for the same nine phrases: Dosis Book to SemiBold, Exo Regular to Bold, and
  a Dosis-to-Exo progression. All remain in sentence case and increase
  pressure through restrained weight, size, spacing, and contrast. No option
  has been applied to the scroll sequence.
- The supplied 3 x 3 visual atlas is now used only inside the isolated preview
  as nine row-major crops, one per matching phrase. The images contain no
  phrase lettering: each phrase remains semantic HTML over the art. The
  treatment moves from calm architectural wayfinding into deliberate off-axis
  congestion, peaks with rare crimson, and returns to a quiet path before the
  calm ending.
- Audio-gate correction: scrolling while audio is off cannot pre-arm playback;
  late opt-in is blocked until the person scrolls back before the escalation;
  and hiding or leaving the preview stops, resets, and disarms the audio
  layer.
- Production `styles.css` and `script.js` remain unchanged. Production
  `index.html` changes are limited to the approved privacy markup and the
  component stylesheet and script references.
- Integrated live preview:
  `http://127.0.0.1:8765/index.html#privacy-foundation`
- Verified 2026-07-31 in the integrated live page at 1280 x 722 and 390 x 844:
  approved opening and all nine semantic phrases; calm-to-pressure-to-calm
  progression; preserved `SPACE` through `INDEPENDENT THOUGHT` path; silent
  default; explicit consent gate; late opt-in remaining silent; muted
  two-pass escalation cue; reduced-motion static reading; clean transition
  out of the experience; zero horizontal overflow; and no console errors.
- The component asset URLs returned HTTP 200. JavaScript syntax and
  `git diff --check` passed. The security review reported no high-severity
  findings and no findings in the new privacy component; seven existing
  medium review signals remain in the unchanged production `script.js`.

Risks and reversal plan:

Risks include excessive visual pressure, browser autoplay restrictions, or
motion that obstructs reading. Reversal is limited to the files listed in this
proposal: restore the prior `#privacy-foundation` markup and remove the
privacy component stylesheet, script, and `assets/privacy-experience/` bundle.
The isolated review prototype remains available as evidence.

Final clearance:

- Approved by: User
- Approval date: 2026-07-31
- Approved scope: Integrate the reviewed full-screen privacy prototype's
  approved opening, nine-stage visual sequence, and calm ending into the live
  `#privacy-foundation` area. Preserve the existing post-`PAUSE.` explanatory
  path from `SPACE` through `INDEPENDENT THOUGHT`. Retain the currently
  reviewed GC-Epic phrase treatment and the existing extraction cue with its
  explicit opt-in, off-by-default, mute, pause, reduced-motion, and
  leave-section stop behavior. No unrelated content changes.
- Approval evidence: User said, "let's add this to the website, please," then
  confirmed, "we'll commit it to the live version."

Implementation:

- Applied date: 2026-07-31
- Verification: Desktop and mobile browser review, consent-gate and
  reduced-motion interaction checks, clean browser console, HTTP 200 asset
  probes, JavaScript syntax checks, scoped static security audit, and
  `git diff --check`.
- Commit: One narrow local privacy-integration commit authorized. No push,
  deployment, or pull request.

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
