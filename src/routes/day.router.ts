// import { router } from './dashboard-routes';
import { Router } from 'express';

import {
   getDay,
   getDays,
   addDay,
   editDay,
   deleteDay,
   addTaskToDay,
   deleteTaskOfDay,
} from '../controller/day.controller';
import { authenticated } from '../middlewares/middleware';

export const router = Router();

// GET Day
router.get('/days/:dayBarcode', authenticated, getDay);
// GET Days
router.get('/days', authenticated, getDays);
// Add day
router.post('/days', authenticated, addDay);
// Edit Day
router.put('/days/:id', authenticated, editDay);
// Delete Day
router.delete('/days/:id', authenticated, deleteDay);
// Add sentence to day
router.post('/days/add-sentence', authenticated, addTaskToDay);
// Delete sentence of day
router.post('/days/delete-sentence', authenticated, deleteTaskOfDay);

export default router;
