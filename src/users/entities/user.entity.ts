import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Mongoose } from "mongoose";









@Schema({
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
    versionKey: false,
})
export class User {
    @Prop({
        type: mongoose.SchemaTypes.String,
        required: true,
    })
    name: string;
    @Prop({
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true, // Для уникальности номера
        validate: {
            validator: function(v: string) {
                // Простая валидация для телефона
                return /\+?[1-9]\d{1,14}$/.test(v); // Простая проверка для международных номеров
            },
            message: props => `${props.value} не является валидным номером телефона!`,
        }
    })
    phone: string;
    @Prop({
        type: mongoose.SchemaTypes.String,
        required: true,
    })
    password: string;
    @Prop({
        type: mongoose.SchemaTypes.String,
        required: true,
        default: "user",
        enum: ["user", "admin"],
    })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);