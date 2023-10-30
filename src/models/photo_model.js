import mongoose, { Schema } from 'mongoose';

const PhotoSchema = new Schema({
    imageUrl: String,
    photoProperties: {type: Schema.Types.ObjectId, ref: 'PhotoProperties'}

},{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

const PhotoModel = mongoose.model('Photo', PhotoSchema);

export default PhotoModel;