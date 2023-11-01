import PhotoProperties from "../models/photo_properties_model.js";

// Initialize photo properties
export async function initializePhotoProperties(pageFields) {
  
  const property = new PhotoProperties();
  property.name = pageFields.name;
  property.property = pageFields.property;
  property.value = pageFields.value;
  property.range.min = pageFields.range.min;
  property.range.max = pageFields.range.max;
  property.unit = pageFields.unit;

  try {
    const savedPhotoProperties = await property.save();
    return savedPhotoProperties;
  
  } catch (error) {
    throw new Error(`Initialize PhotoProperties error: ${error}`);
  }
}

// Updating photo properties
export async function updatePhotoProperties(id, pageFields) {
  try {
    const update = await PhotoProperties.findByIdAndUpdate(id, pageFields);
    return update;
  } catch (error) {
    throw new Error(`Update Photo Properties error: ${error}`);
  }
}

// Get photo properties data
export async function getPhotoProperties(id) {
  try {
    const photoProperties = await PhotoProperties.findById(id);
    return photoProperties;
  } catch (error) {
    throw new Error(`Get Photo Properties data error: ${error}`);
  }
}

// Get all photo properties
export async function getAll() {
  try {
    const allPhotoProperties = await PhotoProperties.find({}).sort([['date', -1]]);
    return allPhotoProperties;
  } catch (error) {
    throw new Error(`Get all Photo Properties error: ${error}`);
  }
}

// Delete photo properties data
export async function deletePhotoProperties(id) {
  try {
    const removeInfo = await PhotoProperties.deleteOne({ _id: id });
    return removeInfo.deletedCount;
  } catch (error) {
    throw new Error(`Remove Photo Properties error: ${error}`);
  }
}
  




export async function getPhotoPropertiesById(propertyIds) {
  try {
    // Fetch PhotoProperties by their IDs
    const photoProperties = await PhotoProperties.find({ _id: { $in: propertyIds } });

    // Extract and return only the IDs of the fetched PhotoProperties
    return photoProperties.map(property => property._id);
  } catch (error) {
    throw new Error(`Get PhotoProperties by ID error: ${error}`);
  }
}