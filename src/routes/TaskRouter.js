import express from 'express';
import TaskController from '../controllers/TaskController.js';

const router = express.Router();
const controller = new TaskController();

router.post('/tasks', (req, res) => controller.createTask(req, res));
router.get('/tasks', (req, res) => controller.getAllTasks(req, res));

export default router;