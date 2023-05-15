import * as mongoose from 'mongoose';
import { FileSchema } from './file.schema';

export const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    gender: { type: String, enum: ['MALE', 'FEMALE'], required: true },
    birthday: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['ADMIN', 'CLIENT', 'GUEST'], default: 'CLIENT' },
    subscriptionID: { type: mongoose.Types.ObjectId, ref: 'subscriptions', required: false },
    avatar: { type: FileSchema, required: false },
    confirmed: { type: Boolean, default: false },
    confirmationToken: { type: String, required: false },
    available: { type: Boolean, default: true },
}, { timestamps: true });

UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });