import { Router } from 'express';

import {
   getSleep,
   getSleeps,
   addSleeps,
   editSleep,
   deleteSleep,
} from '../controller/sleep.controller';
import { authenticated } from '../middlewares/middleware';

export const router = Router();

// GET sleep
router.get('/sleeps/:id', authenticated, getSleep);
// Get sleeps
router.get('/sleeps', authenticated, getSleeps);
// Add sleep
router.post('/sleeps', authenticated, addSleeps);
// Edit sleep
router.put('/sleeps/:id', authenticated, editSleep);
// Delete sleep
router.delete('/sleeps/:id', authenticated, deleteSleep);

export default router;
