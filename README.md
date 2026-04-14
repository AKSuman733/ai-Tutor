# AI English Tutor

A full-stack English learning tutor app with a React/Vite frontend and an Express backend.

## Project structure

- `client/` - React frontend built with Vite
- `server/` - Express backend API using OpenAI and Groq SDK

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

## Environment

The server may use environment variables for API keys. Create a `.env` file in `server/` if needed.

Example:

```env
OPENAI_API_KEY=your_openai_api_key
```

## Notes

- `node_modules/` is ignored by Git.
- The frontend is a Vite app using React.
- The backend is an Express server with CORS and OpenAI integration.
