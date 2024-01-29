import * as fs from 'fs';
import * as path from 'path';
import * as shortid from 'shortid';

import { Task, IFilterTask, ITask } from '../../models/task.model';
import { Day } from '../../models/day.model';
import { log } from 'console';
import { Document } from 'mongoose';

export const getTask = async (req, res, next) => {
   try {
      const task = await Task.findById(req.params.id);

      res.send({
         task,
      });
   } catch (e) {
      next(e);
   }
};

export const getTasks = async (req, res, next) => {
   try {
      const {
         query,
         notCompleted,
         unAssigned,
         sort,
         sort2,
         limit,
         page,
         user,
         taskKindId,
         archived,
      } = req.query;

      let filter: IFilterTask = {};
      let sortFilter = new Map();
      let responseFilter = { totalCount: 0, page: 1, pages: 1 };

      if (sort) {
         if (sort[0] == '-') {
            sortFilter.set(sort.substr(1), -1);
         } else {
            sortFilter.set(sort, 1);
         }
      }
      if (sort2) {
         if (sort2[0] == '-') {
            sortFilter.set(sort2.substr(1), -1);
         } else {
            sortFilter.set(sort2, 1);
         }
      }
      if (query) {
         filter.title = { $regex: `${query}`, $options: 'i' };
      }
      if (taskKindId) {
         filter.taskKind = taskKindId;
      }
      if (notCompleted === 'true') {
         filter.completed = !notCompleted;
      }
      if (unAssigned === 'true') {
         filter.dayBarcode = 'unassign';
      }
      if (archived) {
         if (archived === 'not-archived') {
            filter.archived = { $ne: true };
         }
         if (archived === 'archived') {
            filter.archived = true;
         }
      }
      if (user) {
         filter.user = user;
      }

      let tasks: (ITask & Document<any, any, ITask>)[];

      if (Number(page)) {
         tasks = await Task.find(filter)
            .sort(sortFilter)
            .limit(Number(limit))
            .skip(Math.max((Number(page) - 1) * Number(limit), 0))
            .populate('taskKind');
      } else {
         tasks = await Task.find(filter).sort(sortFilter).populate('taskKind');
      }

      responseFilter.totalCount = (await Task.find(filter)).length;
      if (page) responseFilter.page = Number(page);
      responseFilter.pages = Math.ceil(
         responseFilter.totalCount / Number(limit),
      );

      res.send({
         responseFilter,
         tasks,
      });
   } catch (e) {
      console.log(e);
      next(e);
   }
};

export const addTask = async (req, res, next) => {
   try {
      const { title, taskKind, dayBarcode, date } = req.body;

      const task = await Task.create({
         title,
         taskKind,
         user: req.userId,
         dayBarcode,
         date,
      });

      if (taskKind == '') {
         return res.status(401).send({ message: 'TaskKind must not be empty' });
      }

      if (dayBarcode) {
         const day = await Day.findOne({
            dayBarcode: dayBarcode,
            user: req.userId,
         });
         day.tasks.push(task._id);
         await day.save();
      }
      res.send({ task });
   } catch (e) {
      console.log(e);
      next(e);
   }
};

// Edit Task
export const editTask = async (req, res) => {
   try {
      const task = await Task.findByIdAndUpdate(
         req.params.id,
         { ...req.body },
         { new: true },
      );

      const { dayBarcode, assign } = req.body;

      if (dayBarcode) {
         let day = await Day.findOne({ dayBarcode, user: req.userId });
         if (!day) {
            day = await Day.create({
               dayBarcode: dayBarcode,
               user: req.userId,
            });
         }
         if (assign === 'unassign') {
            let t: string[] = day.tasks;
            t.splice(t.indexOf(req.params.id), 1);
            day.tasks = t;
            task.dayBarcode = 'unassign';
            task.date = null;
            await task.save();
            await day.save();
         } else if (assign === 'assign') {
            day.tasks.push(req.params.id);
            await day.save();
         }
      }

      res.send({
         message: 'Task edited successfully',
         task,
      });
   } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
   }
};

export const deleteTask = async (req, res) => {
   try {
      const task = await Task.findByIdAndDelete(req.params.id);

      res.send({
         message: 'Task edited successfully',
         task,
      });
   } catch (err) {
      console.log(err);

      res.status(500).send(err);
   }
};
