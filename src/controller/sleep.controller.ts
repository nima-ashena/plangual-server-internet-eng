const shortid = require('shortid');
import * as fs from 'fs';
import * as path from 'path';

import { IFilterSleep, ISleep, Sleep } from '../models/sleep.model';

export const getSleep = async (req, res) => {
   const sleep = await Sleep.findById(req.params.id);
   res.send({
      sleep,
   });
};

// Sleeps
export const getSleeps = async (req, res, next) => {
   try {
      const { sort, limit, page, user } = req.query;

      let filter: IFilterSleep = {};
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

      const sleeps = await Sleep.find(filter)
         .sort(sortFilter)
         .limit(Number(limit))
         .skip(Math.max((Number(page) - 1) * Number(limit), 0));

      responseFilter.totalCount = (await Sleep.find(filter)).length;
      if (page) responseFilter.page = Number(page);
      responseFilter.pages = Math.ceil(
         responseFilter.totalCount / Number(limit),
      );

      res.send({ responseFilter, sleeps });
   } catch (e) {
      console.log(e);

      next(e);
   }
};

// Add sleeps
export const addSleeps = async (req, res, next) => {
   try {
      let { day, user }: ISleep = req.body;

      const sleep = new Sleep();
      sleep.day = day;
      sleep.user = user;

      await sleep.save();

      res.send({ sleep });
   } catch (e) {
      console.log(e);
      next(e);
   }
};

// Edit Sleep
export const editSleep = async (req, res) => {
   try {
      const sleep = await Sleep.findByIdAndUpdate(
         req.params.id,
         { ...req.body },
         { new: true },
      );

      res.send({
         message: 'sleep edited successfully',
         sleep,
      });
   } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
   }
};

export const deleteSleep = async (req, res) => {
   try {
      const sleep = await Sleep.findByIdAndDelete(req.params.id);

      res.send({
         message: 'Sleep edited successfully',
         sleep,
      });
   } catch (err) {
      console.log(err);

      res.status(500).send(err);
   }
};
