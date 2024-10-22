import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Status {
  Payed = 'Payed',
  Canceled = 'Canceled',
}

@Schema()
export class Transaction extends Document {
  @Prop({ default: () => new Date() })
  date: Date;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  method: string;

  @Prop({ enum: Status, required: true })
  status: Status;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
