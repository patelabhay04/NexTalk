# Premium Realtime Chat Application

This is a production-like, job-ready realtime chat application with:

- React + Vite frontend with Tailwind CSS
- Node.js + Express backend with Socket.IO
- MongoDB persistence for messages and users
- JWT-based authentication (backend) and localStorage usage on frontend
- Public channel + private messaging
- Online users list
- Ready-to-deploy configuration for Render (backend) and Netlify/Vercel (frontend)

## Quick start (local)

1. Clone repo and open two terminals

### Backend
```bash
cd backend
cp .env.example .env
# edit .env and set MONGO_URI and JWT_SECRET
npm install
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend defaults to `http://localhost:5173` and backend to `http://localhost:5000`.

## Deploy

- Backend: Render / Heroku / Fly.io - set environment variables from `.env.example`
- Frontend: Netlify / Vercel - set `VITE_API_URL` to your backend URL

## Notes

This project is intentionally modular and easy to extend:
- Add typing indicator
- Add message read receipts
- Add file/image attachments
- Improve auth flow with refresh tokens

Good luck — don’t break production.



---

## ✅ CI / Continuous Integration

This project includes a GitHub Actions workflow that:
- Installs dependencies for frontend and backend
- Builds the frontend (Vite)
- Uploads the built `dist` folder as an artifact

Badge (after you push to GitHub and CI runs) can be added like:
```
![CI](https://github.com/<username>/<repo>/actions/workflows/ci.yml/badge.svg)
```

## 🧾 Pull Request Template

A PR template is included in `.github/PULL_REQUEST_TEMPLATE.md`. Use feature branches and open PRs for review before merging.

## 🖼️ Screenshots

Screenshots live in `/screenshots`. Replace the placeholder images with real screenshots:
- `/screenshots/login.png`
- `/screenshots/chat.png`
- `/screenshots/mobile.png`

Add them to the README by replacing this section with real images:
```
![Login](/screenshots/login.png)
![Chat](/screenshots/chat.png)
![Mobile](/screenshots/mobile.png)
```

## 🚀 Deploy (auto-deploy notes)

Recommended flow:
1. Push backend to GitHub.
2. Connect backend repository to Render (or Heroku).
   - Set `MONGO_URI` and `JWT_SECRET` in Render environment variables.
3. Push frontend to GitHub.
4. Connect frontend repository to Netlify/Vercel and set `VITE_API_URL` to your backend URL.

You can add GitHub Actions to auto-deploy, but that requires storing deployment API keys as GitHub Secrets (e.g., `NETLIFY_AUTH_TOKEN`, `RENDER_API_KEY`) and custom steps. If you want, I can add a deploy workflow that triggers after a successful build — you'll need to provide which provider you'll use and the required secrets.

## 🧰 Git commands

See `GIT-COMMANDS.txt` for a short list of useful git commands to initialize the repo, create feature branches, open PRs, and push to GitHub.

