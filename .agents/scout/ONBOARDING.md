# Adding Scout to a Repository

Scout is an AI agent that automatically generates sprint reports from your repo activity and publishes them as a live interactive site on GitHub Pages — no manual work required after setup.

## Prerequisites

- Admin access to the target repository
- GitHub Pages enabled for the repo (Settings → Pages → Source: **GitHub Actions**)

## Setup steps

### 1. Add the Scout config

Create `.agents/scout/settings.json` in your repo:

```json
{
  "reports_path": "docs/reports"
}
```

`reports_path` is where Scout will write report data. You can change this, but `docs/reports` is the convention.

### 2. Add the publish workflow

Copy `.agents/scout/publish-reports.yml` (this file's sibling) to `.github/workflows/publish-reports.yml` in your repo.

That workflow fires automatically whenever Scout commits a new report and deploys the updated site to GitHub Pages. No further configuration needed — the `base_url` is derived from the repository name at runtime.

### 3. Let Scout run

Scout picks up the `settings.json` on its next scheduled run and starts generating reports at `docs/reports/{date}/data.json`.

After its first run, GitHub Actions will build and deploy your report site. Your live reports will be available at:

```
https://<org>.github.io/<repo>/
```

## How it works

- Scout commits JSON report data to `docs/reports/{date}/data.json`
- The publish workflow triggers on any push to `docs/reports/**`
- It calls the composite action in [NoahWright87/repo-report](https://github.com/NoahWright87/repo-report) to build the React app against your data
- The built site is deployed to your repo's GitHub Pages

The `repo-report` app and action are maintained separately — you get improvements automatically when the action's `@v1` tag is updated.

## Customization

| Setting | Where | Description |
|---------|-------|-------------|
| `reports_path` | `.agents/scout/settings.json` | Where Scout writes report JSON |
| `base_url` | `.github/workflows/publish-reports.yml` | Subpath the site is served from (auto-set to `/<repo-name>/`) |
| `additional_static_dirs` | `.github/workflows/publish-reports.yml` | Extra directories to include in the deployed site |
