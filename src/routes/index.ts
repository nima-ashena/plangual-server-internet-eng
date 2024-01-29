import { Router } from 'express';

import dayRouter from './day.router';
import sleepRouter from './sleep.router';
import taskRouter from './tasks/task.router';
import taskKindRouter from './tasks/taskKind.router';
import userRouter from './user.router';
import ticketRouter from './ticket.router';

const router = Router();

router.use(userRouter);
router.use(dayRouter);
router.use(sleepRouter);
router.use(taskRouter);
router.use(taskKindRouter);
router.use(ticketRouter);

export default router;
