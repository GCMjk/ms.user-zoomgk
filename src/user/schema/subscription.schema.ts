import * as mongoose from 'mongoose';

export const SubscriptionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0 },
    numberOfGuests: { type: Number, default: 0 },
    available: { type: Boolean, default: true },
}, { timestamps: true });

SubscriptionSchema.index({ title: 1 }, { unique: true });