import mongoose, { Schema } from 'mongoose';


const LevelSchema = new Schema({
    exposure: Boolean,
    contrast: Boolean,
    highlights: Boolean,
    shadows: Boolean,
    whites: Boolean,
    blacks: Boolean,
    tint: Boolean,
    temperature: Boolean,
    saturation: Boolean,
    vibrance: Boolean,
    brightness: Boolean,
    levelNumber: Number,
    nextLevel: { type: Schema.Types.ObjectId, ref: 'Level' },
  
  }, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  });
  
  const LevelModel = mongoose.model('Level', LevelSchema);
  
  export default LevelModel;