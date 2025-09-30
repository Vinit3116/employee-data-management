# Employee Data Management — Verto ASE Challenge

A simple fullstack CRUD application (Associate Software Engineer challenge).  
Backend: Node.js + Express + SQLite.  
Frontend: Static HTML using Bootstrap 5 (no build step).  

## Features
- Full CRUD REST API `/api/employees` (name, email, position).
- SQLite persistence (`/data/employees.db`).
- Frontend with:
  - List employees in a table
  - Add employee form with client-side validation
  - Edit employee via modal
  - Delete employee with confirm
  - Search/filter by name
- Tests for backend endpoints using Jest + Supertest.
- Well-commented, clean code.

## Quick setup (Linux / macOS / Windows WSL)
1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start server:
   ```bash
   npm start
   ```
   Server listens on `http://localhost:3000`.
4. Open frontend:
   - Open `public/index.html` in your browser, or visit `http://localhost:3000` if you started the server (server serves static frontend).

## Running tests
```bash
npm test
```

## Assumptions & Design Choices
- SQLite chosen for simplicity and single-file persistence.
- No ORM used to keep the project lightweight (uses `sqlite3` package).
- Frontend is vanilla JS + Bootstrap 5; this keeps focus on core requirements.
- API is RESTful and returns JSON with clear status codes.
- Validation is done both client-side and minimally server-side (basic checks).

## Folder structure
- `server.js` — express app + API routes
- `db/` — database initialiser and helper
- `public/` — frontend (HTML/CSS/JS)
- `tests/` — Jest tests
- `data/employees.db` — SQLite DB (created on first run)

Good luck! If you record a short demo video (Loom), add a link to the README before submitting.
