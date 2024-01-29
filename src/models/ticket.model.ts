import { Schema, model } from 'mongoose';

export interface ITicket {
   type: string;
   context: string;
   note: string;
   user?: string;
}

export interface IFilterTicket {
   context?: any;
   user?: string;
   type?: string;
}

const TicketSchema = new Schema<ITicket>({
   type: {
      type: {
         enum: {
            motto: 'Motto',
            tweet: 'Tweet',
         },
      },
   },
   context: {
      type: String,
   },
   note: {
      type: String,
   },
   user: {
      type: String,
      ref: 'User',
   },
   private: {
      type: Boolean,
      default: false,
   },
   direction: {
      type: {
         enum: {
            rtl: 'rtl',
            ltr: 'ltr',
         },
      },
      default: 'rtl',
   },
   created_at: {
      type: Date,
      default: Date.now,
   },
});

export const Ticket = model<ITicket>('Ticket', TicketSchema);
