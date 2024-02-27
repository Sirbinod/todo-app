import express, { Request, Response } from "express";
import todoRoute from "./todoRoute";
const router = express.Router();

// todo route
router.use("/todo", todoRoute);

// To catch unavailable route
router.use("/*", (req: Request, res: Response) => {
  res.status(404).json({ status: false, msg: "Route Not Found : Todo App" });
});

export default router;
