import { log } from 'console';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import * as bcrypt from 'bcrypt';
import { TaskKind } from '../models/taskKind.model ';

// import { bcrypt } from 'bcrypt';

export const registerUser = async (req, res, next) => {
   try {
      const { name, username, email, password, confirmPassword } = req.body;
      if (!name && !username && !password && !confirmPassword) {
         return res.status(401).send('Fill required items');
      }
      if (password != confirmPassword) {
         return res.status(401).send('Passwords must be same');
      }
      let user = await User.findOne({ username });
      if (user) res.send({ message: 'This username is already existed' });

      user = new User();
      user.name = name;
      user.username = username;
      user.email = email;
      user.password = password;

      await user.save();

      res.send({ user, message: 'User registered successfully' });
   } catch (e) {
      console.log(e);
      next(e);
   }
};

export const signInUser = async (req, res, next) => {
   try {
      const { username, password } = req.body;
      if (!username && !password) {
         return res.status(401).send('Fill required items');
      }
      const user = await User.findOne({ username });
      if (!user)
         return res
            .status(301)
            .send({ message: 'username or password is incorrect 1' });

      const isAuthenticated = await bcrypt.compare(password, user.password);
      if (!isAuthenticated)
         return res
            .status(301)
            .send({ message: 'username or password is incorrect 2' });

      const token = user.generateToken();
      res.status(200).json({
         message: 'Login was successful',
         user,
         token,
      });
   } catch (e) {
      console.log(e);
      next(e);
   }
};

export const signUpUser = async (req, res, next) => {
   try {
      const { username, password, rePassword } = req.body;
      if (!username && !password && !rePassword) {
         return res.status(401).send('Fill required items');
      }
      const user = await User.findOne({ username });
      if (!user)
         return res
            .status(301)
            .send({ message: 'username or password is incorrect 1' });

      const isAuthenticated = await bcrypt.compare(password, user.password);
      if (!isAuthenticated)
         return res
            .status(301)
            .send({ message: 'username or password is incorrect 2' });

      const token = user.generateToken();
      res.status(200).json({
         message: 'Login was successful',
         user,
         token,
      });
   } catch (e) {
      console.log(e);
      next(e);
   }
};

export const getUser = async (req, res, next) => {
   try {
      const { userId } = req;
      const user = await User.findById(userId).select('-password');

      res.send({ user });
   } catch (e) {
      console.log(e);
      next(e);
   }
};

export const getUsers = async (req, res, next) => {
   try {
      const users = await User.find().select('-password');

      res.send({ users });
   } catch (e) {
      console.log(e);
      next(e);
   }
};

// Edit User
export const editUser = async (req, res) => {
   try {
      const user = await User.findByIdAndUpdate(
         req.params.id,
         { ...req.body },
         { new: true },
      );

      res.send({
         message: 'User edited successfully',
         user,
      });
   } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
   }
};

export const nimaStuff = async (req, res) => {
   try {
      const tasks = await Task.find({ archived: { $ne: true } });
      res.send({ tasks });
   } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
   }
};
