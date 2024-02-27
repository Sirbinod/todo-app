import express, { Application } from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./libs/db";
dotenv.config();

const app: Application = express();

connectToDatabase()
  .then(() => {
    // // Start the server
    const server = app.listen(process.env.PORT || 5000, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
