# ReClaim 2.0

ReClaim 2.0 is a campus lost-and-found platform for students and staff to report missing items, browse found items, verify ownership, and manage return requests in one place.

## Features

- Report found items with details and verification questions
- Browse and search recent item listings
- Submit claims for possible matches
- Track claim status and item activity
- Manage access for students, admins, and campus users

## Project structure

- `frontend/` — React + Vite client app
- `backend/` — Express API and MongoDB integration

## Local setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## Environment variables

Create `.env` files based on the example files in each app folder:

- `frontend/.env.example`
- `backend/.env.example`

## Production build

```bash
cd frontend
npm run build
```

## License

This project is for educational and campus use.
