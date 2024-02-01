/*
====>> example of connecting database using IIFE
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR:", error);
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server is runing on ${process.env.PORT}`);
    });
    console.log("Database Connnected");
  } catch (error) {
    console.log("Error connecting DB ", error);
    //throw error;
  }
})();
*/
