// import { router } from './dashboard-routes';
import { Router } from 'express';

import {
   getTask,
   getTasks,
   addTask,
   editTask,
   deleteTask,
} from '../../controller/tasks/task.controller';
import { authenticated } from '../../middlewares/middleware';

export const router = Router();

// GET Task
router.get('/tasks/:id', authenticated, getTask);
// GET Tasks
router.get('/tasks', authenticated, getTasks);
// Add task
router.post('/tasks', authenticated, addTask);
// Edit Task
router.put('/tasks/:id', authenticated, editTask);
// Delete Task
router.delete('/tasks/:id', authenticated, deleteTask);

export default router;
