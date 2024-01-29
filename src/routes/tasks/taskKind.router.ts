// import { router } from './dashboard-routes';
import { Router } from 'express';

import {
   getTaskKind,
   getTaskKinds,
   addTaskKind,
   editTaskKind,
   deleteTaskKind,
} from '../../controller/tasks/taskKind.controller';
import { authenticated } from '../../middlewares/middleware';

export const router = Router();

// GET TaskKind
router.get('/tasks-kind/:id', authenticated, getTaskKind);
// GET TaskKinds
router.get('/tasks-kind', authenticated, getTaskKinds);
// Add taskKind
router.post('/tasks-kind', authenticated, addTaskKind);
// Edit TaskKind
router.put('/tasks-kind/:id', authenticated, editTaskKind);
// Delete TaskKind
router.delete('/tasks-kind/:id', authenticated, deleteTaskKind);

export default router;
