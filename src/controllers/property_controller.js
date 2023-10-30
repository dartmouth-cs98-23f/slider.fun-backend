import Property from "../models/property_model.js"

// Initialize photo propertie
export async function initializePhotoProperty(propertyFields) {
    const property = new Property();
    property.property.name = propertyFields.property.name;
    property.property.property = propertyFields.property.property;
    property.property.value = propertyFields.property.value;
    property.property.range.min = propertyFields.property.range.min;
    property.property.range.max = propertyFields.property.range.max;
    property.property.unit = propertyFields.property.unit;


    try {
        const savedProperty = await property.save();
        return savedProperty;

    } catch (error) {
        throw new Error(`Initialize Property error: ${error}`);
    }
}

// Get all properties
export async function getAll() {
    try {
      const allProperties = await Property.find({}).sort([['date', -1]]);
      return allProperties;
    } catch (error) {
      throw new Error(`Get all Properties error: ${error}`);
    }
  }