import express, { Application } from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./libs/db";
import bodyParser from "body-parser";
import routes from "./routes";

dotenv.config();

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", routes);

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
