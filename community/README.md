# Picsart TV — Community storytelling

A separate landing page focused on interactive entertainment that everyone can shape. Exploring existing stories and beginning a new one receive equal emphasis. The original multi-product page remains at the repository root.

Live: https://mivlos.github.io/picsart-tv/community/

## Structure

- `index.html`: editorial sections, native dialogs, progressive product detail.
- `stories.js`: the sample story catalog and two-level authored branching paths. Replace this data source when connecting a live catalog.
- `app.js`: catalog rendering, branching previews, local idea preview and text download.
- `brand.css`: Picsart fonts and existing Cascade tokens.
- `site.css`: responsive layout and restrained, once-only section entrances; respects reduced motion.
- `assets/`: artwork and supplied story-map screenshot.

Static files only. No packages or build step needed for hosting. Relative paths work at a GitHub Pages project subpath. The sections and data are separate so the offering can expand later without presenting future products at launch.

The page is a concept preview: no live video, generation, uploads, publishing or community backend is connected. The draft exists in the current page session only and can be saved as a text file. No analytics or outbound form requests.

## Portable artifact

Run `python3 build-share.py` from the source copy to build `share/Picsart-TV-Community.html` and a ZIP. This uses Python's standard library and fetches only the specified Picsart fonts to embed. Fonts and used images are embedded once; the result works offline.
