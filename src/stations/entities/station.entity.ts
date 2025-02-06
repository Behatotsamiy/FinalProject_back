import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
})
export class Station {
  @Prop({
    type: mongoose.SchemaTypes.String,
    required: true,
  })
  name: string;

  @Prop({
    type: Object,
    required: true,
  })
  location: {
    lat: number;
    lng: number;
  };

  @Prop({
    type: mongoose.SchemaTypes.String,
    required: true,
  })
  city: string;

  @Prop({
    type:[String],
    required: true,
  })
  services: string[];

  @Prop({
    type: mongoose.SchemaTypes.Mixed,
    required: true,
  })
  prices: Record<string, number>;

  @Prop({
    type: mongoose.SchemaTypes.Boolean,
    required: true,
    default: true,
  })
  status: boolean;
}

export const StationSchema = SchemaFactory.createForClass(Station);
