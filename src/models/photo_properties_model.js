import mongoose, { Schema } from 'mongoose';


const PhotoPropertiesSchema = new Schema({
    exposure: Number,
    contrast: Number,
    highlights: Number,
    shadows: Number,
    whites: Number,
    blacks: Number,
    tint: Number,
    temperature: Number,
    saturation: Number,
    vibrance: Number,
    brightness: Number,
  }, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  });
  
  const PhotoPropertiesModel = mongoose.model('PhotoProperties', PhotoPropertiesSchema);
  
  export default PhotoPropertiesModel;