import mongoose, { Schema } from 'mongoose';

const PhotoSchema = new Schema({
    imageUrl: String,
    authorId: String,
    title: String,
    validated: Boolean,
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    reported: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    photoProperties: [
        {
            name: { type: String, required: true },
            property: { type: String, required: true },
            value: { type: Number, required: true },
            range: {
                min: { type: Number, required: true },
                max: { type: Number, required: true },
            },
            unit: { type: String, required: true },
            status: { type: Boolean, required: true }
        }
    ]

},{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

const PhotoModel = mongoose.model('Photo', PhotoSchema);

export default PhotoModel;