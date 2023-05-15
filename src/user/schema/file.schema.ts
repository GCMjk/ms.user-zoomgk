import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
    ETag: String,
    key: String,
    url: String
}, { _id: false });