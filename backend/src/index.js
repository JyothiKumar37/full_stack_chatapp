import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";



import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
	    "http://13.126.139.140",
	    "http://13.126.139.140:8080",
    ],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.get("/health", (req, res) => res.send("OK"));




server.listen(PORT,"0.0.0.0", () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
