# AeroSight

Scandinavian, bilingual website for AeroSight's AI-assisted wind turbine inspection service.

## Development

```bash
npm install
npm run dev
```

## GitHub Pages build

Set `NEXT_PUBLIC_BASE_PATH` to the repository name when publishing as a project page, then run `npm run build`. The static site is generated in `out/`.

Pushes to `main` deploy automatically through GitHub Actions. In the repository settings, set **Pages → Source** to **GitHub Actions**.
