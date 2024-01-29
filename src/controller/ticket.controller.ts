import * as fs from 'fs';
import * as path from 'path';
import * as shortid from 'shortid';

import { IFilterTicket, Ticket } from '../models/ticket.model';

export const getTicket = async (req, res, next) => {
   try {
      const ticket = await Ticket.findById(req.params.id);

      res.send({
         ticket,
      });
   } catch (e) {
      next(e);
   }
};

export const getTickets = async (req, res, next) => {
   try {
      const { query, sort, limit, page, user, type } = req.query;
      let filter: IFilterTicket = {};
      let sortFilter = new Map();
      let responseFilter = { totalCount: 0, page: 1, pages: 1 };

      if (query) {
         filter.context = { $regex: `${query}`, $options: 'i' };
      }

      if (sort) {
         if (sort[0] == '-') {
            sortFilter.set(sort.substr(1), -1);
         } else {
            sortFilter.set(sort, 1);
         }
      }
      if (user) {
         filter.user = user;
      }
      if (type) {
         filter.type = type;
      }

      const tickets = await Ticket.find(filter)
         .sort(sortFilter)
         .limit(Number(limit))
         .skip(Math.max((Number(page) - 1) * Number(limit), 0))
         .populate('user');

      responseFilter.totalCount = (await Ticket.find(filter)).length;
      if (page) responseFilter.page = Number(page);
      responseFilter.pages = Math.ceil(
         responseFilter.totalCount / Number(limit),
      );

      res.send({
         responseFilter,
         tickets,
      });
   } catch (e) {
      console.log(e);
      next(e);
   }
};

export const addTicket = async (req, res, next) => {
   try {
      const { context, type } = req.body;

      const ticket = new Ticket({
         context,
         type,
         user: req.userId,
      });

      await ticket.save();
      res.send({ ticket });
   } catch (e) {
      console.log(e);
      next(e);
   }
};

// Edit Ticket
export const editTicket = async (req, res) => {
   try {
      const ticket = await Ticket.findByIdAndUpdate(
         req.params.id,
         { ...req.body },
         { new: true },
      );

      res.send({
         message: 'Ticket edited successfully',
         ticket,
      });
   } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
   }
};

export const deleteTicket = async (req, res) => {
   try {
      const ticket = await Ticket.findByIdAndDelete(req.params.id);

      res.send({
         message: 'Ticket edited successfully',
         ticket,
      });
   } catch (err) {
      console.log(err);

      res.status(500).send(err);
   }
};
