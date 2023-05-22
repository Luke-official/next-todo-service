"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../../models/todo"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTodos = yield todo_1.default.find();
        const todos = allTodos.map((todo) => {
            return {
                id: todo._id,
                name: todo.name,
                description: todo.description,
                status: todo.status,
            };
        });
        res.status(200).json({ todos });
    }
    catch (error) {
        throw error;
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const todo = new todo_1.default({
            name: body.name,
            description: body.description,
            status: body.status,
        });
        const newTodo = yield todo.save();
        const allTodos = yield todo_1.default.find();
        const todos = allTodos.map((todo) => {
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
    }
    catch (error) {
        throw error;
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const mongoUpdateTodo = yield todo_1.default.findByIdAndUpdate({ _id: id }, body);
        const updateTodo = new todo_1.default({
            id: mongoUpdateTodo === null || mongoUpdateTodo === void 0 ? void 0 : mongoUpdateTodo._id,
            name: mongoUpdateTodo === null || mongoUpdateTodo === void 0 ? void 0 : mongoUpdateTodo.name,
            description: mongoUpdateTodo === null || mongoUpdateTodo === void 0 ? void 0 : mongoUpdateTodo.description,
            isComplete: mongoUpdateTodo === null || mongoUpdateTodo === void 0 ? void 0 : mongoUpdateTodo.status,
        });
        const allTodos = yield todo_1.default.find();
        const todos = allTodos.map((todo) => {
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
    }
    catch (error) {
        throw error;
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTodo = yield todo_1.default.findByIdAndRemove(req.params.id);
        const allTodos = yield todo_1.default.find();
        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteTodo = deleteTodo;
