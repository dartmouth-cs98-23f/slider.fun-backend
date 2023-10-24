import PhotoProperties from "../models/photo_properties_model.js";

// Initialize photo properties
export async function initializePhotoProperties(pageFields) {
    const photo = new PhotoProperties();
    
    /** TODO: Figure out image here */
    photo.image = pageFields.image;

    photo.exposure = pageFields.exposure;
    photo.contrast = pageFields.contrast;
    photo.highlights = pageFields.highlights;
    photo.shadows = pageFields.shadows;
    photo.whites = pageFields.whites;
    photo.blacks = pageFields.blacks;
    
    try {
      const savedPhotoProperties = await photo.save();
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

// Delete photo properties data
export async function deletePhotoProperties(id) {
    try {
      const removeInfo = await PhotoProperties.deleteOne({ _id: id });
      return removeInfo.deletedCount;
    } catch (error) {
      throw new Error(`Remove Photo Properties error: ${error}`);
    }
}
  