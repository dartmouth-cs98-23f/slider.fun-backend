import mongoose, { Schema } from 'mongoose';

const DailyPuzzleSchema = new Schema({
    photo: { type: Schema.Types.ObjectId, ref: 'Photo' },
    date: String
},{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

const DailyPuzzleModel = mongoose.model('DailyPuzzle', DailyPuzzleSchema);

export default DailyPuzzleModel;