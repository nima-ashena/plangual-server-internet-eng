import { Schema, model } from 'mongoose';

export interface ITaskKind {
   title: string;
   color?: string;
   textColor?: string;
   user?: string;
}

const TaskKindSchema = new Schema<ITaskKind>({
   title: {
      type: String,
   },
   color: {
      type: String,
   },
   textColor: {
      type: String,
      default: '#fff',
   },
   user: {
      type: String,
      ref: 'User',
   },
});

export const TaskKind = model<ITaskKind>('TaskKind', TaskKindSchema);
