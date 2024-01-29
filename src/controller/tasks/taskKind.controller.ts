import * as fs from 'fs';
import * as path from 'path';
import * as shortid from 'shortid';

import { TaskKind } from '../../models/taskKind.model ';
import { Task, IFilterTask, ITask } from '../../models/task.model';

export const getTaskKind = async (req, res, next) => {
   try {
      const taskKind = await TaskKind.findById(req.params.id);

      res.send({
         taskKind,
      });
   } catch (e) {
      next(e);
   }
};

export const getTaskKinds = async (req, res, next) => {
   try {
      const taskKinds = await TaskKind.find({ user: req.userId });

      res.send({
         taskKinds,
      });
   } catch (e) {
      console.log(e);
      next(e);
   }
};

export const addTaskKind = async (req, res, next) => {
   try {
      const { title, color, textColor } = req.body;

      if (await TaskKind.findOne({ title, user: req.userId })) {
         return res
            .status(401)
            .send({ message: 'This taskKind is already exits' });
      }

      const taskKind = new TaskKind({
         title,
         user: req.userId,
         color,
         textColor,
      });

      await taskKind.save();
      res.send({ taskKind });
   } catch (e) {
      console.log(e);
      next(e);
   }
};

// Edit TaskKind
export const editTaskKind = async (req, res) => {
   try {
      const taskKind = await TaskKind.findByIdAndUpdate(
         req.params.id,
         { ...req.body },
         { new: true },
      );

      res.send({
         message: 'TaskKind edited successfully',
         taskKind,
      });
   } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
   }
};

export const deleteTaskKind = async (req, res) => {
   try {
      const taskKind = await TaskKind.findByIdAndDelete(req.params.id);

      await Task.deleteMany({ taskKind: req.params.id });

      res.send({
         message: 'TaskKind edited successfully',
         taskKind,
      });
   } catch (err) {
      console.log(err);

      res.status(500).send(err);
   }
};
