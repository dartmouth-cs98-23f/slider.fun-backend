import mongoose, { Schema } from 'mongoose';

const AchievementSchema = new Schema({
    name: String,
    points: Number,
    about: String,
    numUsers: Number
},{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

const AchievementModel = mongoose.model('Achievement', AchievementSchema);

export default AchievementModel;