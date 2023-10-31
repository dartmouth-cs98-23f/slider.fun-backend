import mongoose, { Schema } from 'mongoose';


const PropertySchema = new Schema({
    name: String,
    property: String,
    value: Number,
    range: {
        min: Number,
        max: Number
    },
    unit: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

const PropertyModel = mongoose.model('Property', PropertySchema);

export default PropertyModel;