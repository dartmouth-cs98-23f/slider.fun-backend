import mongoose, { Schema } from 'mongoose';


const PhotoPropertiesSchema = new Schema({
  brightness: { type: Schema.Types.ObjectId, ref: 'Property' },
  contrast: { type: Schema.Types.ObjectId, ref: 'Property' },
  saturation: { type: Schema.Types.ObjectId, ref: 'Property' },
  exposure: { type: Schema.Types.ObjectId, ref: 'Property' },
  highlights: { type: Schema.Types.ObjectId, ref: 'Property' },
  shadows: { type: Schema.Types.ObjectId, ref: 'Property' },
  whites: { type: Schema.Types.ObjectId, ref: 'Property' },
  blacks: { type: Schema.Types.ObjectId, ref: 'Property' },
  tint: { type: Schema.Types.ObjectId, ref: 'Property' },
  temperature: { type: Schema.Types.ObjectId, ref: 'Property' },
  vibrance: { type: Schema.Types.ObjectId, ref: 'Property' },
  grayscale: { type: Schema.Types.ObjectId, ref: 'Property' },
  sepia: { type: Schema.Types.ObjectId, ref: 'Property' },
  hueRotate: { type: Schema.Types.ObjectId, ref: 'Property' },
  blur: { type: Schema.Types.ObjectId, ref: 'Property' },
  
  }, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  });
  
  const PhotoPropertiesModel = mongoose.model('PhotoProperties', PhotoPropertiesSchema);
  
  export default PhotoPropertiesModel;