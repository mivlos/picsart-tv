# Picsart TV — Community storytelling

Live: https://mivlos.github.io/picsart-tv/community/

A separate landing page focused on community stories. Explore stories is the primary action; Start a story remains visible as an outline action. The original multi-product page remains at the repository root.

## Current content

Real stories: Dracula, Tidebreak: The Glass Atlas, The Last Good Face. Story cards and calls to action link into https://com-picsart-tv-stage.picsart.site/. This is a staging destination, suitable for the current preview and comprehension test; production routing has not been provided.

The hero shows The Castle Door branching into two real continuations immediately, without animation or video. The interactive comparison supports three Dracula continuations, updating the image, caption, creator, prompt and direct app link. The current story-map proof is dated September 17, 2026: 11 scenes and 4 open endings.

The expandable walkthrough shows September 17 map and Watch screenshots plus the clean September 16 studio screenshot. No simulated creation form, text download or prompt-prefill behavior remains. Every Start a story action opens the same app create entry.

## Editing

- `index.html`: page content, app links and native screenshot dialog.
- `stories.js`: real story metadata, destinations, branch content and screenshot metadata.
- `app.js`: rendering, branch/screenshot selection, accessible dialog and scroll entrances.
- `brand.css`, `site.css`: responsive layout, design tokens and reduced-motion support.
- `assets/`: artwork and product captures; provenance in `ASSETS.md`.

Static hosting requires no dependencies or build. Relative media paths support the GitHub Pages subdirectory. Creation, generation and publishing happen in the separate app.

## Video handoff

Video is intentionally deferred. Real stills explain the branching mechanism and show the output now. Later video candidates are Eyes in the Fog, Whispers in Leather, At the Gate, Tidebreak / Waking the Glass, and The Last Good Face / Trustworthy Look.

## Portable copy

Run `python3 build-share.py` from this source folder. It creates `share/Picsart-TV-Community.html` and a ZIP with used images, fonts, styles and scripts embedded. The landing page works offline; app links require internet. Python standard library only; the build fetches the existing Picsart font URLs.
