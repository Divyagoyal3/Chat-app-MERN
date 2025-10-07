// const express = require("express")
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from 'cookie-parser';
import cors from "cors";

dotenv.config();
const app =  express();

const PORT = process.env.PORT;

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

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);



app.listen(PORT, () =>{
    console.log("server is running on PORT:" + PORT);
    connectDB();
});