import { Schema, model } from 'mongoose';

export interface ISleep {
   day: Date;
   sleepStart: string;
   sleepFinish: string;
   sleepDuration: string;
   sleepQuality: number;
   MiddaySleepStart: string;
   MiddaySleepFinish: string;
   MiddaySleepDuration: string;
   MiddaySleepQuality: number;
   user: string;
}

export interface IFilterSleep {
   query?: string;
   user?: string;
}

const SleepSchema = new Schema<ISleep>({
   day: {
      type: Date,
   },
   sleepStart: {
      type: String,
   },
   sleepFinish: {
      type: String,
   },
   sleepDuration: {
      type: String,
   },
   sleepQuality: {
      type: Number,
   },
   MiddaySleepStart: {
      type: String,
   },
   MiddaySleepFinish: {
      type: String,
   },
   MiddaySleepDuration: {
      type: String,
   },
   MiddaySleepQuality: {
      type: Number,
   },
   user: {
      type: String,
      ref: 'User',
   },
});

export const Sleep = model<ISleep>('Sleep', SleepSchema);
