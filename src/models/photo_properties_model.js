import mongoose, { Schema } from 'mongoose';


const PhotoPropertiesSchema = new Schema({
    image: String,
    exposure: Number,
    contrast: Number,
    highlights: Number,
    shadows: Number,
    whites: Number,
    blacks: Number,
  
  }, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  });
  
  const PhotoPropertiesModel = mongoose.model('PhotoProperties', PhotoPropertiesSchema);
  
  export default PhotoPropertiesModel;