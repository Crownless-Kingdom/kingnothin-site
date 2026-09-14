# KINGNOTHIN Brand Fonts

KINGNOTHIN must use only the approved brand fonts listed below. No substitute fonts should be introduced unless directly approved as part of a future brand revision.

The approved KINGNOTHIN fonts are:

1. **Dosis**
2. **Exo**
3. **Prototype**
4. **GC-Epic-Pro-Demo**

These four fonts define the visual voice of KINGNOTHIN. They are futuristic, deliberate, sharp enough to feel technological, and distinctive enough to avoid the flat corporate sameness found in generic web typography.

KINGNOTHIN must not use the following fonts:

- Jost
- Space Mono
- Inter
- Roboto
- Arial
- Helvetica
- Montserrat
- Poppins
- Any default system font as a primary brand font

These fonts may appear functional, but they do not carry the KINGNOTHIN atmosphere. They feel too neutral, too common, or too detached from the visual world we are building. KINGNOTHIN typography must feel like a signal from a hidden kingdom, not a startup dashboard.

## Primary Display Font: GC-Epic-Pro-Demo

**GC-Epic-Pro-Demo** is the primary display font for KINGNOTHIN.

Use it for:

- Major hero headlines
- Section titles
- Brand statements
- Tagline moments
- Interactive reveals
- Dramatic scroll-triggered text
- High-impact phrases such as "The Revolution Has No Throne"

This font should be used sparingly and with intention. It is not a body font. It is a ceremonial font, reserved for moments that need weight, atmosphere, and authority.

GC-Epic-Pro-Demo should feel carved into the obsidian surface of the site. It should appear in moments where the user is meant to pause, look closer, and feel that they have crossed into KINGNOTHIN territory.

## Secondary Display Font: Prototype

**Prototype** is the secondary display font.

Use it for:

- Smaller headings
- Interface labels
- Navigation accents
- Buttons
- Module titles
- Callout text
- System-style messages
- Technical or cryptographic UI elements

Prototype gives KINGNOTHIN its machine-language edge. It should be used when the site needs to feel futuristic, encrypted, tactical, or quietly dangerous.

Prototype is especially appropriate for interactive elements such as decryption effects, privacy modules, sovereign toolkit cards, status indicators, and animated text sequences.

## Primary Body Font: Dosis

**Dosis** is the primary body font for KINGNOTHIN.

Use it for:

- Paragraphs
- Descriptive text
- Explainers
- Blog previews
- Mission copy
- Longer reading sections
- Accessibility-focused content

Dosis keeps KINGNOTHIN readable without becoming bland. It has enough warmth to keep the brand human, while still feeling clean and modern. This matters because KINGNOTHIN is not only a technological project. It is a human sovereignty project.

Body text should remain spacious, legible, and calm. The user should never feel trapped inside dense walls of text. KINGNOTHIN can be intense, but it must never become exhausting.

## Supporting Font: Exo

**Exo** is the supporting brand font.

Use it for:

- Subheadings
- Short explanatory blocks
- Card descriptions
- Interface microcopy
- Secondary navigation
- Feature descriptions
- Footer text
- Form labels

Exo bridges the gap between the dramatic display fonts and the softer readability of Dosis. It works well when KINGNOTHIN needs to sound precise, modern, and structured without becoming cold.

Exo should be used to support hierarchy and rhythm across the site. It gives the page a controlled technological pulse.

## Font Hierarchy

The KINGNOTHIN font hierarchy should follow this structure:

```css
:root {
  --font-display-primary: "GC-Epic-Pro-Demo", "Prototype", sans-serif;
  --font-display-secondary: "Prototype", "Exo", sans-serif;
  --font-body: "Dosis", "Exo", sans-serif;
  --font-support: "Exo", "Dosis", sans-serif;
}
```

Recommended usage:

```css
h1,
.hero-title,
.major-statement {
  font-family: var(--font-display-primary);
}

h2,
h3,
.section-title,
.module-title {
  font-family: var(--font-display-secondary);
}

body,
p,
.article-copy,
.longform-text {
  font-family: var(--font-body);
}

nav,
button,
label,
.card-meta,
.interface-text {
  font-family: var(--font-support);
}
```

## Typography Personality

KINGNOTHIN typography should feel:

- Futuristic, but not sterile
- Rebellious, but not chaotic
- Luxurious, but not elitist
- Ancient, but not dusty
- Digital, but still human
- Serious, but never lifeless

Every type choice should reinforce the KINGNOTHIN world: obsidian screens, crimson warnings, jade circuitry, sovereign tools, hidden signals, and a crownless future.

The typography must help the user feel that KINGNOTHIN is not just a website. It is an entry point into a different way of seeing the digital world.

## Forbidden Typography Direction

KINGNOTHIN must avoid fonts that make the brand feel like:

- A generic SaaS company
- A productivity app
- A clean corporate landing page
- A default AI-generated website
- A tech blog template
- A startup pitch deck
- A plain documentation site

Fonts such as Jost and Space Mono flatten the KINGNOTHIN identity. They remove the strange gravity, the cinematic tension, and the sovereign atmosphere that the brand requires.

KINGNOTHIN should not look polite by accident. It should look intentional, mythic, sharp, and alive.

## Implementation Rule

All KINGNOTHIN pages, components, prototypes, and generated site files must use only the approved font system:

```css
"GC-Epic-Pro-Demo"
"Prototype"
"Dosis"
"Exo"
```

No other fonts are permitted unless explicitly approved in writing as part of a future KINGNOTHIN brand update.

When building or editing KINGNOTHIN files, remove any references to:

```css
"Jost"
"Space Mono"
"Inter"
"Roboto"
"Arial"
"Helvetica"
"Montserrat"
"Poppins"
monospace
sans-serif as a primary declared style
```

Generic fallbacks such as `sans-serif` may only appear at the end of a font stack for browser safety. They must never be used as the visible intended brand font.

The final typography should feel like a coded proclamation from the Crownless Kingdom: readable, cinematic, sovereign, and unmistakably KINGNOTHIN.

## Approved typography amendment — 2026-09-14

User-approved revision: Science Gothic joins Dosis, Exo, Prototype, and GC-Epic-Pro-Demo as the fifth approved KINGNOTHIN font family. This amendment supersedes all four-font-only restrictions in this document. The existing four families retain their established roles.

Science Gothic is approved for deliberate display statements. Its first approved application is the mission closing: "No kings. No gatekeepers. No throne required." Preserve the wording, centered composition, gold colour, and three-line structure. Use Science Gothic at weight 400 for this treatment. Further production applications follow the normal site-change clearance process.

Host font files locally, retain their SIL Open Font License, and use font-display: swap. Source: https://github.com/googlefonts/science-gothic
