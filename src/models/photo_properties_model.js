import mongoose, { Schema } from 'mongoose';


const PhotoPropertiesSchema = new Schema({

  name: { type: String, required: true },
  property: { type: String, required: true },
  value: { type: Number, required: true },
  range: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  unit: { type: String, required: true },
  
  }, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  });
  
  const PhotoPropertiesModel = mongoose.model('PhotoProperties', PhotoPropertiesSchema);
  
  export default PhotoPropertiesModel;