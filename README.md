# Virtue: Digital Detox Website

This repo contains the static marketing site for the Virtue app, deployed on GitHub Pages and mapped to the custom domain:

- https://virtue-digital-detox.in/

## Structure

This is now a **single‑page** site for easier maintenance.

- `index.html` – main landing page (hero content + app carousel + contact/footer)
- `app_screenshots/` – optimised PNG screenshots used in the app carousel
- `Virtue_ Digital Detox home_files/` – theme CSS/JS assets exported from the original GoDaddy site (required by `index.html`)
- `CNAME` – GitHub Pages custom domain configuration

Everything else in the repo is considered implementation detail or build artefacts and can be safely ignored when editing content.

## Local development

From this folder:

```bash
python3 -m http.server 8000
```

Then open:

- http://localhost:8000/

## Deployment

Changes pushed to the `main` branch are automatically deployed to GitHub Pages and will appear at your custom domain after a short delay (usually under a minute).
