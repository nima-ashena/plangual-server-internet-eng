import { Schema, model } from 'mongoose';

export interface IDay {
   dayBarcode: string;
   day?: Date;
   sleep?: string;
   tasks?: string[];
   events?: string[];
   MST?: number;
   MSTTime?: string;
   user: string;
}

export interface IFilterDay {
   query?: string;
   user?: string;
}

const DaySchema = new Schema<IDay>({
   dayBarcode: {
      type: String,
   },
   day: {
      type: Date,
   },
   sleep: {
      type: String,
      ref: 'Sleep',
   },
   tasks: [
      {
         type: String,
         ref: 'Task',
      },
   ],
   events: [
      {
         type: String,
         ref: 'Event',
      },
   ],
   MST: {
      type: Number,
      default: 0,
   },
   MSTTime: {
      type: Date,
   },
   user: {
      type: String,
      ref: 'User',
   },
});

// DaySchema.index({ dayBarcode: 1, user: 1 }, { unique: true });

export const Day = model<IDay>('Day', DaySchema);
