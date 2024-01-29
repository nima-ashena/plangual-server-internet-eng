import { Router } from 'express';

import {
   getTicket,
   getTickets,
   addTicket,
   editTicket,
   deleteTicket,
} from '../controller/ticket.controller';
import { authenticated } from '../middlewares/middleware';

export const router = Router();

// GET ticket
router.get('/tickets/:id', authenticated, getTicket);
// Get tickets
router.get('/tickets', authenticated, getTickets);
// Add ticket
router.post('/tickets', authenticated, addTicket);
// Edit ticket
router.put('/tickets/:id', authenticated, editTicket);
// Delete ticket
router.delete('/tickets/:id', authenticated, deleteTicket);

export default router;
