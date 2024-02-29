import express, { Application } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import { connectToDatabase } from "./libs/db";
import bodyParser from "body-parser";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";
import path from "path";

dotenv.config();

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set absolute path for views directory
app.set("views", path.join(__dirname, "views"));

// Set up static files
app.use(express.static("public"));

app.use("/api", routes);

// Define route handler for the root URL
app.get("/", (req, res) => {
  res.render("index", {});
});

// Use the global error handling middleware
app.use(errorHandler);

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
