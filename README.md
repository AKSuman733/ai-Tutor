# AI English Tutor

A full-stack English learning tutor app with a React/Vite frontend and an Express backend.

## Project structure

- `client/` - React frontend built with Vite
- `server/` - Express backend with auth, websocket, OpenAI, and MongoDB support

## Getting started

### 1. Install dependencies

Install dependencies separately for client and server.

```bash
cd client
npm install

cd ../server
npm install
```

### 2. Run the app locally

Open two terminals.

Terminal 1: Start the backend server

```bash
cd server
npm run dev
```

Terminal 2: Start the frontend

```bash
cd client
npm run dev
```

Then open the local Vite URL shown in the terminal (usually `http://localhost:5173`).

## Backend endpoints

- `POST /api/auth/register` - register a new user
- `POST /api/auth/login` - login existing user
- WebSocket server at `ws://localhost:5001` for real-time sentence correction and conversation flow

## Environment

Create a `.env` file in `server/` with the values your app requires.

Example:

```env
GROQ_API_KEY=your_GROQ_api_key
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=......
```

## Notes

- `node_modules/` is ignored by Git.
- The frontend uses a WebSocket hook to send sentences and receive responses from the backend.
- The backend uses Express and MongoDB for auth plus a websocket server for live communication.
