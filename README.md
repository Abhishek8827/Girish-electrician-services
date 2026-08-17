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

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 18 or higher. Download from nodejs.org. (This automatically includes `npm`).
- **Git**: Required to clone the repository. Download from git-scm.com.
- **MongoDB Connection String**: You need a database connection URL. You can get a free one from MongoDB Atlas or by running MongoDB locally.

## 🚀 Getting Started: Local Development Setup

Follow these steps to get the application running on your local machine.

### 1. Clone the Repository

Open your terminal, navigate to the directory where you want to store the project, and run:

```bash
git clone https://github.com/Abhishek8827/Girish-electrician-services.git
cd Girish-electrician-services
```

### 2. Set Up the Backend (Server)

The backend server handles API requests, user authentication, and database interactions.

a. **Install Dependencies**: Navigate into the `server` directory and install the required packages.

```bash
cd server
npm install
```

b. **Configure Environment Variables**: Create a `.env` file in the `server/` directory. This file stores sensitive information like database credentials and secret keys.

Copy the following into your new `server/.env` file and replace the placeholder values with your own:

```env
# Replace with your MongoDB connection string
MONGODB_URI=your-mongodb-connection-string

# A long, random string for signing authentication tokens
JWT_SECRET=your-strong-jwt-secret

# Credentials for the admin user
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH= # This will be generated in the next step

# The URL of the frontend application (for CORS)
CLIENT_URL=http://localhost:5173

# The port for the server to run on (optional)
PORT=5000
```

c. **Generate Admin Password**: To securely store the admin password, we need to hash it. Run the following command and enter a password when prompted.

```bash
npm run hash-admin-password
```

**Copy the generated hash** from the terminal output and paste it as the value for `ADMIN_PASSWORD_HASH` in your `server/.env` file.

### 3. Set Up the Frontend (Client)

The frontend is the React application that users see and interact with.

a. **Install Dependencies**: In a **new terminal window/tab**, navigate to the `client` directory and install its packages.

```bash
# From the project root directory:
cd client
npm install
```

b. **Environment Variables (Optional)**: The client is pre-configured to connect to the backend at `http://localhost:5000`. If you changed the `PORT` in the server's `.env` file, you must create a `client/.env` file and specify the correct API URL:

```env
# Example for client/.env
VITE_API_URL=http://localhost:YOUR_PORT_NUMBER/api
```

### 4. Run the Application

You need to have both the backend and frontend servers running at the same time.

- **Start the Backend Server**: In your terminal for the `server` directory, run:

  ```bash
  npm run dev
  ```

  The API will be running at `http://localhost:5000`.

- **Start the Frontend App**: In your terminal for the `client` directory, run:
  ```bash
  npm run dev
  ```
  The application will open in your browser at `http://localhost:5173`.

You can now use the website, submit service requests, and track them.

## Admin Access

To access the admin dashboard:

1.  Navigate to `http://localhost:5173/admin`.
2.  Log in using the `ADMIN_EMAIL` from your `server/.env` file and the **original password** you chose during the password hashing step.

Once logged in, you can manage service requests and electricians.

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
