# repo-report

An interactive sprint report viewer that replaces static slide decks. Reports are data-driven JSON files — no rebuilding the app required to add or update a report.

## What it does

- **Home page** — card grid listing all available reports with stats at a glance
- **Report viewer** — slide-based presentation with keyboard navigation, a slide picker dropdown, and a detail section below each slide for deep-dive widgets
- **Dark / light mode** toggle
- **Widget system** — metric tables, markdown, charts, link lists, contributor summaries, and video embeds

## Running locally

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173/`.

## Adding a report

1. Create a directory under `public/reports/<slug>/`
2. Add a `data.json` file (see [Report schema](#report-schema) below)
3. Add an entry for the report in `public/reports/index.json`

That's it — no rebuild needed in development, and the build script auto-generates the per-report HTML at build time.

## Building for production

```bash
npm run build
```

This runs `tsc`, Vite, and then `scripts/build-reports.js`, which injects each report's `data.json` URL into a copy of `index.html` inside `dist/reports/<slug>/`. The single React bundle is shared across all pages.

To preview the production build locally:

```bash
npx serve dist
```

## Deploying to Netlify

The repo includes a `netlify.toml`. Connect the repo in Netlify and it will build and deploy automatically on every push to `main`. No extra configuration required.

If you need the app served at a subpath (e.g. for GitHub Pages), set the `VITE_BASE_URL` environment variable:

```
VITE_BASE_URL=/repo-report/
```

---

## Report schema

### `public/reports/index.json`

Top-level index shown on the home page.

```json
{
  "team": "Platform Team",
  "description": "Optional subtitle shown on the home page.",
  "reports": [
    {
      "slug": "sprint-14",
      "title": "Sprint 14",
      "dateRange": { "start": "2026-03-10", "end": "2026-03-24" },
      "stats": [
        { "label": "Deployments", "value": 14, "change": 17, "icon": "🚀" }
      ]
    }
  ]
}
```

`change` is a percentage (positive = up, negative = down). Set `"lowerIsBetter": true` on a stat to invert the color logic (e.g. incident counts, error rates).

---

### `public/reports/<slug>/data.json`

Full report data. Top-level shape:

```json
{
  "meta": { ... },
  "summary": { ... },
  "themes": [ ... ]
}
```

#### `meta`

```json
{
  "title": "Sprint 14",
  "team": "Platform Team",
  "dateRange": { "start": "2026-03-10", "end": "2026-03-24" },
  "repos": [
    { "name": "atlas-web", "url": "https://github.com/acme/atlas-web" }
  ],
  "generatedAt": "2026-03-24T18:00:00Z",
  "contact": [
    { "text": "Slack: #platform-team", "url": "https://acme.slack.com/channels/platform-team" },
    { "text": "Email: platform@acme.internal" }
  ],
  "showQA": true
}
```

When `contact` is present and `showQA` is not `false`, a "Questions?" slide is automatically appended.

#### `summary`

```json
{
  "type": "summary",
  "slug": "summary",
  "title": "Sprint 14",
  "subtitle": "Platform Team — Mar 10–24, 2026",
  "stats": [ ... ],
  "highlights": [
    "Auth overhaul shipped",
    "GraphQL migration complete"
  ],
  "detailBlocks": []
}
```

`highlights` and `detailBlocks` are optional.

#### `themes`

Each theme becomes one slide.

```json
{
  "type": "theme",
  "slug": "auth",
  "title": "Auth Overhaul",
  "status": "completed",
  "description": "Short description shown in the slide picker and contents cards.",
  "hasDemo": true,
  "includeInOverview": true,
  "progress": {
    "items": [{ "text": "Migrated login flow to OAuth2 PKCE" }]
  },
  "problems": {
    "items": [{ "text": "Token race condition on Safari (resolved)" }]
  },
  "plans": {
    "items": [{ "text": "Add SSO support in Q2" }]
  },
  "detailBlocks": []
}
```

`progress`, `problems`, and `plans` are all optional — columns that are empty are hidden, and the remaining columns expand to fill the space.

Set `"includeInOverview": false` to hide a theme from the contents cards on the summary slide.

---

## Detail block widgets

`detailBlocks` can appear on any slide and are rendered below the slide content. Supported types:

### `metric`

```json
{
  "type": "metric",
  "title": "Performance",
  "metrics": [
    {
      "label": "LCP",
      "value": "1.8s",
      "previousValue": "3.2s",
      "trend": "down",
      "unit": "s"
    }
  ]
}
```

`trend` can be `"up"`, `"down"`, or `"flat"`.

### `markdown`

```json
{
  "type": "markdown",
  "title": "Notes",
  "content": "Supports **bold**, _italic_, `code`, tables, and more (GFM)."
}
```

### `chart`

```json
{
  "type": "chart",
  "title": "Velocity over time",
  "chartType": "line",
  "xAxisLabel": "Sprint",
  "yAxisLabel": "Points",
  "series": [
    {
      "name": "Velocity",
      "data": [
        { "x": "Sprint 10", "y": 54 },
        { "x": "Sprint 11", "y": 61 }
      ]
    }
  ]
}
```

`chartType` can be `"line"`, `"bar"`, or `"area"`.

### `link-list`

```json
{
  "type": "link-list",
  "title": "PRs merged",
  "links": [
    {
      "label": "Add OAuth2 PKCE flow",
      "url": "https://github.com/acme/atlas-api/pull/412",
      "type": "pr",
      "repo": "atlas-api"
    }
  ]
}
```

`type` can be `"pr"`, `"issue"`, `"commit"`, `"doc"`, or `"external"`.

### `contributor-list`

```json
{
  "type": "contributor-list",
  "title": "Contributors",
  "contributors": [
    {
      "name": "Alice Chen",
      "username": "achen",
      "commits": 24,
      "prsOpened": 8,
      "prsMerged": 7,
      "linesAdded": 1840,
      "linesRemoved": 430
    }
  ]
}
```

### `video`

```json
{
  "type": "video",
  "title": "Demo walkthrough",
  "description": "Optional context shown above the embed.",
  "url": "https://www.youtube.com/watch?v=..."
}
```

Supports any URL the browser can embed (YouTube, Vimeo, direct MP4, etc.).
