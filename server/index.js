import dotenv from "dotenv";
import http from "http";
import express from "express";
import { setupWebSocket } from "./websocket/socket.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config({ path: "../.env" });

const app = express();
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

// optional HTTP route
app.get("/", (req, res) => {
  res.send("Server running");
});

const server = http.createServer(app);

setupWebSocket(server);

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});