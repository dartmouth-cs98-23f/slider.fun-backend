import Property from "../models/property_model.js"

// Initialize photo propertie
export async function initializePhotoProperty(propertyFields) {
    const property = new Property();
    property.name = propertyFields.name;
    property.property = propertyFields.property;
    property.value = propertyFields.value;
    property.range.min = propertyFields.range.min;
    property.range.max = propertyFields.range.max;
    property.unit = propertyFields.unit;

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

// Updating Property
export async function updateProperty(id, propertyFields) {
    try {
      const update = await Property.findByIdAndUpdate(id, propertyFields);
      return update;
    } catch (error) {
      throw new Error(`Update Property error: ${error}`);
    }
}

// Get Property data
export async function getProperty(id) {
    try {
      const property = await Property.findById(id);
      return property;
    } catch (error) {
      throw new Error(`Get Property data error: ${error}`);
    }
}
  
// Delete Property data
export async function deleteProperty(id) {
    try {
      const removeInfo = await Property.deleteOne({ _id: id });
      return removeInfo.deletedCount;
    } catch (error) {
      throw new Error(`Remove Property error: ${error}`);
    }
  }