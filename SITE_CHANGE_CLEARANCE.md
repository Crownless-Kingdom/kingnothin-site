# KINGNOTHIN Site Change Clearance

This file is the holding chamber between an idea and the live KINGNOTHIN site.

## Active Chamber — KN-BEHAVIOUR-PHRASE-ART-2026-09-05

Proposal ID: `KN-BEHAVIOUR-PHRASE-ART-2026-09-05`

Title: Three responsive behaviour-phrase artworks

Status: `APPLIED`

Opened: 2026-09-05

Purpose:

Replace only the visible treatments for `Popular with people like you`, `You
may also like`, and `Continue where you left off` with the three newly supplied
artworks.

Visitor consequence:

Stages 2, 4, and 5 of the Behaviour Phrase sequence show the corresponding
artwork in place of styled text. The exact phrases remain available as semantic
text for assistive technology.

Proposed mechanism:

Create 320px, 480px, and 640px local WebP variants from each supplied PNG. Use
responsive `srcset`, explicit intrinsic dimensions, lazy loading, and
asynchronous decoding. Preserve the existing stage order, labels, timing,
motion, audio behavior, and reduced-motion path. Clip the white corners of the
oval `Continue where you left off` artwork at display time without altering its
interior.

Files that would change after clearance:

- `index.html`
- `privacy-experience.css`
- Nine responsive WebP files under `assets/privacy-experience/`
- `SITE_CHANGE_CLEARANCE.md`

What must remain untouched:

- Phrase wording and order
- Stages 1, 3, and 6 through 9
- Scroll timing, pressure progression, audio, controls, and reduced-motion
  behavior
- Extraction Economy report and gateway
- All other homepage content, assets, metadata, links, forms, and integrations

Privacy, accessibility, performance, and brand check:

No external requests, trackers, scripts, or dependencies are added. The images
are decorative while the complete phrases remain semantic HTML. Responsive
WebP files, lazy loading, asynchronous decoding, and explicit dimensions limit
transfer and layout work. Desktop, 390px, and 320px containment, browser errors,
and actual transferred bytes must be verified before application.

Preview or evidence:

- Isolated review folder: `prototypes/behaviour-phrase-art-hold/`

Risks and reversal plan:

Dense artwork may become hard to read if rendered too small. Verify legibility
against the live obsidian stage before clearance. Reversal restores the three
current phrase treatments and removes only the nine new responsive assets.

Final clearance:

- Approved by: User
- Approval date: 2026-09-05
- Approved scope: Replace the corresponding stages for `Popular with people
  like you`, `You may also like`, and `Continue where you left off` with the
  three reviewed artworks, optimized as needed to protect site performance.
- Approval evidence: "yes i approve them all lets commit push and deploy"

Implementation:

- Applied date: 2026-09-05
- Verification: The three approved artworks replaced only stages 2, 4, and 5.
  Each stage retained its exact semantic phrase, nine-stage position, live
  announcement, existing motion, audio behavior, and reduced-motion reading.
  Browser checks at 1280px, 390px, and 320px confirmed the correct responsive
  640px, 480px, and 320px WebP selections, complete viewport containment, and
  zero horizontal overflow. The three new artworks made zero requests during
  initial homepage load and loaded only as the Behaviour Phrase section was
  approached. All nine local assets returned HTTP 200. JavaScript syntax and
  `git diff --check` passed. The full-root static audit reported zero high, low,
  or informational findings and seven existing medium HTML-injection review
  signals in unchanged `script.js`.
- Commit, push, and public deployment: Authorized; performed after this record.

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

## Active Chamber — KN-EXTRACTION-REPORT-AND-PHRASE-ART-2026-09-05

Proposal ID: `KN-EXTRACTION-REPORT-AND-PHRASE-ART-2026-09-05`

Title: Extraction Economy report integration and two behavioural phrase artworks

Status: `APPLIED`

Opened: 2026-09-05

Purpose:

Publish the approved Extraction Economy report journey and replace the visible
Stage 2 and Stage 4 behavioural phrases with the two user-supplied artworks.

Cleared scope:

- Add the approved report gateway after the existing Extraction Economy opening.
- Add the static report route at `reports/extraction-economy/`.
- Use responsive WebP copies of the supplied `Popular with people like you`
  artwork for Stage 2 while preserving that semantic phrase.
- Use responsive WebP copies of the supplied `You may also like` artwork for
  Stage 4 while preserving that semantic phrase.
- Preserve the supplied artwork composition and appearance while producing
  responsive 320px and 640px WebP copies for efficient delivery inside each
  existing phrase stage.
- Preserve the nine-stage order, timing, live announcements, audio controls,
  reduced-motion path, Privacy copy, and all unrelated surfaces.

Files cleared:

- `index.html`
- `styles.css`
- `privacy-experience.css`
- `assets/privacy-experience/popular-with-people-like-you-320.webp`
- `assets/privacy-experience/popular-with-people-like-you-640.webp`
- `assets/privacy-experience/you-may-also-like-320.webp`
- `assets/privacy-experience/you-may-also-like-640.webp`
- `reports/extraction-economy/index.html`
- `reports/extraction-economy/report.css`
- `reports/extraction-economy/report.js`
- `SITE_CHANGE_CLEARANCE.md`

Privacy and accessibility:

Both artworks remain decorative and local. Responsive WebP encoding reduces
their combined transfer from about 2.76 MB to about 49 KB at 320px or 133 KB at
640px while preserving their appearance at the rendered sizes. Their phrases
remain real screen-reader text and the live status continues to announce the
current phrase and stage.
No analytics, cookies, storage, forms, external scripts, remote fonts, or new
data flows are introduced.

