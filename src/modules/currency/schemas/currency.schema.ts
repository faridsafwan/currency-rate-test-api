import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Mschema } from 'mongoose';

/**
 * Mongoose Currency Schema
 */
export type CurrencyDocument = Currency & Document;

@Schema({ timestamps: true })
export class Currency {
  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  spotRate: number;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);

/**
 * Mongoose Currency Document
 */
export interface ICurrency extends Document {
  _id: Mschema.Types.ObjectId;
  currency: string;
  spotRate: number;
}
