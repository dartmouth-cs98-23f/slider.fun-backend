import mongoose, { Schema } from 'mongoose';

/*
* Schema Requirements
*     (1): photoID: to disinguish between other images
*     (2): store photo properties from 
*/


const PhotoSchema = new Schema(
    {
        imageUrl: String,
        photoProperties: { type: Schema.Types.ObjectId, ref: 'PhotoProperties'}
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

const PhotoModel = mongoose.model('Photo', PhotoSchema);

export default PhotoModel;