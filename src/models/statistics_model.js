import mongoose, { Schema } from 'mongoose';

const StatisticsSchema = new Schema({
    stage: String,
    numDataPoints: Number,
    means: [
        {
            name: { type: String, required: true },
            value: { type: Number, required: true },
        }
    ]
},{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

const StatisticsModel = mongoose.model('Statistics', StatisticsSchema);

export default StatisticsModel;