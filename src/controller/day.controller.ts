import * as fs from 'fs';
import * as path from 'path';
import * as shortid from 'shortid';

import { Day, IFilterDay, IDay } from '../models/day.model';
import { Task } from '../models/task.model';
import { Document } from 'mongoose';

export const getDay = async (req, res, next) => {
   try {
      let day = await Day.findOne({
         dayBarcode: req.params.dayBarcode,
         user: req.userId,
      }).populate({
         path: 'tasks',
         populate: {
            path: 'taskKind',
         },
      });

      if (!day) {
         day = await Day.create({
            dayBarcode: req.params.dayBarcode,
            user: req.userId,
         });
      }

      res.send({
         day,
      });
   } catch (e) {
      console.log(e);
      next(e);
   }
};

export const getDays = async (req, res, next) => {
   try {
      const { sort, limit, page, user } = req.query;

      let filter: IFilterDay = {};
      let sortFilter = new Map();
      let responseFilter = { totalCount: 0, page: 1, pages: 1 };

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

      const days = await Day.find(filter)
         .sort(sortFilter)
         .limit(Number(limit))
         .skip(Math.max((Number(page) - 1) * Number(limit), 0));

      responseFilter.totalCount = (await Day.find(filter)).length;
      if (page) responseFilter.page = Number(page);
      responseFilter.pages = Math.ceil(
         responseFilter.totalCount / Number(limit),
      );

      res.send({
         responseFilter,
         days,
      });
   } catch (e) {
      console.log(e);
      next(e);
   }
};

export const addDay = async (req, res, next) => {
   try {
      const { user }: IDay = req.body;
      const day = new Day();

      day.user = user;
      day.dayBarcode = '1397-06-05';
      await day.save();
      res.send({ day });
   } catch (e) {
      console.log(e);
      next(e);
   }
};

// Edit Day
export const editDay = async (req, res) => {
   try {
      const day = await Day.findByIdAndUpdate(
         req.params.id,
         { ...req.body },
         { new: true },
      );

      res.send({
         message: 'Day edited successfully',
         day,
      });
   } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
   }
};

export const deleteDay = async (req, res) => {
   try {
      const day = await Day.findByIdAndDelete(req.params.id);

      res.send({
         message: 'Day edited successfully',
         day,
      });
   } catch (err) {
      console.log(err);

      res.status(500).send(err);
   }
};

export const addTaskToDay = async (req, res, next) => {
   try {
      let { context, dayId } = req.body;

      let day = await Day.findById(dayId);

      if (!day) return res.send({ message: 'Day not found' });

      // add sentence
      context = context.trim();
      const fileName = shortid.generate();
      const task = new Task();

      // await task.save();
      // day.tasks.push(task._id);

      await day.save();
      res.send({ day, message: 'Task added ' });
   } catch (e) {
      console.log(e);
      next(e);
   }
};

export const deleteTaskOfDay = async (req, res, next) => {
   try {
      let { dayId, sentenceId } = req.body;
      let day = await Day.findById(dayId);

      if (!day) return res.send({ message: 'day not found' });

      let t = day.tasks.filter(item => item != sentenceId);
      day.tasks = t;
      await day.save();

      res.send({ day, message: 'Sentence deleted' });
   } catch (e) {
      console.log(e);
      next(e);
   }
};
