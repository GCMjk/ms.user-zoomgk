import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
    ETag: { type: String, required: true },
    key: { type: String, required: true },
    url: { type: String, required: true }
}, { _id: false });