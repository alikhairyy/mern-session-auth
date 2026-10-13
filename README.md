# Session Authentication with Node, Express & MongoDB

Two versions of a login/registration system that use **server-side sessions stored in MongoDB**.

| Folder | Frontend | Backend |
|---|---|---|
| [`express-vanilla/`](express-vanilla) | Plain HTML/JS | Express + Mongoose |
| [`react-vite/`](react-vite) | React (Vite) | Express + Mongoose |

## Features
- Register, log in, log out, and `GET /api/me` to restore the session
- Passwords **hashed with bcrypt (12 rounds)** in a Mongoose pre-save hook, never stored in plain text
- `express-session` with `connect-mongo`, so logins survive server restarts
- Hardened cookies: `httpOnly`, `sameSite=lax`, `secure` in production
- Input validation (email format, minimum password length, duplicate accounts)
- Secrets kept in `.env` (see `.env.example`)

## Run it
```bash
cd express-vanilla      # or react-vite
cp .env.example .env    # set MONGODB_URI and SESSION_SECRET
npm install
npm start
```
**Stack:** Node.js · Express · MongoDB · Mongoose · React · Vite
