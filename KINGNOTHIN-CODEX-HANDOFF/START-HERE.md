# KINGNOTHIN Codex Handoff Pack

This folder supplies durable project context for the Codex agent in VS Code. It complements the actual website repository; it does not replace the HTML, CSS, JavaScript, fonts, images, video, or other site assets.

## Install into the website repository

1. Open the real KINGNOTHIN website folder in VS Code.
2. Copy `AGENTS.md` into the repository root—the same folder that contains the site entry point or `.git` directory.
3. Copy the `docs` folder into that root.
4. Copy `prompts` if you want ready-made task templates.
5. Keep this pack under version control alongside the site so every Codex session receives the same guidance.
6. Open a new Codex chat from the repository root and send the bootstrap prompt in `prompts/FIRST_SESSION.md`.

Codex automatically reads a root-level `AGENTS.md` at the start of a session. Keep it concise; detailed knowledge belongs in the linked documents.

## Still required from Steve's computer

The agent cannot work on the real site without the current repository and its assets. Ensure the repository contains or documents:

- Current HTML, CSS, and JavaScript source.
- Local font files and their licenses for Dosis, Exo, Prototype, and GC Epic Pro Demo.
- Logos, emblems, image sequences, video, audio, textures, and icons.
- A manifest identifying which assets are approved, experimental, obsolete, or missing.
- Hosting/deployment configuration and domain notes, but never committed secrets.
- Any current audit, backlog, design brief, storyboard, or copy deck that supersedes these summaries.

## Security

Do not place passwords, access tokens, API keys, private keys, recovery codes, or personal account exports inside this pack or the repository. Put secrets in local environment variables or the hosting provider's secret store, and commit only an `.env.example` with placeholder names if the project eventually needs one.

## Source note

This pack reflects approved KINGNOTHIN decisions available through August 4, 2026. Pre-July 2026 `.xyz` site iterations are deliberately excluded as obsolete. When the actual current site contradicts a status summary, Codex should show Steve the conflict before changing either one.
