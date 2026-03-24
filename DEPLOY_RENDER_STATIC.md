# Deploy as Render Static Site

This repo now includes a static-site blueprint: [render.yaml](c:/Users/harip/portfolio/render.yaml)

## Steps
1. Push this repo to GitHub.
2. In Render, create a new Blueprint (or import repo with `render.yaml`).
3. Render will create one static web service:
   - Name: `hari-portfolio-static`
   - Build command:
     - copies `static-index.html` to `public/index.html`
     - copies `static/` assets to `public/static/`
   - Publish path: `./public`
4. Deploy.

## What this means
- No Django runtime needed on Render.
- No database required.
- No server-side 500 errors from Python/DB startup.