Final clearance:

- Approved by: User
- Approval date: 2026-09-05
- Approval evidence: The user supplied both artworks, requested their named
  phrase replacements, and explicitly requested, `commit, push and deploy it all`.

Implementation:

- Applied date: 2026-09-05
- Verification: Both supplied artworks were rendered as responsive 320px and
  640px WebP assets. Combined transfer weight is 48,768 bytes at 320px and
  133,334 bytes at 640px, compared with 2,757,418 bytes for the supplied PNG
  masters. Browser checks at 320px, 375px, 768px, and 1280px confirmed correct
  source selection, square aspect ratio, centered containment, preserved
  semantic phrases and stage labels, zero horizontal overflow, no failed
  requests, no unexpected console errors, and no external requests. The report
  retained one `h1`, seven layers, three ordinary moments, 27 source entries,
  and complete core content without JavaScript. JavaScript syntax, scoped static
  security review, asset delivery, and `git diff --check` passed.
- Publication: Commit, push, and deployment explicitly authorized.

## Applied Chamber — KN-PRIVACY-STAGE-3-GOLD-OUTLINE-2026-08-03

Proposal ID: `KN-PRIVACY-STAGE-3-GOLD-OUTLINE-2026-08-03`

Title: Supernova Gold outline for Stage 3 phrase artwork

Status: `APPLIED`

Opened: 2026-08-03

Purpose:

Change only the edge outline of the transparent `Based on your activity`
phrase artwork from pale/white to Supernova Gold `#C9A84C` while preserving
the exact stacked letterforms, photographic interiors, and clear background.

Files changed:

- `index.html`
- `assets/privacy-experience/based-on-your-activity-words-gold-outline.png`
- `SITE_CHANGE_CLEARANCE.md`

Final clearance:

- Approved by: User
- Approval date: 2026-08-06
- Approved scope: Change only the Stage 3 artwork outline to Supernova Gold,
  preserving the transparent background, photographic interiors, exact phrase,
  semantic text, timing, position, background, controls, audio behavior, and
  every unrelated surface.
- Approval evidence: After reviewing the isolated desktop preview, the user
  said, `ok i like that lets go live with that`.

Implementation:

- Applied date: 2026-08-06
- Verification: The 658 x 400 RGBA asset is byte-identical to the approved
  isolated review asset. Its corners are fully transparent and its interior
  photographic texture remains visible. Desktop and 390 x 844 browser checks
  confirmed Stage 3 remained `03 / 09`, semantic wording and audio behavior
  were unchanged, horizontal overflow was zero, and the console was clean.
- Publication: Authorized by the user's 2026-08-06 request to ensure the
  approved privacy changes are pushed to the GitHub repository.

## Applied Chamber — KN-PRIVACY-STAGE-3-TRANSPARENT-ART-2026-08-03

Proposal ID: `KN-PRIVACY-STAGE-3-TRANSPARENT-ART-2026-08-03`

Title: Transparent photographic lettering for `Based on your activity`

Status: `APPLIED`

Opened: 2026-08-03

Purpose:

Replace only the visible Stage 3 phrase treatment with the reviewed
transparent photographic lettering while retaining the exact phrase as
semantic HTML and in the live stage announcement.

Files changed:

- `index.html`
- `privacy-experience.css`
- `assets/privacy-experience/based-on-your-activity-words-gold-outline.png`
- `SITE_CHANGE_CLEARANCE.md`

Final clearance:

- Approved by: User
- Approval date: 2026-08-03
- Approved scope: Replace only the visible Stage 3 `Based on your activity`
  treatment with the reviewed transparent photographic lettering. Preserve
  timing, background, nine-stage order, reduced-motion reading, audio behavior,
  and every unrelated surface.
- Approval evidence: After reviewing the isolated transparent Stage 3 preview,
  the user explicitly said, `clear it`.

Implementation:

- Applied date: 2026-08-03
- Verification: The local decorative image loaded at its natural 658 x 400
  dimensions; the exact semantic phrase and `03 / 09` stage remained intact.
  Desktop and 390 x 844 checks passed with zero overflow and a clean console.

## Applied Chamber — KN-PRIVACY-TRENDING-WORD-REVEAL-2026-08-03

Proposal ID: `KN-PRIVACY-TRENDING-WORD-REVEAL-2026-08-03`

Title: Word-by-word Prototype reveal for `Trending in your area`

Status: `APPLIED`

Opened: 2026-08-03

Purpose:

Reveal `TRENDING`, `IN`, `YOUR`, and `AREA` one word at a time within the
unchanged Stage 1 scroll slot. Use solid Supernova Gold for `TRENDING` and
`YOUR`, and fine gold outlines for `IN` and `AREA`.

Files changed:

- `index.html`
- `privacy-experience.css`
- `privacy-experience.js`
- `SITE_CHANGE_CLEARANCE.md`

Final clearance:

- Approved by: User
- Approval date: 2026-08-03
- Approved scope: Replace only the visible Stage 1 phrase with four internally
  timed Prototype word cues inside the existing Stage 1 slot. Keep Stage 2 and
  the overall nine-stage timing unchanged.
- Approval evidence: After defining the word weights and timing, the user
  explicitly said, `clear it`.

Implementation:

- Applied date: 2026-08-03
- Verification: The four words enter at successive quarter-stage thresholds;
  Stage 2 retains its original boundary. Reduced motion shows all four words
  immediately. Desktop and mobile checks passed with zero overflow and a clean
  console.

## Applied Chamber — KN-PRIVACY-SCROLL-2026-07-30

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
