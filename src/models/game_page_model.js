import mongoose, { Schema } from 'mongoose';


const GamePageSchema = new Schema({
    currentImage: String,
    targetImage: String,
    exposure: Number,
    contrast: Number,
    highlights: Number,
    shadows: Number,
    whites: Number,
    blacks: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  
  }, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  });
  
  const GamePageModel = mongoose.model('GamePage', GamePageSchema);
  
  export default GamePageModel;