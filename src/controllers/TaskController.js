import TaskRepository from "../repositories/TaskRepository.js";
import TaskModel from "../models/TaskModel.js";

const repository = new TaskRepository();

export default class TaskController { 
    async createTask(req, res) { 
        try {
            const data = req.body;
            const task = new TaskModel(
                data.name,
                data.description,
                data.status,
                data.priority,
                data.dueDate
            );
            const savedTask = await repository.create(task);
            res.status(201).json(savedTask);
        } catch (err) {
            res.status(400).json({ error: err.message });
        } 
    }
    async getAllTasks(req, res) {
        try {
            const tasks = await repository.findAll();
            res.json(tasks);
        } catch (err) {
            res.status(500).json({ error: "Failed to retrieve tasks" });
        }
    }
}
