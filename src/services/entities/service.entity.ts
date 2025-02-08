import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Mongoose } from "mongoose";


@Schema({
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
    versionKey: false,
})
export class Service {
    @Prop({
        type: mongoose.SchemaTypes.String,
        required: true,
    })
    name: string;   
}

export const ServiceSchema = SchemaFactory.createForClass(Service);