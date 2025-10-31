// const express = require("express")
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
import cookieParser from 'cookie-parser';
import cors from "cors";

dotenv.config();


const PORT = process.env.PORT;
const  __dirname  = path.resolve();

// app.use(express.json());

app.use(express.json({ limit: "10mb" }));  // JSON body limit बढ़ा दी
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:");
  next();
});

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


 if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

server.listen(PORT, () =>{
    console.log("server is running on PORT:" + PORT);
    connectDB();
});