import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
