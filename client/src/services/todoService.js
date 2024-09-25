import apiService from "./index.js";
import { Task } from "../models/index.js";

export const getTodoList = async () => {
    const response = await apiService.get("/todo");
    const tasks = response.data || [];
    return tasks.map(t => {
        return new Task().loadFromJSON(t);
    });
}

export const addTodo = async (newTodo) => {
    const response = await apiService.post("/todo", newTodo);
    return response.data;
}

export const updateTodo = async (updatedTodo) => {
    const response = await apiService.put("/todo", updatedTodo);
    return response.data;
}