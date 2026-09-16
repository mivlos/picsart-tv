# Picsart TV — Community storytelling

Live: https://mivlos.github.io/picsart-tv/community/

A separate landing page focused on community stories. Watching existing stories and starting a new one receive equal emphasis. The original multi-product page remains at the repository root.

## Current content

Real stories: Dracula, The endless void., The City Below. Story cards and main calls to action link into https://com-picsart-tv-stage.picsart.site/. The Dracula selector compares two actual community continuations. A collapsible walkthrough shows fresh captures of the story map, viewing interface and studio collection.

## Editing

- `index.html`: page content, external app links and native dialogs.
- `stories.js`: real story metadata, verified destinations, branch descriptions and screenshot metadata.
- `app.js`: rendering, branch/screenshot selection, optional local idea sketch and text download.
- `brand.css`, `site.css`: responsive layout, Cascade tokens and restrained entrances with reduced-motion support.
- `assets/`: artwork and product captures; provenance in `ASSETS.md`.

Static hosting requires no dependencies or build. Relative media paths support the GitHub Pages subdirectory. Watching, generating and publishing take place in the separate live app. The local idea sketch sends nothing to a server.

## Video handoff

The existing card images and Dracula branch still are the poster surfaces for forthcoming exports. Suitable clips: Dracula, The endless void., The City Below. The branching comparison is The Castle Door followed by Eyes in the Fog and Whispers in Leather. Prefer MP4, with the existing landscape format and a short representative excerpt. No placeholder players or simulated video controls are displayed while exports are pending.

## Portable copy

Run `python3 build-share.py` from the source copy. It creates `share/Picsart-TV-Community.html` and a ZIP with all used images, fonts, styles and scripts embedded. The landing page can be viewed offline; links to the live app require internet. Python standard library only; the build fetches the existing Picsart font URLs.
