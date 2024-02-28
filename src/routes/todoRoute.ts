import { Router } from "express";
import { TodoController } from "../controllers/todoController";
import { validatorHandler } from "../middlewares/validatorHandler";
import { TodoValidator } from "../validators/todoValidator";

const router = Router();
const todoController = new TodoController();

router.get("/", todoController.getAll);
router.get("/:id", todoController.getOne);
router.post("/", validatorHandler(TodoValidator, "body"), todoController.addTodo);
router.put("/:id", validatorHandler(TodoValidator, "body"), todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

export default router;
