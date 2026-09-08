# MERN Language Exchange App

A full-stack social and communication app for language learners to connect, send friend requests, chat in real time, and start video calls with other users.

This project uses a React frontend with Vite, an Express + MongoDB backend, and Stream Chat for real-time messaging and video features.

## Features

- User signup and login with JWT-based authentication
- Profile onboarding with language preferences, bio, location, and profile picture
- Friend request system with recommendations and friend discovery
- Real-time chat powered by Stream Chat
- Video calling support through the Stream video SDK
- Responsive dashboard UI built with React and Tailwind CSS
- Theme switching
- Protected routes and cookie-based session handling

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- TanStack Query
- Zustand
- Tailwind CSS
- DaisyUI
- Stream Chat React SDK
- Lucide icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- Cookie-based session cookies
- Stream Chat server SDK

## Project Structure

```bash
MERN/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── package.json
│   └── .env.example (if added separately)
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── package.json
├── .gitignore
└── README.md
```

## Prerequisites

Before running the app, make sure you have:

- Node.js 18 or newer
- npm
- MongoDB running locally or a MongoDB Atlas connection string
- A Stream account with API key and secret

## Environment Variables

Create a `.env` file inside the `backend` directory with the following variables:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/mern-language-app
JWT_SECRET_KEY=your_super_secret_key
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

Notes:
- `MONGO_URI` can point to a local MongoDB instance or MongoDB Atlas.
- `JWT_SECRET_KEY` should be a strong secret value.
- `STREAM_API_KEY` and `STREAM_API_SECRET` are required for chat and video features.

## Installation

From the root of the project:

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

## Running the App

### Start the backend

```bash
npm run dev --prefix backend
```

This starts the Express server using nodemon.

### Start the frontend

```bash
npm run dev --prefix frontend
```

The frontend will run on:

```text
http://localhost:5173
```

The backend API runs on:

```text
http://localhost:5000
```

## Production Build

To build the frontend for production:

```bash
npm run build --prefix frontend
```

To start the backend in production mode from the root project:

```bash
npm run start
```

This root script runs the backend server. The backend is also configured to serve the frontend build when `NODE_ENV=production`.

## API Overview

### Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/onboard`

### Users
- `GET /api/users/`
- `GET /api/users/friends`
- `POST /api/users/friend-requests/:id`
- `PUT /api/users/friend-requests/:id/accept`
- `GET /api/users/friend-requests`
- `GET /api/users/outgoing-friend-requests`

### Chat / Stream
- `GET /api/chat/token`

## Typical User Flow

1. A new user signs up.
2. The app creates a MongoDB user record and registers the user with Stream Chat.
3. The user completes onboarding with language preferences and personal details.
4. The dashboard shows recommended people and friends.
5. Users can send friend requests and accept them.
6. Once connected, they can start a direct chat and use video calls.

## Notes

- The frontend and backend are configured for local development with CORS enabled for `http://localhost:5173`.
- Cookie-based authentication is used, so the frontend must send credentials with requests.
- The app depends on valid Stream credentials for chat functionality.

## License

This project is licensed under the ISC license.

## Author

Built as a MERN stack language exchange application.
