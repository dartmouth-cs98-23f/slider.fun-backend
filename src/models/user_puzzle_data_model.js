import mongoose, { Schema } from 'mongoose';

const UserPuzzleDataSchema = new Schema({
    dailyPuzzle: { type: Schema.Types.ObjectId, ref: 'DailyPuzzle' },
    score: Number,
    userSelectedProperties: [
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

const UserPuzzleDataModel = mongoose.model('UserPuzzleData', UserPuzzleDataSchema);

export default UserPuzzleDataModel;