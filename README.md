# Girish Electrician Services

A full-stack electrician service website with a React + Vite frontend and an Express + MongoDB backend.

## Overview

This repository contains two folders:

- `client/` — React app built with Vite. It provides the public-facing service request form, request tracking page, and admin portal.
- `server/` — Express API server with MongoDB persistence. It handles service requests, tracking, admin authentication, electricians, and request status updates.

## Features

- Submit new electrician service requests with image upload
- Track request status by request ID and contact details
- Admin login with JWT authentication
- Admin dashboard to view requests, assign electricians, and update status
- Secure file upload handling and request validation

## Tech stack

- Frontend: React, Vite, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express, MongoDB, Mongoose, Multer, bcrypt, JSON Web Tokens

## Prerequisites

- Node.js 18+ installed
- npm installed
- MongoDB connection string (Atlas or local MongoDB)

## Clone the repository

```bash
# Clone the repository
git clone https://github.com/Abhishek8827/Girish-electrician-services.git
cd Girish-electrician-services
```

## Backend setup

1. Install server dependencies:

```bash
cd server
npm install
```

2. Create a `.env` file inside `server/` with the required environment variables.

Example `server/.env`:

```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=some-strong-secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=your-generated-password-hash
CLIENT_URL=http://localhost:5173
PORT=5000
```

3. Generate the admin password hash:

```bash
npm run hash-admin-password
```

Copy the generated hash from the terminal and paste it into `ADMIN_PASSWORD_HASH` in `server/.env`.

4. Start the backend server:

```bash
npm run dev
```

The API will start at `http://localhost:5000` by default.

## Frontend setup

1. Install client dependencies:

```bash
cd ../client
npm install
```

2. (Optional) Create a `.env` file inside `client/` to customize the API URL.

Example `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

3. Start the frontend app:

```bash
npm run dev
```

The frontend will open at `http://localhost:5173`.

## Running the app

- Open the website in your browser at `http://localhost:5173`
- Submit a service request on the home page
- Track requests using the Track Request page
- Log in to the admin portal at `/admin`

## Admin access

- Use `ADMIN_EMAIL` and the password you used to generate `ADMIN_PASSWORD_HASH`
- After login, the admin pages are available at:
  - `/admin/requests`
  - `/admin/electricians`

## Production build

1. Build the frontend:

```bash
cd client
npm run build
```

2. Start the backend server for production:

```bash
cd ../server
npm start
```

## Notes

- The backend API includes a health check at `/api/health`
- Uploaded images are stored under `server/uploads/`
- The server automatically creates the uploads folder if it does not exist

## Troubleshooting

- If the server fails to start, verify `server/.env` contains a valid `MONGODB_URI`
- If admin login returns a configuration error, check `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, and `JWT_SECRET`
- If the frontend cannot reach the API, verify `VITE_API_URL` or use the default `http://localhost:5000/api`
