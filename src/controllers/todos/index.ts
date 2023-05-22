import { Response, Request } from "express";
import { ITodo } from "./../../types/todo";
import Todo from "../../models/todo";
import { TodoResource } from "../../resources/todo.resource";

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const allTodos: ITodo[] = await Todo.find();
    const todos: TodoResource[] = allTodos.map((todo) => {
      return {
        id: todo._id,
        name: todo.name,
        description: todo.description,
        status: todo.status,
      };
    });
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, "name" | "description" | "status">;

    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
    });

    const newTodo: ITodo = await todo.save();
    const allTodos: ITodo[] = await Todo.find();

    const todos: TodoResource[] = allTodos.map((todo) => {
      return {
        id: todo._id,
        name: todo.name,
        description: todo.description,
        status: todo.status,
      };
    });

    res
      .status(201)
      .json({ message: "Todo added", todo: newTodo, todos: todos });
  } catch (error) {
    throw error;
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const mongoUpdateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    );

    const updateTodo = new Todo({
      id: mongoUpdateTodo?._id,
      name: mongoUpdateTodo?.name,
      description: mongoUpdateTodo?.description,
      isComplete: mongoUpdateTodo?.status,
    });

    const allTodos: ITodo[] = await Todo.find();
    const todos: TodoResource[] = allTodos.map((todo) => {
      return {
        id: todo._id,
        name: todo.name,
        description: todo.description,
        status: todo.status,
      };
    });
    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
      todos: todos,
    });
  } catch (error) {
    throw error;
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
      req.params.id
    );
    const allTodos: ITodo[] = await Todo.find();
    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
