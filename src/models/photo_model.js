import mongoose, { Shema } from 'mongoose';

const PhotoSchema = new Schema({
    imageId: Number
})

const PhotoModel = mongoose.model('Photo', PhotoSchema);

export default PhotoSchema;