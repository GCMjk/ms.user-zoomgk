import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    gender: { type: String, enum: ["MALE", "FEMALE"], required: true },
    birthday: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    confirmed: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false },
    role: { type: String, enum: ["ADMIN", "USER"], required: true }
}, { timestamps: true });

UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });