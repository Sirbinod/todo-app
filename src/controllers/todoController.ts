import { NextFunction, Request, Response } from "express";
import { Todo } from "../models/Todo";
import { isValidateMongoDBId } from "../utils/helper";

export class TodoController {
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { status, page, limit, all } = req.query;
    const currentPage = Number(page || 1);
    const pageLimit = Number(limit || 10);
    const skip = (currentPage - 1) * pageLimit;

    let queryParam = {};
    if (status) queryParam = { ...queryParam, status };

    if (all) {
      const todo = await Todo.find();
      if (todo?.length > 0) return res.status(200).json({ status: true, msg: "Todo found successfully.", data: todo });
      return res.status(404).json({ status: false, msg: "Todos not found." });
    } else {
      const todo = await Todo.find(queryParam).skip(skip).limit(pageLimit);
      const total = await Todo.countDocuments(queryParam);

      if (todo?.length > 0)
        return res.status(200).json({ status: true, msg: "Todo found successfully.", data: todo, total, currentPage, pageLimit });
      return res.status(404).json({ status: false, msg: "Todos not found." });
    }
  }

  public async getOne(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let condition: {
      _id?: string;
      slug?: string;
    } = {};
    //   to check mongo id
    const isId = isValidateMongoDBId(req.params.id);
    if (isId) condition._id = req.params.id;
    else condition.slug = req.params.id;
    const todo = await Todo.findOne(condition);
    if (todo) return res.status(200).json({ status: true, msg: "Todo found successfully.", data: todo });
    return res.status(404).json({ status: false, msg: "Todo not found." });
  }

  public async addTodo(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const todo = await Todo.create(req.body);
    return res.status(200).json({ status: true, msg: "Todo added successfully.", data: todo });
  }

  public async updateTodo(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) return res.status(404).json({ status: false, msg: "Todo not found." });
    return res.status(200).json({ status: true, msg: "Todo updated successfully.", data: todo });
  }

  public async deleteTodo(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ status: false, msg: "Todo not found." });
    return res.status(200).json({ status: true, msg: "Todo deleted successfully." });
  }
}
