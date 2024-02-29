import { TodoController } from "../controllers/todoController";
import { Todo } from "../models/Todo";
import { NextFunction, Request, Response } from "express";

// Mock dependencies with jest.mock
jest.mock("../models/Todo");

describe("TodoController", () => {
  let controller: TodoController;
  let mockReq: Request;
  let mockRes: Response;
  let mockNext: NextFunction;

  beforeEach(() => {
    controller = new TodoController();
    mockReq = { query: {}, params: {}, body: {} } as Request;
    mockNext = jest.fn();
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Reset mocks
    jest.clearAllMocks();
  });

  // Test for getAll
  test("should fetch all todos successfully", async () => {
    const mockTodos = [
      { _id: 1, title: "Todo 1", status: "done" },
      { _id: 2, title: "Todo 2", status: "pending" },
    ];

    const mockTotal = 2;

    (Todo.find as jest.Mock).mockReturnValueOnce({
      skip: jest.fn().mockReturnValueOnce({
        limit: jest.fn().mockResolvedValueOnce(mockTodos),
      }),
    });

    (Todo.countDocuments as jest.Mock).mockResolvedValueOnce(mockTotal);

    await controller.getAll(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: true,
      msg: "Todo found successfully.",
      data: mockTodos,
      total: mockTotal,
      currentPage: 1,
      pageLimit: 10,
    });
  });

  test("should return 404 if todos not found", async () => {
    (Todo.find as jest.Mock).mockReturnValueOnce({
      skip: jest.fn().mockReturnValueOnce({
        limit: jest.fn().mockResolvedValueOnce([]),
      }),
    });

    await controller.getAll(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: false,
      msg: "Todos not found.",
    });
  });

  // Test for getOneTodo
  describe("getOne", () => {
    test("should fetch one todo successfully", async () => {
      const mockTodo = { _id: 1, title: "Todo 1", status: "done" };

      (Todo.findOne as jest.Mock).mockResolvedValueOnce(mockTodo);

      await controller.getOne(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: true,
        msg: "Todo found successfully.",
        data: mockTodo,
      });
    });

    test("should return 404 if todo not found", async () => {
      (Todo.findOne as jest.Mock).mockResolvedValueOnce(null);

      await controller.getOne(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: false,
        msg: "Todo not found.",
      });
    });
  });
  describe("addTodo", () => {
    test("should add todo successfully", async () => {
      const mockTodo = { _id: 1, title: "Todo 1", status: "done" };

      (Todo.create as jest.Mock).mockResolvedValueOnce(mockTodo);

      await controller.addTodo(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: true,
        msg: "Todo added successfully.",
        data: mockTodo,
      });
    });
  });

  // Test for updateTodo
  describe("updateTodo", () => {
    test("should update todo successfully", async () => {
      const mockTodo = { _id: 1, title: "Updated Todo", status: "done" };

      (Todo.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(mockTodo);

      await controller.updateTodo(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: true,
        msg: "Todo updated successfully.",
        data: mockTodo,
      });
    });

    test("should return 404 if todo not found", async () => {
      (Todo.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

      await controller.updateTodo(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: false,
        msg: "Todo not found.",
      });
    });
  });

  // Test for deleteTodo
  describe("deleteTodo", () => {
    test("should delete todo successfully", async () => {
      const mockTodo = { _id: 1, title: "Todo 1", status: "done" };

      (Todo.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(mockTodo);

      await controller.deleteTodo(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: true,
        msg: "Todo deleted successfully.",
      });
    });

    test("should return 404 if todo not found", async () => {
      (Todo.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);

      await controller.deleteTodo(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: false,
        msg: "Todo not found.",
      });
    });
  });
});
