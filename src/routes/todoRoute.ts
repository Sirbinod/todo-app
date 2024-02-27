import { Router } from "express";
import { TodoController } from "../controllers/todoController";

const router = Router();
const todoController = new TodoController();

router.get("/", todoController.getAll);
router.get("/:id", todoController.getOne);
router.post("/", todoController.addTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

export default router;
