import mongoose from "mongoose";
import { PrepTask } from "../models/PrepTask.js";

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function getTasks(_request, response, next) {
  try {
    const tasks = await PrepTask.find().sort({ createdAt: -1 });
    response.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
}

export async function createTask(request, response, next) {
  try {
    const task = await PrepTask.create(request.body);
    response.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

export async function updateTask(request, response, next) {
  try {
    if (!isValidId(request.params.id)) {
      return response.status(400).json({ message: "Invalid task ID" });
    }

    const task = await PrepTask.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true
    });

    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }

    response.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(request, response, next) {
  try {
    if (!isValidId(request.params.id)) {
      return response.status(400).json({ message: "Invalid task ID" });
    }

    const task = await PrepTask.findByIdAndDelete(request.params.id);

    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }

    response.status(200).json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
}

