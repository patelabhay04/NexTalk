🚀 Premium Realtime Chat Application

A fast, modern, production-ready realtime chat app built from scratch. Clean code, smooth UX, and a setup that mirrors real-world industry projects. Perfect for showcasing full-stack skills.

✨ Highlights

⚡ Realtime messaging with Socket.IO

🧩 Modular full-stack architecture (React + Node + MongoDB)

🔐 JWT authentication with protected routes

💬 Public room + private chats

🟢 Live online user tracking

🎨 Tailwind-styled UI running on Vite for ultra-fast dev

☁️ Deployment-ready with environment setups for Render, Netlify, and Vercel

🗃️ MongoDB persistence for messages and users


🛠️ Local Setup

Clone the repo and open two terminals.

Backend:-

cd backend

cp .env.example .env

# Add MONGO_URI and JWT_SECRET


npm install

npm run dev

Frontend:-

cd frontend

cp .env.example .env

npm install

npm run dev

🌍 Deployment
Backend

Deploy on Render / Heroku / Fly.io

Add env variables from .env.example.

Frontend

Deploy on Netlify / Vercel

Set:

VITE_API_URL = your_backend_url

📌 Git Commands

Useful git commands are listed in GIT-COMMANDS.txt for repo setup, branching, pushing, and PR workflow.


