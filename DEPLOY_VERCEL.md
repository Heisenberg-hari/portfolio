# Deploy Django Portfolio on Vercel

## 1. Push this project to GitHub
Vercel deploys from your Git repo.

## 2. Import project in Vercel
- Vercel Dashboard -> `Add New...` -> `Project`
- Select this repository
- Framework Preset: `Other`

## 3. Set environment variables in Vercel
Add these in Project Settings -> Environment Variables:

- `DJANGO_SECRET_KEY` = a strong random string
- `DJANGO_DEBUG` = `False`
- `DJANGO_ALLOWED_HOSTS` = `.vercel.app`
- `DJANGO_CSRF_TRUSTED_ORIGINS` = `https://*.vercel.app`
- `DATABASE_URL` = your production Postgres URL (recommended)

## 4. Deploy
Click `Deploy`.

## 5. Run database migrations
Use one of these:
- Run locally against your production `DATABASE_URL`:
  - `python manage.py migrate`
- Or run migrations from your CI/CD job before/after deploy.

## Notes
- `vercel.json` routes all requests to `api/index.py` (Django WSGI app).
- Static files are served via WhiteNoise.
- Avoid SQLite on Vercel for production data; use Postgres (`DATABASE_URL`).
