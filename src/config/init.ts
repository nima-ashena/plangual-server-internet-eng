import * as fs from 'fs';
import * as path from 'path';

import { User } from '../models/user.model';
import { TaskKind } from '../models/taskKind.model ';
import { Task } from '../models/task.model';

const user = 'nima';

export const init = async () => {
   if (process.env.NODE_ENV == 'development') {
      process.env.BASE_URL = `http://localhost:${process.env.PORT}`;
   }

   // Restore DB
   let user = await User.findOne({ name: 'Nima' });
   if (!user) {
      user = await User.create({
         name: 'Nima',
         username: 'nima',
         password: '1234',
         email: 'nima@nima.com',
      });

      const taskKind = await TaskKind.create({
         title: 'HomeWork',
         color: 'blue',
         textColor: '#fff',
         user: user._id,
      });
      const taskKind2 = await TaskKind.create({
         title: 'University',
         color: 'red',
         textColor: '#fff',
         user: user._id,
      });
      const taskKind3 = await TaskKind.create({
         title: 'Other',
         color: '#fff',
         textColor: 'black',
         user: user._id,
      });

      const task1 = await Task.create({
         title: 'انجام تکالیف زبان',
         taskKind: taskKind._id,
         user: user._id,
      });
      const task2 = await Task.create({
         title: 'Internet Engineering Project',
         taskKind: taskKind2._id,
         user: user._id,
      });
      const task3 = await Task.create({
         title: 'buy some stuff for home',
         taskKind: taskKind3._id,
         user: user._id,
      });
      const task4 = await Task.create({
         title: 'Network homework',
         taskKind: taskKind._id,
         user: user._id,
      });
   }
};
