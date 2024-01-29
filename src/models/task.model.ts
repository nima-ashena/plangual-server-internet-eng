import { Schema, model } from 'mongoose';

export interface ITask {
   title: string;
   completed: boolean;
   priority: number;
   remarkable: string;
   taskKind?: string;
   user?: string;
   dayBarcode?: string;
   date?: Date;
   archived?: boolean;
}

export interface IFilterTask {
   title?: any;
   completed?: boolean;
   dayBarcode?: string;
   user?: string;
   taskKind?: string;
   archived?: any;
}

const TaskSchema = new Schema<ITask>({
   title: {
      type: String,
   },
   completed: {
      type: Boolean,
      default: false,
   },
   archived: {
      type: Boolean,
      default: false,
   },
   priority: {
      type: Number,
   },
   taskKind: {
      type: String,
      ref: 'TaskKind',
   },
   user: {
      type: String,
      ref: 'User',
   },
   created_at: {
      type: Date,
      default: Date.now,
   },
   dayBarcode: {
      type: String,
      default: 'unassign',
   },
   date: {
      type: Date,
      default: null,
   },
});

export const Task = model<ITask>('Task', TaskSchema);
